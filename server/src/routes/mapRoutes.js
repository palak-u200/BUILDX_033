import express from 'express';
import Incident from '../models/Incident.js';
import { RiskZone, Shelter, Hospital, RescueTeam, WaterSensor, MapRoute } from '../models/MapEntities.js';

const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const [incidents, zones, shelters, hospitals, teams, sensors, routes] = await Promise.all([
      Incident.find(),
      RiskZone.find(),
      Shelter.find(),
      Hospital.find(),
      RescueTeam.find(),
      WaterSensor.find(),
      MapRoute.find()
    ]);
    
    res.json({
      incidents,
      zones,
      shelters,
      hospitals,
      teams,
      sensors,
      routes
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching map data', error: error.message });
  }
});

export default router;
