const { v4: uuidv4 } = require('uuid');

const expense_categories = [
  { _id: '9399e2b2-7f25-4ee7-beee-95f6df24fc3f', category_id: null, description: 'food', user_id: null },
  { _id: 'd4f6306a-ae02-4604-98a5-8daf32df404c', category_id: null, description: 'home', user_id: null },
  { _id: '22dc0b8f-7734-48e6-b886-cab3998a38b6', category_id: '9399e2b2-7f25-4ee7-beee-95f6df24fc3f', description: 'grocery', user_id: '123e4567-e89b-12d3-a456-426652340000' },
  { _id: '99e3ce94-8c8f-44e0-bc47-a061f9b5f526', category_id: 'd4f6306a-ae02-4604-98a5-8daf32df404c', description: 'furnishing', user_id: '123e4567-e89b-12d3-a456-426652340000' },

];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Expense_Categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Expense_Categories').insert(expense_categories);
    });
};
