-- ═══════════════════════════════════════════════════════════════════════
--  KN Track Flow v1.0 — Seed Data
--  Run via: node scripts/seed.js
-- ═══════════════════════════════════════════════════════════════════════

USE kn_trackflow;

-- ── Default users ─────────────────────────────────────────────────────
-- Passwords are bcrypt(10) hashes:
--   admin    → admin123
--   operator → wms2024
INSERT IGNORE INTO users (id, name, username, password_hash, email, role, active)
VALUES
  ('u_admin_001', 'Administrator',      'admin',    '$2b$10$YCWUoaOLGsHWO4J.yfWIo.TM4pFYz5g1xMRiXxsX1Y2k2BZ/XGh4u', 'admin@company.com',    'admin',    1),
  ('u_op_001',    'Warehouse Operator', 'operator', '$2b$10$GxmU5B4q3cN1EvZhfEPAFulExT7JJrD5e7y4kxZqgbSbgV7s2RJWy', 'operator@company.com', 'operator', 1);

-- ── Carriers ──────────────────────────────────────────────────────────
INSERT IGNORE INTO carriers (name, active, display_order) VALUES
  ('DHL',          1, 1),
  ('FedEx',        1, 2),
  ('UPS',          1, 3),
  ('DB Schenker',  1, 4),
  ('Maersk',       1, 5),
  ('XPO Logistics',1, 6),
  ('CEVA',         1, 7),
  ('TNT',          1, 8);

-- ── Carrier service levels ────────────────────────────────────────────
INSERT IGNORE INTO carrier_service_levels (carrier_id, service_level, display_order)
SELECT c.id, sl.svc, sl.ord
FROM carriers c
JOIN (
  SELECT 'DHL'          AS n, 'Express'     AS svc, 1 AS ord UNION ALL
  SELECT 'DHL',              'Economy',             2        UNION ALL
  SELECT 'DHL',              'Freight',             3        UNION ALL
  SELECT 'DHL',              'Parcel',              4        UNION ALL
  SELECT 'FedEx',            'Priority',            1        UNION ALL
  SELECT 'FedEx',            'Standard',            2        UNION ALL
  SELECT 'FedEx',            'Economy',             3        UNION ALL
  SELECT 'FedEx',            'Freight',             4        UNION ALL
  SELECT 'UPS',              'Express',             1        UNION ALL
  SELECT 'UPS',              'Saver',               2        UNION ALL
  SELECT 'UPS',              'Standard',            3        UNION ALL
  SELECT 'UPS',              'Freight',             4        UNION ALL
  SELECT 'DB Schenker',      'Road',                1        UNION ALL
  SELECT 'DB Schenker',      'Air',                 2        UNION ALL
  SELECT 'DB Schenker',      'Ocean',               3        UNION ALL
  SELECT 'DB Schenker',      'Express',             4        UNION ALL
  SELECT 'Maersk',           'FCL',                 1        UNION ALL
  SELECT 'Maersk',           'LCL',                 2        UNION ALL
  SELECT 'Maersk',           'Air',                 3        UNION ALL
  SELECT 'Maersk',           'Spot',                4        UNION ALL
  SELECT 'XPO Logistics',    'FTL',                 1        UNION ALL
  SELECT 'XPO Logistics',    'LTL',                 2        UNION ALL
  SELECT 'XPO Logistics',    'Air',                 3        UNION ALL
  SELECT 'XPO Logistics',    'Intermodal',          4        UNION ALL
  SELECT 'CEVA',             'Air',                 1        UNION ALL
  SELECT 'CEVA',             'Ocean',               2        UNION ALL
  SELECT 'CEVA',             'Ground',              3        UNION ALL
  SELECT 'CEVA',             'Warehousing',         4        UNION ALL
  SELECT 'TNT',              'Express',             1        UNION ALL
  SELECT 'TNT',              'Economy',             2        UNION ALL
  SELECT 'TNT',              'Day Definite',        3
) sl ON c.name = sl.n;

-- ── Default application settings ─────────────────────────────────────
INSERT IGNORE INTO settings (setting_key, value_json, description) VALUES
  ('app_name',              '"KN Track Flow"',  'Application display name'),
  ('app_sub',               '"Track Flow"',     'Application subtitle'),
  ('accent_colour',         '"#00306A"',        'Primary accent colour (hex)'),
  ('dark_mode',             'false',            'Default dark mode'),
  ('auto_archive',          'true',             'Enable auto-archive on refresh'),
  ('archive_days',          '30',               'Days after dispatch before auto-archive'),
  ('auto_save',             'true',             'Auto-save on change'),
  ('write_back',            'true',             'Two-way file write-back'),
  ('backup_interval',       '7200',             'Auto-backup interval in seconds'),
  ('require_admin_delete',  'true',             'Require admin role to delete orders'),
  ('default_view',          '"ops"',            'Default view on login'),
  ('status_colours',        '{}',               'Custom status colour overrides'),
  ('field_labels',          '{}',               'Custom field label overrides'),
  ('ftp_settings',          '{}',               'FTP/SFTP export connection settings'),
  ('email_schedule',        '{}',               'Email export schedule configuration'),
  ('active_theme',          '1',                'UI theme index');
