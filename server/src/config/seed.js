import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../models/Role.js';
import User from '../models/User.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nagpur-resq');
    console.log('MongoDB Connected for Seeding');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing
    await Role.deleteMany();
    await User.deleteMany();
    
    // Create Roles
    const roles = await Role.insertMany([
      { name: 'Super Admin', permissions: ['all'] },
      { name: 'Disaster Management Officer', permissions: ['dashboard', 'risk_analysis', 'resource_planning'] },
      { name: 'Municipal Authority', permissions: ['infrastructure', 'shelters'] },
      { name: 'Police Department', permissions: ['traffic', 'incidents'] },
      { name: 'Fire & Emergency Department', permissions: ['rescue', 'fire'] },
      { name: 'Health Department', permissions: ['hospitals', 'ambulances'] },
      { name: 'Rescue Team', permissions: ['tasks', 'status'] },
    ]);
    
    console.log('✅ Roles Seeded');

    const superAdminRole = roles.find(r => r.name === 'Super Admin');
    const dmoRole = roles.find(r => r.name === 'Disaster Management Officer');

    // Create Demo Users
    await User.create([
      {
        name: 'Admin User',
        email: 'admin@nagpur.gov.in',
        password: 'password123', // Will be hashed by pre-save hook
        role: superAdminRole._id,
        department: 'NMC IT Cell'
      },
      {
        name: 'Nodal Officer Sharma',
        email: 'sharma@nagpur.gov.in',
        password: 'password123',
        role: dmoRole._id,
        department: 'Disaster Management Cell'
      }
    ]);

    console.log('✅ Users Seeded');
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedData();
