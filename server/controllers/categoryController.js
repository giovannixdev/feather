const db = require('../pgConnect');

const categoryController = {};

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


categoryController.getCategoryId = (req, res, next) => {
  const {
    user_id,                //id of the user logged in. Use id to reference which account id to use
    category,               //we'll have to query for the Id
  } = req.body;

  // category_id, query with both category and user id to get category id
  //res.locals.category_id = response

  db.query(`SELECT description, _id FROM "public"."ref_Expense_Categories" WHERE description = ${category}, user_id = ${user_id}`)
    .then(results => {
      console.log(results.rows)
      console.log('Inside getCategoryId')
      // res.locals.category_id
      return next()
    })
    .catch(err => {
      console.log(err)
      return next(err)
    })
    
}







module.exports = categoryController;