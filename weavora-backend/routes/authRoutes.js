const express = require('express');
const router = express.Router();
// These names MUST match your exports.funcName exactly
const { 
  registerUser, 
  verifyOtp,   // Matches lowercase "tp" in your fix
  loginUser,   // Matches your renamed login function
  forgotPassword, 
  resetPassword 
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;