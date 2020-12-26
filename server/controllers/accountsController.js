const db = require('../config/pg-config');
const { v4: uuidv4 } = require('uuid');
const account_types_id = require('../constants/account_types_id');

const accountsController = {};

accountsController.createAccount = (req, res, next) => {
  const account_id = uuidv4();
  
  const { type, description, balance, rate } = req.body;

  console.log(account_types_id);

  const createAccountQueryString = `INSERT INTO "public"."Accounts" VALUES (
    '${account_id}',
    '${res.locals.user_id}',
    '${account_types_id[type]}',
    '${description}',
    '${balance}',
    '${rate}'
  );`;

  console.log('Creating Account');

  db.query(createAccountQueryString)
    .then(response => {
      console.log(`Response from Creating Account `, response);
      return next();
    })
    .catch(err => {
      console.log('Error from Creating Account', err);
      return next(err);
    });
};

// accountsController.getAccountId = (req, res, next) => {
//   const {
//     user_id, //id of the user logged in. Use id to reference which account id to use
//     accountDescription, //account associate with transaction LET FRONT END KNOW TO INCLUDE!!!
//   } = req.body;

//   // Account_id , query db with userId, accountDescription fo get Account_id
//   // res.locals.account_id = response

//   db.query(
//     `SELECT description, _id FROM "public"."Accounts" WHERE description = ${accountDescription}, user_id = ${user_id}`
//   )
//     .then(results => {
//       console.log(results.rows);
//       console.log('Inside getAccountId');
//       // res.locals.account_id
//       return next();
//     })
//     .catch(err => {
//       console.log(err);
//       return next(err);
//     });
// };

module.exports = accountsController;
