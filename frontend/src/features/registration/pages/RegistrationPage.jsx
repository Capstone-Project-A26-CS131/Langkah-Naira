import React from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import Field from "../../../components/forms/Field";

export default function RegistrationPage({ form, setForm, onNavigate }) {
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => { event.preventDefault(); onNavigate("schedule"); };

  return (
    <main className="subpage registration-page">
      <div className="page-container">
        <button className="back-link" onClick={() => onNavigate("home")}><ArrowLeft size={16} /> Kembali ke beranda</button>
        <div className="form-heading"><div><span className="overline">FORMULIR PENDAFTARAN</span><h1>Pendaftaran Anak Baru</h1><p>Lengkapi data diri, riwayat kesehatan, dan kontak orang tua. <b>* Wajib diisi.</b></p></div></div>
        <div className="registration-stepper"><div className="registration-step active"><span>1</span><strong>Data Awal</strong></div><i /><div className="registration-step"><span>2</span><strong>Riwayat Kesehatan</strong></div><i /><div className="registration-step"><span>3</span><strong>Kontak Orang Tua</strong></div></div>
        <div className="registration-layout">
          <form className="registration-form" onSubmit={submit}>
            <section className="form-card"><div className="form-card-title"><span className="number">01</span><div><h2>Data Pendaftaran</h2><p>Informasi dasar calon siswa yang akan mengikuti program.</p></div></div><div className="form-grid">
              <Field label="Nama lengkap anak" required><input required value={form.full_name} onChange={update("full_name")} placeholder="Tulis nama lengkap" /></Field>
              <Field label="Nama panggilan"><input value={form.nickname} onChange={update("nickname")} placeholder="Nama yang biasa dipanggil" /></Field>
              <Field label="Jenis kelamin" required><select required value={form.gender} onChange={update("gender")}><option value="">Pilih jenis kelamin</option><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></Field>
              <Field label="Tanggal lahir" required><input required type="date" value={form.birth_date} onChange={update("birth_date")} /></Field>
              <Field label="Tempat lahir"><input value={form.birth_place} onChange={update("birth_place")} placeholder="Kota tempat lahir" /></Field>
              <Field label="Agama"><select value={form.religion} onChange={update("religion")}><option value="">Pilih agama</option><option>Islam</option><option>Katolik</option><option>Protestan</option><option>Hindu</option><option>Budha</option><option>Lainnya</option></select></Field>
            </div><div className="form-section-divider"><span>02 / Riwayat Kesehatan</span></div><div className="form-grid">
              <Field label="Diagnosa / kebutuhan khusus"><select><option>Pilih kebutuhan anak</option><option>Autism</option><option>ADHD</option><option>Speech Delay</option><option>CP</option></select></Field>
              <Field label="Catatan kondisi"><input placeholder="Tuliskan kondisi atau kebutuhan anak" /></Field>
            </div></section>
            <section className="form-card"><div className="form-card-title"><span className="number">02</span><div><h2>Informasi pendamping</h2><p>Data orang tua atau wali yang dapat kami hubungi.</p></div></div><div className="form-grid">
              <Field label="Nama orang tua / wali" required><input required placeholder="Nama lengkap" /></Field>
              <Field label="Nomor WhatsApp" required><input required type="tel" placeholder="08xxxxxxxxxx" /></Field>
              <Field label="Tinggal bersama"><select value={form.living_with} onChange={update("living_with")}><option value="">Pilih</option><option>Kedua orang tua</option><option>Ayah</option><option>Ibu</option><option>Wali lainnya</option></select></Field>
              <Field label="Catatan tambahan"><input value={form.notes} onChange={update("notes")} placeholder="Hal yang ingin disampaikan" /></Field>
            </div></section>
            <div className="form-footer"><p><ShieldCheck size={16} /> Data Anda aman dan hanya digunakan untuk kebutuhan pendampingan.</p><button className="primary-button" type="submit">Lanjut pilih jadwal <ArrowRight size={17} /></button></div>
          </form>
          <aside className="registration-help"><div className="help-icon"><Check size={18} /></div><h2>Langkah Selanjutnya</h2><p>Admin akan memverifikasi data pendaftaran. Setelah disetujui, Anda dapat melanjutkan ke pemilihan jadwal terapi.</p><strong>Setelah data lengkap, lanjutkan ke pemilihan jadwal terapi.</strong><div className="example-note"><ShieldCheck size={15} /> Data contoh · Nama, nomor telepon, dan alamat bersifat fiktif.</div></aside>
        </div>
      </div>
    </main>
  );
}
