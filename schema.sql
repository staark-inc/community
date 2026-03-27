-- ──────────────────────────────────────────────────────
-- Staark Inc — Database Schema
-- Compatible with MySQL 8+ and MariaDB 10.6+
-- Run: mysql -u root -p < schema.sql
-- ──────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS staark_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE staark_db;

-- ── Users ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  name          VARCHAR(255),
  company       VARCHAR(255),
  job_title     VARCHAR(255),
  avatar_url    TEXT,
  role          ENUM('admin','member','viewer') NOT NULL DEFAULT 'member',
  timezone      VARCHAR(100) DEFAULT 'UTC',
  status        ENUM('active','invited','suspended') NOT NULL DEFAULT 'active',
  last_login_at DATETIME,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Leads ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  external_id   VARCHAR(64),                          -- e.g. "L-001" for display
  company       VARCHAR(255) NOT NULL,
  contact       VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  phone         VARCHAR(64),
  source        VARCHAR(100),
  status        ENUM('new','contacted','qualified','proposal','won','lost')
                NOT NULL DEFAULT 'new',
  score         TINYINT UNSIGNED DEFAULT 50,          -- 0–100 AI score
  value         DECIMAL(12, 2),                       -- deal value in USD
  notes         TEXT,
  owner_id      BIGINT UNSIGNED,                      -- FK → users.id
  tags          JSON,                                 -- e.g. ["Enterprise","Hot"]
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_email  (email),
  INDEX idx_owner  (owner_id),
  INDEX idx_score  (score),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Clients ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS clients (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  industry      VARCHAR(255),
  tier          ENUM('starter','growth','enterprise') NOT NULL DEFAULT 'starter',
  arr           DECIMAL(14, 2),                       -- annual recurring revenue
  health        TINYINT UNSIGNED DEFAULT 80,          -- 0–100
  status        ENUM('active','at_risk','churning') NOT NULL DEFAULT 'active',
  website       VARCHAR(500),
  notes         TEXT,
  owner_id      BIGINT UNSIGNED,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_tier   (tier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Client contacts ───────────────────────────────────

CREATE TABLE IF NOT EXISTS client_contacts (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_id  BIGINT UNSIGNED NOT NULL,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255),
  phone      VARCHAR(64),
  title      VARCHAR(255),
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  INDEX idx_client (client_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Automations ───────────────────────────────────────

CREATE TABLE IF NOT EXISTS automations (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  trigger_def JSON NOT NULL,   -- { type: "lead.created", conditions: [...] }
  actions_def JSON NOT NULL,   -- [{ type: "send_email", params: {...} }, ...]
  status      ENUM('active','paused') NOT NULL DEFAULT 'active',
  run_count   INT UNSIGNED DEFAULT 0,
  last_run_at DATETIME,
  created_by  BIGINT UNSIGNED,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Automation runs log ───────────────────────────────

CREATE TABLE IF NOT EXISTS automation_runs (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  automation_id   BIGINT UNSIGNED NOT NULL,
  trigger_payload JSON,
  status          ENUM('success','failed') NOT NULL,
  error_message   TEXT,
  ran_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (automation_id) REFERENCES automations(id) ON DELETE CASCADE,
  INDEX idx_automation (automation_id),
  INDEX idx_ran_at     (ran_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Webhook events log ────────────────────────────────

CREATE TABLE IF NOT EXISTS webhook_events (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  event      VARCHAR(100) NOT NULL,
  payload    JSON,
  status     ENUM('delivered','failed') NOT NULL DEFAULT 'delivered',
  target_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event   (event),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Seed: default admin user ──────────────────────────
-- Password is "password123" — change immediately in production!
-- Hash generated with: bcrypt("password123", 12)

INSERT IGNORE INTO users (email, password_hash, name, company, role)
VALUES (
  'admin@staarkinc.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LZwbfJ5JxSxXXXXXX',
  'Admin User',
  'Staark Inc',
  'admin'
);
