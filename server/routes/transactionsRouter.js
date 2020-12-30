const express = require('express');
const transactionsController = require('../controllers/transactionsController');
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

router.post(
  '/getAll',
  // authController.verifyToken,
  accountsController.getAccountId,
  transactionsController.getAllTransactions,

  (req, res) => {
    res.status(200).json(res.locals.transactions);
  }
);

router.delete(
  '/delete',
  // authController.verifyToken,
  transactionsController.deleteTransaction,
  transactionsController.deleteReoccurances,

  (req, res) => {
    let message = 'Succesfully deleted Transaction';

    if (req.body.deleteReoccurances) {
      message += 's';
    }

    res.status(200).json({
      message,
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

router.put(
  '/update',
  // authController.verifyToken,
  transactionsController.updateTransaction,
  transactionsController.updateReoccurances,

  (req, res) => {
    let message = 'Succesfully updated Transaction';
    if (req.body.updateReoccurances) {
      message += 's';
    }

    res.status(200).json({
      message,
    });
  }
);

module.exports = router;
