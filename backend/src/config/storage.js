/**
 * config/storage.js
 * Modul S3-Compatible Object Storage (Neon Object Storage / Cloudflare R2 / AWS S3)
 * Mendukung auto-fallback ke local storage jika kredensial S3 belum diisi.
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_ACCESS_KEY;
const endpoint = process.env.AWS_ENDPOINT_URL_S3 || process.env.S3_ENDPOINT;
const region = process.env.AWS_REGION || process.env.S3_REGION || 'us-east-2';
const bucketName = process.env.S3_BUCKET_NAME || 'uploads';

// Cek apakah konfigurasi S3 lengkap
const isS3Configured = Boolean(accessKeyId && secretAccessKey && endpoint);

let s3Client = null;

if (isS3Configured) {
  s3Client = new S3Client({
    region,
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true, // Neon menggunakan path-style addressing
  });
  console.log('☁️  Neon Object Storage (S3) siap digunakan.');
} else {
  console.log('📁 Kredensial S3 tidak terisi — upload foto otomatis fallback ke Local Storage.');
}

/**
 * Upload file buffer ke S3-Compatible Object Storage
 * @param {Buffer} fileBuffer  - Isi file binary
 * @param {string} fileName    - Nama file tujuan
 * @param {string} mimeType    - Content type (misal: image/jpeg)
 * @returns {Promise<string>}  - URL publik foto di S3
 */
const uploadToS3 = async (fileBuffer, fileName, mimeType) => {
  if (!isS3Configured || !s3Client) {
    throw new Error('S3 Object Storage belum dikonfigurasi di environment variables.');
  }

  const key = `students/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await s3Client.send(command);

  // Bangun URL publik
  const cleanEndpoint = endpoint.replace(/\/$/, '');
  return `${cleanEndpoint}/${bucketName}/${key}`;
};

module.exports = {
  isS3Configured,
  uploadToS3,
};
