const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DB_USER || 'test',
  password: process.env.DB_PASSWORD || 'test',
  host: 'localhost',
  port: 5432,
  database: 'meetup',
})

module.exports = pool
