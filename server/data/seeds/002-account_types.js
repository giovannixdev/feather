const { v4: uuidv4 } = require('uuid');
console.log(uuidv4());
console.log(uuidv4());
console.log(uuidv4());

const accout_types = [
  { _id: '{1addb46d-4085-4fe6-b66d-e28cc7f5570d}', type: 'checking' },
  { _id: '{971f88e1-2066-43b2-95b1-78ed1ca1c1a9}', type: 'savings' },
  { _id: '{9836b8d9-9d93-4907-95fe-080af5c6ec13}', type: 'credit' },
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Account_Types')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Account_Types').insert(accout_types);
    });
};
