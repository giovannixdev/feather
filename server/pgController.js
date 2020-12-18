const db = require('./pgModel');

//DATETIME for ISO conversion for transactions.

//CONSTRAINT "people_pk" PRIMARY KEY ("_id")) WITH (OIDS=FALSE)

const pgController = {};

// DATE Format: YYYY-MM-DD




pgController.createUserTable = (req, res, next) => {
  
 // DATE Format: YYYY-MM-DD
  const createUserTable = `
  CREATE TABLE users (
      _id serial NOT NULL,
      firstName varchar NOT NULL,
      lastName varchar NOT NULL,
      bithdate DATE,
      email varchar,
      password varchar
  );
  `;

  db.query(createUserTable).then(response => {
    console.log('response from db.query in createUserTable is ', response);
    console.log('res in createUserTable is: ', res);

    res.locals.userTable = response;
    return next();
  })
  .catch(err => {
    console.log('error from db.query in createUserTable ', err);
    next(err);
  });
};

pgController.deleteUserTable = (req, res, next) => {

   const deleteUserTable = `
   drop TABLE users;
   `;
 
   db.query(deleteUserTable).then(response => {
     console.log('response from db.query in deleteUserTable is ', response);
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
    console.log('response from db.query in insertUser is ', response);
    res.locals.user = response;
    next();
  });

};


module.exports = pgController;