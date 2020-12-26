const faker = require('faker');

const accounts = [
  {
    _id: '7ac94da5-24ff-4227-990d-c727508c971d',
    user_id: '123e4567-e89b-12d3-a456-426652340000',
    Account_Types_id: '1addb46d-4085-4fe6-b66d-e28cc7f5570d',
    description: 'Test Bank',
    balance: 1000,
    rate: 1,
  },
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Accounts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Accounts').insert(accounts);
    });
};
