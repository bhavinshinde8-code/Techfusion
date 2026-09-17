const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');
const { protect, authorizeAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getDestinations)
  .post(protect, authorizeAdmin, createDestination);

router.route('/:id')
  .get(getDestinationById)
  .put(protect, authorizeAdmin, updateDestination)
  .delete(protect, authorizeAdmin, deleteDestination);

module.exports = router;
