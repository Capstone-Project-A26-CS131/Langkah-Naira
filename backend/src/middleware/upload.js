/**
 * middleware/upload.js
 * Middleware upload foto siswa menggunakan Multer (Memory Storage)
 * File disimpan dalam RAM (buffer) sehingga bisa langsung di-stream ke Object Storage S3 atau disimpan ke lokal disk.
 */

const multer = require('multer');

// Gunakan memory storage agar file buffer siap dikirim ke S3 / disk
const storage = multer.memoryStorage();

// Filter tipe file (hanya gambar)
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung. Harap upload gambar dengan format JPG, JPEG, PNG, atau WEBP.'), false);
  }
};

const uploadPhoto = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Maksimal 2MB
  },
  fileFilter,
});

module.exports = {
  uploadPhoto,
};
