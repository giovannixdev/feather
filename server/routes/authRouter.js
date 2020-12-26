const express = require('express');
const userController = require('../controllers/userController');
const accountsController = require('../controllers/accountsController');
const authenticationController = require('../controllers/authenticationController');

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
  authenticationController.verifyUser,
  authenticationController.generateToken,
  (req, res) => {
    // res.cookie('token', res.locals.token, { httpOnly: true });
    return res.status(200).json({
      message: res.locals.message,
      accessToken: res.locals.token,
    });
  }
);

router.post(
  '/register',
  //split these for potential errors or! promise.all situation.
  userController.createUser,
  accountsController.createAccount,
  authenticationController.generateToken,
  (req, res) => {
    // res.cookie('token', res.locals.token, { httpOnly: true });
    return res.status(200).json({
      // message: 'Account created successfully!',
      accessToken: res.locals.token,
    });
  }
);

module.exports = router;
