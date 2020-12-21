const db = require('../pgConnect');

const accountsController = {};

/*
  _id,
	created_date, 
	transaction_date, 
	amount,
	frequency,
  category_id, 	
  Transaction_Types_id,   
  Account_id  
*/


accountsController.getAccountId = (req, res, next) => {
  const {
    user_id,                //id of the user logged in. Use id to reference which account id to use
    accountDescription      //account associate with transaction LET FRONT END KNOW TO INCLUDE!!!
  } = req.body;

  // Account_id , query db with userId, accountDescription fo get Account_id
  // res.locals.account_id = response

  db.query(`SELECT description, _id FROM "public"."Accounts" WHERE description = ${accountDescription}, user_id = ${user_id}`)
    .then(results => {
      console.log(results.rows)
      console.log('Inside getAccountId')
      // res.locals.account_id
      return next()
    })
    .catch(err => {
      console.log(err)
      return next(err)
    })
}


module.exports = accountsController;