'use strict';

const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const pool    = require('../db');
const { addAudit, logId } = require('../helpers');
const { requireAuth } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, name, username, password_hash, role, active FROM users WHERE username = ? LIMIT 1',
      [username.trim()]
    );

    const user = rows[0];
    if (!user || !user.active) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set session
    req.session.user = {
      id:       user.id,
      name:     user.name,
      username: user.username,
      role:     user.role,
    };

    // Write audit log
    await addAudit(pool, {
      userId:   user.id,
      userName: user.name,
      action:   'login',
      entity:   'session',
      entityId: user.id,
      after:    { username: user.username, role: user.role },
    });

    res.json({ user: req.session.user });
  } catch (err) {
    console.error('[auth/login]', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST /api/auth/logout
router.post('/logout', requireAuth, async (req, res) => {
  const user = req.session.user;
  try {
    await addAudit(pool, {
      userId:   user.id,
      userName: user.name,
      action:   'logout',
      entity:   'session',
      entityId: user.id,
    });
  } catch (_) { /* non-fatal */ }

  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  if (!req.session?.user) return res.status(401).json({ error: 'Not logged in' });
  res.json({ user: req.session.user });
});

module.exports = router;
