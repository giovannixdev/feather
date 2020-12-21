const express = require('express');
const userController = require('../controllers/userController');
const accountsController = require('../controllers/accountsController');
const authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  return next();
});

router.get(
  '/login',
  userController.verifyUser,
  authenticationController.generateToken,
  (req, res) => {
  console.log('Verify USER');
    res.status(200).json({
      first_name: res.locals.first_name,
      accessToken: res.locals.token,
    });
});

router.post(
  '/register',
  userController.createUser,
  accountsController.createAccount,
  (req, res) => {
    console.log('IN TEST CREATE USER');
    res.status(200).json('Account created successfully');
  }
);

module.exports = router;
