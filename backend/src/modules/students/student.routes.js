const express = require('express');
const router = express.Router();

const studentController = require('./student.controller');
const {
  registerStudentSchema,
  updateStudentSchema,
  verifyStudentSchema,
} = require('./student.schema');

const validate = require('../../middleware/validate');
const { verifyToken, authorize } = require('../../middleware/auth');
const { uploadPhoto } = require('../../middleware/upload');

router.use(verifyToken);

router.post(
  '/register',
  authorize('parent'),
  validate(registerStudentSchema),
  studentController.registerStudent
);

router.get(
  '/my-students',
  authorize('parent'),
  studentController.getMyStudents
);

router.post(
  '/:id/photo',
  authorize('parent', 'admin'),
  uploadPhoto.single('photo'),
  studentController.uploadStudentPhoto
);

router.get(
  '/',
  authorize('admin', 'therapist'),
  studentController.getAllStudents
);

router.patch(
  '/:id/verify',
  authorize('admin'),
  validate(verifyStudentSchema),
  studentController.verifyStudent
);

router.get(
  '/:id',
  authorize('admin', 'therapist', 'parent'),
  studentController.getStudentById
);

router.put(
  '/:id',
  authorize('admin', 'parent'),
  validate(updateStudentSchema),
  studentController.updateStudent
);

module.exports = router;
