const express = require('express');
const userController = require('../controllers/userController');
const accountsController = require('../controllers/accountsController');
const router = express.Router();

router.post('/login', userController.verifyUser, (req, res) => {
  console.log('Verify USER');
  res.status(200).json(`Welcome ${res.locals.first_name}`);
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
