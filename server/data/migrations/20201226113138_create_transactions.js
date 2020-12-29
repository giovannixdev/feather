exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('Transactions', table => {
    table
      .uuid('_id')
      .notNullable()
      .unique()
      .primary();
    table.string('transaction_date').notNullable();
    table.string('frequency').notNullable();
    table.float('amount', 24, 2).notNullable();

    table
      .string('transaction_type_id')
      .references('_id')
      .inTable('Transaction_Types')
      .notNullable()
      .onDelete('cascade');
    
    table.string('description');

    table
      .string('category_id')
      .references('_id')
      .inTable('Expense_Categories')
      .notNullable()
      .onDelete('cascade');

    table
      .uuid('account_id')
      .references('_id')
      .inTable('Accounts')
      .notNullable()
      .onDelete('cascade');

    table.timestamps(true, true);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Transactions');
};
