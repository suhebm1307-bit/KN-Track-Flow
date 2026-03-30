'use strict';

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const pool   = require('../db');
const { addAudit, genId } = require('../helpers');
const { requireAdmin } = require('../middleware/auth');

// GET /api/users
router.get('/', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, username, email, role, active, created_at, updated_at FROM users ORDER BY name'
    );
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, username, email, role, password } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({ error: 'name, username, password required' });
    }
    const hash = await bcrypt.hash(password, 10);
    const id   = genId('u');
    await pool.execute(
      'INSERT INTO users (id, name, username, password_hash, email, role) VALUES (?,?,?,?,?,?)',
      [id, name.trim(), username.trim(), hash, email || null, role === 'admin' ? 'admin' : 'operator']
    );
    await addAudit(pool, {
      userId: req.user.id, userName: req.user.name,
      action: 'create', entity: 'user', entityId: id,
      after: { name, username, role },
    });
    res.status(201).json({ id });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Username already exists' });
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const { id } = req.params;
    await pool.execute(
      'UPDATE users SET name=?, email=?, role=?, updated_at=NOW() WHERE id=?',
      [name, email || null, role === 'admin' ? 'admin' : 'operator', id]
    );
    await addAudit(pool, {
      userId: req.user.id, userName: req.user.name,
      action: 'update', entity: 'user', entityId: id,
      after: { name, role },
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id/password
router.put('/:id/password', requireAdmin, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }
    const hash = await bcrypt.hash(password, 10);
    await pool.execute(
      'UPDATE users SET password_hash=?, updated_at=NOW() WHERE id=?',
      [hash, req.params.id]
    );
    await addAudit(pool, {
      userId: req.user.id, userName: req.user.name,
      action: 'update', entity: 'user', entityId: req.params.id,
      after: { action: 'password_reset' },
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id/toggle
router.put('/:id/toggle', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) return res.status(400).json({ error: 'Cannot deactivate yourself' });
    await pool.execute(
      'UPDATE users SET active=NOT active, updated_at=NOW() WHERE id=?', [id]
    );
    const [[u]] = await pool.execute('SELECT active FROM users WHERE id=?', [id]);
    res.json({ ok: true, active: !!u?.active });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user.id) return res.status(400).json({ error: 'Cannot delete yourself' });
    const [[u]] = await pool.execute('SELECT name FROM users WHERE id=?', [id]);
    await pool.execute('DELETE FROM users WHERE id=?', [id]);
    await addAudit(pool, {
      userId: req.user.id, userName: req.user.name,
      action: 'delete', entity: 'user', entityId: id,
      before: { name: u?.name },
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
