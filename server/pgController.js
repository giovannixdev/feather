const db = require('./pgModel');

//DATETIME for ISO conversion for transactions.
//SQL DATE Format: YYYY-MM-DD

const pgController = {};

pgController.createUser = (req, res, next) => {
  const createUserQueryString = 
  `INSERT INTO users VALUES (
  1, 
  'Logan', 
  'Thies',
  '1988-10-13',
  'logan.thies@icloud.com', 
  'test'
  );`;

  db.query(createUserQueryString).then(response => {
    res.locals.user = response;
    next();
  });

};




module.exports = pgController;