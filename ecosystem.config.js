-- ═══════════════════════════════════════════════════════════════════════
--  KN Track Flow v1.0 — MySQL 8.x Database Schema
--  Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
--  Run via: node scripts/init-db.js
-- ═══════════════════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS kn_trackflow
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kn_trackflow;

-- ── users ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(20)  NOT NULL,
  name          VARCHAR(120) NOT NULL,
  username      VARCHAR(60)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email         VARCHAR(150) DEFAULT NULL,
  role          ENUM('admin','operator') NOT NULL DEFAULT 'operator',
  active        TINYINT(1)   NOT NULL DEFAULT 1,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_username (username),
  INDEX idx_role     (role),
  INDEX idx_active   (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── orders ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                  INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  order_no            VARCHAR(60)   NOT NULL UNIQUE,
  shipment_no         VARCHAR(60)   NOT NULL,
  client_id           VARCHAR(40)   NOT NULL,
  customer_name       VARCHAR(120)  DEFAULT NULL,
  dest_country        VARCHAR(80)   DEFAULT NULL,
  carrier             VARCHAR(80)   DEFAULT NULL,
  service_level       VARCHAR(60)   DEFAULT NULL,
  tracking_no         VARCHAR(120)  DEFAULT NULL,
  scheduled_ship_date DATE          DEFAULT NULL,
  inbound_dt          DATETIME      DEFAULT NULL,
  outbound_dt         DATETIME      DEFAULT NULL,
  status              ENUM('pending','scheduled','staged',
                           'dispatched','deleted','archived')
                      NOT NULL DEFAULT 'pending',
  restore_status      ENUM('pending','scheduled','staged','dispatched')
                      DEFAULT NULL,
  internal_ref        VARCHAR(255)  DEFAULT NULL,
  shipping_notes      TEXT          DEFAULT NULL,
  is_archived         TINYINT(1)    NOT NULL DEFAULT 0,
  is_deleted          TINYINT(1)    NOT NULL DEFAULT 0,
  archived_at         DATETIME      DEFAULT NULL,
  dispatched_at       DATETIME      DEFAULT NULL,
  created_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
                                    ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX idx_order_no         (order_no),
  INDEX idx_status                  (status),
  INDEX idx_client_id               (client_id),
  INDEX idx_carrier                 (carrier),
  INDEX idx_scheduled_ship_date     (scheduled_ship_date),
  INDEX idx_inbound_dt              (inbound_dt),
  INDEX idx_outbound_dt             (outbound_dt),
  INDEX idx_is_archived             (is_archived),
  INDEX idx_is_deleted              (is_deleted),
  INDEX idx_dest_country            (dest_country),
  FULLTEXT INDEX ft_search
    (order_no, shipment_no, client_id, customer_name, tracking_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── pallets ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pallets (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  order_no        VARCHAR(60)   NOT NULL,
  pallet_id       VARCHAR(60)   NOT NULL,
  pkg_type        VARCHAR(60)   DEFAULT NULL,
  location_type   ENUM('rack','lane','dock','floor','other')
                  DEFAULT 'rack',
  staging_loc     VARCHAR(80)   DEFAULT NULL,
  notes           VARCHAR(255)  DEFAULT NULL,
  status          ENUM('pending','scheduled','staged',
                       'dispatched','deleted','archived')
                  NOT NULL DEFAULT 'pending',
  seq_no          SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX idx_pallet      (order_no, pallet_id),
  INDEX idx_order_no           (order_no),
  INDEX idx_staging_loc        (staging_loc),
  INDEX idx_location_type      (location_type),
  INDEX idx_status             (status),
  CONSTRAINT fk_pallets_order
    FOREIGN KEY (order_no) REFERENCES orders(order_no)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── audit_log ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  log_id       VARCHAR(28)  NOT NULL UNIQUE,
  user_id      VARCHAR(20)  NOT NULL DEFAULT 'system',
  user_name    VARCHAR(120) NOT NULL DEFAULT 'System',
  action       ENUM('create','update','delete','dispatch','archive',
                    'restore','login','logout','config','import')
               NOT NULL,
  entity       VARCHAR(40)  NOT NULL,
  entity_id    VARCHAR(120) DEFAULT NULL,
  before_state JSON         DEFAULT NULL,
  after_state  JSON         DEFAULT NULL,
  ip_address   VARCHAR(45)  DEFAULT NULL,
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX idx_log_id   (log_id),
  INDEX idx_action          (action),
  INDEX idx_entity_id       (entity_id),
  INDEX idx_user_id         (user_id),
  INDEX idx_created_at      (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── settings ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(80)  NOT NULL,
  value_json  JSON         NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,
  updated_by  VARCHAR(120) DEFAULT NULL,
  PRIMARY KEY (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── carriers ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS carriers (
  id            SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(80)  NOT NULL UNIQUE,
  active        TINYINT(1)   NOT NULL DEFAULT 1,
  display_order SMALLINT     NOT NULL DEFAULT 0,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── carrier_service_levels ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS carrier_service_levels (
  id            SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  carrier_id    SMALLINT UNSIGNED NOT NULL,
  service_level VARCHAR(80)  NOT NULL,
  display_order SMALLINT     NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE INDEX idx_carrier_svc (carrier_id, service_level),
  CONSTRAINT fk_csl_carrier
    FOREIGN KEY (carrier_id) REFERENCES carriers(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── sessions ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  session_token VARCHAR(128) NOT NULL,
  user_id       VARCHAR(20)  NOT NULL,
  user_name     VARCHAR(120) NOT NULL,
  role          ENUM('admin','operator') NOT NULL,
  created_at    DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at    DATETIME  NOT NULL,
  ip_address    VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (session_token),
  INDEX idx_user_id    (user_id),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── import_sessions ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS import_sessions (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  import_mode     ENUM('replace','append','update') NOT NULL DEFAULT 'append',
  filename        VARCHAR(255) DEFAULT NULL,
  rows_processed  INT UNSIGNED NOT NULL DEFAULT 0,
  rows_added      INT UNSIGNED NOT NULL DEFAULT 0,
  rows_updated    INT UNSIGNED NOT NULL DEFAULT 0,
  rows_skipped    INT UNSIGNED NOT NULL DEFAULT 0,
  imported_by     VARCHAR(120) DEFAULT NULL,
  imported_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ═══════════════════════════════════════════════════════════════════════
-- VIEWS
-- ═══════════════════════════════════════════════════════════════════════

CREATE OR REPLACE VIEW v_active_orders AS
SELECT
  o.*,
  COUNT(p.id)                                         AS pallet_count,
  GROUP_CONCAT(DISTINCT p.staging_loc
    ORDER BY p.seq_no SEPARATOR ', ')                 AS staging_locs
FROM orders o
LEFT JOIN pallets p ON p.order_no = o.order_no
WHERE o.is_archived = 0 AND o.is_deleted = 0
GROUP BY o.id;

CREATE OR REPLACE VIEW v_order_pallets AS
SELECT
  o.order_no, o.shipment_no, o.client_id, o.customer_name,
  o.dest_country, o.carrier, o.service_level, o.tracking_no,
  o.scheduled_ship_date, o.inbound_dt, o.outbound_dt,
  o.status AS order_status, o.shipping_notes, o.internal_ref,
  p.id AS pallet_db_id, p.pallet_id, p.pkg_type,
  p.location_type, p.staging_loc,
  p.notes AS pallet_notes, p.status AS pallet_status, p.seq_no
FROM orders o
JOIN pallets p ON p.order_no = o.order_no
WHERE o.is_archived = 0 AND o.is_deleted = 0
ORDER BY o.order_no, p.seq_no;

CREATE OR REPLACE VIEW v_staging_summary AS
SELECT
  p.staging_loc, p.location_type,
  COUNT(*) AS pallet_count,
  COUNT(DISTINCT o.order_no) AS order_count,
  GROUP_CONCAT(DISTINCT o.order_no
    ORDER BY o.order_no SEPARATOR ', ') AS order_nos
FROM pallets p
JOIN orders o ON o.order_no = p.order_no
WHERE o.is_archived = 0 AND o.is_deleted = 0
  AND p.staging_loc IS NOT NULL AND p.staging_loc != ''
GROUP BY p.staging_loc, p.location_type;

CREATE OR REPLACE VIEW v_dashboard_stats AS
SELECT
  SUM(CASE WHEN o.status='pending'    THEN 1 ELSE 0 END) AS cnt_pending,
  SUM(CASE WHEN o.status='scheduled'  THEN 1 ELSE 0 END) AS cnt_scheduled,
  SUM(CASE WHEN o.status='staged'     THEN 1 ELSE 0 END) AS cnt_staged,
  SUM(CASE WHEN o.status='dispatched' THEN 1 ELSE 0 END) AS cnt_dispatched,
  COUNT(DISTINCT o.client_id)                             AS client_count,
  COUNT(*)                                                AS total_orders,
  COALESCE(SUM(sub.pc), 0)                               AS total_pallets
FROM orders o
LEFT JOIN (
  SELECT order_no, COUNT(*) AS pc FROM pallets GROUP BY order_no
) sub ON sub.order_no = o.order_no
WHERE o.is_archived = 0 AND o.is_deleted = 0;

-- ═══════════════════════════════════════════════════════════════════════
-- STORED PROCEDURES
-- ═══════════════════════════════════════════════════════════════════════

DELIMITER $$

DROP PROCEDURE IF EXISTS sp_dispatch_order$$
CREATE PROCEDURE sp_dispatch_order(
  IN  p_order_no    VARCHAR(60),
  IN  p_user_id     VARCHAR(20),
  IN  p_user_name   VARCHAR(120),
  IN  p_dispatch_dt DATETIME,
  OUT p_success     TINYINT,
  OUT p_message     VARCHAR(255)
)
BEGIN
  DECLARE v_status  VARCHAR(20);
  DECLARE v_pallets INT DEFAULT 0;
  SET p_success = 0; SET p_message = '';

  SELECT status INTO v_status
    FROM orders WHERE order_no = p_order_no FOR UPDATE;

  IF v_status IS NULL THEN
    SET p_message = 'Order not found';
  ELSEIF v_status = 'dispatched' THEN
    SET p_message = 'Already dispatched';
  ELSEIF v_status IN ('archived','deleted') THEN
    SET p_message = CONCAT('Cannot dispatch — status: ', v_status);
  ELSE
    UPDATE orders
      SET status='dispatched', outbound_dt=p_dispatch_dt,
          dispatched_at=p_dispatch_dt,
          inbound_dt=COALESCE(inbound_dt, p_dispatch_dt),
          updated_at=NOW()
      WHERE order_no=p_order_no;
    UPDATE pallets
      SET status='dispatched', updated_at=NOW()
      WHERE order_no=p_order_no;
    SELECT COUNT(*) INTO v_pallets FROM pallets WHERE order_no=p_order_no;
    INSERT INTO audit_log
      (log_id,user_id,user_name,action,entity,entity_id,before_state,after_state)
    VALUES
      (CONCAT('al_',LEFT(UUID(),12)), p_user_id, p_user_name,
       'dispatch','order', p_order_no,
       JSON_OBJECT('status',v_status),
       JSON_OBJECT('status','dispatched','pallets',v_pallets,'outbound_dt',p_dispatch_dt));
    SET p_success=1;
    SET p_message=CONCAT('Dispatched ',v_pallets,' pallet(s)');
  END IF;
END$$

DROP PROCEDURE IF EXISTS sp_archive_order$$
CREATE PROCEDURE sp_archive_order(
  IN  p_order_no  VARCHAR(60),
  IN  p_user_id   VARCHAR(20),
  IN  p_user_name VARCHAR(120),
  OUT p_success   TINYINT,
  OUT p_message   VARCHAR(255)
)
BEGIN
  DECLARE v_status VARCHAR(20);
  SET p_success = 0;

  SELECT status INTO v_status FROM orders WHERE order_no=p_order_no FOR UPDATE;

  IF v_status IS NULL THEN SET p_message='Order not found';
  ELSEIF v_status IN('archived','deleted') THEN SET p_message=CONCAT('Already ',v_status);
  ELSE
    UPDATE orders
      SET restore_status=status, status='archived',
          is_archived=1, archived_at=NOW(), updated_at=NOW()
      WHERE order_no=p_order_no;
    UPDATE pallets SET status='archived', updated_at=NOW()
      WHERE order_no=p_order_no;
    INSERT INTO audit_log
      (log_id,user_id,user_name,action,entity,entity_id,before_state,after_state)
    VALUES
      (CONCAT('al_',LEFT(UUID(),12)), p_user_id, p_user_name,
       'archive','order',p_order_no,
       JSON_OBJECT('status',v_status), JSON_OBJECT('status','archived'));
    SET p_success=1; SET p_message='Archived';
  END IF;
END$$

DROP PROCEDURE IF EXISTS sp_restore_order$$
CREATE PROCEDURE sp_restore_order(
  IN  p_order_no  VARCHAR(60),
  IN  p_user_id   VARCHAR(20),
  IN  p_user_name VARCHAR(120),
  OUT p_success   TINYINT,
  OUT p_message   VARCHAR(255)
)
BEGIN
  DECLARE v_restore VARCHAR(20) DEFAULT 'staged';
  SET p_success = 0;

  SELECT COALESCE(restore_status,'staged') INTO v_restore
    FROM orders WHERE order_no=p_order_no;

  IF v_restore IS NULL THEN SET p_message='Order not found in archive';
  ELSE
    UPDATE orders
      SET status=v_restore, restore_status=NULL,
          is_archived=0, archived_at=NULL, updated_at=NOW()
      WHERE order_no=p_order_no;
    UPDATE pallets SET status=v_restore, updated_at=NOW()
      WHERE order_no=p_order_no;
    INSERT INTO audit_log
      (log_id,user_id,user_name,action,entity,entity_id,before_state,after_state)
    VALUES
      (CONCAT('al_',LEFT(UUID(),12)), p_user_id, p_user_name,
       'restore','order',p_order_no,
       JSON_OBJECT('status','archived'), JSON_OBJECT('status',v_restore));
    SET p_success=1;
    SET p_message=CONCAT('Restored to: ',v_restore);
  END IF;
END$$

DELIMITER ;
