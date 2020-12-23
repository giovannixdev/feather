exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('Accounts', table => {
    table
      .uuid('_id')
      .notNullable()
      .unique()
      .primary();
    table
      .uuid('user_id')
      .references('_id')
      .inTable('Users')
      .notNullable()
      .onDelete('cascade');
    table
      .uuid('Account_Types_id')
      .references('_id')
      .inTable('Account_Types')
      .notNullable()
      .onDelete('cascade');
    table.string('description').notNullable();
    table.float('balance', 24, 2).notNullable();
    table.float('rate', 5, 2);
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Accounts');
};
