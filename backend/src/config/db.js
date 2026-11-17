const { Pool } = require('pg');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL || '';
const isLocalhost = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: isLocalhost ? false : { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000, // close idle connections before Neon compute scales to zero
  connectionTimeoutMillis: 5000,
  keepAlive: true,
});

pool.on('connect', () => {
  const target = isLocalhost ? 'Local PostgreSQL' : 'Neon Cloud PostgreSQL';
  console.log(`Connected to Database (${target})`);
});

pool.on('error', (err) => {
  // Ignore idle resets from serverless poolers to prevent process crash
  if (err.code === 'ECONNRESET' || err.message.includes('ECONNRESET')) {
    console.warn('Neon idle connection reset by serverless pooler; reconnecting on next query.');
    return;
  }
  console.error('Unexpected DB error:', err.message);
});

module.exports = pool;
