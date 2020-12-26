const faker = require('faker');

const users = [...new Array(8)].map((i, idx) => ({
  _id:
    idx === 0 ? '123e4567-e89b-12d3-a456-426652340000' : faker.random.uuid(),
  first_name: idx === 0 ? 'firstName' : faker.name.firstName(),
  last_name: idx === 0 ? 'lastName' : faker.name.lastName(),
  birth_date:
    idx === 0
      ? '2000-10-30'
      : `${faker.date
          .past()
          .toISOString()
          .slice(0, 10)}`,
  email: idx === 0 ? 'test@test.com' : faker.internet.email(),
  user_name: idx === 0 ? 'username' : faker.random.word(),
  password: idx === 0 ? 'password' : faker.name.jobDescriptor(),
  // account_verified: idx === 0 ? false : false,
  // created_at:
  //   idx === 0
  //     ? '2020-12-23'
  //     : `${faker.date
  //         .past()
  //         .toISOString()
  //         .slice(0, 10)}`,
}));

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Users').insert(users);
    });
};
