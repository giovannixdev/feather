const db = require('../config/pg-config');
const { v4: uuidv4 } = require('uuid');

const transactionsController = {};

transactionsController.postTransaction = (req, res, next) => {
  const {
    transaction_date,
    frequency,
    amount,
    transaction_description,
    category,
    transaction_type,
  } = req.body;

  //call next of condition flag isReoccurring = true,
  //if isReoccuring = true, make sure all the reoccurance_ids === type uuid and are same.

  const createTransactionQueryString = `INSERT INTO "public"."Transactions" VALUES (
    '${uuidv4()}',
    NULL,
    '${transaction_date}',
    '${frequency}',
    '${amount}',
    '${transaction_type}', 
    '${transaction_description}',
    '${category}',
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
    console.log('IN HERE');
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
