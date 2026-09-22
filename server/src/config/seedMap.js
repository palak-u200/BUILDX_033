import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Incident from '../models/Incident.js';
import { RiskZone, Shelter, Hospital, RescueTeam, WaterSensor, MapRoute } from '../models/MapEntities.js';

dotenv.config();

const incidents = [
  {
    id: 'INC-001',
    type: 'Severe Flooding',
    severity: 'CRITICAL',
    latitude: 21.1500,
    longitude: 79.1000,
    location: 'Wardhaman Nagar',
    description: 'Water level exceeded safe limits. Immediate evacuation required.',
    timestamp: new Date().toISOString(),
    status: 'ACTIVE',
    assignedTeam: 'RT-03',
    recommendedAction: 'Deploy Rescue Team RT-03, Open Shelter S-02, Restrict Road R-12'
  },
  {
    id: 'INC-002',
    type: 'Power Failure',
    severity: 'HIGH',
    latitude: 21.1350,
    longitude: 79.0700,
    location: 'Dharampeth',
    description: 'Complete blackout affecting 2 hospitals. Reroute required.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'ACTIVE',
    assignedTeam: 'RT-01',
    recommendedAction: 'Initiated ambulance reroute from Zone 2'
  },
  {
    id: 'INC-003',
    type: 'Road Blockage',
    severity: 'MEDIUM',
    latitude: 21.1600,
    longitude: 79.0900,
    location: 'Kamptee Road',
    description: 'Fallen trees blocking main arterial road.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'UNDER_CONTROL',
    assignedTeam: null,
    recommendedAction: 'Deploy clearing crew.'
  },
  {
    id: 'INC-004',
    type: 'Building Collapse',
    severity: 'HIGH',
    latitude: 21.1250,
    longitude: 79.1150,
    location: 'Nandanvan Layout',
    description: 'Partial collapse of old structure after continuous rainfall. Search and rescue underway.',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    status: 'ACTIVE',
    assignedTeam: 'RT-02',
    recommendedAction: 'Dispatch structural engineer, Deploy RT-02, Cordon off area'
  },
  {
    id: 'INC-005',
    type: 'Water Logging',
    severity: 'LOW',
    latitude: 21.1180,
    longitude: 79.0750,
    location: 'Wardha Road Junction',
    description: 'Knee-deep water accumulating at underpass. Traffic slowed but passable.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    status: 'MONITORING',
    assignedTeam: null,
    recommendedAction: 'Deploy traffic marshals, Monitor water level hourly'
  }
];

const riskZones = [
  {
    id: 'Z-001',
    level: 'Critical',
    color: '#ef4444',
    coordinates: [
      [21.155, 79.095],
      [21.155, 79.105],
      [21.145, 79.105],
      [21.145, 79.095]
    ]
  },
  {
    id: 'Z-002',
    level: 'High',
    color: '#f97316',
    coordinates: [
      [21.140, 79.065],
      [21.140, 79.075],
      [21.130, 79.075],
      [21.130, 79.065]
    ]
  },
  {
    id: 'Z-003',
    level: 'Moderate',
    color: '#eab308',
    coordinates: [
      [21.130, 79.110],
      [21.130, 79.120],
      [21.120, 79.120],
      [21.120, 79.110]
    ]
  }
];

const shelters = [
  {
    id: 'S-01',
    name: 'Govt School Relief Camp',
    latitude: 21.1420,
    longitude: 79.0800,
    capacity: 500,
    occupancy: 320,
    status: 'OPEN',
    contact: '0712-255-0001'
  },
  {
    id: 'S-02',
    name: 'Community Hall Shelter',
    latitude: 21.1520,
    longitude: 79.1100,
    capacity: 300,
    occupancy: 290,
    status: 'NEAR_CAPACITY',
    contact: '0712-255-0002'
  },
  {
    id: 'S-03',
    name: 'Sitabuldi Relief Center',
    latitude: 21.1455,
    longitude: 79.0700,
    capacity: 400,
    occupancy: 150,
    status: 'OPEN',
    contact: '0712-255-0003'
  },
  {
    id: 'S-04',
    name: 'Manewada Convention Hall',
    latitude: 21.1250,
    longitude: 79.0950,
    capacity: 250,
    occupancy: 40,
    status: 'OPEN',
    contact: '0712-255-0004'
  },
  {
    id: 'S-05',
    name: 'Panchpaoli School Shelter',
    latitude: 21.1650,
    longitude: 79.0950,
    capacity: 350,
    occupancy: 310,
    status: 'NEAR_CAPACITY',
    contact: '0712-255-0005'
  }
];

