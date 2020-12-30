const { v4: uuidv4 } = require('uuid');

const transaction_types = [
  { _id: 'income' },
  { _id: 'expense' },
  { _id: 'bill' },
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Transaction_Types')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Transaction_Types').insert(transaction_types);
    });
};



