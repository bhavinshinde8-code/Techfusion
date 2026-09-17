const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries } = require('../controllers/inquiryController');
const { protect, authorizeAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createInquiry)
  .get(protect, authorizeAdmin, getInquiries);

module.exports = router;
