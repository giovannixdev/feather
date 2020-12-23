const db = require('../pgConnect');
const axios = require('axios');

//DATETIME for ISO conversion for transactions.
//SQL DATE Format: YYYY-MM-DD

const userController = {};

userController.createAccount = (req, res, next) => {
  const createAccountQueryString = `INSERT INTO "public"."Accounts" VALUES (
    DEFAULT,
    '${req.body.type}',
    '${req.body.description}',
    '${req.body.balance}',
    0
  ) RETURNING _id;`;

  console.log('Creating Account');

  db.query(createAccountQueryString)
    .then(response => {
      console.log(`Response from Creating Account `, response);
      res.locals.account_id = response.rows[0]._id;
      return next();
    })
    .catch(err => {
      console.log('Error from Creating Account', err);
      return next(err);
    });
};

userController.createUser = (req, res, next) => {
  // lower case user name before saving to database

  // bycrpt password before saving
  const createUserQueryString = `INSERT INTO "public"."Users" VALUES (
    DEFAULT,
    '${req.body.first_name}',
    '${req.body.last_name}',
    '${req.body.birth_date}',
    '${req.body.email}',
    '${req.body.user_name}',
    '${req.body.password}', 
    '${new Date().toISOString().slice(0, 9)}',
    '${res.locals.account_id}'
  );`;

  db.query(createUserQueryString)
    .then(response => {
      return next();
    })
    .catch(err => {
      console.log('Error from Creating User', err);
      return next(err);
    });
};

userController.verifyUser = (req, res, next) => {
  // query data base
  let { user_name, password } = req.body;

  // user_name = 'UserName';
  // password = 'password';

  db.query(
    `SELECT first_name, user_name, password FROM "public"."Users" WHERE user_name = '${user_name}'`
  )
    .then(results => {
      // console.log('results.rows ->', results.rows);
      // run bcrypt compare
      // Error handling for incorrect username/password
      if (
        results.rows[0].user_name === user_name &&
        results.rows[0].password === password
      ) {
        // console.log('Inside if');
        res.locals.first_name = results.rows[0].first_name;
        return next();
      } else {
        // console.log('Inside else');
        return next(Error('username or password does not match'));
      }
    })
    .catch(err => {
      console.log('Error from userController.verifyUser -> ', err);
      return next(err);
    });
  // get request body => will have user name and pw
};

module.exports = userController;
