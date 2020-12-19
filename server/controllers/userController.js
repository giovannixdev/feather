const db = require('../pgConnect');

//DATETIME for ISO conversion for transactions.
//SQL DATE Format: YYYY-MM-DD

const userController = {};

userController.createUser = (req, res, next) => {
  const createUserQueryString = 
  `INSERT INTO "public"."Users" VALUES (
    0,
    'Geo' ,
    'Alarcon' ,
    '1992-12-24',
    'test@test.com' ,
    'Geo' ,
    'test',
    '2020-12-19' ,
    0
  );`;

  db.query(createUserQueryString).then(response => {
    res.locals.user = response;
    next();
  });

};




module.exports = userController;