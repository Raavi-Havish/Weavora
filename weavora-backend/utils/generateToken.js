const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Signs a token with the user's ID, using your secret key from the .env file
  // The token will automatically expire in 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;