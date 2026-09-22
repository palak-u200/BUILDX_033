import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'Super Admin',
      'Disaster Management Officer',
      'Municipal Authority',
      'Police Department',
      'Fire & Emergency Department',
      'Health Department',
      'Rescue Team'
    ]
  },
  permissions: [{
    type: String
  }]
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);
export default Role;
