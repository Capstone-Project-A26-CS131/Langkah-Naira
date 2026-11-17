const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('Error trace:', err.stack || err);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token autentikasi telah kadaluarsa, silakan login kembali.', 'TOKEN_EXPIRED', 401);
  }

  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Token autentikasi tidak valid.', 'INVALID_TOKEN', 401);
  }

  if (err.code === '23505') {
    return errorResponse(res, 'Data duplikat telah ditemukan di sistem.', 'DUPLICATE_ENTRY', 409);
  }

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
