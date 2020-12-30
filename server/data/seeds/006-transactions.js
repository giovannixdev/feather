const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const reoccurance_ids = [];
for (let i = 0; i < 5; i++) {
  let uuid = uuidv4();
  for (let i = 0; i < 4; i++) {
    reoccurance_ids.push(uuid);
  }
}

const transactions = [...new Array(20)].map((i, idx) => ({
  _id: faker.random.uuid(),
  reoccurance_id: reoccurance_ids[idx],
  transaction_date: `${faker.date
    .future()
    .toISOString()
    .slice(0, 10)}`,
  frequency: 'one-time',
  amount: faker.finance.amount(0, 1000, 2),
  transaction_type_id: 'expense',
  description: faker.random.word(),
  category_id: 'food',
  account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
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
