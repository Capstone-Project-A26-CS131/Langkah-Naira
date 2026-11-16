/**
 * modules/auth/auth.schema.js
 * Skema validasi Joi untuk request body Auth
 */

const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(150).required().messages({
    'string.base': 'Nama harus berupa teks.',
    'string.empty': 'Nama tidak boleh kosong.',
    'string.min': 'Nama minimal 3 karakter.',
    'string.max': 'Nama maksimal 150 karakter.',
    'any.required': 'Nama wajib diisi.',
  }),
  email: Joi.string().email().trim().lowercase().max(150).required().messages({
    'string.email': 'Format email tidak valid.',
    'string.empty': 'Email tidak boleh kosong.',
    'any.required': 'Email wajib diisi.',
  }),
  password: Joi.string().min(6).max(50).required().messages({
    'string.min': 'Password minimal 6 karakter.',
    'string.empty': 'Password tidak boleh kosong.',
    'any.required': 'Password wajib diisi.',
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9+() -]{9,20}$/)
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Format nomor telepon tidak valid.',
    }),
  role: Joi.string().valid('parent', 'therapist').default('parent').messages({
    'any.only': 'Role pendaftaran hanya diizinkan untuk parent atau therapist.',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.email': 'Format email tidak valid.',
    'string.empty': 'Email tidak boleh kosong.',
    'any.required': 'Email wajib diisi.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password tidak boleh kosong.',
    'any.required': 'Password wajib diisi.',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
