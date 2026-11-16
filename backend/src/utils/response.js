/**
 * utils/response.js
 * Helper standar format respons JSON untuk semua endpoint
 */

/**
 * Respons sukses
 * @param {object} res   - Express response object
 * @param {string} message
 * @param {any}    data
 * @param {number} statusCode - default 200
 */
const successResponse = (res, message, data = null, statusCode = 200) => {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
};

/**
 * Respons sukses dengan pagination
 * @param {object} res
 * @param {string} message
 * @param {Array}  data
 * @param {object} pagination - { page, limit, total, totalPages }
 */
const paginatedResponse = (res, message, data, pagination) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
};

/**
 * Respons error umum
 * @param {object} res
 * @param {string} message
 * @param {string} errorCode  - e.g. 'NOT_FOUND', 'UNAUTHORIZED'
 * @param {number} statusCode - default 400
 */
const errorResponse = (res, message, errorCode = 'BAD_REQUEST', statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    error: errorCode,
    message,
  });
};

/**
 * Respons error validasi Joi (400)
 * @param {object} res
 * @param {Array}  details - array pesan error dari Joi
 */
const validationErrorResponse = (res, details) => {
  return res.status(400).json({
    success: false,
    error: 'VALIDATION_ERROR',
    message: 'Data yang dikirim tidak valid.',
    details,
  });
};

module.exports = {
  successResponse,
  paginatedResponse,
  errorResponse,
  validationErrorResponse,
};
