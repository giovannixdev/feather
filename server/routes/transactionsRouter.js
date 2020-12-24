const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const categoryController = require('../controllers/categoryController');
const accountsController = require('../controllers/accountsController');
const router = express.Router();

//post

router.post(
  '/postTransactions',
  // categoryController.getCategoryId,
  // accountsController.getAccountId,
  transactionsController.postTransactions,

  (req, res) => {
    res.status(200).json(req.body);
  }
);

module.exports = router;
