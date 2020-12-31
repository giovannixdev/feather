const db = require('../config/pg-config');
const { v4: uuidv4 } = require('uuid');
const transactionsController = {};
transactionsController.postTransaction = (req, res, next) => {
  const {
    transaction_date,
    frequency, //one-time one transaction or
    amount,
    transaction_description,
    category,
    transaction_type,
  } = req.body;
  //******************************** */
  const reoccurringTransaction = []; //[{},{},{}, ... ,{}]    one-time: [{}]
  let dateMultiplier;
  let reoccuranceFrequency;
  let expenseModifier = -1;
  let duration;
  const transactionAmount =
    type === 'expense' || type === 'bill' ? expenseModifier * amount : amount;
  switch (frequency) {
    case 'weekly':
      reoccuranceFrequency = 'weeks';
      duration = 52;
      dateMultiplier = 1;
      break;
    case 'bi-weekly':
      reoccuranceFrequency = 'weeks';
      duration = 26;
      dateMultiplier = 2;
      break;
    case 'monthly': //configure this to day of month
      reoccuranceFrequency = 'months';
      duration = 12;
      dateMultiplier = 1;
      break;
    case 'default':
      break;
  }
  const oneTimeTransaction = {
    userInputDate: now,
    type,
    transactionDate,
    name,
    amount: transactionAmount,
    frequency,
    billId,
  };
  if (frequency === 'one-time') reoccurringTransaction.push(oneTimeTransaction);
  else {
    for (let i = 0; i < duration; i++) {
      reoccurringTransaction.push({
        ...oneTimeTransaction,
        transactionDate: DateTime.fromISO(transactionDate).plus({
          [reoccuranceFrequency]: dateMultiplier * i,
        }), //{'days': 2}
      });
    }
  }
  /*
(
    '${uuidv4()}',
    NULL,
    '${transaction_date}',
    '${frequency}',
    '${amount}',
    '${transaction_type}', 
    '${transaction_description}',
    NULLIF('${category}', 'null'),
    '${res.locals.account_id}'
  )
INSERT INTO "public"."Transactions" (
  _id,	
  reoccurance_id,	
  transaction_date,	
  frequency	amount,	
  transaction_type_id,	
  description,	
  category_id,	
  account_id
  )
SELECT 
    '${uuidv4()}',
    NULL,
    '${transaction_date}',
    '${frequency}',
    '${amount}',
    '${transaction_type}', 
    '${transaction_description}',
    NULLIF('${category}', 'null'),
    '${res.locals.account_id}'

  date::timestamp, 'somestaticstring', i::text
FROM generate_series(100, 150) AS t(i), 
select generate_series(
           (date '${transaction_date}')::timestamp,
           (date '2021-12-31')::timestamp,
           interval '${reinterval}'
         );
*/
  //call next of condition flag isReoccurring = true,
  //if isReoccuring = true, make sure all the reoccurance_ids === type uuid and are same.
  // let nullCategory = category ? `${category}` : 'NULL';
  const createTransactionQueryString = `INSERT INTO "public"."Transactions" VALUES 
  (
    '${uuidv4()}',
    NULL,
    '${transaction_date}',
    '${frequency}',
    '${amount}',
    '${transaction_type}', 
    '${transaction_description}',
    NULLIF('${category}', 'null'),
    '${res.locals.account_id}'
  ) RETURNING *;`;
  db.query(createTransactionQueryString)
    .then(results => {
      console.log('Sucessful Post in creating Transaction');
      res.locals.transactions = results.rows[0];
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
transactionsController.updateTransaction = (req, res, next) => {
  const { transaction_id, label, user_input } = req.body;
  const updateTransactionQueryString = `UPDATE "public"."Transactions" 
  SET ${label} = '${user_input}' WHERE _id = '${transaction_id}' RETURNING reoccurance_id;`;
  db.query(updateTransactionQueryString)
    .then(results => {
      console.log('Sucessfully updated Transaction');
      console.log(
        'reoccurance_id in update is: "',
        results.rows[0].reoccurance_id
      );
      res.locals.reoccurance_id = results.rows[0].reoccurance_id;
      return next();
    })
    .catch(err => {
      console.log(
        'Error caught in transactionsController.updateTransaction: ',
        err
      );
      return next({
        error_message: { error_message: 'Transaction not updated' },
        error: err,
      });
    });
};
transactionsController.updateReoccurances = (req, res, next) => {
  const { reoccurance_id } = res.locals;
  const { updateReoccurances, label, user_input } = req.body;
  if (updateReoccurances === true && reoccurance_id !== null) {
    const updateReoccuranceQueryString = `UPDATE "public"."Transactions" 
    SET ${label} = '${user_input}' WHERE reoccurance_id = '${reoccurance_id}';`;
    db.query(updateReoccuranceQueryString)
      .then(results => {
        console.log('Sucessfully updated reoccurances');
        return next();
      })
      .catch(err => {
        console.log(
          'Error caught in transactionsController.updateReoccurances: ',
          err
        );
        return next({
          error_message: { error_message: 'Reoccurances not updated' },
          error: err,
        });
      });
  } else {
    return next();
  }
};
transactionsController.deleteTransaction = (req, res, next) => {
  const { transaction_id } = req.body;
  const deleteTransactionQueryString = `DELETE FROM "public"."Transactions" WHERE _id = '${transaction_id}' RETURNING reoccurance_id;`;
  db.query(deleteTransactionQueryString)
    .then(results => {
      console.log('Sucessfully deleted Transaction');
      res.locals.transaction_id = transaction_id;
      res.locals.reoccurance_id = results.rows[0].reoccurance_id;
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
transactionsController.deleteReoccurances = (req, res, next) => {
  const { reoccurance_id } = res.locals;
  const { deleteReoccurances } = req.body;
  if (deleteReoccurances === true && reoccurance_id !== null) {
    const deleteReoccuranceQueryString = `DELETE FROM "public"."Transactions" WHERE reoccurance_id = '${reoccurance_id}';`;
    db.query(deleteReoccuranceQueryString)
      .then(results => {
        console.log('Sucessfully deleted reoccurances');
        res.locals.reoccurance_id = reoccurance_id;
        return next();
      })
      .catch(err => {
        console.log(
          'Error caught in transactionsController.deleteReoccurances: ',
          err
        );
        return next({
          error_message: { error_message: 'Reoccurances not deleted' },
          error: err,
        });
      });
  } else {
    return next();
  }
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
module.exports = transactionsController;
