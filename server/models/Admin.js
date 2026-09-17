const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide admin name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide admin email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    default: 'admin'
  },
  adminLevel: {
    type: String,
    enum: ['SuperAdmin', 'DestinationManager', 'TourismLead'],
    default: 'SuperAdmin'
  },
  permissions: {
    type: [String],
    default: ['manage_destinations', 'manage_timelines', 'view_inquiries', 'manage_users']
  },
  department: {
    type: String,
    default: 'Tourism & Heritage Operations'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hash hook before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to verify admin password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Map to dedicated 'admins' collection in MongoDB
module.exports = mongoose.model('Admin', AdminSchema, 'admins');
