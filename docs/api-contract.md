# Kontrak REST API — Langkah Naira

Dokumen ini merupakan acuan resmi integrasi antarmuka antara **Frontend (React)**, **Backend (Express.js)**, dan **AI Microservice (FastAPI)**.

---

## 📌 Ketentuan Umum & Format Respons

### Base URL
- Local: `http://localhost:5001`

### Headers Standar
- `Content-Type: application/json`
- `Authorization: Bearer <JWT_TOKEN>` *(untuk endpoint protected)*

### Format Respons Sukses
```json
{
  "success": true,
  "message": "Pesan deskripsi keberhasilan operasi.",
  "data": { ... }
}
```

### Format Respons Error
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Pesan penjelasan kesalahan yang ramah pengguna."
}
```

### Format Respons Validasi (400)
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Data yang dikirim tidak valid.",
  "details": [
    {
      "field": "full_name",
      "message": "Nama lengkap anak wajib diisi."
    }
  ]
}
```

---

## 1. Modul Autentikasi (`/api/auth`)

### `POST /api/auth/register`
Mendaftarkan akun orang tua (wali murid) baru.

**Request Body:**
```json
{
  "name": "Budi Santoso",
  "email": "budi.santoso@example.com",
  "password": "Password123",
  "phone": "081234567890",
  "role": "parent"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registrasi berhasil.",
  "data": {
    "user": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Budi Santoso",
      "email": "budi.santoso@example.com",
      "role": "parent",
      "phone": "081234567890",
      "is_active": true,
      "created_at": "2026-11-16T08:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### `POST /api/auth/login`
Autentikasi untuk semua role (admin, parent, therapist).

**Request Body:**
```json
{
  "email": "admin@lknaira.id",
  "password": "Admin@1234"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login berhasil.",
  "data": {
    "user": {
      "id": "7ccd382b-c844-49cb-83f9-b6ae37f3c68f",
      "name": "Admin LK Naira",
      "email": "admin@lknaira.id",
      "role": "admin",
      "phone": "08111020417",
      "is_active": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### `GET /api/auth/me`
Mendapatkan profil pengguna yang sedang login berdasarkan token Bearer.

**Headers:**
- `Authorization: Bearer <TOKEN>`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profil pengguna berhasil diambil.",
  "data": {
    "user": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Budi Santoso",
      "email": "budi.santoso@example.com",
      "role": "parent",
      "phone": "081234567890",
      "is_active": true
    }
  }
}
```

---

## 2. Modul Formulir Pendaftaran Siswa (`/api/students`)

### `POST /api/students/register`
Mengisi formulir pendaftaran siswa baru secara online.  
**Otorisasi:** `parent`

**Headers:**
- `Authorization: Bearer <PARENT_TOKEN>`

**Request Body (Format Formulir Fisik LK Naira Kencana):**
```json
{
  "full_name": "Naufal Rizky Ramadhan",
  "nickname": "Naufal",
  "gender": "L",
  "religion": "Islam",
  "religion_other": null,
  "birth_place": "Bekasi",
  "birth_date": "2019-05-12",
  "living_with": "Kedua orang tua",
  "living_with_other": null,
  "hobbies": ["Olahraga", "Menggambar"],
  "hobbies_other": null,
  "sibling_older": 1,
  "sibling_younger": 0,
  "blood_type": "A",
  "health_aids": ["Tidak ada"],
  "health_aids_other": null,
  "health_notes": ["ADD/ADHD"],
  "health_notes_other": null,
  "is_allergic": true,
  "allergy_detail": "Debu dan dingin",
  "ever_hospitalized": false,
  "hospitalized_detail": null,
  "is_special_needs": true,
  "special_needs_diagnosis": "Speech Delay / Terlambat Bicara",
  "birth_history": "Normal",
  "birth_history_other": null,
  "height_cm": 112.5,
  "weight_kg": 18.3,
  "emergency_contact_1_phone": "08199999001",
  "emergency_contact_1_relation": "Bibi",
  "emergency_contact_2_phone": "08199999002",
  "emergency_contact_2_relation": "Paman",
  "emergency_contact_3_phone": null,
  "emergency_contact_3_relation": null,
  "personality_traits": ["Aktif", "Pemalu", "Cepat akrab"],
  "personality_other": null,
  "emotional_expressions": ["Menangis", "Diam"],
  "emotional_other": null,
  "social_frequency": "Jarang",
  "tv_hours_per_day": "1-2 jam",
  "gadget_hours_per_day": "1-2 jam",
  "other_habits": "Suka mengulang kata-kata tertentu",
  "independence_eating": "B",
  "independence_toilet": "A",
  "independence_wakeup": "B",
  "independence_dressing": "A",
  "independence_school_prep": "A",
  "independence_belongings": "A",
  "family_activities": ["Makan bersama", "Bermain"],
  "family_activities_other": null,
  "preferred_schedule": "Pagi"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Pendaftaran formulir siswa baru berhasil disimpan.",
  "data": {
    "id": "STU-2026-001",
    "parent_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "full_name": "Naufal Rizky Ramadhan",
    "status": "pending_verification",
    "created_at": "2026-11-16T08:10:00.000Z"
  }
}
```

---


### `POST /api/students/:id/photo`
Mengunggah pas foto 3x4 siswa (format: JPG, JPEG, PNG, WEBP, maks 2MB).  
**Otorisasi:** `parent` (pemilik), `admin`

**Headers:**
- `Authorization: Bearer <TOKEN>`
- `Content-Type: multipart/form-data`

**Form-Data Body:**
- `photo`: [File gambar]

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Foto siswa berhasil diunggah.",
  "data": {
    "id": "STU-2026-001",
    "full_name": "Naufal Rizky Ramadhan",
    "photo_url": "/uploads/students/photo-STU-2026-001-1731749000-1234.jpg"
  }
}
```

---
### `GET /api/students/my-students`
Melihat daftar riwayat anak yang didaftarkan oleh akun orang tua yang sedang login.  
**Otorisasi:** `parent`

**Headers:**
- `Authorization: Bearer <PARENT_TOKEN>`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Daftar anak Anda berhasil diambil.",
  "data": [
    {
      "id": "STU-2026-001",
      "full_name": "Naufal Rizky Ramadhan",
      "nickname": "Naufal",
      "gender": "L",
      "birth_date": "2019-05-12T00:00:00.000Z",
      "status": "pending_verification",
      "preferred_schedule": "Pagi",
      "created_at": "2026-11-16T08:10:00.000Z"
    }
  ]
}
```

---

### `GET /api/students`
Melihat seluruh daftar pendaftar siswa dengan fitur filtering, pagination, dan pencarian nama.  
**Otorisasi:** `admin`, `therapist`

**Headers:**
- `Authorization: Bearer <ADMIN_OR_THERAPIST_TOKEN>`

**Query Parameters:**
- `status` *(optional)*: `pending_verification` | `approved` | `rejected` | `active`
- `search` *(optional)*: Kata kunci nama siswa (e.g., `Naufal`)
- `page` *(optional, default: 1)*: Halaman data
- `limit` *(optional, default: 10)*: Jumlah data per halaman

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data siswa berhasil diambil.",
  "data": [
    {
      "id": "STU-2026-001",
      "full_name": "Naufal Rizky Ramadhan",
      "nickname": "Naufal",
      "gender": "L",
      "birth_date": "2019-05-12T00:00:00.000Z",
      "status": "pending_verification",
      "preferred_schedule": "Pagi",
      "created_at": "2026-11-16T08:10:00.000Z",
      "parent_name": "Budi Santoso",
      "parent_phone": "081234567890",
      "parent_email": "budi.santoso@example.com"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

### `GET /api/students/:id`
Melihat detail lengkap satu formulir profil siswa.  
**Otorisasi:** `admin`, `therapist`, `parent` *(hanya data anaknya sendiri)*

**Headers:**
- `Authorization: Bearer <TOKEN>`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Detail siswa berhasil diambil.",
  "data": {
    "id": "STU-2026-001",
    "full_name": "Naufal Rizky Ramadhan",
    "status": "pending_verification",
    "health_notes": ["ADD/ADHD"],
    "parent_name": "Budi Santoso",
    "parent_email": "budi.santoso@example.com",
    "parent_phone": "081234567890",
    "verified_by_name": null
  }
}
```

