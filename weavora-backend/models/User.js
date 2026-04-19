const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Personal Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },

  // Account Details
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },

  // Delivery Address
  fullAddress: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },

// Change these two lines:
wishlist: [{ type: String }], // Change from ObjectId to String
bag: [{ type: String }]      // Change from ObjectId to String
}, { timestamps: true });

// Hash password before saving
// Hash password before saving (Modern Async Version)
userSchema.pre('save', async function () {
  // If the password hasn't been modified, just return (no next needed)
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);