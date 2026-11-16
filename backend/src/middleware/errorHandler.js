/**
 * middleware/errorHandler.js
 * Global error handler untuk Express
 */

const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error Trace:', err.stack || err);

  // Error token JWT kadaluarsa
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token autentikasi telah kadaluarsa, silakan login kembali.', 'TOKEN_EXPIRED', 401);
  }

  // Error token JWT tidak valid
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Token autentikasi tidak valid.', 'INVALID_TOKEN', 401);
  }

  // Error database PostgreSQL (contoh: unique constraint)
  if (err.code === '23505') {
    return errorResponse(res, 'Data duplikat telah ditemukan di sistem.', 'DUPLICATE_ENTRY', 409);
  }

  // Error database foreign key constraint
  if (err.code === '23503') {
    return errorResponse(res, 'Relasi data tidak ditemukan atau referensi tidak valid.', 'FOREIGN_KEY_VIOLATION', 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Terjadi kesalahan internal pada server.';

  return errorResponse(
    res,
    message,
    err.errorCode || 'INTERNAL_SERVER_ERROR',
    statusCode
  );
};

module.exports = errorHandler;
