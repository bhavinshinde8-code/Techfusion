const express = require('express');
const router = express.Router();
const { register, login, getMe, getAllUsers, getAdmins } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/users', getAllUsers);
router.get('/admins', getAdmins);

module.exports = router;
