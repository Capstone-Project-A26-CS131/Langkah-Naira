/**
 * modules/auth/auth.controller.js
 * Controller untuk Registrasi, Login, dan Profil Pengguna (JWT Auth)
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db');
const { successResponse, errorResponse } = require('../../utils/response');

/**
 * Helper untuk membuat JWT token
 */
const signToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

/**
 * POST /api/auth/register
 * Mendaftarkan akun pengguna baru (default: parent)
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role = 'parent' } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUserQuery = 'SELECT id FROM users WHERE email = $1';
    const existing = await pool.query(existingUserQuery, [email]);

    if (existing.rows.length > 0) {
      return errorResponse(res, 'Email sudah terdaftar. Silakan gunakan email lain atau login.', 'EMAIL_ALREADY_EXISTS', 409);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user ke database
    const insertQuery = `
      INSERT INTO users (name, email, password, role, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, phone, is_active, created_at
    `;
    const result = await pool.query(insertQuery, [name, email, hashedPassword, role, phone || null]);
    const newUser = result.rows[0];

    // Generate JWT token otomatis agar user langsung dapat autentikasi
    const token = signToken(newUser);

    return successResponse(
      res,
      'Registrasi berhasil.',
      {
        user: newUser,
        token,
      },
      201
    );
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Login untuk semua role (admin, parent, therapist)
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const query = 'SELECT id, name, email, password, role, phone, is_active FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return errorResponse(res, 'Email atau password salah.', 'INVALID_CREDENTIALS', 401);
    }

    const user = result.rows[0];

    // Cek status aktif user
    if (!user.is_active) {
      return errorResponse(res, 'Akun Anda dinonaktifkan. Silakan hubungi admin.', 'ACCOUNT_INACTIVE', 403);
    }

    // Verifikasi password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Email atau password salah.', 'INVALID_CREDENTIALS', 401);
    }

    // Generate JWT token
    const token = signToken(user);

    // Sanitasi user object (hapus password sebelum dikirim ke response)
    const { password: _, ...userData } = user;

    return successResponse(res, 'Login berhasil.', {
      user: userData,
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me
 * Mendapatkan informasi profil pengguna yang sedang login
 */
const getMe = async (req, res, next) => {
  try {
    // req.user diinjeksi oleh middleware verifyToken
    return successResponse(res, 'Profil pengguna berhasil diambil.', {
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
