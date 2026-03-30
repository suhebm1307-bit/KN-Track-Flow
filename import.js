'use strict';

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:            process.env.DB_HOST     || '127.0.0.1',
  port:     parseInt(process.env.DB_PORT)  || 3306,
  database:        process.env.DB_NAME     || 'kn_trackflow',
  user:            process.env.DB_USER     || 'root',
  password:        process.env.DB_PASS     || '',
  connectionLimit: parseInt(process.env.DB_POOL_LIMIT) || 10,
  waitForConnections: true,
  queueLimit: 0,
  dateStrings: true,
  timezone: '+00:00',
  charset: 'utf8mb4',
  decimalNumbers: true,
});

pool.on('error', err => {
  console.error('[DB Pool Error]', err.message);
});

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('[DB] Connected to MySQL:', process.env.DB_NAME);
    conn.release();
  })
  .catch(err => {
    console.error('[DB] Connection failed:', err.message);
    console.error('[DB] Check your .env DB_* settings');
  });

module.exports = pool;
