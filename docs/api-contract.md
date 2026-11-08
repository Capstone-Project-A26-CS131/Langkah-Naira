# Kontrak REST API - Langkah Naira

Dokumen ini merupakan acuan awal integrasi antarmuka antara **Frontend (React)**, **Backend (Express)**, dan **AI Microservice (FastAPI)**.

---

## 1. Modul Pendaftaran Siswa Baru

### `POST /api/students/register`
Mendaftarkan siswa baru secara online.

**Request Body:**
```json
{
  "parent_name": "Budi Santoso",
  "parent_phone": "081234567890",
  "child_name": "Naufal",
  "child_dob": "2018-05-12",
  "diagnosis_note": "Speech Delay / Suspek Autism",
  "preferred_schedule": "Pagi"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Pendaftaran siswa baru berhasil disimpan.",
  "data": {
    "student_id": "STU-2026-001",
    "child_name": "Naufal",
    "status": "pending_verification"
  }
}
```

---

## 2. Modul Penjadwalan & Engine Anti-Bentrok (*Zero Double-Booking*)

### `GET /api/schedules/available-slots`
Melihat slot waktu yang tersedia berdasarkan tanggal dan spesialisasi terapis.

**Query Params:**
- `date` (YYYY-MM-DD)
- `therapist_id` (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "slot_id": "SLOT-0900",
      "time_start": "09:00",
      "time_end": "10:00",
      "therapist_id": "TH-01",
      "therapist_name": "Terapis A",
      "is_available": true
    }
  ]
}
```

### `POST /api/schedules/book-slot`
Mengunci slot jadwal terapi. Dilindungi mekanisme transaksi database (*pessimistic/optimistic lock*).

**Request Body:**
```json
{
  "student_id": "STU-2026-001",
  "slot_id": "SLOT-0900",
  "date": "2026-12-01",
  "therapist_id": "TH-01"
}
```

**Response (200 OK - Slot Berhasil Dikunci):**
```json
{
  "success": true,
  "message": "Slot jadwal berhasil dikunci.",
  "data": {
    "booking_id": "BK-20261201-001",
    "status": "confirmed"
  }
}
```

**Response (409 Conflict - Slot Sudah Terisi):**
```json
{
  "success": false,
  "error": "SLOT_ALREADY_BOOKED",
  "message": "Maaf, slot jadwal pada jam tersebut baru saja dipilih oleh pendaftar lain. Silakan pilih slot lainnya."
}
```

---

## 3. Microservice AI (FastAPI)

### `POST /api/v1/extract-registration`
Menerima raw text (misal rekapan chat pendaftaran WhatsApp mentah) dan mengubahnya menjadi format JSON terstruktur untuk autofill formulir.

**Request Body:**
```json
{
  "raw_text": "Halo admin, mau daftarin anak saya Rizky lahir 10 Maret 2019, ada keluhan belum lancar bicara. Nomor saya 0811..."
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "parsed": {
    "child_name": "Rizky",
    "child_dob": "2019-03-10",
    "category": "Speech Delay",
    "parent_phone": "0811..."
  }
}
```

