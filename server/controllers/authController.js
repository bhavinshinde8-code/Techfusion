const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { getIsConnected } = require('../config/db');

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, name: user.name, email: user.email, role: user.role || 'user' },
    process.env.JWT_SECRET || 'phoenix_super_secret_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

// In-memory fallback users
let memoryUsers = [
  { _id: 'usr-1', name: 'Pooja Sharma', email: 'traveler@phoenix.in', password: 'password123', role: 'user', favorites: [] },
  { _id: 'adm-1', name: 'Aditya Rajput', email: 'admin@phoenix-tourism.in', password: 'password123', role: 'admin', favorites: [] }
];

// @desc    Register user or admin (Admins saved to dedicated 'admins' collection, Users to 'users')
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    let { name, email, password, role, phone, department, adminLevel } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email or username' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const assignedRole = role === 'admin' ? 'admin' : 'user';
    const cleanName = (name && name.trim()) ? name.trim() : (assignedRole === 'admin' ? 'Admin Portal Host' : 'Traveler Explorer');
    const cleanPassword = password && password.length >= 6 ? password : (password || 'password123');

    if (getIsConnected()) {
      if (assignedRole === 'admin') {
        // Check if admin already exists in dedicated 'admins' collection
        const adminExists = await Admin.findOne({ email: cleanEmail });
        if (adminExists) {
          return res.status(400).json({ 
            success: false, 
            message: `Admin account with ${cleanEmail} is already registered in the admins database. Please log in.` 
          });
        }

        const adminDoc = await Admin.create({
          name: cleanName,
          email: cleanEmail,
          password: cleanPassword,
          role: 'admin',
          phone: phone || '',
          adminLevel: adminLevel || 'SuperAdmin',
          department: department || 'Tourism & Heritage Operations'
        });

        console.log(`🛡️ [Admin Saved to Dedicated 'admins' Collection in MongoDB Atlas] Name: ${adminDoc.name} | Email: ${adminDoc.email}`);

        const token = generateToken(adminDoc);
        return res.status(201).json({
          success: true,
          message: `Admin information saved to dedicated 'admins' collection in Techfusion database`,
          documentCollection: 'admins',
          token,
          user: { 
            id: adminDoc._id, 
            name: adminDoc.name, 
            email: adminDoc.email, 
            role: 'admin', 
            phone: adminDoc.phone,
            adminLevel: adminDoc.adminLevel,
            department: adminDoc.department,
            createdAt: adminDoc.createdAt
          }
        });
      } else {
        // Traveler Explorer: Save to dedicated 'users' collection
        const userExists = await User.findOne({ email: cleanEmail });
        if (userExists) {
          return res.status(400).json({ 
            success: false, 
            message: `Traveler account with ${cleanEmail} is already registered. Please log in.` 
          });
        }

        const userDoc = await User.create({
          name: cleanName,
          email: cleanEmail,
          password: cleanPassword,
          role: 'user',
          phone: phone || ''
        });

        console.log(`👤 [User Saved to 'users' Collection in MongoDB Atlas] Name: ${userDoc.name} | Email: ${userDoc.email}`);

        const token = generateToken(userDoc);
        return res.status(201).json({
          success: true,
          message: `User information saved to 'users' collection in Techfusion database`,
          documentCollection: 'users',
          token,
          user: { 
            id: userDoc._id, 
            name: userDoc.name, 
            email: userDoc.email, 
            role: 'user', 
            phone: userDoc.phone,
            favorites: userDoc.favorites,
            createdAt: userDoc.createdAt
          }
        });
      }
    }

    // In-memory fallback if database offline
    const exists = memoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return res.status(400).json({ success: false, message: 'Account is already registered' });
    }

    const newUser = {
      _id: (assignedRole === 'admin' ? 'adm-' : 'usr-') + Date.now(),
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

// @desc    Login user or admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (getIsConnected()) {
      let account = null;
      let isAdminAccount = false;

      if (role === 'admin') {
        // Look up in dedicated Admin collection
        account = await Admin.findOne({ email: cleanEmail }).select('+password');
        if (account) {
          isAdminAccount = true;
        } else {
          // Fallback to User collection if admin was saved there previously
          account = await User.findOne({ email: cleanEmail, role: 'admin' }).select('+password');
          if (account) isAdminAccount = true;
        }

        if (!account) {
          return res.status(401).json({ 
            success: false, 
            message: `Access Denied: No Admin account found for "${cleanEmail}" in the database. Only registered administrators can log in to the Admin Portal.` 
          });
        }
      } else {
        // Look up in User collection
        account = await User.findOne({ email: cleanEmail }).select('+password');
        if (!account) {
          // Check Admin collection in case an admin logs in via traveler portal
          account = await Admin.findOne({ email: cleanEmail }).select('+password');
          if (account) isAdminAccount = true;
        }

        if (!account) {
          return res.status(401).json({ 
            success: false, 
            message: `Access Denied: No registered account found for "${cleanEmail}" in the database. Please Sign Up first to create your account.` 
          });
        }
      }

      // Verify password with bcrypt
      const isMatch = await account.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ 
          success: false, 
          message: 'Incorrect password. The password you entered does not match this database account.' 
        });
      }

      console.log(`🔑 [Successful Database Login] ${account.name} (${account.email}) | Role: ${isAdminAccount ? 'admin' : (account.role || 'user')}`);

      const token = generateToken(account);
      return res.json({
        success: true,
        message: 'Logged in successfully from database',
        token,
        user: { 
          id: account._id, 
          name: account.name, 
          email: account.email, 
          role: isAdminAccount ? 'admin' : (account.role || 'user'),
          phone: account.phone || '',
          adminLevel: account.adminLevel || (isAdminAccount ? 'SuperAdmin' : undefined),
          department: account.department,
          favorites: account.favorites || []
        }
      });
    }

    // In-memory fallback (only allowed for predefined accounts)
    let user = memoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: `No account found for "${cleanEmail}" in the database. Please Sign Up first.` 
      });
    }

    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password.' 
      });
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

// @desc    Get dedicated admins list from 'admins' collection
// @route   GET /api/auth/admins
// @access  Public / Admin
exports.getAdmins = async (req, res) => {
  try {
    if (getIsConnected()) {
      const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 });
      return res.json({ success: true, count: admins.length, data: admins });
    }
    const filtered = memoryUsers.filter(u => u.role === 'admin');
    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users & dedicated admins registered in the database
// @route   GET /api/auth/users
// @access  Public / Admin
exports.getAllUsers = async (req, res) => {
  try {
    if (getIsConnected()) {
      const users = await User.find({}).select('-password').sort({ createdAt: -1 }).lean();
      const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 }).lean();

      const formattedAdmins = admins.map(a => ({
        ...a,
        role: 'admin',
        documentCollection: 'admins',
        documentType: 'Admin Document (Techfusion.admins)'
      }));

      const formattedUsers = users.map(u => ({
        ...u,
        documentCollection: 'users',
        documentType: 'User Document (Techfusion.users)'
      }));

      const allAccounts = [...formattedAdmins, ...formattedUsers];
      return res.json({ 
        success: true, 
        count: allAccounts.length,
        adminsCount: admins.length,
        usersCount: users.length,
        data: allAccounts 
      });
    }
    return res.json({ success: true, count: memoryUsers.length, data: memoryUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
