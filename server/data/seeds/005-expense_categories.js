const { v4: uuidv4 } = require('uuid');

const expense_categories = [
  { _id: 'food', category_id: null, user_id: null },
  { _id: 'home', category_id: null, user_id: null },
  {
    _id: 'grocery',
    category_id: 'food',
    user_id: '123e4567-e89b-12d3-a456-426652340000',
  },
  {
    _id: 'furnishing',
    category_id: 'home',
    user_id: '123e4567-e89b-12d3-a456-426652340000',
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Expense_Categories')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Expense_Categories').insert(expense_categories);
    });
};
