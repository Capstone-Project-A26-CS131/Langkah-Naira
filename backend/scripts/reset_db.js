// Resets database schema and seeds initial accounts.

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const runReset = async () => {
  const client = await pool.connect();
  console.log('🔄 Memulai proses reset database Neon DB...');

  try {
    await client.query('BEGIN');

    console.log('🗑️  Menghapus tabel lama jika ada...');
    await client.query(`
      DROP TABLE IF EXISTS students CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    console.log('✅ Tabel lama berhasil dibersihkan.');

    console.log('🏗️  Menjalankan migrasi DDL (001_init.sql)...');
    const migrationPath = path.join(__dirname, '../migrations/001_init.sql');
    const migrationSql = fs.readFileSync(migrationPath, 'utf-8');
    await client.query(migrationSql);
    console.log('✅ Tabel users dan students berhasil dibuat ulang.');

    console.log('🌱 Memasukkan seed akun awal (seed_admin.sql)...');
    const seedPath = path.join(__dirname, '../seeds/seed_admin.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    await client.query(seedSql);
    console.log('✅ Seed akun admin & terapis berhasil dimasukkan.');

    await client.query('COMMIT');
    console.log('\n======================================================');
    console.log('🎉 DATABASE BERHASIL DI-RESET DAN DI-SEED SEMULA! 🎉');
    console.log('======================================================');
    console.log('Akun Seed Tersedia:');
    console.log('👑 Admin    : admin@lknaira.id     | Password: Admin@1234');
    console.log('🩺 Therapist: terapis.a@lknaira.id | Password: Admin@1234');
    console.log('======================================================\n');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Gagal melakukan reset database:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
};

runReset();
