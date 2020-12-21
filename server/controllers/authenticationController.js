const db = require('../config/pg-config');
const config = require('../config/auth-config');
const jwt = require('jsonwebtoken');
//bcrypt

const authenticationController = {};

authenticationController.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    return next();
  });
};

authenticationController.generateToken = (req, res, next) => {
  let token = jwt.sign({ id: res.locals.user_id }, config.secret, {
    expiresIn: 600, // 10 minutes
  });

  res.locals.token = token;
  return next();
};

module.exports = authenticationController;
