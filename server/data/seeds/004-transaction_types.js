const { v4: uuidv4 } = require('uuid');

const transaction_types = [
  { _id: '2ab3f858-0a46-4b57-9744-19b7bc78fdc7', type: 'income' },
  { _id: 'cff15463-8079-4256-a10a-0575c83d96af', type: 'expense' },
  { _id: '44717f1f-a78c-4152-af12-840d8db809f7', type: 'bill' },
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



