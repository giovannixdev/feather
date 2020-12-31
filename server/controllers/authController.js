const db = require('../config/pg-config');
const jwt = require('jsonwebtoken');

const authController = {};

authController.verifyUser = (req, res, next) => {
  let { user_name, password } = req.body;

  // maybe split into separate query's
  db.query(
    `SELECT _id, first_name, user_name, password FROM "public"."Users" WHERE user_name = '${user_name}'`
  )
    .then(results => {
      // run bcrypt compare
      if (!results.rows.length) {
        return next({
          error_message: {
            error_message: 'Login unsuccessful. Please try again!',
          },
        });
      }

      if (
        results.rows[0].user_name === user_name &&
        results.rows[0].password === password
      ) {
        res.locals.message = 'Verification Successful';
        res.locals.user = results.rows[0];
        return next();
      } else {
        // res.locals.error = { error: 'login unsuccessful. Please try again!' };
        return next({
          error_message: {
            error_message: 'Incorrect Credentials. Please try again!',
          },
        });
      }
    })
    .catch(err => {
      console.log('Error caught in userController.verifyUser: ', err);
      return next({
        error_message: {
          error_message: 'Cannot verify user! Check server log for details.',
        },
        error: err,
      });
    });
};

authController.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      error_message: { error_message: 'No token provided!' },
    });
  }
  console.log('token in verifyToken ->', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error_message: { error_message: 'Unauthorized!' },
      });
    }
    console.log('decoded.id in jwt.verify is: ', decoded.id);
    res.locals.user_id = decoded.id;
    return next();
  });
};

authController.generateToken = (req, res, next) => {
  let token = jwt.sign({ id: res.locals.user._id }, process.env.JWT_SECRET, {
    expiresIn: 600, // 10 minutes
  });

  res.locals.token = token;
  return next();
};

module.exports = authController;
