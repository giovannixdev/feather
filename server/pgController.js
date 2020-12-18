const db = require('./pgModel');

//DATETIME for ISO conversion for transactions.

//CONSTRAINT "people_pk" PRIMARY KEY ("_id")) WITH (OIDS=FALSE)

const pgController = {};

// DATE Format: YYYY-MM-DD




pgController.createUserTable = (res, req, next) => {
  
 // DATE Format: YYYY-MM-DD
  const createUserTable = 
  `CREATE TABLE User (
	"_id" serial NOT NULL,
  "name" varchar NOT NULL,
  "birthdate" DATE,
	"email" varchar,
	"password" varchar
	);`;

  db.query(createUserTable).then(response => {
    console.log('response from db.query in createUserTable is ', response);
    res.locals.userTable = response;
    next();
  }).catch(err => {
    console.log('error from db.query in createUserTable ', err);
    next(err);
  });

};

pgController.insertUser = (res, req, next) => {
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