const express = require('express');
const userController = require('../controllers/userController');
const accountsController = require('../controllers/accountsController');
const authController = require('../controllers/authController');

const router = express.Router();

//Authorization header? or cookie? to retrive token

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  return next();
});

router.post(
  //has to be post!? needs to pass form data?
  '/login',
  authController.verifyUser,
  authController.generateToken,
  (req, res) => {
    // res.cookie('token', res.locals.token, { httpOnly: true });
    return res.status(200).json({
      user: res.locals.user,
      auth_token: res.locals.token,
    });
  }
);

router.post(
  '/register',
  userController.createUser,
  accountsController.createAccount,
  authController.generateToken,
  (req, res) => {
    return res.status(200).json({
      user: res.locals.user,
      auth_token: res.locals.token,
    });
  }
);

module.exports = router;
