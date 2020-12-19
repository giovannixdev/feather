const Pool = require('pg').Pool;

require('dotenv').config();

console.log('process.env.DBUSER in pgModel is: ', process.env.DBUSER);
console.log('process.env.PASSWORD in pgModel is: ', process.env.PASSWORD);

const PG_URI = `postgres://${process.env.DBUSER}:${process.env.PASSWORD}@suleiman.db.elephantsql.com:5432/${process.env.DBUSER}`;

const pool = new Pool({
  connectionString: PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

