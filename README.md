# Langkah Naira

> **Capstone Project Asah 2026 led by Dicoding supported by GoTo**  
> **ID Tim:** A26-CS131  
> **Mitra UMKM:** LK Naira Kencana (Pusat Layanan & Terapi Anak Berkebutuhan Khusus / ABK)  
> **Judul Use Case:** Langkah Naira (Sistem Pendaftaran Siswa Baru & Manajemen Jadwal Terapi Anti Double-Booking)

---

## 📌 Ringkasan Proyek

**LK Naira Kencana** adalah pusat layanan pendidikan nonformal dan terapi khusus bagi anak berkebutuhan khusus (ABK) seperti *Autism, ADHD, Cerebral Palsy,* dan *Speech Delay*.

Aplikasi **Langkah Naira** adalah platform web (Minimum Viable Product) yang dirancang untuk:
1. **Pendaftaran Siswa Baru Online:** Mempermudah orang tua mengisi formulir serta mengonversi formulir mentah menggunakan AI parsing.
2. **Database Profil Siswa ABK Terpusat:** Manajemen data dan riwayat asesmen anak yang aman dan cepat dicari oleh admin.
3. **Engine Penjadwalan Terapi Anti-Bentrok (*Zero Double-Booking*):** Sistem penguncian slot jadwal terapi otomatis berbasis database locking untuk menghindari tabrakan jadwal terapis dan ruangan.
4. **Analitik Data & Rekapitulasi Sesi:** Dashboard statistik untuk memantau kehadiran dan kebutuhan kuota terapis.

---

## 👥 Tim Pengembang (A26-CS131)

| No | ID Peserta | Nama | Role | Fokus Area |
|---|---|---|---|---|
| 1 | FS013B6X1644 | **Selly Supriyatin** | AI Full-Stack Developer | Form Pendaftaran, Modul Kuota Terapis, Deployment |
| 2 | FS013B6Y0134 | **Alfaizuna Aulia Ulloh** | AI Full-Stack Developer | Database Profil Siswa, Engine Jadwal Anti Double-Booking, Backend API |
| 3 | FS013B6Y1920 | **Muhammad Arifin** | AI Full-Stack Developer | ERD Relasional, Modul Slot/Kuota, Video/Presentasi |
| 4 | DS009B6Y1168 | **Muhammad Haffel Ar Royyan** | Data Science Specialist | Data Wrangling, Dataset Sintetis ABK, Analisis Kehadiran & Dashboard |
| 5 | AE013B6X1445 | **Putri Maharani Salsabillah Wirahadikusuma** | Next-Gen AI Engineer | Problem Statement AI, Ekstraksi Formulir Pendaftaran (FastAPI) |
| 6 | AE009B6Y1470 | **Radityo Thurayya Putra** | Next-Gen AI Engineer | Desain Prompting Terstruktur, Validasi Engine AI & Guardrails |

---

## 🏗️ Arsitektur & Struktur Direktori

Repositori ini menggunakan arsitektur modular (*monorepo*):

```text
langkah-naira/
├── frontend/        # Client Web (React.js, Vite, Tailwind CSS, Axios)
├── backend/         # Core API Server (Node.js, Express.js, Joi, PostgreSQL Neon DB)
├── ai-service/      # AI Microservice (FastAPI, Python, Google Gemini / OpenAI API)
├── data-science/    # Dataset Sintetis, EDA Notebooks, & Dashboard Analitik (Streamlit)
├── docs/            # Kontrak API, ERD, Project Brief, dan Slide
└── .github/         # CI/CD Workflows
```

---

## 🚀 Panduan Memulai Cepat (Local Development)

### 1. Prasyarat
- [Node.js](https://nodejs.org/) (v18+) & npm
- [Python](https://www.python.org/) (v3.10+)
- Akun / Instance [PostgreSQL](https://neon.tech/) (atau local PostgreSQL)

### 2. Frontend (`frontend/`)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3. Backend (`backend/`)
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 4. AI Service (`ai-service/`)
```bash
cd ai-service
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
# source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### 5. Data Science Dashboard (`data-science/`)
```bash
cd data-science
pip install -r requirements.txt
streamlit run dashboard/app.py
```

---

## 🔒 Catatan Keamanan Data
Sesuai kepatuhan etika dan privasi data medis:
- **Tidak ada data medis atau kontak riil siswa/wali murid yang diunggah ke repositori.**
- Seluruh pengujian dan pemodelan menggunakan **data sintetis (*dummy data*)** yang dihasilkan secara terprogram.

