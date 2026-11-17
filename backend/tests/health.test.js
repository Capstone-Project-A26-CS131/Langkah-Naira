/**
 * tests/health.test.js
 * Unit & Integration Test: Endpoint Health & Root Welcome
 */

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

describe('System & Health API', () => {
  afterAll(async () => {
    // Tutup koneksi pool setelah semua test selesai
    await pool.end();
  });

  test('GET / harus mengembalikan 200 dan pesan sambutan', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('online');
  });

  test('GET /api/health harus mengembalikan 200 dan status database connected', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.database).toBe('connected');
  });

  test('GET /endpoint-tidak-ada harus mengembalikan 404', async () => {
    const res = await request(app).get('/endpoint-tidak-ada');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('ROUTE_NOT_FOUND');
  });
});
