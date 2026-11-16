/**
 * modules/students/student.controller.js
 * Controller untuk mengelola pendaftaran dan verifikasi siswa LK Naira Kencana
 */

const fs = require('fs');
const path = require('path');
const pool = require('../../config/db');
const { isS3Configured, uploadToS3 } = require('../../config/storage');
const { generateStudentId } = require('../../utils/generateId');
const { successResponse, errorResponse, paginatedResponse } = require('../../utils/response');

/**
 * POST /api/students/register
 * Mendaftarkan profil siswa baru (hanya role 'parent')
 */
const registerStudent = async (req, res, next) => {
  try {
    const parentId = req.user.id;
    const studentId = await generateStudentId();
    const data = req.body;

    const query = `
      INSERT INTO students (
        id, parent_id, photo_url, full_name, nickname, gender, religion, religion_other,
        birth_place, birth_date, living_with, living_with_other,
        hobbies, hobbies_other, sibling_older, sibling_younger, blood_type,
        health_aids, health_aids_other, health_notes, health_notes_other,
        is_allergic, allergy_detail, ever_hospitalized, hospitalized_detail,
        is_special_needs, special_needs_diagnosis, birth_history, birth_history_other,
        height_cm, weight_kg,
        emergency_contact_1_phone, emergency_contact_1_relation,
        emergency_contact_2_phone, emergency_contact_2_relation,
        emergency_contact_3_phone, emergency_contact_3_relation,
        personality_traits, personality_other, emotional_expressions, emotional_other,
        social_frequency, tv_hours_per_day, gadget_hours_per_day, other_habits,
        independence_eating, independence_toilet, independence_wakeup,
        independence_dressing, independence_school_prep, independence_belongings,
        family_activities, family_activities_other, preferred_schedule, status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12,
        $13, $14, $15, $16, $17,
        $18, $19, $20, $21,
        $22, $23, $24, $25,
        $26, $27, $28, $29,
        $30, $31,
        $32, $33,
        $34, $35,
        $36, $37,
        $38, $39, $40, $41,
        $42, $43, $44, $45,
        $46, $47, $48,
        $49, $50, $51,
        $52, $53, $54, 'pending_verification'
      ) RETURNING *;
    `;

    const values = [
      studentId, parentId, data.photo_url || null, data.full_name, data.nickname || null, data.gender, data.religion || null, data.religion_other || null,
      data.birth_place || null, data.birth_date, data.living_with || null, data.living_with_other || null,
      data.hobbies || [], data.hobbies_other || null, data.sibling_older || 0, data.sibling_younger || 0, data.blood_type || null,
      data.health_aids || [], data.health_aids_other || null, data.health_notes || [], data.health_notes_other || null,
      data.is_allergic || false, data.allergy_detail || null, data.ever_hospitalized || false, data.hospitalized_detail || null,
      data.is_special_needs || false, data.special_needs_diagnosis || null, data.birth_history || null, data.birth_history_other || null,
      data.height_cm || null, data.weight_kg || null,
      data.emergency_contact_1_phone || null, data.emergency_contact_1_relation || null,
      data.emergency_contact_2_phone || null, data.emergency_contact_2_relation || null,
      data.emergency_contact_3_phone || null, data.emergency_contact_3_relation || null,
      data.personality_traits || [], data.personality_other || null, data.emotional_expressions || [], data.emotional_other || null,
      data.social_frequency || null, data.tv_hours_per_day || null, data.gadget_hours_per_day || null, data.other_habits || null,
      data.independence_eating || null, data.independence_toilet || null, data.independence_wakeup || null,
      data.independence_dressing || null, data.independence_school_prep || null, data.independence_belongings || null,
      data.family_activities || [], data.family_activities_other || null, data.preferred_schedule || null,
    ];

    const result = await pool.query(query, values);
    const createdStudent = result.rows[0];

    return successResponse(
      res,
      'Pendaftaran formulir siswa baru berhasil disimpan.',
      createdStudent,
      201
    );
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/students/my-students
 * Mendapatkan daftar siswa yang didaftarkan oleh akun orang tua yang sedang login
 */
const getMyStudents = async (req, res, next) => {
  try {
    const parentId = req.user.id;
    const query = `
      SELECT id, photo_url, full_name, nickname, gender, birth_date, status, preferred_schedule, created_at 
      FROM students 
      WHERE parent_id = $1 
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [parentId]);

    return successResponse(res, 'Daftar anak Anda berhasil diambil.', result.rows);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/students
 * Mendapatkan semua data siswa dengan filter status, pencarian nama, dan pagination (Admin / Therapist)
 */
const getAllStudents = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let baseQuery = `
      SELECT s.id, s.photo_url, s.full_name, s.nickname, s.gender, s.birth_date, s.status, s.preferred_schedule, 
             s.created_at, u.name AS parent_name, u.phone AS parent_phone, u.email AS parent_email
      FROM students s
      LEFT JOIN users u ON s.parent_id = u.id
      WHERE 1=1
    `;
    let countQuery = 'SELECT COUNT(*) FROM students s WHERE 1=1';

    const params = [];
    let paramIndex = 1;

    if (status) {
      baseQuery += ` AND s.status = $${paramIndex}`;
      countQuery += ` AND s.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (search) {
      baseQuery += ` AND s.full_name ILIKE $${paramIndex}`;
      countQuery += ` AND s.full_name ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count, 10);

    baseQuery += ` ORDER BY s.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    const queryParams = [...params, limit, offset];

    const result = await pool.query(baseQuery, queryParams);

    return paginatedResponse(res, 'Data formulir siswa berhasil diambil.', result.rows, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/students/:id
 * Mengambil detail lengkap profil formulir satu siswa
 */
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT s.*, 
             u.name AS parent_name, u.email AS parent_email, u.phone AS parent_phone,
             v.name AS verified_by_name
      FROM students s
      LEFT JOIN users u ON s.parent_id = u.id
      LEFT JOIN users v ON s.verified_by = v.id
      WHERE s.id = $1;
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return errorResponse(res, 'Data formulir siswa tidak ditemukan.', 'STUDENT_NOT_FOUND', 404);
    }

    const student = result.rows[0];

    // Jika yang request adalah role parent, pastikan dia hanya bisa mengakses data anaknya sendiri
    if (req.user.role === 'parent' && student.parent_id !== req.user.id) {
      return errorResponse(res, 'Akses terlarang. Anda tidak memiliki izin untuk melihat formulir ini.', 'FORBIDDEN', 403);
    }

    return successResponse(res, 'Detail formulir siswa berhasil diambil.', student);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/students/:id
 * Update informasi data formulir pendaftaran siswa
 */
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const checkQuery = 'SELECT parent_id, status FROM students WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return errorResponse(res, 'Data formulir siswa tidak ditemukan.', 'STUDENT_NOT_FOUND', 404);
    }

    const existing = checkResult.rows[0];

    if (req.user.role === 'parent' && existing.parent_id !== req.user.id) {
      return errorResponse(res, 'Akses terlarang. Anda tidak memiliki hak mengedit data formulir ini.', 'FORBIDDEN', 403);
    }

    const allowedFields = [
      'photo_url', 'full_name', 'nickname', 'gender', 'religion', 'religion_other',
      'birth_place', 'birth_date', 'living_with', 'living_with_other',
      'hobbies', 'hobbies_other', 'sibling_older', 'sibling_younger', 'blood_type',
      'health_aids', 'health_aids_other', 'health_notes', 'health_notes_other',
      'is_allergic', 'allergy_detail', 'ever_hospitalized', 'hospitalized_detail',
      'is_special_needs', 'special_needs_diagnosis', 'birth_history', 'birth_history_other',
      'height_cm', 'weight_kg',
      'emergency_contact_1_phone', 'emergency_contact_1_relation',
      'emergency_contact_2_phone', 'emergency_contact_2_relation',
      'emergency_contact_3_phone', 'emergency_contact_3_relation',
      'personality_traits', 'personality_other', 'emotional_expressions', 'emotional_other',
      'social_frequency', 'tv_hours_per_day', 'gadget_hours_per_day', 'other_habits',
      'independence_eating', 'independence_toilet', 'independence_wakeup',
      'independence_dressing', 'independence_school_prep', 'independence_belongings',
      'family_activities', 'family_activities_other', 'preferred_schedule'
    ];

    const updates = [];
    const values = [];
    let paramIndex = 1;

    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updates.push(`${key} = $${paramIndex}`);
        values.push(data[key]);
        paramIndex++;
      }
    }

    if (updates.length === 0) {
      return errorResponse(res, 'Tidak ada field yang dikirim untuk diperbarui.', 'NO_DATA_TO_UPDATE', 400);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const updateQuery = `
      UPDATE students 
      SET ${updates.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, values);
    return successResponse(res, 'Data formulir siswa berhasil diperbarui.', result.rows[0]);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/students/:id/photo
 * Upload pas foto siswa (3x4) ke S3 Object Storage (atau local disk jika S3 tidak aktif)
 */
const uploadStudentPhoto = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return errorResponse(res, 'File foto tidak ditemukan dalam request.', 'FILE_REQUIRED', 400);
    }

    const checkQuery = 'SELECT parent_id FROM students WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return errorResponse(res, 'Data formulir siswa tidak ditemukan.', 'STUDENT_NOT_FOUND', 404);
    }

    const existing = checkResult.rows[0];

    if (req.user.role === 'parent' && existing.parent_id !== req.user.id) {
      return errorResponse(res, 'Akses terlarang. Anda tidak memiliki hak mengunggah foto siswa ini.', 'FORBIDDEN', 403);
    }

    const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
    const fileName = `photo-${id}-${Date.now()}${ext}`;
    let finalPhotoUrl = '';

    if (isS3Configured) {
      finalPhotoUrl = await uploadToS3(req.file.buffer, fileName, req.file.mimetype);
    } else {
      const uploadDir = path.join(__dirname, '../../../uploads/students');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, req.file.buffer);
      finalPhotoUrl = `/uploads/students/${fileName}`;
    }

    const updateQuery = `
      UPDATE students 
      SET photo_url = $1, updated_at = NOW() 
      WHERE id = $2 
      RETURNING id, full_name, photo_url;
    `;
    const result = await pool.query(updateQuery, [finalPhotoUrl, id]);

    return successResponse(
      res,
      isS3Configured ? 'Foto siswa berhasil diunggah ke Object Storage (S3).' : 'Foto siswa berhasil disimpan ke Local Storage.',
      result.rows[0]
    );
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/students/:id/verify
 * Verifikasi Formulir Pendaftaran Siswa (hanya Admin): approve atau reject
 */
const verifyStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejection_note } = req.body;
    const adminId = req.user.id;

    const checkQuery = 'SELECT id, status FROM students WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return errorResponse(res, 'Data formulir siswa tidak ditemukan.', 'STUDENT_NOT_FOUND', 404);
    }

    const query = `
      UPDATE students
      SET status = $1,
          rejection_note = $2,
          verified_by = $3,
          verified_at = NOW(),
          updated_at = NOW()
      WHERE id = $4
      RETURNING id, full_name, status, rejection_note, verified_by, verified_at;
    `;

    const values = [
      status,
      status === 'rejected' ? rejection_note : null,
      adminId,
      id,
    ];

    const result = await pool.query(query, values);

    const message = status === 'approved' 
      ? 'Formulir pendaftaran siswa berhasil diverifikasi dan disetujui (Approved).'
      : 'Formulir pendaftaran siswa telah ditolak (Rejected) dengan catatan evaluasi.';

    return successResponse(res, message, result.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerStudent,
  getMyStudents,
  getAllStudents,
  getStudentById,
  updateStudent,
  uploadStudentPhoto,
  verifyStudent,
};
