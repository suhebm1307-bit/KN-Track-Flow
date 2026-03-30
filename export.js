'use strict';

const pool = require('./db');

/** Generate a short unique ID */
const genId = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

/** Generate an audit log entry ID */
const logId = () =>
  `al_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;

/**
 * Write an entry to audit_log.
 * @param {import('mysql2/promise').Connection|import('mysql2/promise').Pool} conn
 * @param {object} opts
 */
async function addAudit(conn, {
  userId   = 'system',
  userName = 'System',
  action,
  entity,
  entityId = null,
  before   = null,
  after    = null,
}) {
  await conn.execute(
    `INSERT INTO audit_log
       (log_id, user_id, user_name, action, entity, entity_id, before_state, after_state)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      logId(),
      userId,
      userName,
      action,
      entity,
      entityId,
      before ? JSON.stringify(before) : null,
      after  ? JSON.stringify(after)  : null,
    ]
  );
}

/**
 * Parse dd/MM/yyyy or dd/MM/yyyy HH:MM into MySQL-compatible string
 */
function parseDate(str) {
  if (!str || str.trim() === '') return null;
  // Already ISO format
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str;
  // dd/MM/yyyy HH:MM
  const m = str.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?$/);
  if (!m) return null;
  const [, dd, mm, yyyy, hh, min] = m;
  if (hh) return `${yyyy}-${mm}-${dd} ${hh}:${min}:00`;
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Sanitise a string (trim + limit length)
 */
const sanitise = (val, max = 255) =>
  val != null ? String(val).trim().slice(0, max) : null;

/**
 * Validate order status value
 */
const VALID_STATUSES = new Set(['pending','scheduled','staged','dispatched','deleted','archived']);
const validStatus = s => VALID_STATUSES.has((s||'').toLowerCase())
  ? s.toLowerCase()
  : 'pending';

module.exports = { genId, logId, addAudit, parseDate, sanitise, validStatus };
