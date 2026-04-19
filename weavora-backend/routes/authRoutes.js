const express = require('express');
const router = express.Router();
const { registerUser, verifyOTP, authUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', authUser);

module.exports = router;    