const User = require('../models/User');

// @desc    Get logged in user profile
// @route   GET /api/users/profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist').populate('bag');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle item in wishlist
// @route   POST /api/users/wishlist
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    // Check if item is already in wishlist
    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
      user.wishlist.splice(index, 1); // Remove it
    } else {
      user.wishlist.push(productId);  // Add it
    }

    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to bag
// @route   POST /api/users/bag
exports.addToBag = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    
    // Simple push to bag (You can enhance this later to track quantities/sizes)
    user.bag.push(productId);
    await user.save();
    
    res.json(user.bag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};