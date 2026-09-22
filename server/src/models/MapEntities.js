import mongoose from 'mongoose';

const riskZoneSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Critical', 'High', 'Moderate', 'Low'], required: true },
  color: { type: String, required: true },
  coordinates: { type: [[Number]], required: true } // Array of [lat, lng]
});

export const RiskZone = mongoose.model('RiskZone', riskZoneSchema);

const shelterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  capacity: { type: Number, required: true },
  occupancy: { type: Number, required: true },
  status: { type: String, required: true },
  contact: { type: String, required: true }
});

export const Shelter = mongoose.model('Shelter', shelterSchema);

const hospitalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  emergencyBeds: { type: Number, required: true },
  icuBeds: { type: Number, required: true },
  ambulances: { type: Number, required: true },
  status: { type: String, required: true }
});

export const Hospital = mongoose.model('Hospital', hospitalSchema);

const rescueTeamSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: String, enum: ['AVAILABLE', 'DEPLOYED', 'EN ROUTE', 'OFFLINE'], required: true },
  personnel: { type: Number, required: true },
  vehicles: { type: Number, required: true },
  assignedIncidentId: { type: String }
});

export const RescueTeam = mongoose.model('RescueTeam', rescueTeamSchema);

const waterSensorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  waterLevel: { type: Number, required: true },
  dangerThreshold: { type: Number, required: true },
  rateOfRise: { type: Number, required: true },
  status: { type: String, required: true }
});

export const WaterSensor = mongoose.model('WaterSensor', waterSensorSchema);

const routeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, enum: ['SAFE', 'CAUTION', 'BLOCKED'], required: true },
  coordinates: { type: [[Number]], required: true } // Array of [lat, lng]
});

export const MapRoute = mongoose.model('MapRoute', routeSchema);
