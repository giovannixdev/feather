const db = require('../config/pg-config');
const account_types_id = require('../constants/account_types_id');
const { v4: uuidv4 } = require('uuid');

const transactionsController = {};

transactionsController.postTransactions = (req, res, next) => {
  const {
    user_id, //id of the user logged in. Use id to reference which account id to use
    transaction_date, //date of transaction
    frequency, //weekly, one-time
    amount, //amount from form
    transaction_description, // description of transaction
    category, //we'll have to query for the Id
    transaction_type, //expense, income, bill  (we'll query for the id)
    account_description, //account associate with transaction LET FRONT END KNOW TO INCLUDE!!! Chase, BofA, 
    account_type, // account type eg: checking, saving
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
    .then(response => {
      console.log('Sucessful Post in creating Transaction')
      return next();
    })
    .catch(err => {
      console.log('Error caught in transactionsController.postTransactions: ', err);
      return next({
        error_message: { error_message: 'Transaction not posted' },
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
        error_message: {error_message: 'Cannot retreive transaction data!'},
        error: err,
      });
    });
};

module.exports = transactionsController;
