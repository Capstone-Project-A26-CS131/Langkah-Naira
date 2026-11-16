/**
 * modules/students/student.routes.js
 * Routing endpoint untuk pendaftaran dan verifikasi siswa LK Naira Kencana
 */

const express = require('express');
const router = express.Router();

const studentController = require('./student.controller');
const {
  registerStudentSchema,
  updateStudentSchema,
  verifyStudentSchema,
} = require('./student.schema');

const validate = require('../../middleware/validate');
const { verifyToken, authorize } = require('../../middleware/auth');
const { uploadPhoto } = require('../../middleware/upload');

// Seluruh endpoint siswa memerlukan autentikasi login (JWT Bearer Token)
router.use(verifyToken);

// --- ENDPOINT ORANG TUA (PARENT) ---
// Submit formulir pendaftaran siswa baru
router.post(
  '/register',
  authorize('parent'),
  validate(registerStudentSchema),
  studentController.registerStudent
);

// Melihat daftar anak milik akun orang tua yang sedang login
router.get(
  '/my-students',
  authorize('parent'),
  studentController.getMyStudents
);

// Upload pas foto 3x4 siswa
router.post(
  '/:id/photo',
  authorize('parent', 'admin'),
  uploadPhoto.single('photo'),
  studentController.uploadStudentPhoto
);

// --- ENDPOINT ADMIN & TERAPIS ---
// Melihat semua siswa (dengan filter status, search nama, & pagination)
router.get(
  '/',
  authorize('admin', 'therapist'),
  studentController.getAllStudents
);

// Verifikasi status pendaftaran (Approve / Reject) — Khusus Admin
router.patch(
  '/:id/verify',
  authorize('admin'),
  validate(verifyStudentSchema),
  studentController.verifyStudent
);

// --- ENDPOINT UMUM (ADMIN, TERAPIS, ORANG TUA TERKAIT) ---
// Detail lengkap profil satu siswa
router.get(
  '/:id',
  authorize('admin', 'therapist', 'parent'),
  studentController.getStudentById
);

// Update formulir/profil siswa (Admin atau Orang tua terkait)
router.put(
  '/:id',
  authorize('admin', 'parent'),
  validate(updateStudentSchema),
  studentController.updateStudent
);

module.exports = router;
