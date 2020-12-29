const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const categoryController = require('../controllers/categoryController');
const accountsController = require('../controllers/accountsController');
const authController = require('../controllers/authController');
const router = express.Router();

//post

router.post(
  '/post',
  // authController.verifyToken,
  accountsController.getAccountId,
  transactionsController.postTransaction,

  (req, res) => {
    res.status(200).json({ message: 'Succesfully Posted Transaction' });
  }
);

router.delete(
  '/delete',
  // authController.verifyToken,
  transactionsController.deleteTransaction,

  (req, res) => {
    res.status(200).json({
      message: 'Succesfully deleted Transaction',
      deletedTrensaction: res.locals.deletedTransaction,
    });
  }
);

router.delete(
  '/deleteAll',
  // authController.verifyToken,
  accountsController.getAccountId,
  transactionsController.deleteAllTransactions,

  (req, res) => {
    res.status(200).json({
      message: 'Sucessfully deleted all transactions',
    });
  }
);

router.post(
  '/getAll',
  // authController.verifyToken,
  accountsController.getAccountId,
  transactionsController.getAllTransactions,

  (req, res) => {
    res.status(200).json(res.locals.transactions);
  }
);

module.exports = router;
