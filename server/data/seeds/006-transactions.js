const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const transactionTypes = ['expense', 'income'];
const typeModifiers = [-1, 1];

const transactionsToDuplicate = [...new Array(10)].map((i, idx) => ({
  _id: '',
  reoccurance_id: faker.random.uuid(),
  transaction_date: `${faker.date
    .future()
    .toISOString()
    .slice(0, 10)}`,
  frequency: 'one-time',
  amount: typeModifiers[idx % 2] * faker.finance.amount(0, 1000, 2),
  transaction_type_id: transactionTypes[idx % 2],
  description: faker.random.word(),
  category_id: 'food',
  account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
}));

const transactions = [...new Array(50)].map((transaction, idx) => ({
  ...transactionsToDuplicate[idx % 10],
  _id: faker.random.uuid(),
}));

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Transactions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Transactions').insert(transactions);
    });
};
