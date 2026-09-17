const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'phoenix_super_secret_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

// In-memory fallback users
let memoryUsers = [
  { _id: 'usr-1', name: 'Pooja Sharma', email: 'traveler@phoenix.in', password: 'password123', role: 'user', favorites: [] },
  { _id: 'adm-1', name: 'Aditya Rajput', email: 'admin@phoenix-tourism.in', password: 'password123', role: 'admin', favorites: [] }
];

// @desc    Register user or admin
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    let { name, email, password, role, phone } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email or username' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const assignedRole = role === 'admin' ? 'admin' : 'user';
    const cleanName = (name && name.trim()) ? name.trim() : (assignedRole === 'admin' ? 'Admin Portal Host' : 'Traveler Explorer');
    const cleanPassword = password && password.length >= 6 ? password : (password || 'password123');

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(400).json({ 
          success: false, 
          message: `An account with ${cleanEmail} is already registered. Please log in instead.` 
        });
      }

      const user = await User.create({
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
        role: assignedRole,
        phone: phone || ''
      });

      console.log(`👤 [New Signup Saved to MongoDB Atlas] Role: ${user.role} | Name: ${user.name} | Email: ${user.email}`);

      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        message: `${assignedRole === 'admin' ? 'Admin' : 'User'} signed up and saved to database successfully`,
        token,
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email, 
          role: user.role, 
          phone: user.phone,
          favorites: user.favorites,
          createdAt: user.createdAt
        }
      });
    }

    // In-memory fallback if database offline
    const exists = memoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Account is already registered' });
    }

    const newUser = {
      _id: 'usr-' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      role: assignedRole,
      phone: phone || '',
      favorites: [],
      createdAt: new Date().toISOString()
    };
    memoryUsers.push(newUser);
    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone, favorites: newUser.favorites }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (getIsConnected()) {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken(user);
      return res.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, favorites: user.favorites }
      });
    }

    // In-memory fallback
    let user = memoryUsers.find(u => u.email === email);
    if (!user) {
      // Create user on the fly for demo flexibility
      user = {
        _id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        email,
        password,
        role: role || 'user',
        favorites: []
      };
      memoryUsers.push(user);
    }

    const token = generateToken(user);
    return res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, favorites: user.favorites }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users & admins registered in the database
// @route   GET /api/auth/users
// @access  Public / Admin
exports.getAllUsers = async (req, res) => {
  try {
    if (getIsConnected()) {
      const users = await User.find({}).select('-password').sort({ createdAt: -1 });
      return res.json({ success: true, count: users.length, data: users });
    }
    return res.json({ success: true, count: memoryUsers.length, data: memoryUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
