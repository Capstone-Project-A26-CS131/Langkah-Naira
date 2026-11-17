const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { errorResponse } = require('../utils/response');

// Retry once on connection reset when serverless compute resumes
const queryWithRetry = async (queryText, params) => {
  try {
    return await pool.query(queryText, params);
  } catch (err) {
    if (err.code === 'ECONNRESET' || err.message?.includes('ECONNRESET') || err.message?.includes('Connection terminated')) {
      return await pool.query(queryText, params);
    }
    throw err;
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Akses ditolak. Token autentikasi tidak ditemukan.', 'UNAUTHORIZED', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userQuery = 'SELECT id, name, email, role, phone, is_active FROM users WHERE id = $1';
    const result = await queryWithRetry(userQuery, [decoded.id]);

    if (result.rows.length === 0) {
      return errorResponse(res, 'User tidak ditemukan atau telah dihapus.', 'USER_NOT_FOUND', 401);
    }

    const user = result.rows[0];
    if (!user.is_active) {
      return errorResponse(res, 'Akun Anda dinonaktifkan. Silakan hubungi admin.', 'ACCOUNT_INACTIVE', 403);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Autentikasi diperlukan sebelum cek hak akses.', 'UNAUTHORIZED', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Akses terlarang. Role '${req.user.role}' tidak memiliki izin untuk tindakan ini.`,
        'FORBIDDEN',
        403
      );
    }

    next();
  };
};

module.exports = {
  verifyToken,
  authorize,
};
