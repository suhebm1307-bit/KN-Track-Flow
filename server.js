'use strict';

const router = require('express').Router();
const pool   = require('../db');
const { requireAdmin } = require('../middleware/auth');

// GET /api/audit
router.get('/', requireAdmin, async (req, res) => {
  try {
    const {
      action, userId, from, to,
      page = 1, limit = 100,
    } = req.query;

    const perPage = Math.min(parseInt(limit) || 100, 500);
    const offset  = (Math.max(parseInt(page), 1) - 1) * perPage;
    const params  = [];
    const where   = [];

    if (action)  { where.push('action = ?');     params.push(action); }
    if (userId)  { where.push('user_id = ?');    params.push(userId); }
    if (from)    { where.push('created_at >= ?'); params.push(from); }
    if (to)      { where.push('created_at <= ?'); params.push(to + ' 23:59:59'); }

    const whereStr = where.length ? 'WHERE ' + where.join(' AND ') : '';

    const [[{ total }]] = await pool.execute(
      `SELECT COUNT(*) AS total FROM audit_log ${whereStr}`, params
    );

    const [entries] = await pool.execute(
      `SELECT * FROM audit_log ${whereStr}
       ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, perPage, offset]
    );

    // Parse JSON fields
    entries.forEach(e => {
      if (e.before_state && typeof e.before_state === 'string') {
        try { e.before_state = JSON.parse(e.before_state); } catch (_) {}
      }
      if (e.after_state && typeof e.after_state === 'string') {
        try { e.after_state = JSON.parse(e.after_state); } catch (_) {}
      }
    });

    res.json({ entries, total, page: parseInt(page), pages: Math.ceil(total / perPage) || 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/audit/export — CSV download
router.get('/export', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT log_id,user_name,action,entity,entity_id,created_at FROM audit_log ORDER BY created_at DESC LIMIT 10000'
    );
    const header = 'Log ID,User,Action,Entity,Entity ID,Timestamp\n';
    const csv = header + rows.map(r =>
      [r.log_id, r.user_name, r.action, r.entity, r.entity_id || '', r.created_at]
        .map(v => `"${String(v).replace(/"/g,'""')}"`)
        .join(',')
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="audit_${new Date().toISOString().slice(0,10)}.csv"`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/audit
router.delete('/', requireAdmin, async (req, res) => {
  try {
    await pool.execute('DELETE FROM audit_log');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
