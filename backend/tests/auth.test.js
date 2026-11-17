/**
 * tests/auth.test.js
 * Unit & Integration Test: Modul Autentikasi JWT (Register, Login, Me, Validasi & RBAC)
 */

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

describe('Authentication API (/api/auth)', () => {
  const uniqueSuffix = Date.now();
  const testUser = {
    name: 'Wali Murid Test',
    email: `wali.test.${uniqueSuffix}@example.com`,
    password: 'Password123!',
    phone: '081234567890',
    role: 'parent',
  };

  let tokenParent = '';

  afterAll(async () => {
    // Bersihkan user testing yang baru dibuat
    await pool.query('DELETE FROM users WHERE email = $1', [testUser.email]);
    await pool.end();
  });

  describe('POST /api/auth/register', () => {
    test('[+] Berhasil mendaftarkan akun parent baru (201)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data.user.role).toBe('parent');
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user).not.toHaveProperty('password'); // Password tidak boleh bocor

      tokenParent = res.body.data.token;
    });

    test('[-] Gagal mendaftar dengan email yang sama / duplikat (409)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('EMAIL_ALREADY_EXISTS');
    });

    test('[-] Gagal mendaftar jika nama kurang dari 3 karakter (400 Validasi Joi)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...testUser,
          name: 'Al',
          email: `wali.invalid.${Date.now()}@example.com`,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('[-] Gagal mendaftar jika password kurang dari 6 karakter (400 Validasi Joi)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...testUser,
          email: `wali.shortpass.${Date.now()}@example.com`,
          password: '123',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/auth/login', () => {
    test('[+] Berhasil login dengan email dan password yang benar (200)', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    test('[-] Gagal login jika password salah (401)', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'PasswordSalahTotal!',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('INVALID_CREDENTIALS');
    });

    test('[-] Gagal login jika email tidak terdaftar (401)', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'email.palsu.tidakada@example.com',
          password: 'Password123',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('GET /api/auth/me', () => {
    test('[+] Berhasil mengambil profil diri dengan Bearer token valid (200)', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${tokenParent}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(testUser.email);
    });

    test('[-] Gagal jika request tanpa header Authorization (401)', async () => {
      const res = await request(app).get('/api/auth/me');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('UNAUTHORIZED');
    });

    test('[-] Gagal jika token palsu / tidak valid (401)', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer token_palsu_random_xyz');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('INVALID_TOKEN');
    });
  });
});
