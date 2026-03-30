'use strict';

const router = require('express').Router();
const pool   = require('../db');
const { addAudit } = require('../helpers');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// GET /api/settings — all settings as flat object
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT setting_key, value_json FROM settings');
    const settings = {};
    rows.forEach(r => {
      try { settings[r.setting_key] = JSON.parse(r.value_json); }
      catch { settings[r.setting_key] = r.value_json; }
    });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings — bulk update
router.put('/', requireAdmin, async (req, res) => {
  try {
    const updates = Object.entries(req.body);
    for (const [key, value] of updates) {
      await pool.execute(
        `INSERT INTO settings (setting_key, value_json, updated_by)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE value_json=VALUES(value_json), updated_by=VALUES(updated_by)`,
        [key, JSON.stringify(value), req.user.name]
      );
    }
    await addAudit(pool, {
      userId: req.user.id, userName: req.user.name,
      action: 'config', entity: 'settings', entityId: 'bulk',
      after: { keys: updates.map(([k]) => k) },
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings/:key — single key
router.put('/:key', requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const value   = req.body.value !== undefined ? req.body.value : req.body;
    await pool.execute(
      `INSERT INTO settings (setting_key, value_json, updated_by)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE value_json=VALUES(value_json), updated_by=VALUES(updated_by)`,
      [key, JSON.stringify(value), req.user.name]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/settings/carriers
router.get('/carriers', requireAuth, async (req, res) => {
  try {
    const [carriers] = await pool.execute(
      'SELECT id, name, active FROM carriers WHERE active=1 ORDER BY display_order, name'
    );
    for (const c of carriers) {
      const [sls] = await pool.execute(
        'SELECT service_level FROM carrier_service_levels WHERE carrier_id=? ORDER BY display_order',
        [c.id]
      );
      c.serviceLevels = sls.map(s => s.service_level);
    }
    res.json({ carriers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings/carriers
router.put('/carriers', requireAdmin, async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute('DELETE FROM carriers');
    const carriers = req.body.carriers || [];
    for (let i = 0; i < carriers.length; i++) {
      const c = carriers[i];
      const [r] = await conn.execute(
        'INSERT INTO carriers (name, active, display_order) VALUES (?,1,?)',
        [c.name, i]
      );
      const carrierId = r.insertId;
      const sls = c.serviceLevels || c.sls || [];
      for (let j = 0; j < sls.length; j++) {
        await conn.execute(
          'INSERT INTO carrier_service_levels (carrier_id, service_level, display_order) VALUES (?,?,?)',
          [carrierId, sls[j], j]
        );
      }
    }
    await conn.commit();
    res.json({ ok: true });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

module.exports = router;
