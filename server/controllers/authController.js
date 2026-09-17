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

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (getIsConnected()) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'Email is already registered' });
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role || 'user'
      });

      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, favorites: user.favorites }
      });
    }

    // In-memory fallback
    const exists = memoryUsers.find(u => u.email === email);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const newUser = {
      _id: 'usr-' + Date.now(),
      name,
      email,
      password,
      role: role || 'user',
      favorites: []
    };
    memoryUsers.push(newUser);
    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, favorites: newUser.favorites }
    });
  } catch (error) {
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
