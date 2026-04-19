const User = require('../models/User');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const sendEmail = require('../utils/sendEmail');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user & Send OTP
// @desc    Register a new user & Send OTP
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("1. Registration request received for:", email);

    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: 'User already exists' });
      } else {
        console.log("2. Unverified user found, updating OTP...");
        const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        user.name = name;
        user.password = password;
        await user.save();

        const message = `Welcome back! Your OTP is: ${otp}`;
        // REMOVE await here to prevent the frontend from hanging
        sendEmail({ email: user.email, subject: 'Weavora - Verification', message })
          .catch(err => console.error("Email Error:", err.message));

        return res.status(200).json({ message: 'OTP resent to your email.' });
      }
    }

    console.log("3. Creating new user in database...");
    const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user = await User.create({ name, email, password, otp, otpExpires });
    console.log("4. User created successfully.");

    const message = `Welcome to Weavora! Your OTP is: ${otp}`;
    
    // REMOVE await here to prevent the frontend from hanging
    sendEmail({ email: user.email, subject: 'Weavora - Account Verification', message })
      .catch(err => console.error("Email Error:", err.message));

    console.log("5. Sending success response to frontend.");
    res.status(201).json({ message: 'User registered. Please check your email.' });

  } catch (error) {
    console.error("REGISTRATION ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};
// @desc    Verify OTP
// FIX 3: Renamed to verifyOtp (lowercase 'tp') to match routes
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// FIX 3: Renamed to loginUser to match routes
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Please verify your email via OTP first' });
      }
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Initiate password reset (Send OTP)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate numeric OTP
    const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send email
    await sendEmail({
      email: user.email,
      subject: 'Weavora - Password Reset OTP',
      message: `Your password reset OTP is: ${otp}. It expires in 10 minutes.`
    });

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify OTP and change password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update password (User model pre-save hook handles hashing)
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};