# 🗂️ Backend Plan — Langkah Naira REST API
### Modul: Pendaftaran Siswa & Authentication

> **Stack:** Node.js + Express.js · PostgreSQL (Neon DB) · JWT Authentication  
> **Versi rencana:** 2.1 · 16 November 2026  
> **Formulir referensi:** Formulir Pendaftaran Fisik LK Naira Kencana  
> **Scope:** Modul Pendaftaran Siswa + Auth (modul jadwal & double-booking menyusul)

---

## ✅ Task List Implementasi

> Kerjakan **berurutan** dari atas ke bawah.

### Phase 1 — Project Setup ✅ SELESAI
- [x] `1.1` Update `package.json` — tambah dependencies baru (`jsonwebtoken`, `bcryptjs`, `uuid`)
- [x] `1.2` Update `.env` — isi semua variable yang dibutuhkan
- [x] `1.3` Update `.env.example` — tanpa nilai sensitif
- [x] `1.4` Buat `src/config/db.js` — koneksi pg Pool ke Neon DB

### Phase 2 — Database Migration ✅ SELESAI
- [x] `2.1` Buat `migrations/001_init.sql` — DDL tabel `users`
- [x] `2.2` Buat `migrations/001_init.sql` — DDL tabel `students` (lengkap sesuai formulir)
- [x] `2.3` Jalankan migration ke Neon DB
- [x] `2.4` Buat `seeds/seed_admin.sql` — insert 1 akun admin awal
- [x] `2.5` Jalankan seed ke Neon DB

### Phase 3 — Utilities ### Phase 3 — Utilities & Middleware Middleware ✅ SELESAI
- [x] `3.1` Buat `src/utils/response.js` — helper `successResponse()` & `errorResponse()`
- [x] `3.2` Buat `src/utils/generateId.js` — generate ID format `STU-2026-001`
- [x] `3.3` Buat `src/middleware/errorHandler.js` — global error handler
- [x] `3.4` Buat `src/middleware/validate.js` — Joi validation middleware
- [x] `3.5` Buat `src/middleware/auth.js` — JWT verify + role guard

### Phase 4 — Modul Auth ✅ SELESAI
- [x] `4.1` Buat `src/modules/auth/auth.schema.js` — Joi schema untuk register & login
- [x] `4.2` Buat `src/modules/auth/auth.controller.js`:
  - `POST /api/auth/register` — daftar akun parent
  - `POST /api/auth/login` — login semua role, return JWT
  - `GET  /api/auth/me` — data user yang sedang login
- [x] `4.3` Buat `src/modules/auth/auth.routes.js` — daftarkan routes auth

### Phase 5 — Modul Pendaftaran Siswa ✅ SELESAI
- [x] `5.1` Buat `src/modules/students/student.schema.js` — Joi schema validasi formulir lengkap
- [x] `5.2` Buat `src/modules/students/student.controller.js`:
  - `POST /api/students/register` — submit formulir (parent)
  - `GET  /api/students/my-students` — daftar anak milik parent yang login
  - `GET  /api/students` — semua siswa + filter status (admin & therapist)
  - `GET  /api/students/:id` — detail profil siswa
  - `PUT  /api/students/:id` — update data siswa
  - `PATCH /api/students/:id/verify` — approve / reject (admin)
- [x] `5.3` Buat `src/modules/students/student.routes.js` — daftarkan routes siswa

### Phase 6 — Entry Point ### Phase 6 — Entry Point & Integrasi Integrasi ✅ SELESAI
- [x] `6.1` Buat `src/app.js` — setup Express, middleware global, mount semua routes
- [x] `6.2` Test koneksi DB berjalan saat server start
- [x] `6.3` Test semua endpoint dengan Postman / Thunder Client

---

## 1. Tech Stack & Dependencies

| Paket | Kegunaan | Status |
|---|---|---|
| `express` | HTTP framework | ✅ Sudah ada |
| `pg` | PostgreSQL client | ✅ Sudah ada |
| `dotenv` | Env variables | ✅ Sudah ada |
| `joi` | Validasi request body | ✅ Sudah ada |
| `cors` | Cross-origin resource sharing | ✅ Sudah ada |
| `helmet` | Security headers | ✅ Sudah ada |
| `morgan` | HTTP request logger | ✅ Sudah ada |
| `nodemon` | Auto-restart dev | ✅ Sudah ada |
| `jsonwebtoken` | Buat & verifikasi JWT | ✅ Terinstall |
| `bcryptjs` | Hash password | ✅ Terinstall |
| `uuid` | Generate ID unik | ✅ Terinstall |

---

## 2. Struktur Folder Backend

```
backend/
├── src/
│   ├── app.js                        ← Entry point Express
│   ├── config/
│   │   └── db.js                     ← Koneksi pg Pool (Neon DB)  ✅
│   ├── middleware/
│   │   ├── auth.js                   ← Verifikasi JWT + role guard
│   │   ├── validate.js               ← Joi validation middleware
│   │   └── errorHandler.js           ← Global error handler
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   └── auth.schema.js
│   │   └── students/
│   │       ├── student.routes.js
│   │       ├── student.controller.js
│   │       └── student.schema.js
│   └── utils/
│       ├── generateId.js             ← STU-2026-001
│       └── response.js               ← Helper format respons JSON
├── migrations/
│   └── 001_init.sql                  ← DDL tabel users + students
├── seeds/
│   └── seed_admin.sql                ← Akun admin awal
├── .env                              ✅
├── .env.example                      ✅
└── package.json                      ✅
```

