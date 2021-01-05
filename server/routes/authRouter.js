const express = require('express');
const userController = require('../controllers/userController');
const accountsController = require('../controllers/accountsController');
const authController = require('../controllers/authController');
const transactionsController = require('../controllers/transactionsController');
const router = express.Router();

//Authorization header? or cookie? to retrive token

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Authorization, Origin, Content-Type, Accept'
  );
  return next();
});

router.post(
  //has to be post!? needs to pass form data?
  '/login',
  authController.verifyUser,
  // accountsController.getAccountId,
  authController.generateToken,
  (req, res) => {
    // res.cookie('token', res.locals.token, { httpOnly: true });
    const { first_name, user_name } = res.locals.user;

    return res.status(200).json({
      user: { first_name, user_name },
      token: res.locals.token,
    });
  }
);

router.post(
  '/register',
  userController.createUser,
  accountsController.createAccount,
  authController.generateToken,
  transactionsController.postTransaction,
  (req, res) => {
    return res.status(200).json({
      user: res.locals.user,
      token: res.locals.token,
    });
  }
);

module.exports = router;
