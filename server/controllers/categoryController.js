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
    category, //we'll have to query for the Id
  } = req.body;

  // category_id, query with both category and user id to get category id
  //res.locals.category_id = response

  db.query(
    `
    SELECT _id 
    FROM "public"."Expense_Categories" 
    WHERE category_id = ${category} AND user_id = '${res.locals.user_id}'`
  )
    .then(results => {
      res.locals.category_id = results.rows[0];
      return next();
    })
    .catch(err => {
      console.log('Error caught in categoryController.getCategoryId: ', err);
      return next({
        error_message: { error_message: 'Cannot retrieve category Id!' },
        error: err,
      });
    });
};

categoryController.getAllCategories = (req, res, next) => {
  // category_id, query with both category and user id to get category id
  //res.locals.category_id = response

  db.query(
    `
    SELECT _id, category_id 
    FROM "public"."Expense_Categories" 
    WHERE user_id IS NULL OR user_id = '${res.locals.user_id}'`
  )
    .then(results => {
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

      return next();
    })
    .catch(err => {
      console.log('Error caught in categoryController.getCategoryId: ', err);
      return next({
        error_message: { error_message: 'Cannot retrieve category data!' },
        error: err,
      });
    });
};

module.exports = categoryController;
