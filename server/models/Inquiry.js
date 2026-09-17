const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true
  },
  interest: {
    type: String,
    default: 'General Tourism Inquiry'
  },
  message: {
    type: String,
    required: [true, 'Please provide message'],
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'in-review', 'resolved'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