const hospitals = [
  {
    id: 'H-01',
    name: 'Government Medical College (GMC)',
    latitude: 21.1350,
    longitude: 79.0950,
    emergencyBeds: 18,
    icuBeds: 5,
    ambulances: 3,
    status: 'OPERATIONAL'
  },
  {
    id: 'H-02',
    name: 'Mayo Hospital',
    latitude: 21.1480,
    longitude: 79.0980,
    emergencyBeds: 4,
    icuBeds: 0,
    ambulances: 1,
    status: 'CRITICAL_LOAD'
  },
  {
    id: 'H-03',
    name: 'Indira Gandhi Govt Medical College',
    latitude: 21.1400,
    longitude: 79.1050,
    emergencyBeds: 12,
    icuBeds: 3,
    ambulances: 2,
    status: 'OPERATIONAL'
  },
  {
    id: 'H-04',
    name: 'Datta Meghe Institute (Wardha Rd)',
    latitude: 21.1200,
    longitude: 79.0600,
    emergencyBeds: 25,
    icuBeds: 8,
    ambulances: 4,
    status: 'OPERATIONAL'
  }
];

const rescueTeams = [
  {
    id: 'RT-01',
    name: 'NDRF Battalion 3',
    latitude: 21.1400,
    longitude: 79.0850,
    status: 'DEPLOYED',
    personnel: 24,
    vehicles: 3,
    assignedIncidentId: 'INC-002'
  },
  {
    id: 'RT-02',
    name: 'SDRF Alpha',
    latitude: 21.1300,
    longitude: 79.0900,
    status: 'AVAILABLE',
    personnel: 15,
    vehicles: 2,
    assignedIncidentId: null
  },
  {
    id: 'RT-03',
    name: 'SDRF Beta',
    latitude: 21.1500,
    longitude: 79.1000,
    status: 'DEPLOYED',
    personnel: 18,
    vehicles: 2,
    assignedIncidentId: 'INC-001'
  },
  {
    id: 'RT-04',
    name: 'Fire Emergency Unit 4',
    latitude: 21.1550,
    longitude: 79.0750,
    status: 'EN ROUTE',
    personnel: 12,
    vehicles: 3,
    assignedIncidentId: 'INC-003'
  },
  {
    id: 'RT-05',
    name: 'Civil Defense Team C',
    latitude: 21.1250,
    longitude: 79.0800,
    status: 'AVAILABLE',
    personnel: 20,
    vehicles: 2,
    assignedIncidentId: null
  }
];

const waterSensors = [
  {
    id: 'WTR-024',
    latitude: 21.1490,
    longitude: 79.1020,
    waterLevel: 4.2,
    dangerThreshold: 4.0,
    rateOfRise: 0.18,
    status: 'CRITICAL'
  },
  {
    id: 'WTR-025',
    latitude: 21.1450,
    longitude: 79.0950,
    waterLevel: 2.1,
    dangerThreshold: 4.0,
    rateOfRise: -0.05,
    status: 'NORMAL'
  },
  {
    id: 'WTR-026',
    latitude: 21.1330,
    longitude: 79.0650,
    waterLevel: 3.4,
    dangerThreshold: 4.0,
    rateOfRise: 0.12,
    status: 'WARNING'
  },
  {
    id: 'WTR-027',
    latitude: 21.1180,
    longitude: 79.1100,
    waterLevel: 1.2,
    dangerThreshold: 3.5,
    rateOfRise: 0.02,
    status: 'NORMAL'
  }
];

const routes = [
  {
    id: 'R-001',
    type: 'SAFE',
    coordinates: [
      [21.1500, 79.1000],
      [21.1480, 79.0980],
      [21.1420, 79.0800]
    ]
  },
  {
    id: 'R-002',
    type: 'BLOCKED',
    coordinates: [
      [21.1550, 79.1000],
      [21.1600, 79.0900]
    ]
  },
  {
    id: 'R-003',
    type: 'SAFE',
    coordinates: [
      [21.1455, 79.0700],
      [21.1420, 79.0800],
      [21.1350, 79.0950]
    ]
  },
  {
    id: 'R-004',
    type: 'CAUTION',
    coordinates: [
      [21.1300, 79.0900],
      [21.1250, 79.0950],
      [21.1200, 79.0600]
    ]
  }
];

const seedMapData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nagpur-resq');
    console.log('MongoDB Connected for Map Seeding');

    await Incident.deleteMany({});
    await RiskZone.deleteMany({});
    await Shelter.deleteMany({});
    await Hospital.deleteMany({});
    await RescueTeam.deleteMany({});
    await WaterSensor.deleteMany({});
    await MapRoute.deleteMany({});
    console.log('Cleared existing map data.');

    await Incident.insertMany(incidents);
    await RiskZone.insertMany(riskZones);
    await Shelter.insertMany(shelters);
    await Hospital.insertMany(hospitals);
    await RescueTeam.insertMany(rescueTeams);
    await WaterSensor.insertMany(waterSensors);
    await MapRoute.insertMany(routes);
    
    console.log('✅ Successfully seeded DEMO / SIMULATION map data!');
    process.exit();
  } catch (error) {
    console.error(`Error with map data import: ${error.message}`);
    process.exit(1);
  }
};

seedMapData();
