/**
 * modules/students/student.schema.js
 * Skema validasi Joi untuk formulir pendaftaran siswa LK Naira Kencana
 */

const Joi = require('joi');

const registerStudentSchema = Joi.object({
  // FOTO 3x4
  photo_url: Joi.string().uri().allow(null, '').messages({
    'string.uri': 'Format photo_url harus berupa URL valid.',
  }),

  // DATA ANAK
  full_name: Joi.string().trim().max(150).required().messages({
    'string.empty': 'Nama lengkap anak tidak boleh kosong.',
    'any.required': 'Nama lengkap anak wajib diisi.',
  }),
  nickname: Joi.string().trim().max(80).allow(null, ''),
  gender: Joi.string().valid('L', 'P').required().messages({
    'any.only': 'Jenis kelamin harus L (Laki-laki) atau P (Perempuan).',
    'any.required': 'Jenis kelamin wajib dipilih.',
  }),
  religion: Joi.string()
    .valid('Islam', 'Katolik', 'Protestan', 'Budha', 'Hindu', 'Lainnya')
    .allow(null, ''),
  religion_other: Joi.string().trim().max(100).allow(null, ''),

  birth_place: Joi.string().trim().max(100).allow(null, ''),
  birth_date: Joi.date().iso().required().messages({
    'date.base': 'Tanggal lahir harus berformat YYYY-MM-DD.',
    'any.required': 'Tanggal lahir wajib diisi.',
  }),

  living_with: Joi.string()
    .valid(
      'Kedua orang tua',
      'Ayah',
      'Ibu',
      'Paman',
      'Bibi',
      'Kakek',
      'Nenek',
      'Saudara kandung',
      'Kerabat jauh',
      'Orang tua angkat',
      'Lainnya'
    )
    .allow(null, ''),
  living_with_other: Joi.string().trim().max(100).allow(null, ''),

  hobbies: Joi.array().items(Joi.string().trim()).default([]),
  hobbies_other: Joi.string().trim().max(200).allow(null, ''),

  sibling_older: Joi.number().integer().min(0).default(0),
  sibling_younger: Joi.number().integer().min(0).default(0),

  blood_type: Joi.string().valid('A', 'B', 'AB', 'O').allow(null, ''),

  health_aids: Joi.array().items(Joi.string().trim()).default([]),
  health_aids_other: Joi.string().trim().max(200).allow(null, ''),

  health_notes: Joi.array().items(Joi.string().trim()).default([]),
  health_notes_other: Joi.string().trim().max(200).allow(null, ''),

  // RIWAYAT MEDIS
  is_allergic: Joi.boolean().default(false),
  allergy_detail: Joi.string().trim().allow(null, ''),

  ever_hospitalized: Joi.boolean().default(false),
  hospitalized_detail: Joi.string().trim().allow(null, ''),

  is_special_needs: Joi.boolean().default(false),
  special_needs_diagnosis: Joi.string().trim().allow(null, ''),

  birth_history: Joi.string().valid('Normal', 'Cesar', 'Vakum', 'Lainnya').allow(null, ''),
  birth_history_other: Joi.string().trim().max(100).allow(null, ''),

  height_cm: Joi.number().positive().precision(1).allow(null),
  weight_kg: Joi.number().positive().precision(2).allow(null),

  // KONTAK DARURAT
  emergency_contact_1_phone: Joi.string().trim().max(20).allow(null, ''),
  emergency_contact_1_relation: Joi.string().trim().max(50).allow(null, ''),
  emergency_contact_2_phone: Joi.string().trim().max(20).allow(null, ''),
  emergency_contact_2_relation: Joi.string().trim().max(50).allow(null, ''),
  emergency_contact_3_phone: Joi.string().trim().max(20).allow(null, ''),
  emergency_contact_3_relation: Joi.string().trim().max(50).allow(null, ''),

  // SIKAP & EMOSI
  personality_traits: Joi.array().items(Joi.string().trim()).default([]),
  personality_other: Joi.string().trim().max(200).allow(null, ''),

  emotional_expressions: Joi.array().items(Joi.string().trim()).default([]),
  emotional_other: Joi.string().trim().max(200).allow(null, ''),

  // KEBIASAAN
  social_frequency: Joi.string().valid('Sering', 'Jarang', 'Tidak pernah').allow(null, ''),
  tv_hours_per_day: Joi.string().valid('0 jam', '<1 jam', '1-2 jam', '2-3 jam', '>3 jam').allow(null, ''),
  gadget_hours_per_day: Joi.string().valid('0 jam', '<1 jam', '1-2 jam', '2-3 jam', '>3 jam').allow(null, ''),
  other_habits: Joi.string().trim().allow(null, ''),

  // KEMANDIRIAN (A=dibantu, B=sendiri)
  independence_eating: Joi.string().valid('A', 'B').allow(null, ''),
  independence_toilet: Joi.string().valid('A', 'B').allow(null, ''),
  independence_wakeup: Joi.string().valid('A', 'B').allow(null, ''),
  independence_dressing: Joi.string().valid('A', 'B').allow(null, ''),
  independence_school_prep: Joi.string().valid('A', 'B').allow(null, ''),
  independence_belongings: Joi.string().valid('A', 'B').allow(null, ''),

  // KEGIATAN BERSAMA ORANG TUA
  family_activities: Joi.array().items(Joi.string().trim()).default([]),
  family_activities_other: Joi.string().trim().max(200).allow(null, ''),

  preferred_schedule: Joi.string().valid('Pagi', 'Siang', 'Sore').allow(null, ''),
});

const updateStudentSchema = registerStudentSchema.fork(
  ['full_name', 'gender', 'birth_date'],
  (schema) => schema.optional()
);

const verifyStudentSchema = Joi.object({
  status: Joi.string().valid('approved', 'rejected').required().messages({
    'any.only': 'Status verifikasi harus approved atau rejected.',
    'any.required': 'Status verifikasi wajib diisi.',
  }),
  rejection_note: Joi.when('status', {
    is: 'rejected',
    then: Joi.string().trim().min(5).required().messages({
      'any.required': 'Alasan penolakan wajib disertakan jika status rejected.',
      'string.empty': 'Alasan penolakan tidak boleh kosong.',
      'string.min': 'Alasan penolakan minimal 5 karakter.',
    }),
    otherwise: Joi.string().trim().allow(null, ''),
  }),
});

module.exports = {
  registerStudentSchema,
  updateStudentSchema,
  verifyStudentSchema,
};
