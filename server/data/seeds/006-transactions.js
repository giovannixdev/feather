const faker = require('faker');

const transactions = [...new Array(20)].map((i, idx) => ({
  _id: faker.random.uuid(),
  transaction_date: `${faker.date
    .future()
    .toISOString()
    .slice(0, 10)}`,
  frequency: 'one-time',
  amount: faker.finance.amount(0, 1000, 2),
  transaction_type_id: 'cff15463-8079-4256-a10a-0575c83d96af',
  category_id: 'food',
  account_id: '7ac94da5-24ff-4227-990d-c727508c971d',
}));

console.log(`Transactions: ${Object.values(transactions[0])}`);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Transactions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Transactions').insert(transactions);
    });
};
