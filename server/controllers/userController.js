const db = require('../config/pg-config');

const userController = {};

userController.createUser = (req, res, next) => {
  // lower case user name before saving to database

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
    uuid_generate_v4(),
    '${first_name}',
    '${last_name}',
    '${birth_date}',
    '${email}',
    '${user_name}',
    '${password}' 
  ) RETURNING *;`;

  db.query(createUserQueryString)
    .then(response => {
      const { _id, first_name, user_name } = response.rows[0];
      res.locals.user = { _id, first_name, user_name };
      return next();
    })
    .catch(err => {
      console.log('Error caught in userController.createUser: ', err);

      if (err.constraint === 'users_user_name_unique') {
        return next({
          error_message: { error_message: 'Username already exists' },
          error: err,
        });
      } else if (err.constraint === 'users_email_unique') {
        return next({
          error_message: { error_message: 'Email already exists' },
          error: err,
        });
      } else {
        return next({
          error_message: {
            error_message: 'Creating account unsuccessful. See server logs',
          },
          error: err,
        });
      }
    });
};

module.exports = userController;
