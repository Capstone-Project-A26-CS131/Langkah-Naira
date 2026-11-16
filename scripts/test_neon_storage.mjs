/**
 * scripts/test_neon_storage.mjs
 * Script pengujian upload, list, dan read back file ke Neon Object Storage menggunakan Files SDK
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { Files } from 'files-sdk';
import { neon } from 'files-sdk/neon';

async function main() {
  console.log('🚀 Memulai pengujian Neon Object Storage...');

  // Inisialisasi adapter Neon untuk bucket 'uploads'
  const files = new Files({ adapter: neon({ bucket: 'uploads' }) });

  const testFileName = `test-verify-${Date.now()}.txt`;
  const testContent = `Halo! Ini adalah file pengujian real upload ke Neon Object Storage untuk proyek Langkah Naira pada ${new Date().toISOString()}.`;

  // 1. Upload File
  console.log(`\n1️⃣  Mengunggah file "${testFileName}" ke bucket "uploads"...`);
  await files.upload(testFileName, testContent, { contentType: 'text/plain; charset=utf-8' });
  console.log('✅ File berhasil diunggah.');

  // 2. List Files di Bucket
  console.log('\n2️⃣  Melihat daftar file di bucket "uploads"...');
  const fileList = await files.list();
  console.log('✅ Output fileList:', fileList);

  const items = Array.isArray(fileList) ? fileList : (fileList.items || fileList.files || [fileList]);
  for (const item of items) {
    console.log(`   - File: ${item.key || item.name || JSON.stringify(item)}`);
  }

  // 3. Download & Read File Back
  console.log(`\n3️⃣  Membaca kembali isi file "${testFileName}" dari bucket...`);
  const downloadedFile = await files.download(testFileName);
  const downloadedText = await downloadedFile.text();

  console.log('\n================== ISI FILE DARI BUCKET ==================');
  console.log(downloadedText);
  console.log('==========================================================');

  // Validasi kecocokan
  if (downloadedText === testContent) {
    console.log('\n🎉 VERIFIKASI BERHASIL: Konten file yang diunduh persis 100% sama!');
  } else {
    throw new Error('Konten tidak sesuai!');
  }
}

main().catch((err) => {
  console.error('❌ Gagal melakukan pengujian:', err);
  process.exit(1);
});
