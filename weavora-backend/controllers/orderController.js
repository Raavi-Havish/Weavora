const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Create new order
// @route   POST /api/orders
exports.addOrderItems = async (req, res) => {
  const { orderItems, deliveryLocation, totalPrice } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Create the order in the database
    const order = new Order({
      user: req.user._id,
      orderItems,
      deliveryLocation, // This captures the direct location mapping you wanted
      totalPrice
    });

    const createdOrder = await order.save();

    // Optional: Clear the user's bag after successful order placement
    await User.findByIdAndUpdate(req.user._id, { $set: { bag: [] } });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};