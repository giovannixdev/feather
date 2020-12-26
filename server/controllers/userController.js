const db = require('../config/pg-config');
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

  db.query(createUserQueryString)
    .then(response => {
      return next();
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = userController;
