const Destination = require('../models/Destination');
const { getIsConnected } = require('../config/db');
const { SEED_DESTINATIONS } = require('../seed/seedData');

// In-memory fallback dataset
let memoryDestinations = [...SEED_DESTINATIONS.map((d, i) => ({ _id: 'mem-' + (i + 1), ...d }))];

// @desc    Get all destinations with search & category filter
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res) => {
  try {
    const { search, category } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { state: { $regex: search, $options: 'i' } },
          { shortHistory: { $regex: search, $options: 'i' } },
          { era: { $regex: search, $options: 'i' } }
        ];
      }
      const destinations = await Destination.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: destinations.length, data: destinations });
    }

    // In-Memory Fallback
    let results = [...memoryDestinations];
    if (category && category !== 'All') {
      results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(d => 
        d.title.toLowerCase().includes(q) || 
        d.state.toLowerCase().includes(q) ||
        (d.shortHistory && d.shortHistory.toLowerCase().includes(q))
      );
    }
    return res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single destination by ID
// @route   GET /api/destinations/:id
// @access  Public
exports.getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const destination = await Destination.findById(id);
      if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
      return res.json({ success: true, data: destination });
    }

    const item = memoryDestinations.find(d => d._id === id || d.id === id);
    if (!item) return res.status(404).json({ success: false, message: 'Destination not found' });
    return res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private (Admin)
exports.createDestination = async (req, res) => {
  try {
    if (getIsConnected()) {
      const destination = await Destination.create(req.body);
      return res.status(201).json({ success: true, data: destination });
    }

    const newDest = { _id: 'mem-' + Date.now(), createdAt: new Date(), ...req.body };
    memoryDestinations.unshift(newDest);
    return res.status(201).json({ success: true, data: newDest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private (Admin)
exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const updated = await Destination.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Destination not found' });
      return res.json({ success: true, data: updated });
    }

    const index = memoryDestinations.findIndex(d => d._id === id || d.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Destination not found' });
    memoryDestinations[index] = { ...memoryDestinations[index], ...req.body };
    return res.json({ success: true, data: memoryDestinations[index] });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private (Admin)
exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const deleted = await Destination.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Destination not found' });
      return res.json({ success: true, message: 'Destination deleted successfully' });
    }

    memoryDestinations = memoryDestinations.filter(d => d._id !== id && d.id !== id);
    return res.json({ success: true, message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
