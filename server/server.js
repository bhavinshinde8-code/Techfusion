const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Phoenix Tourism MERN Backend',
    timestamp: new Date().toISOString()
  });
});

// Database Connection Status Route
app.get('/api/db-status', (req, res) => {
  const mongoose = require('mongoose');
  const { getIsConnected } = require('./config/db');
  const stateNames = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const stateId = mongoose.connection.readyState;
  res.json({
    success: true,
    connected: getIsConnected() && stateId === 1,
    status: stateId === 1 ? 'connected' : 'disconnected',
    state: stateNames[stateId] || 'Unknown',
    database: mongoose.connection.name || 'phoenix_tourism',
    host: mongoose.connection.host || '127.0.0.1',
    port: mongoose.connection.port || 27017,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Phoenix Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 API Endpoints available at: http://localhost:${PORT}/api`);
});

module.exports = app;
