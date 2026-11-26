# AI Service — Langkah Naira (LK Naira Kencana)

Microservice berbasis **FastAPI (Python)** untuk **Langkah Naira** (Tim **A26-CS131** — Capstone Asah 2026), yang bertugas menangani pemrosesan bahasa alami (*NLP Registration Parser*), klasifikasi kebutuhan layanan terapi Anak Berkebutuhan Khusus (ABK), serta asisten penjadwalan dengan pembatasan konteks (*strict domain guardrail*).

---

## 1. Problem Statement Modul AI

* **Pengguna Sasaran:** Admin/Pengelola **LK Naira Kencana** (Bekasi Timur) dan Orang Tua/Wali Murid ABK.
* **Kondisi Sebelum Solusi:** Pendaftaran siswa baru dan konsultasi awal dikirim oleh orang tua melalui pesan chat WhatsApp dengan format teks bebas yang tidak seragam. Admin harus membaca pesan satu per satu, menafsirkan keluhan/riwayat anak, lalu menyalinnya secara manual ke buku induk atau *spreadsheet* (>30 menit waktu pencarian berkas), sehingga rawan terjadi salah ketik riwayat kondisi anak serta ketidaktepatan alokasi layanan terapi awal.
* **Solusi AI yang Dikembangkan:**
  1. **Structured Registration Parser (NLP / Gen AI):** Mengonversi teks mentah pendaftaran WhatsApp menjadi objek JSON terstruktur yang selaras dengan skema tabel `students` PostgreSQL (`001_init.sql`) dan kontrak API `POST /api/v1/extract-registration` untuk fitur *autofill* formulir pendaftaran online.
  2. **Therapy Service Classifier (Main Quest ML Model):** Model klasifikasi berbasis teks yang dilatih menggunakan dataset sintetis profil ABK untuk memetakan keluhan dan diagnosis awal (`ASD`, `ADHD`, `Cerebral Palsy`, `Speech Delay`) ke rekomendasi jenis layanan terapi (`Asesmen Awal`, `Terapi Wicara`, `Terapi Okupasi`, `Terapi Perilaku`, `Sensori Integrasi`, `Terapi Gangguan Motorik`).
  3. **Strict Context Guardrail:** Pembatasan *System Prompt* agar layanan AI hanya memproses topik pendaftaran serta layanan terapi LK Naira Kencana, dan menolak pertanyaan di luar konteks secara sopan.

---

## 2. Desain Prompting & Kontrak Data

Seluruh aturan instruksi sistem, contoh *Few-Shot*, pemetaan `CHECK` constraint database, dan aturan penolakan *out-of-scope* didefinisikan secara terpusat di modul:
* `ai-service/prompts/templates.py`

### Endpoint Utama (Selaras dengan `docs/api-contract.md`)
* **Endpoint:** `POST /api/v1/extract-registration`
* **Input:** `{"raw_text": "<pesan mentah pendaftaran>"}`
* **Output:** JSON tervalidasi dengan objek `parsed` yang memetakan field formulir pendaftaran LK Naira Kencana (`full_name`, `nickname`, `gender`, `birth_place`, `birth_date`, `living_with`, `is_special_needs`, `special_needs_diagnosis`, `health_notes`, `is_allergic`, `allergy_detail`, `other_habits`, `preferred_schedule`, `parent_phone`, dan `recommended_services`).

---

## 3. Sumber Data, Library & API (Sitasi)

* **Dataset:** Dataset sintetis profil siswa ABK yang disusun oleh tim Data Science (`data-science/`) berdasarkan struktur formulir pendaftaran fisik dan katalog layanan **LK Naira Kencana** (tanpa menggunakan data rekam medis maupun kontak asli wali murid demi menjaga privasi).
* **Framework & Library:** Python 3.10+, FastAPI, Pydantic, Scikit-Learn, Google GenAI SDK (`google-genai`).
* **Model AI:** Hybrid Pipeline (Model klasifikasi lokal + `gemini-2.5-flash` untuk ekstraksi entitas terstruktur dengan *rule-based regex fallback*).
* **Tautan Model Terlatih (Google Drive):** *[Akan diperbarui setelah tahap pelatihan model di Minggu 2]*

---

## 4. Evaluasi Model & Pengujian Guardrail *(In Progress — Minggu 2 & 3)*

| Model / Konfigurasi | Metrik Evaluasi (Accuracy / F1-Score) | Latensi Rata-rata | Catatan Pemilihan |
| :--- | :--- | :--- | :--- |
| *Baseline Model 1 (Minggu 2)* | *TBD* | *TBD* | *Akan diisi pada fase eksperimen Minggu 2* |
| *Candidate Model 2 (Minggu 2)* | *TBD* | *TBD* | *Akan diisi pada fase eksperimen Minggu 2* |