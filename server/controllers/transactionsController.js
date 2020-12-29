const db = require('../config/pg-config');
const { v4: uuidv4 } = require('uuid');

const transactionsController = {};

transactionsController.postTransaction = (req, res, next) => {
  const {
    transaction_date, //date of transaction
    frequency, //weekly, one-time
    amount, //amount from form
    transaction_description, // description of transaction
    category, //we'll have to query for the Id
    transaction_type, //expense, income, bill  (we'll query for the id)
  } = req.body;

  //category_id is res.locals.category_id

  //account_id is res.locals.account_id
  //Transaction_Types_id, account_types_id[transactionType] SYNTAX?

  // _id created by us with DEFAULT
  // created_date gereated now with new Date()
  const createTransactionQueryString = `INSERT INTO "public"."Transactions" VALUES (
    '${uuidv4()}',
    '${transaction_date}',
    '${frequency}',
    '${amount}',
    '${transaction_type}', 
    '${transaction_description}',
    '${category}',
    '${res.locals.account_id}'
  );`;

  db.query(createTransactionQueryString)
    .then(results => {
      console.log('Sucessful Post in creating Transaction');
      return next();
    })
    .catch(err => {
      console.log(
        'Error caught in transactionsController.postTransactions: ',
        err
      );
      return next({
        error_message: { error_message: 'Transaction not posted' },
        error: err,
      });
    });
};

transactionsController.deleteTransaction = (req, res, next) => {
  const { transaction_id } = req.body;

  const deleteTransactionQueryString = `DELETE FROM "public"."Transactions" WHERE _id = '${transaction_id}' RETURNING *;`;

  db.query(deleteTransactionQueryString)
    .then(results => {
      console.log('Sucessfully deleted Transaction');
      res.locals.deletedTransaction = results.rows;
      return next();
    })
    .catch(err => {
      console.log(
        'Error caught in transactionsController.deleteTransaction: ',
        err
      );
      return next({
        error_message: { error_message: 'Transaction not deleted' },
        error: err,
      });
    });
};

transactionsController.getAllTransactions = (req, res, next) => {
  const { account_id } = res.locals;

  const getAllTransactionsQueryString = `
    SELECT * FROM "public"."Transactions" 
    WHERE account_id = '${account_id}';`;

  db.query(getAllTransactionsQueryString)
    .then(results => {
      res.locals.transactions = results.rows;
      return next();
    })
    .catch(err => {
      console.log(
        'Error caught in transactionsController.getAllTransactions: ',
        err
      );

      return next({
        error_message: { error_message: 'Cannot retreive transaction data!' },
        error: err,
      });
    });
};

transactionsController.deleteAllTransactions = (req, res, next) => {
  const deleteAllTransactionsQueryString = `DELETE FROM "public"."Transactions" WHERE account_id = '${res.locals.account_id}';`;

  db.query(deleteAllTransactionsQueryString)
    .then(results => {
      console.log('Sucessfully deleted all transactions');
      return next();
    })
    .catch(err => {
      console.log(
        'Error caught in transactionsController.deleteAllTransactions: ',
        err
      );

      return next({
        error_message: { error_message: 'Error deleting transactions!' },
        error: err,
      });
    });
};

module.exports = transactionsController;
