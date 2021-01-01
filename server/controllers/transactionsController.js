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

  const uuid = uuidv4();
  let reoccurance_interval;

  switch (frequency) {
    case 'weekly':
      reoccurance_interval = '7 days';
      break;
    case 'bi-weekly':
      reoccurance_interval = '14 days';
      break;
    case 'monthly': //configure this to day of month
      reoccurance_interval = '1 month';
      break;
    case 'one-time':
      reoccurance_interval = '1 year';
      break;
  }

  //call next of condition flag isReoccurring = true,
  //if isReoccuring = true, make sure all the reoccurance_ids === type uuid and are same.
  // let nullCategory = category ? `${category}` : 'NULL';
  console.log('reoccurance_interval is, ', reoccurance_interval);
  const createTransactionQueryString = `INSERT INTO "public"."Transactions" (
    _id,	
    reoccurance_id,	
    transaction_date,	
    frequency,
    amount,	
    transaction_type_id,	
    description,	
    category_id,	
    account_id
    )
  SELECT 
      uuid_generate_v4(),
      '${uuid}',
      date,
      '${frequency}',
      '${transaction_type === 'expense' ? -1 * amount : amount}',
      '${transaction_type}', 
      '${transaction_description}',
      NULLIF('${category}', 'null'),
      '${res.locals.account_id}'
  FROM generate_series(
             (date '${transaction_date}'),
             (date '2021-12-31'),
             interval '${reoccurance_interval}'
           ) AS date 
  RETURNING *;`;

  // const createTransactionQueryString = `INSERT INTO "public"."Transactions" VALUES
  // (
  //   '${uuidv4()}',
  //   NULL,
  //   '${transaction_date}',
  //   '${frequency}',
  //   '${amount}',
  //   '${transaction_type}',
  //   '${transaction_description}',
  //   NULLIF('${category}', 'null'),
  //   '${res.locals.account_id}'
  // ) RETURNING *;`;

  db.query(createTransactionQueryString)
    .then(results => {
      console.log('Sucessful Post in creating Transaction');
      console.log('results in DB is -> ', results.rows);
      res.locals.transactions = results.rows;
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
  console.log('deleteReoccurances -> ', deleteReoccurances);
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
