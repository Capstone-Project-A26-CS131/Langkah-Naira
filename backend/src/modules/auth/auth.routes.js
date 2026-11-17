const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const { registerSchema, loginSchema } = require('./auth.schema');
const validate = require('../../middleware/validate');
const { verifyToken } = require('../../middleware/auth');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', verifyToken, authController.getMe);

module.exports = router;
