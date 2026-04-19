const express = require('express');
const router = express.Router();
const { registerUser, verifyOtp, loginUser, forgotPassword, resetPassword } = require('../controllers/authController');
router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword); // NEW
router.post('/reset-password', resetPassword);   // NEW

module.exports = router;