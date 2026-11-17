const multer = require('multer');

// Memory storage keeps buffer in RAM for direct S3 upload or local write
const storage = multer.memoryStorage();

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
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
});

module.exports = {
  uploadPhoto,
};
