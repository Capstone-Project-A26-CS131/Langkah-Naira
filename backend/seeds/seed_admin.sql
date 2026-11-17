-- ============================================================
-- Seed: seed_admin.sql
-- Deskripsi: Insert akun awal (1 admin + 1 therapist contoh)
--
-- Password untuk semua akun seed: Admin@1234
-- Hash bcrypt (salt rounds: 10)
--
-- ⚠️  GANTI PASSWORD setelah pertama login di production!
-- ============================================================

-- Admin utama LK Naira Kencana
INSERT INTO users (name, email, password, role, phone, is_active)
VALUES (
  'Admin LK Naira',
  'admin@lknaira.id',
  '$2a$10$sUt1BtSE1svmFgXMZoYPiO9rSAI5Mj44wWhz4.fU/Ik9FiNCMlyp.',
  'admin',
  '08111020417',
  TRUE
)
ON CONFLICT (email) DO NOTHING;

-- Terapis contoh
INSERT INTO users (name, email, password, role, phone, is_active)
VALUES (
  'Terapis A',
  'terapis.a@lknaira.id',
  '$2a$10$sUt1BtSE1svmFgXMZoYPiO9rSAI5Mj44wWhz4.fU/Ik9FiNCMlyp.',
  'therapist',
  '08111020418',
  TRUE
)
ON CONFLICT (email) DO NOTHING;
