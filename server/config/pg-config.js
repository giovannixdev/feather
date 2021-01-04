const pg = require('pg');
const Pool = require('pg').Pool;
require('dotenv').config();

const PG_URI = `postgres://${process.env.DBUSER}:${process.env.PASSWORD}@suleiman.db.elephantsql.com:5432/${process.env.DBUSER}`;

// pg.types.setTypeParser(1114, function(stringValue) {
//   console.log(stringValue);
//   return new Date(Date.parse(stringValue + '+0000'));
// });

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
