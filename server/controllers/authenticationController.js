const db = require('../config/pg-config');
const jwt = require('jsonwebtoken');

const authenticationController = {};

authenticationController.verifyUser = (req, res, next) => {
  let { user_name, password } = req.body;

  // maybe split into separate query's
  db.query(
    `SELECT _id, first_name, user_name, password FROM "public"."Users" WHERE user_name = '${user_name}'`
  )
    .then(results => {
      // run bcrypt compare
      if (!results.rows.length) {
        return next({ message: 'login unsuccessful. Please try again!' });
      }

      if (
        results.rows[0].user_name === user_name &&
        results.rows[0].password === password
      ) {
        res.locals.message = 'Verification Successful';
        res.locals.user_id = results.rows[0]._id;
        return next();
      } else {
        return next({
          message: 'login unsuccessful. Please try again!',
        });
      }
    })
    .catch(err => {
      console.log('Error from userController.verifyUser -> ', err);
      return next(err);
    });
};

authenticationController.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    console.log('decoded.id in jwt.verify is: ', decoded.id);
    req.userId = decoded.id;
    return next();
  });
};

authenticationController.generateToken = (req, res, next) => {
  let token = jwt.sign({ id: res.locals.user_id }, process.env.JWT_SECRET, {
    expiresIn: 600, // 10 minutes
  });

  res.locals.token = token;
  return next();
};

module.exports = authenticationController;
