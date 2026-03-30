'use strict';

// Usage: node scripts/create-admin.js <username> <password>
// Example: node scripts/create-admin.js admin MyNewPassword123

require('dotenv').config();
const mysql  = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function run() {
  const [,, username, password] = process.argv;
  if (!username || !password) {
    console.error('Usage: node scripts/create-admin.js <username> <password>');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST || '127.0.0.1',
    port:     parseInt(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'kn_trackflow',
  });

  const [existing] = await conn.execute(
    'SELECT id FROM users WHERE username=?', [username]
  );

  if (existing.length) {
    await conn.execute(
      'UPDATE users SET password_hash=?, role="admin", active=1 WHERE username=?',
      [hash, username]
    );
    console.log(`✓ Password updated for user: ${username}`);
  } else {
    const id = `u_${Date.now().toString(36)}`;
    await conn.execute(
      'INSERT INTO users (id, name, username, password_hash, role) VALUES (?,?,?,?,?)',
      [id, username, username, hash, 'admin']
    );
    console.log(`✓ Admin user created: ${username}`);
  }

  await conn.end();
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
