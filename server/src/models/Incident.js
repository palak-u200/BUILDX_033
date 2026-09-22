import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  severity: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: String, required: true },
  status: { type: String, required: true },
  assignedTeam: { type: String },
  recommendedAction: { type: String }
});

const Incident = mongoose.model('Incident', incidentSchema);
export default Incident;
