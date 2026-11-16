-- ============================================================
-- Migration: 001_init.sql
-- Project  : Langkah Naira — LK Naira Kencana
-- Deskripsi: Inisialisasi tabel users & students
-- ============================================================

-- Aktifkan ekstensi UUID (sudah built-in di Neon DB)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABEL: users
-- Role: admin | parent | therapist
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        VARCHAR(20)  NOT NULL CHECK (role IN ('admin', 'parent', 'therapist')),
  phone       VARCHAR(20),
  is_active   BOOLEAN      DEFAULT TRUE,
  created_at  TIMESTAMP    DEFAULT NOW(),
  updated_at  TIMESTAMP    DEFAULT NOW()
);

-- ============================================================
-- TABEL: students
-- Data lengkap formulir pendaftaran fisik LK Naira Kencana
-- ============================================================
CREATE TABLE IF NOT EXISTS students (

  -- === IDENTITAS & FOTO 3x4 ===
  id          VARCHAR(20) PRIMARY KEY,              -- e.g. STU-2026-001
  parent_id   UUID REFERENCES users(id) ON DELETE SET NULL,
  photo_url   VARCHAR(255),                         -- Foto 3x4 anak

  -- === DATA ANAK ===
  full_name           VARCHAR(150) NOT NULL,
  nickname            VARCHAR(80),
  gender              CHAR(1)      NOT NULL CHECK (gender IN ('L', 'P')),
  religion            VARCHAR(20)  CHECK (religion IN (
                        'Islam', 'Katolik', 'Protestan', 'Budha', 'Hindu', 'Lainnya'
                      )),
  religion_other      VARCHAR(100),

  birth_place         VARCHAR(100),
  birth_date          DATE         NOT NULL,

  living_with         VARCHAR(50)  CHECK (living_with IN (
                        'Kedua orang tua', 'Ayah', 'Ibu', 'Paman', 'Bibi',
                        'Kakek', 'Nenek', 'Saudara kandung', 'Kerabat jauh',
                        'Orang tua angkat', 'Lainnya'
                      )),
  living_with_other   VARCHAR(100),

  -- Hobi (multi-select → array)
  hobbies             TEXT[],
  hobbies_other       VARCHAR(200),

  -- Saudara
  sibling_older       SMALLINT DEFAULT 0,
  sibling_younger     SMALLINT DEFAULT 0,

  blood_type          CHAR(2) CHECK (blood_type IN ('A', 'B', 'AB', 'O')),

  -- Alat bantu kesehatan (multi-select)
  health_aids         TEXT[],
  health_aids_other   VARCHAR(200),

  -- Catatan kesehatan / diagnosis (multi-select)
  health_notes        TEXT[],
  health_notes_other  VARCHAR(200),

  -- === RIWAYAT MEDIS ===
  is_allergic             BOOLEAN DEFAULT FALSE,
  allergy_detail          TEXT,

  ever_hospitalized       BOOLEAN DEFAULT FALSE,
  hospitalized_detail     TEXT,

  is_special_needs        BOOLEAN DEFAULT FALSE,
  special_needs_diagnosis TEXT,

  birth_history           VARCHAR(20) CHECK (birth_history IN ('Normal', 'Cesar', 'Vakum', 'Lainnya')),
  birth_history_other     VARCHAR(100),

  height_cm               NUMERIC(5,1),
  weight_kg               NUMERIC(5,2),

  -- === KONTAK DARURAT (3 slot, selain orang tua) ===
  emergency_contact_1_phone    VARCHAR(20),
  emergency_contact_1_relation VARCHAR(50),
  emergency_contact_2_phone    VARCHAR(20),
  emergency_contact_2_relation VARCHAR(50),
  emergency_contact_3_phone    VARCHAR(20),
  emergency_contact_3_relation VARCHAR(50),

  -- === KEBIASAAN - SIKAP - EMOSI ===
  personality_traits    TEXT[],           -- multi-select
  personality_other     VARCHAR(200),

  emotional_expressions TEXT[],           -- multi-select
  emotional_other       VARCHAR(200),

  -- Kebiasaan di rumah
  social_frequency      VARCHAR(20) CHECK (social_frequency IN ('Sering', 'Jarang', 'Tidak pernah')),
  tv_hours_per_day      VARCHAR(20) CHECK (tv_hours_per_day IN ('0 jam', '<1 jam', '1-2 jam', '2-3 jam', '>3 jam')),
  gadget_hours_per_day  VARCHAR(20) CHECK (gadget_hours_per_day IN ('0 jam', '<1 jam', '1-2 jam', '2-3 jam', '>3 jam')),
  other_habits          TEXT,

  -- === KEMANDIRIAN (A = dibantu, B = sendiri) ===
  independence_eating         CHAR(1) CHECK (independence_eating IN ('A', 'B')),
  independence_toilet         CHAR(1) CHECK (independence_toilet IN ('A', 'B')),
  independence_wakeup         CHAR(1) CHECK (independence_wakeup IN ('A', 'B')),
  independence_dressing       CHAR(1) CHECK (independence_dressing IN ('A', 'B')),
  independence_school_prep    CHAR(1) CHECK (independence_school_prep IN ('A', 'B')),
  independence_belongings     CHAR(1) CHECK (independence_belongings IN ('A', 'B')),

  -- Kegiatan bersama orang tua (multi-select)
  family_activities       TEXT[],
  family_activities_other VARCHAR(200),

  -- === PREFERENSI JADWAL ===
  preferred_schedule  VARCHAR(20) CHECK (preferred_schedule IN ('Pagi', 'Siang', 'Sore')),

  -- === STATUS PENDAFTARAN ===
  -- pending_verification | approved | rejected | active
  status          VARCHAR(30)  NOT NULL DEFAULT 'pending_verification',
  rejection_note  TEXT,
  verified_by     UUID REFERENCES users(id),
  verified_at     TIMESTAMP,

  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- INDEX untuk performa query umum
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_students_parent_id ON students(parent_id);
CREATE INDEX IF NOT EXISTS idx_students_status    ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_full_name ON students(full_name);
CREATE INDEX IF NOT EXISTS idx_users_email        ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role         ON users(role);
