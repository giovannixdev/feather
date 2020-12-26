const db = require('../config/pg-config');
const account_types_id = require('../constants/account_types_id');

const transactionsController = {};

transactionsController.postTransactions = (req, res, next) => {
  const {
    user_id, //id of the user logged in. Use id to reference which account id to use
    transaction_date, //date of transaction
    amount, //amount from form
    frequency, //weekly, one-time
    category, //we'll have to query for the Id
    transactionType, //expense, income, bill  (we'll query for the id)
    accountDescription, //account associate with transaction LET FRONT END KNOW TO INCLUDE!!!
  } = req.body;

  //category_id is res.locals.category_id
  //account_id is res.locals.account_id
  //Transaction_Types_id, account_types_id[transactionType] SYNTAX?

  // _id created by us with DEFAULT
  // created_date gereated now with new Date()
};

module.exports = transactionsController;
