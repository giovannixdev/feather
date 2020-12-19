const db = require('../pgConnect');
const axios = require('axios');

//DATETIME for ISO conversion for transactions.
//SQL DATE Format: YYYY-MM-DD

const userController = {};

userController.createUser = (req, res, next) => {
  // lower case user name before saving to database
  // bycrpt password before saving
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

userController.verifyUser = (req, res, next) => {
  // query data base
    db.query(`SELECT user_name, password FROM "public"."Users"`)
    .then(results => {
      console.log(results.rows)
      // run bcrypt compare 
      if(results.rows[0].user_name === req.body.user_name && 
         results.rows[0].password === req.body.password 
      ){
        console.log('Inside if')
        res.locals.user = results.rows[0]
        return next()
      }
      else{
        console.log('Inside eles')
        return next(Error('username or password does not match'))
      }
    })
    .catch(err => {
      console.log(err)
      return next(err)
    })
    // get request body => will have user name and pw

}



module.exports = userController;