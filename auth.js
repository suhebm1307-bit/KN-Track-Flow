'use strict';

require('dotenv').config();
const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

async function initDB() {
  console.log('\n[init-db] Connecting to MySQL...');
  const conn = await mysql.createConnection({
    host:               process.env.DB_HOST || '127.0.0.1',
    port:       parseInt(process.env.DB_PORT) || 3306,
    user:               process.env.DB_USER || 'root',
    password:           process.env.DB_PASS || '',
    database:           process.env.DB_NAME || 'kn_trackflow',
    multipleStatements: true,
    charset:            'utf8mb4',
  });

  try {
    const schema = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
    console.log('[init-db] Running schema.sql...');
    await conn.query(schema);
    console.log('[init-db] ✓ Schema applied successfully');
  } finally {
    await conn.end();
  }
}

initDB()
  .then(() => { console.log('[init-db] Done.\n'); process.exit(0); })
  .catch(err => { console.error('[init-db] FAILED:', err.message); process.exit(1); });
