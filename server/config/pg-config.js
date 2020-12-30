const Pool = require('pg').Pool;
require('dotenv').config();

const PG_URI = `postgres://${process.env.DBUSER}:${process.env.PASSWORD}@suleiman.db.elephantsql.com:5432/${process.env.DBUSER}`;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
