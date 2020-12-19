const db = require('./pgModel');

//DATETIME for ISO conversion for transactions.
//SQL DATE Format: YYYY-MM-DD

const pgController = {};

pgController.createUserTable = (req, res, next) => {
  
  const createUserTable = `
  CREATE TABLE Users (
      _id serial NOT NULL,
      firstName varchar NOT NULL,
      lastName varchar NOT NULL,
      bithdate DATE,
      email varchar,
      password varchar
  );
  `;

  db.query(createUserTable).then(response => {
    res.locals.userTable = response;
    return next();
  })
  .catch(err => {
    next(err);
  });
};

pgController.deleteUserTable = (req, res, next) => {

   const deleteUserTable = `
   drop TABLE users;
   `;
 
   db.query(deleteUserTable).then(response => {
     res.locals.userTable = response;
     return next();
   })
   .catch(err => {
     console.log('error from db.query in deleteUserTable ', err);
     next(err);
   });
 };

pgController.insertUser = (req, res, next) => {
  const insertUserQueryString = 
  `INSERT INTO public.people VALUES (
  1, 
  'Logan Thies', 
  'logan.thies@icloud.com', 
  'test', 
  '1988-10-13'
  );`;

  db.query(insertUserQueryString).then(response => {
    res.locals.user = response;
    next();
  });

};


module.exports = pgController;