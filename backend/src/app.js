require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const pool = require('./config/db');
const authRoutes = require('./modules/auth/auth.routes');
const studentRoutes = require('./modules/students/student.routes');
const errorHandler = require('./middleware/errorHandler');
const { errorResponse, successResponse } = require('./utils/response');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow frontend origin to load uploaded images
}));
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  return successResponse(res, 'Selamat datang di API Langkah Naira — Pusat Layanan & Terapi Anak Berkebutuhan Khusus LK Naira Kencana.', {
    version: '1.0.0',
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', async (req, res, next) => {
  try {
    const dbRes = await pool.query('SELECT NOW() as current_time');
    return successResponse(res, 'Sistem dan Database berfungsi dengan baik.', {
      database: 'connected',
      neon_db_time: dbRes.rows[0].current_time,
    });
  } catch (err) {
    next(err);
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.use((req, res) => {
  return errorResponse(res, `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan di server.`, 'ROUTE_NOT_FOUND', 404);
});

app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server Langkah Naira running at http://localhost:${PORT}`);
  });
}

module.exports = app;
