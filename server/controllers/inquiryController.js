const Inquiry = require('../models/Inquiry');
const { getIsConnected } = require('../config/db');

let memoryInquiries = [
  {
    _id: 'inq-1',
    name: 'Devendra Verma',
    email: 'devendra@travels.in',
    interest: 'Heritage Walk Itinerary',
    message: 'Looking for a 3-day guided heritage tour across the Amber and Mehrangarh royal forts in Rajasthan.',
    createdAt: new Date('2026-09-15')
  },
  {
    _id: 'inq-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@wanderlust.com',
    interest: 'Historical Timeline Research',
    message: 'Can you provide more academic documentation on the architectural timeline of the Hampi Stone Chariot?',
    createdAt: new Date('2026-09-16')
  }
];

// @desc    Submit new inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, interest, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    if (getIsConnected()) {
      const inquiry = await Inquiry.create({ name, email, interest, message });
      return res.status(201).json({ success: true, data: inquiry });
    }

    const newInq = { _id: 'inq-' + Date.now(), name, email, interest, message, createdAt: new Date() };
    memoryInquiries.unshift(newInq);
    return res.status(201).json({ success: true, data: newInq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private (Admin)
exports.getInquiries = async (req, res) => {
  try {
    if (getIsConnected()) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }
    return res.json({ success: true, count: memoryInquiries.length, data: memoryInquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
