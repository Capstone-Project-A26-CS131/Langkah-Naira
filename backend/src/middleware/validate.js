/**
 * middleware/validate.js
 * Middleware generic untuk validasi request payload menggunakan Joi schema
 */

const { validationErrorResponse } = require('../utils/response');

/**
 * Validasi request body, query, atau params dengan Joi schema
 * @param {object} schema - Joi schema object
 * @param {'body'|'query'|'params'} source - default 'body'
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false, // ambil semua error sekaligus
      stripUnknown: true, // hapus field yang tidak ada di schema
      allowUnknown: false,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));
      return validationErrorResponse(res, details);
    }

    // replace request payload dengan value yang sudah disanitasi oleh Joi
    req[source] = value;
    next();
  };
};

module.exports = validate;
