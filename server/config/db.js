const mongoose = require('mongoose');

let isConnected = false;

const autoSeedDatabase = async () => {
  try {
    const Destination = require('../models/Destination');
    const User = require('../models/User');
    const Admin = require('../models/Admin');
    const { SEED_DESTINATIONS } = require('../seed/seedData');

    const destCount = await Destination.countDocuments();
    if (destCount === 0) {
      await Destination.insertMany(SEED_DESTINATIONS);
      console.log(`🌱 [DB Seed] Inserted ${SEED_DESTINATIONS.length} heritage destinations into MongoDB`);
    } else {
      console.log(`📦 [DB Status] ${destCount} destinations available in MongoDB`);
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create([
        { name: 'Pooja Sharma', email: 'traveler@example.com', password: 'password123', role: 'user' }
      ]);
      console.log(`🌱 [DB Seed] Created default Traveler account in MongoDB users collection`);
    }

    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create([
        { 
          name: 'Bhavin Admin (Host)', 
          email: 'bhavin.admin@techfusion.com', 
          phone: '+91 9876543211',
          password: 'adminpassword123', 
          role: 'admin',
          adminLevel: 'SuperAdmin',
          department: 'Heritage Operations'
        },
        { 
          name: 'Aditya Rajput (Admin)', 
          email: 'admin@phoenix-tourism.in', 
          password: 'password123', 
          role: 'admin',
          adminLevel: 'DestinationManager',
          department: 'Tourism Management'
        }
      ]);
      console.log(`🌱 [DB Seed] Created dedicated Admin documents in MongoDB admins collection`);
    }
  } catch (seedErr) {
    console.warn(`⚠️ [DB Seed Notice] ${seedErr.message}`);
  }
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/phoenix_tourism';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    
    // Auto-seed initial data if collections are empty
    await autoSeedDatabase();
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️ MongoDB connection not established (${error.message}).`);
    console.log(`ℹ️ Running server with in-memory resilient storage for seamless local development.`);
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
