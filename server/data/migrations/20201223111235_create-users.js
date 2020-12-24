// exports.up = (knex) => {
//   return knex.schema
//     .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
//     .createTable('profiles', function (table) {
//       table.string('id').notNullable().unique().primary();
//       table.string('email');
//       table.string('name');
//       table.string('avatarUrl');
//       table.timestamps(true, true);
//     });
// };

// exports.down = (knex) => {
//   return knex.schema.dropTableIfExists('profiles');
// };

exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('Users', table => {
    table
      .uuid('_id')
      .notNullable()
      .unique()
      .primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('birth_date').notNullable();
    table
      .string('email')
      .notNullable()
      .unique();
    table
      .string('user_name')
      .notNullable()
      .unique();
    table.string('password').notNullable();
    // table
    //   .boolean('account_verified')
    //   .notNullable()
    //   .defaultTo(false)
    // table.string('registration_date').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Users');
};
