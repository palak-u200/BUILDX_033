/* Launches headless Chrome with CDP, captures console errors/exceptions, reports render state. */
const { spawn } = require('child_process');
const http = require('http');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9223;
const URL_TO_TEST = process.argv[2] || 'http://localhost:5174/dashboard';
const WAIT_MS = parseInt(process.argv[3] || '12000', 10);

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  `--remote-debugging-port=${PORT}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=' + require('os').tmpdir() + '/cdp-profile-' + Date.now(),
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function getTarget() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json`);
      const tabs = await res.json();
      const page = tabs.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch (e) { /* retry */ }
    await sleep(300);
  }
  throw new Error('Could not connect to Chrome CDP');
}

(async () => {
  try {
    const target = await getTarget();
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 0;
    const pending = new Map();
    const consoleLogs = [];
    const exceptions = [];

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++msgId;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });

    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      } else if (msg.method === 'Runtime.consoleAPICalled') {
        const { type, args } = msg.params;
        const text = args.map(a => a.value !== undefined ? String(a.value) : (a.description || a.type)).join(' ');
        consoleLogs.push(`[${type}] ${text}`);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params.exceptionDetails;
        const text = d.exception?.description || d.text;
        exceptions.push(text);
      }
    };

    ws.onopen = async () => {
      try {
        await send('Runtime.enable');
        await send('Page.enable');
        await send('Log.enable');
        await send('Network.enable');
        const failedRequests = [];
        // Track failed network requests
        const origOnMessage = ws.onmessage;

        await send('Page.navigate', { url: URL_TO_TEST });
        await sleep(WAIT_MS);

        // Evaluate render state
        const evalRes = await send('Runtime.evaluate', {
          expression: `(() => {
            const root = document.getElementById('root');
            return JSON.stringify({
              url: location.href,
              rootChildren: root ? root.children.length : -1,
              bodyText: document.body.innerText.slice(0, 500),
              leafletPanes: document.querySelectorAll('.leaflet-pane').length,
              leafletMarkers: document.querySelectorAll('.custom-map-icon').length,
              leafletPopupsReady: !!document.querySelector('.leaflet-container'),
              tileImgs: document.querySelectorAll('.leaflet-tile-loaded').length,
              viteErrorOverlay: !!document.querySelector('vite-error-overlay'),
            });
          })()`,
          returnByValue: true,
        });
        const state = JSON.parse(evalRes.result.value);

        console.log('=== RENDER STATE ===');
        console.log(JSON.stringify(state, null, 2));
        console.log('=== CONSOLE (' + consoleLogs.length + ') ===');
        consoleLogs.slice(0, 40).forEach(l => console.log(l));
        console.log('=== EXCEPTIONS (' + exceptions.length + ') ===');
        exceptions.slice(0, 10).forEach(e => console.log(e));

        ws.close();
      } catch (e) {
        console.error('CDP flow error:', e.message);
      } finally {
        chrome.kill();
        process.exit(0);
      }
    };
  } catch (e) {
    console.error('Setup error:', e.message);
    chrome.kill();
    process.exit(1);
  }
})();
