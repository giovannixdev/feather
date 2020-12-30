exports.up = async knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.createTable('Transaction_Types', table => {
      table
        .string('_id')
        .notNullable()
        .unique()
        .primary();

      table.timestamps(true, true);
    });
  };
  
  exports.down = knex => {
    return knex.schema.dropTableIfExists('Transaction_Types');
  };
  