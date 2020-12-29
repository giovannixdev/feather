exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('Expense_Categories', table => {
    table
      .string('_id')
      .notNullable()
      .unique()
      .primary();
    table
      .string('category_id')
      .references('_id')
      .inTable('Expense_Categories')
      .onDelete('cascade');
    table
      .uuid('user_id')
      .references('_id')
      .inTable('Users')
      .onDelete('cascade');

    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Expense_Categories');
};
