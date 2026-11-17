const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db');
const { successResponse, errorResponse } = require('../../utils/response');

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

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role = 'parent' } = req.body;

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return errorResponse(res, 'Email sudah terdaftar. Silakan gunakan email lain atau login.', 'EMAIL_ALREADY_EXISTS', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertQuery = `
      INSERT INTO users (name, email, password, role, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, phone, is_active, created_at
    `;
    const result = await pool.query(insertQuery, [name, email, hashedPassword, role, phone || null]);
    const newUser = result.rows[0];

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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const query = 'SELECT id, name, email, password, role, phone, is_active FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return errorResponse(res, 'Email atau password salah.', 'INVALID_CREDENTIALS', 401);
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return errorResponse(res, 'Akun Anda dinonaktifkan. Silakan hubungi admin.', 'ACCOUNT_INACTIVE', 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 'Email atau password salah.', 'INVALID_CREDENTIALS', 401);
    }

    const token = signToken(user);
    const { password: _, ...userData } = user;

    return successResponse(res, 'Login berhasil.', {
      user: userData,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
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
