import { Clock, MapPin, Users } from 'lucide-react';

const ActionPlan = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white font-display">AI Decision Assistant</h1>
        <p className="text-sm text-gray-400">Prioritized response tasks based on predictive risk and resource gap models</p>
      </div>

      <div className="flex flex-col gap-4 relative pl-6">
        <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-white/10"></div>

        {/* Task 1 */}
        <div className="relative p-5 flex flex-col gap-3 bg-surface border border-critical/50 rounded-lg">
          <div className="absolute -left-7 top-6 w-2.5 h-2.5 rounded-full bg-critical border-2 border-background shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white font-display">Evacuate Low-Lying Areas in Zone 4</span>
            <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-critical/10 text-critical border border-critical/20">Critical Priority</span>
          </div>
          
          <div className="bg-surfaceLight/50 p-3 rounded border border-white/5">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">AI Reasoning</span>
            <p className="text-sm text-gray-300">
              Current water level and forecast rainfall exceed 95% of historical risk thresholds. AI models predict river breach within 2 hours. Initiate immediate evacuation of Wardhaman Nagar.
            </p>
          </div>

          <div className="flex gap-4 text-xs text-gray-400 mt-2 border-t border-white/5 pt-3">
            <div className="flex items-center gap-1"><Clock size={14} /> Due: Immediately</div>
            <div className="flex items-center gap-1"><MapPin size={14} /> Zone 4</div>
            <div className="flex items-center gap-1"><Users size={14} /> Resp: Disaster Management / Rescue</div>
          </div>
          
          <div className="flex gap-2 mt-2">
            <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
              APPROVE
            </button>
            <button className="bg-surfaceLight hover:bg-white/10 text-white px-4 py-2 rounded-md text-sm font-medium border border-white/10 transition-colors">
              MODIFY
            </button>
            <button className="bg-surfaceLight hover:bg-critical/20 hover:text-critical text-gray-400 px-4 py-2 rounded-md text-sm font-medium border border-white/10 transition-colors">
              REJECT
            </button>
          </div>
        </div>

        {/* Task 2 */}
        <div className="relative p-5 flex flex-col gap-3 bg-surface border border-warning/50 rounded-lg">
          <div className="absolute -left-7 top-6 w-2.5 h-2.5 rounded-full bg-warning border-2 border-background shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white font-display">Reroute Ambulances to General Hospital</span>
            <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-warning/10 text-warning border border-warning/20">High Priority</span>
          </div>
          
          <div className="bg-surfaceLight/50 p-3 rounded border border-white/5">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">AI Reasoning</span>
            <p className="text-sm text-gray-300">
              Zone 2 clinics are reporting power outages affecting life support. Reroute 5 incoming critical patients to Nagpur General Hospital which has 84% ICU availability.
            </p>
          </div>

          <div className="flex gap-4 text-xs text-gray-400 mt-2 border-t border-white/5 pt-3">
            <div className="flex items-center gap-1"><Clock size={14} /> Due: Next 30 mins</div>
            <div className="flex items-center gap-1"><MapPin size={14} /> Zone 2</div>
            <div className="flex items-center gap-1"><Users size={14} /> Resp: Health Department</div>
          </div>
          
          <div className="flex gap-2 mt-2">
            <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
              APPROVE
            </button>
            <button className="bg-surfaceLight hover:bg-white/10 text-white px-4 py-2 rounded-md text-sm font-medium border border-white/10 transition-colors">
              MODIFY
            </button>
          </div>
        </div>

        {/* Task 3 */}
        <div className="relative p-5 flex flex-col gap-3 bg-surface border border-white/10 rounded-lg">
          <div className="absolute -left-7 top-6 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background"></div>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white font-display">Pre-position JCBs for Debris Clearance</span>
            <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">Medium Priority</span>
          </div>
          
          <div className="bg-surfaceLight/50 p-3 rounded border border-white/5">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">AI Reasoning</span>
            <p className="text-sm text-gray-300">
              Historical data suggests a high likelihood of structural collapse and blocked roads in old city areas (Zone 1) post-flooding. Stage heavy machinery nearby for rapid deployment.
            </p>
          </div>

          <div className="flex gap-4 text-xs text-gray-400 mt-2 border-t border-white/5 pt-3">
            <div className="flex items-center gap-1"><Clock size={14} /> Due: Next 12 Hours</div>
            <div className="flex items-center gap-1"><MapPin size={14} /> Zone 1 Staging Area</div>
            <div className="flex items-center gap-1"><Users size={14} /> Resp: Municipal Authority</div>
          </div>
          
          <div className="flex gap-2 mt-2">
            <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
              APPROVE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActionPlan;
