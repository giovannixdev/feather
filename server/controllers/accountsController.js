const db = require('../config/pg-config');
const { v4: uuidv4 } = require('uuid');
const account_types_id = require('../constants/account_types_id');

const accountsController = {};

accountsController.createAccount = (req, res, next) => {
  const account_id = uuidv4();

  const { type, description, balance, rate } = req.body;

  // const {
  //   transaction_date,
  //   frequency, //one-time one transaction or
  //   amount,
  //   transaction_description,
  //   category,
  //   transaction_type,
  // } = req.body;

  const openingTransaction = {
    transaction_date: '2021-01-01',
    frequency: 'one-time',
    amount: balance,
    transaction_description: 'opening balance',
    category: null,
    transaction_type: 'income',
  };

  const registering = true;

  const createAccountQueryString = `INSERT INTO "public"."Accounts" VALUES (
    '${account_id}',
    '${res.locals.user._id}',
    '${account_types_id[type]}',
    '${description}',
    '${balance}',
    '${rate}'
  );`;

  db.query(createAccountQueryString)
    .then(results => {
      res.locals.registering = registering;
      res.locals.account_id = account_id;
      res.locals.transaction = openingTransaction;
      return next();
    })
    .catch(err => {
      console.log('Error caught in accountsController.createAccount', err);
      return next({
        error_message: {
          error_message: 'Cannot create account! Check server log for details.',
        },
        error: err,
      });
    });
};

accountsController.getAccountId = (req, res, next) => {
  const {
    account_description, //account associate with transaction LET FRONT END KNOW TO INCLUDE!!!
    account_type,
  } = req.body;

  const getAccountIdQueryString = `
    SELECT _id 
    FROM "public"."Accounts" 
    WHERE account_types_id = '${account_types_id[account_type]}' AND user_id = '${res.locals.user_id}' AND
    description = '${account_description}';`;

  db.query(getAccountIdQueryString)
    .then(results => {
      res.locals.account_id = results.rows[0]._id;
      return next();
    })
    .catch(err => {
      console.log('Error caught in accountsController.getAccountId', err);
      return next({
        error_message: {
          error_message: 'Cannot get account id! Check server log for details.',
        },
        error: err,
      });
    });
};

module.exports = accountsController;
