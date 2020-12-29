const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const categoryController = require('../controllers/categoryController');
const accountsController = require('../controllers/accountsController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/getAll',
  // authController.verifyToken,
  categoryController.getAllCategories,

  (req, res) => {
    res.status(200).json(res.locals.categories);
  }
);

module.exports = router;
