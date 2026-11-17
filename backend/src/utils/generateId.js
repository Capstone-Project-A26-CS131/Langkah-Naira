const pool = require('../config/db');

// Generates sequential student IDs by year (format: STU-YYYY-NNN).
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

  const lastId = result.rows[0].id;
  const lastNumber = parseInt(lastId.split('-')[2], 10);
  const nextNumber = String(lastNumber + 1).padStart(3, '0');

  return `${prefix}${nextNumber}`;
};

module.exports = {
  generateStudentId,
};
