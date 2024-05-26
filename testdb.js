const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'login_blendit',
  port: process.env.DB_PORT || 3306,
  connectTimeout: 10000
});

pool.execute('SELECT 1', (err, results) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connection successful:', results);
  }
});
