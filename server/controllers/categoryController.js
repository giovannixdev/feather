const db = require('../config/pg-config');

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
    user_id, //id of the user logged in. Use id to reference which account id to use
    category, //we'll have to query for the Id
  } = req.body;

  // category_id, query with both category and user id to get category id
  //res.locals.category_id = response

  db.query(
    `
    SELECT _id 
    FROM "public"."Expense_Categories" 
    WHERE description = ${category} AND user_id = '${user_id}'`
  )
    .then(results => {
      res.locals.category_id = results.rows[0];
      return next();
    })
    .catch(err => {
      console.log('Error caught in categoryController.getCategoryId: ', err);
      return next({
        error_message: {error_message: 'Cannot retrieve category Id!'},
        error: err,
      });
    });
};

categoryController.getAllCategories = (req, res, next) => {
  const {
    user_id, //id of the user logged in. Use id to reference which account id to use
  } = req.body;

  // category_id, query with both category and user id to get category id
  //res.locals.category_id = response

  db.query(
    `
    SELECT _id, category_id 
    FROM "public"."Expense_Categories" 
    WHERE user_id IS NULL OR user_id = '${user_id}'`
  )
    .then(results => {
      console.log(results.rows);
      res.locals.categories = {};

      results.rows.forEach(category => {
        if (category.category_id === null) {
          res.locals.categories[category._id] = [];
        }
      });

      results.rows.forEach(category => {
        if (category.category_id !== null) {
          res.locals.categories[category.category_id].push(category._id);
        }
      });

      console.log(res.locals.categories);
      return next();
    })
    .catch(err => {
      console.log('Error caught in categoryController.getCategoryId: ', err);
      return next({
        error_message: {error_message: 'Cannot retrieve category data!'},
        error: err,
      });
    });
};

module.exports = categoryController;