---

### `PUT /api/students/:id`
Memperbarui data formulir siswa.  
**Otorisasi:** `admin`, `parent` *(hanya data anaknya sendiri)*

**Headers:**
- `Authorization: Bearer <TOKEN>`

**Request Body (Partial update):**
```json
{
  "nickname": "Fal",
  "height_cm": 113.0,
  "weight_kg": 18.5,
  "preferred_schedule": "Siang"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data siswa berhasil diperbarui.",
  "data": {
    "id": "STU-2026-001",
    "nickname": "Fal",
    "height_cm": "113.0",
    "weight_kg": "18.5",
    "preferred_schedule": "Siang",
    "updated_at": "2026-11-16T08:25:00.000Z"
  }
}
```

---

### `PATCH /api/students/:id/verify`
Melakukan verifikasi persetujuan (Approve) atau penolakan (Reject) pendaftaran siswa.  
**Otorisasi:** `admin`

**Headers:**
- `Authorization: Bearer <ADMIN_TOKEN>`

**Request Body (Contoh Approve):**
```json
{
  "status": "approved"
}
```

**Request Body (Contoh Reject):**
```json
{
  "status": "rejected",
  "rejection_note": "Data formulir pendaftaran belum lengkap, mohon lengkapi dokumen catatan riwayat alergi dan kontak darurat ananda."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Pendaftaran siswa berhasil diverifikasi dan disetujui (Approved).",
  "data": {
    "id": "STU-2026-001",
    "full_name": "Naufal Rizky Ramadhan",
    "status": "approved",
    "rejection_note": null,
    "verified_by": "7ccd382b-c844-49cb-83f9-b6ae37f3c68f",
    "verified_at": "2026-11-16T08:30:00.000Z"
  }
}
```

---

## 3. Microservice AI (FastAPI)

### `POST /api/v1/extract-registration`
Menerima raw text (misal rekapan chat pendaftaran WhatsApp mentah) dan mengubahnya menjadi format JSON terstruktur untuk autofill formulir web.

**Request Body:**
```json
{
  "raw_text": "Halo admin LK Naira, mau daftarin anak saya Rizky lahir 10 Maret 2019 di Bekasi, tinggal bersama kedua orang tua. Ada keluhan belum lancar bicara (speech delay). Nomor kontak saya 081234567890."
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "parsed": {
    "child_name": "Rizky",
    "birth_place": "Bekasi",
    "birth_date": "2019-03-10",
    "special_needs_diagnosis": "Speech Delay",
    "living_with": "Kedua orang tua",
    "parent_phone": "081234567890"
  }
}
```
