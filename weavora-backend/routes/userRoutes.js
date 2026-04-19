const express = require('express');
const router = express.Router();
const { getUserProfile, toggleWishlist, addToBag } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import the middleware

// All routes here require the user to be logged in (protected)
router.get('/profile', protect, getUserProfile);
router.post('/wishlist', protect, toggleWishlist);
router.post('/bag', protect, addToBag);

module.exports = router;