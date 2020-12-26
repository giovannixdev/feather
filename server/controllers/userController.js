const db = require('../pgConnect');
const { v4: uuidv4 } = require('uuid');

const userController = {};

userController.createUser = (req, res, next) => {
  // lower case user name before saving to database

  const user_id = uuidv4();
  const {
    first_name,
    last_name,
    birth_date,
    email,
    user_name,
    password,
  } = req.body;
  // bycrpt password before saving

  const createUserQueryString = `INSERT INTO "public"."Users" VALUES (
    '${user_id}',
    '${first_name}',
    '${last_name}',
    '${birth_date}',
    '${email}',
    '${user_name}',
    '${password}' 
  );`;

  console.log('Creating User');

  db.query(createUserQueryString)
    .then(response => {
      res.locals.user_id = user_id;
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
      // run bcrypt compare
      // Error handling for incorrect username/password
      if (!results.rows.length) {
        console.log('username is wrong');
        res.locals.data = { error: 'Incorrect credentials' };
        return next();
      }
      if (results.rows[0].password === password) {
        console.log('correct username and password');
        res.locals.data = { user: results.rows[0] };
        return next();
      } else {
        console.log('incorrect password');
        res.locals.data = { error: 'Incorrect credentials' };
        // return next(Error('username or password does not match'))
        return next();
      }
    })
    .catch(err => {
      console.log('THIS IS THE CATCH');
      console.log('Error from userController.verifyUser -> ', err);
      return next(err);
    });
};

module.exports = userController;
