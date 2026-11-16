/**
 * tests/student.test.js
 * Unit & Integration Test: Pendaftaran Siswa Baru, Validasi Form, RBAC, dan Verifikasi Admin
 */

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

describe('Student Registration & Verification API (/api/students)', () => {
  let adminToken = '';
  let parentToken = '';
  let otherParentToken = '';
  let studentId = '';

  const parentEmail = `wali.reg.${Date.now()}@example.com`;
  const otherParentEmail = `wali.other.${Date.now()}@example.com`;

  beforeAll(async () => {
    // 1. Login Admin (Akun Seed)
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@lknaira.id', password: 'Admin@1234' });
    adminToken = adminLogin.body.data.token;

    // 2. Register Parent 1
    const regParent1 = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Wali Murid Utama',
        email: parentEmail,
        password: 'Password123',
        role: 'parent',
      });
    parentToken = regParent1.body.data.token;

    // 3. Register Parent 2 (Untuk tes RBAC isolasi data antar parent)
    const regParent2 = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Wali Murid Lain',
        email: otherParentEmail,
        password: 'Password123',
        role: 'parent',
      });
    otherParentToken = regParent2.body.data.token;
  });

  afterAll(async () => {
    // Bersihkan data siswa dan user pengujian
    if (studentId) {
      await pool.query('DELETE FROM students WHERE id = $1', [studentId]);
    }
    await pool.query('DELETE FROM users WHERE email IN ($1, $2)', [parentEmail, otherParentEmail]);
    await pool.end();
  });

  describe('POST /api/students/register', () => {
    test('[+] Berhasil submit formulir pendaftaran siswa baru (201)', async () => {
      const formPayload = {
        full_name: 'Muhammad Farhan',
        nickname: 'Farhan',
        gender: 'L',
        religion: 'Islam',
        birth_place: 'Bekasi',
        birth_date: '2019-06-15',
        living_with: 'Kedua orang tua',
        hobbies: ['Membaca', 'Menggambar'],
        blood_type: 'O',
        health_notes: ['ADD/ADHD'],
        is_allergic: true,
        allergy_detail: 'Dingin',
        is_special_needs: true,
        special_needs_diagnosis: 'Speech Delay',
        birth_history: 'Normal',
        height_cm: 110.0,
        weight_kg: 17.5,
        emergency_contact_1_phone: '081234567899',
        emergency_contact_1_relation: 'Paman',
        independence_eating: 'B',
        independence_toilet: 'A',
        preferred_schedule: 'Pagi',
      };

      const res = await request(app)
        .post('/api/students/register')
        .set('Authorization', `Bearer ${parentToken}`)
        .send(formPayload);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data.id).toMatch(/^STU-\d{4}-\d{3}$/);
      expect(res.body.data.status).toBe('pending_verification');
      expect(res.body.data.full_name).toBe(formPayload.full_name);

      studentId = res.body.data.id;
    });

    test('[-] Gagal submit formulir jika nama anak kosong (400 Validasi Joi)', async () => {
      const res = await request(app)
        .post('/api/students/register')
        .set('Authorization', `Bearer ${parentToken}`)
        .send({
          gender: 'L',
          birth_date: '2019-06-15',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('[-] Gagal submit formulir jika format tanggal lahir salah (400 Validasi Joi)', async () => {
      const res = await request(app)
        .post('/api/students/register')
        .set('Authorization', `Bearer ${parentToken}`)
        .send({
          full_name: 'Ananda Test',
          gender: 'L',
          birth_date: '15-06-2019', // Format salah
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/students/my-students', () => {
    test('[+] Parent dapat melihat daftar anak yang didaftarkannya (200)', async () => {
      const res = await request(app)
        .get('/api/students/my-students')
        .set('Authorization', `Bearer ${parentToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.some((s) => s.id === studentId)).toBe(true);
    });
  });

  describe('GET /api/students/:id (RBAC Otorisasi)', () => {
    test('[+] Parent pemilik dapat melihat detail data anaknya (200)', async () => {
      const res = await request(app)
        .get(`/api/students/${studentId}`)
        .set('Authorization', `Bearer ${parentToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(studentId);
    });

    test('[+] Admin dapat melihat detail data siswa manapun (200)', async () => {
      const res = await request(app)
        .get(`/api/students/${studentId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(studentId);
    });

    test('[-] Parent LAIN dilarang mengintip data siswa milik orang lain (403 Forbidden)', async () => {
      const res = await request(app)
        .get(`/api/students/${studentId}`)
        .set('Authorization', `Bearer ${otherParentToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe('FORBIDDEN');
    });
  });

  describe('PATCH /api/students/:id/verify (Verifikasi Admin)', () => {
    test('[-] Parent dilarang melakukan verifikasi siswa (403 Forbidden)', async () => {
      const res = await request(app)
        .patch(`/api/students/${studentId}/verify`)
        .set('Authorization', `Bearer ${parentToken}`)
        .send({ status: 'approved' });

      expect(res.statusCode).toBe(403);
      expect(res.body.error).toBe('FORBIDDEN');
    });

    test('[-] Admin gagal menolak (reject) jika tidak memberikan rejection_note (400)', async () => {
      const res = await request(app)
        .patch(`/api/students/${studentId}/verify`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'rejected' }); // rejection_note wajib jika rejected

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    test('[+] Admin berhasil menyetujui (APPROVE) pendaftaran siswa (200)', async () => {
      const res = await request(app)
        .patch(`/api/students/${studentId}/verify`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'approved' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('approved');
      expect(res.body.data).toHaveProperty('verified_by');
      expect(res.body.data).toHaveProperty('verified_at');
    });
  });
});
