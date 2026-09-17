const mongoose = require('mongoose');

const TimelineItemSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const DestinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide destination title'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'Please provide state and location'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['UNESCO Heritage', 'Forts & Palaces', 'Spiritual & Temples', 'Ancient Caves', 'Natural & Scenic'],
    default: 'UNESCO Heritage'
  },
  era: {
    type: String,
    default: 'Ancient / Classical Era'
  },
  image: {
    type: String,
    required: [true, 'Please provide a photo URL']
  },
  shortHistory: {
    type: String,
    required: [true, 'Please provide a short history summary']
  },
  longDescription: {
    type: String,
    required: [true, 'Please provide a detailed long description']
  },
  keyPoints: {
    bestTime: { type: String, default: 'October to March' },
    timings: { type: String, default: 'Sunrise to Sunset' },
    entryFee: { type: String, default: '₹50 (Indians), ₹600 (Foreigners)' },
    highlights: [{ type: String }],
    nearestTransit: { type: String, default: 'Regional Railway & Airport' },
    architecturalStyle: { type: String, default: 'Indian Classical / Regional' }
  },
  timeline: [TimelineItemSchema],
  badge: {
    type: String,
    default: ''
  },
  hiddenHistory: {
    type: String,
    default: ''
  },
  qrCode: {
    type: String,
    default: ''
  },
  nearbyPlaces: [{
    title: { type: String },
    distance: { type: String },
    category: { type: String },
    image: { type: String }
  }],
  coRelatedPlaces: [{
    title: { type: String },
    circuit: { type: String },
    image: { type: String }
  }],
  isTrending: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

// Text index for search
DestinationSchema.index({ title: 'text', state: 'text', shortHistory: 'text', era: 'text' });

module.exports = mongoose.model('Destination', DestinationSchema);
