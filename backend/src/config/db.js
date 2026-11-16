const { Pool } = require('pg');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL || '';
const isLocalhost = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: isLocalhost ? false : { rejectUnauthorized: false },
  // Konfigurasi optimal untuk Neon Serverless PostgreSQL / Cloud Pooler:
  max: 10,                        // Maksimal koneksi simultan di pool
  idleTimeoutMillis: 30000,       // Tutup koneksi idle setelah 30 detik agar tidak stale saat Neon compute tidur
  connectionTimeoutMillis: 5000,  // Waktu tunggu koneksi baru maksimal 5 detik
  keepAlive: true,                // Jaga socket tetap responsif
});

pool.on('connect', () => {
  const target = isLocalhost ? 'Local PostgreSQL' : 'Neon Cloud PostgreSQL';
  console.log(`✅ Connected to Database (${target})`);
});

pool.on('error', (err) => {
  // Tangani error socket disconnect/reset di background tanpa mematikan proses server
  if (err.code === 'ECONNRESET' || err.message.includes('ECONNRESET')) {
    console.warn('⚠️  Neon idle connection reset by serverless pooler (auto-reconnecting on next query).');
    return;
  }
  console.error('❌ Unexpected DB error:', err.message);
});

module.exports = pool;
