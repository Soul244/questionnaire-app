const jwt = require('jsonwebtoken');
const { jwtKey } = require('../../config');

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, jwtKey, null);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'giriş geçersiz',
    });
  }
};
