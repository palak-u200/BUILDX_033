import { LiveDisasterMap } from '../components/map/LiveDisasterMap';

const LiveMap = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-white font-display">Live Disaster Map</h1>
        <p className="text-sm text-gray-400">Real-time operational picture of Nagpur — incidents, shelters, hospitals, teams and water sensors</p>
      </div>
      <div className="flex-1 min-h-[600px] flex">
        <LiveDisasterMap />
      </div>
    </div>
  );
};

export default LiveMap;