---

## 3. Environment Variables (`.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database (Neon DB)
DATABASE_URL=postgresql://neondb_owner:npg_l76okUOuvctz@ep-lingering-grass-bde1dzk7-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# JWT
JWT_SECRET=langkah_naira_super_secret_key_2026
JWT_EXPIRES_IN=7d

# CORS
CLIENT_ORIGIN=http://localhost:5173
```

---

## 4. Database Schema

### Tabel `users`

```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        VARCHAR(20)  NOT NULL CHECK (role IN ('admin', 'parent', 'therapist')),
  phone       VARCHAR(20),
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);
```

### Tabel `students`
> Kolom diturunkan langsung dari formulir fisik LK Naira Kencana.

```sql
CREATE TABLE students (
  -- Identitas
  id                      VARCHAR(20) PRIMARY KEY,        -- STU-2026-001
  parent_id               UUID REFERENCES users(id) ON DELETE SET NULL,

  -- DATA ANAK
  full_name               VARCHAR(150) NOT NULL,
  nickname                VARCHAR(80),
  gender                  CHAR(1) NOT NULL CHECK (gender IN ('L','P')),
  religion                VARCHAR(20)  CHECK (religion IN ('Islam','Katolik','Protestan','Budha','Hindu','Lainnya')),
  religion_other          VARCHAR(100),

  birth_place             VARCHAR(100),
  birth_date              DATE NOT NULL,

  living_with             VARCHAR(50)  CHECK (living_with IN (
                            'Kedua orang tua','Ayah','Ibu','Paman','Bibi',
                            'Kakek','Nenek','Saudara kandung','Kerabat jauh',
                            'Orang tua angkat','Lainnya')),
  living_with_other       VARCHAR(100),

  hobbies                 TEXT[],                         -- multi-select
  hobbies_other           VARCHAR(200),

  sibling_older           SMALLINT DEFAULT 0,
  sibling_younger         SMALLINT DEFAULT 0,

  blood_type              CHAR(2) CHECK (blood_type IN ('A','B','AB','O')),

  health_aids             TEXT[],                         -- multi-select
  health_aids_other       VARCHAR(200),

  health_notes            TEXT[],                         -- multi-select diagnosis
  health_notes_other      VARCHAR(200),

  -- RIWAYAT MEDIS
  is_allergic             BOOLEAN DEFAULT FALSE,
  allergy_detail          TEXT,
  ever_hospitalized       BOOLEAN DEFAULT FALSE,
  hospitalized_detail     TEXT,
  is_special_needs        BOOLEAN DEFAULT FALSE,
  special_needs_diagnosis TEXT,

  birth_history           VARCHAR(20) CHECK (birth_history IN ('Normal','Cesar','Vakum','Lainnya')),
  birth_history_other     VARCHAR(100),

  height_cm               NUMERIC(5,1),
  weight_kg               NUMERIC(5,2),

  -- KONTAK DARURAT
  emergency_contact_1_phone    VARCHAR(20),
  emergency_contact_1_relation VARCHAR(50),
  emergency_contact_2_phone    VARCHAR(20),
  emergency_contact_2_relation VARCHAR(50),
  emergency_contact_3_phone    VARCHAR(20),
  emergency_contact_3_relation VARCHAR(50),

  -- KEBIASAAN - SIKAP - EMOSI
  personality_traits      TEXT[],                         -- multi-select
  personality_other       VARCHAR(200),

  emotional_expressions   TEXT[],                         -- multi-select
  emotional_other         VARCHAR(200),

  social_frequency        VARCHAR(20) CHECK (social_frequency IN ('Sering','Jarang','Tidak pernah')),
  tv_hours_per_day        VARCHAR(20) CHECK (tv_hours_per_day IN ('0 jam','<1 jam','1-2 jam','2-3 jam','>3 jam')),
  gadget_hours_per_day    VARCHAR(20) CHECK (gadget_hours_per_day IN ('0 jam','<1 jam','1-2 jam','2-3 jam','>3 jam')),
  other_habits            TEXT,

  -- KEMANDIRIAN (A=dibantu, B=sendiri)
  independence_eating         CHAR(1) CHECK (independence_eating IN ('A','B')),
  independence_toilet         CHAR(1) CHECK (independence_toilet IN ('A','B')),
  independence_wakeup         CHAR(1) CHECK (independence_wakeup IN ('A','B')),
  independence_dressing       CHAR(1) CHECK (independence_dressing IN ('A','B')),
  independence_school_prep    CHAR(1) CHECK (independence_school_prep IN ('A','B')),
  independence_belongings     CHAR(1) CHECK (independence_belongings IN ('A','B')),

  -- KEGIATAN BERSAMA ORANG TUA
  family_activities       TEXT[],                         -- multi-select
  family_activities_other VARCHAR(200),

  -- PREFERENSI JADWAL
  preferred_schedule      VARCHAR(20) CHECK (preferred_schedule IN ('Pagi','Siang','Sore')),

  -- STATUS PENDAFTARAN
  status          VARCHAR(30) NOT NULL DEFAULT 'pending_verification',
  -- nilai: pending_verification | approved | rejected | active
  rejection_note  TEXT,
  verified_by     UUID REFERENCES users(id),
  verified_at     TIMESTAMP,

  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

---

## 5. Endpoint API (Scope Modul Pendaftaran)

### 🔐 Auth (`/api/auth`)

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/auth/register` | Daftar akun parent | ❌ Public |
| `POST` | `/api/auth/login` | Login semua role, return JWT | ❌ Public |
| `GET`  | `/api/auth/me` | Data user yang sedang login | ✅ Semua role |

### 👶 Pendaftaran Siswa (`/api/students`)

| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/students/register` | Submit formulir pendaftaran lengkap | ✅ Parent |
| `GET`  | `/api/students/my-students` | Daftar anak milik parent yang login | ✅ Parent |
| `GET`  | `/api/students` | Semua siswa + filter + pagination | ✅ Admin, Therapist |
| `GET`  | `/api/students/:id` | Detail profil satu siswa | ✅ Semua role* |
| `PUT`  | `/api/students/:id` | Update data siswa | ✅ Admin / Parent (milik sendiri) |
| `PATCH`| `/api/students/:id/verify` | Approve / reject pendaftaran | ✅ Admin |

**Query params `GET /api/students`:**
- `status` → `pending_verification` / `approved` / `rejected` / `active`
- `search` → nama anak
- `page`, `limit` → pagination

**Body `PATCH /api/students/:id/verify`:**
```json
{
  "status": "approved",
  "rejection_note": "..."
}
```

---

## 6. Authentication & Authorization Flow

```
POST /api/auth/register
  → validasi Joi
  → cek email belum terdaftar
  → bcrypt.hash(password)
  → INSERT ke tabel users
  → return user data (tanpa password)

POST /api/auth/login
  → validasi Joi
  → cek email di DB
  → bcrypt.compare(password, hash)
  → jwt.sign({ id, name, email, role }, JWT_SECRET, { expiresIn })
  → return { token, user }

Request protected:
  Header: Authorization: Bearer <token>
  │
  middleware/auth.js
  ├─ jwt.verify(token)
  ├─ cek user is_active = true
  └─ req.user = { id, name, email, role }

  middleware/roleGuard('admin')
  └─ if (req.user.role not in allowedRoles) → 403 Forbidden
```

### Role Permission Matrix

| Aksi | admin | parent | therapist |
|------|:-----:|:------:|:---------:|
| Daftar akun | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ |
| Submit formulir siswa | ❌ | ✅ | ❌ |
| Lihat anak sendiri | ❌ | ✅ | ❌ |
| Lihat semua siswa | ✅ | ❌ | ✅ |
| Update data siswa | ✅ | ✅ (milik sendiri) | ❌ |
| Approve / Reject | ✅ | ❌ | ❌ |

---

## 7. Format Respons Standar

```json
// Sukses
{ "success": true, "message": "...", "data": { ... } }

// Error umum
{ "success": false, "error": "ERROR_CODE", "message": "..." }

// Error validasi (400)
{ "success": false, "error": "VALIDATION_ERROR", "details": ["field: pesan"] }

// List dengan pagination
{
  "success": true,
  "data": [...],
  "pagination": { "page": 1, "limit": 10, "total": 42, "totalPages": 5 }
}
```

---

## 8. Contoh Request Body: Formulir Pendaftaran

`POST /api/students/register`

```json
{
  "full_name": "Naufal Rizky",
  "nickname": "Naufal",
  "gender": "L",
  "religion": "Islam",
  "religion_other": null,
  "birth_place": "Bekasi",
  "birth_date": "2018-05-12",
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
  "allergy_detail": "Debu",
  "ever_hospitalized": false,
  "hospitalized_detail": null,
  "is_special_needs": true,
  "special_needs_diagnosis": "Speech Delay",
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
  "personality_traits": ["Aktif", "Pemalu"],
  "personality_other": null,
  "emotional_expressions": ["Menangis", "Menjerit"],
  "emotional_other": null,
  "social_frequency": "Jarang",
  "tv_hours_per_day": "1-2 jam",
  "gadget_hours_per_day": "2-3 jam",
  "other_habits": "Suka menyusun benda-benda",
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

---

> [!NOTE]
> Modul jadwal & booking (termasuk zero double-booking engine) akan dikerjakan di fase berikutnya setelah modul pendaftaran selesai dan terverifikasi.

> [!IMPORTANT]
> Kolom `TEXT[]` (array) di PostgreSQL digunakan untuk field multi-select seperti `hobbies`, `health_notes`, `personality_traits`, dll. Tidak perlu tabel join tambahan.

> [!TIP]
> File `.env` sudah dimasukkan ke `.gitignore`. Hanya `.env.example` yang di-commit ke repositori.
