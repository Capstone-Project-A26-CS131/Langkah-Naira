/**
 * utils/generateId.js
 * Generate unique human-readable ID untuk siswa dan booking
 * Format: STU-YYYY-NNN (misal: STU-2026-001)
 */

const pool = require('../config/db');

/**
 * Generate Student ID auto-increment per tahun
 * @returns {Promise<string>} e.g. "STU-2026-001"
 */
const generateStudentId = async () => {
  const currentYear = new Date().getFullYear();
  const prefix = `STU-${currentYear}-`;

  const query = `
    SELECT id FROM students 
    WHERE id LIKE $1 
    ORDER BY id DESC 
    LIMIT 1
  `;
  const result = await pool.query(query, [`${prefix}%`]);

  if (result.rows.length === 0) {
    return `${prefix}001`;
  }

  const lastId = result.rows[0].id; // "STU-2026-005"
  const lastNumber = parseInt(lastId.split('-')[2], 10);
  const nextNumber = String(lastNumber + 1).padStart(3, '0');

  return `${prefix}${nextNumber}`;
};

module.exports = {
  generateStudentId,
};
