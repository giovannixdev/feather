exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('Account_Types', table => {
    table
      .uuid('_id')
      .notNullable()
      .unique()
      .primary();
    table
      .string('type')
      .notNullable()
      .unique();
    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Account_Types');
};
