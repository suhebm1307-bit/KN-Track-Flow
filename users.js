'use strict';

require('dotenv').config();
const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

async function seed() {
  console.log('\n[seed] Connecting to MySQL...');
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
    const sql = fs.readFileSync(path.join(__dirname, '../database/seed.sql'), 'utf8');
    console.log('[seed] Running seed.sql...');
    await conn.query(sql);
    console.log('[seed] ✓ Seed data inserted');
    console.log('[seed]   Default users:');
    console.log('[seed]     admin    / admin123   (Admin role)');
    console.log('[seed]     operator / wms2024    (Operator role)');
    console.log('[seed]   ⚠  Change passwords immediately after first login!');
  } finally {
    await conn.end();
  }
}

seed()
  .then(() => { console.log('[seed] Done.\n'); process.exit(0); })
  .catch(err => { console.error('[seed] FAILED:', err.message); process.exit(1); });
