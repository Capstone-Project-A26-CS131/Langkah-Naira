import React from "react";
import { CalendarDays, Check, Heart, LayoutDashboard, Users, ArrowRight } from "lucide-react";
import ServiceCard from "../../../components/common/ServiceCard";

export default function HomePage({ onNavigate }) {
  return (
    <main>
      <section className="hero-section">
        <div className="page-container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> Teman tumbuh buah hati</span>
            <h1>Langkah Tepat untuk <em>Tumbuh Kembang Buah Hati</em></h1>
            <p>Pendampingan terapi yang sesuai dengan kebutuhan anak, pendaftaran yang sederhana dan jadwal yang jelas.</p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => onNavigate("register")}>Daftar sekarang <ArrowRight size={17} /></button>
              <button className="text-button" onClick={() => onNavigate("schedule")}>Lihat layanan <ArrowRight size={16} /></button>
            </div>
            <div className="hero-note"><Check size={16} /> Tumbuh dengan cinta, berkembang dengan percaya.</div>
          </div>
          <div className="hero-illustration" aria-label="Ilustrasi lingkungan tumbuh anak">
            <div className="hero-info-card"><div className="hero-info-icon"><Check size={17} /></div><div><strong>Satu langkah kecil,<br />dukungan yang berarti.</strong><p>Kebutuhan setiap anak berbeda. Kami membantu keluarga memulai dengan alur yang terarah.</p></div></div>
          </div>
        </div>
      </section>
      <section className="service-section needs-section page-container">
        <div className="section-title"><div><span className="overline">DUKUNGAN SESUAI KEBUTUHAN ANAK</span><h2>Dukungan sesuai kebutuhan anak</h2><p>Empat layanan terapi, dengan tujuan tumbuh kembang yang personal.</p></div><p className="section-caption">Temukan langkah terbaik untuk si kecil.</p></div>
        <div className="service-grid">
          <ServiceCard icon={<Users />} title="Autism" text="Pendampingan interaksi sosial, komunikasi, dan kemandirian anak." onClick={() => onNavigate("schedule")} tone="lavender" />
          <ServiceCard icon={<CalendarDays />} title="ADHD" text="Dukungan untuk membangun fokus, regulasi diri, dan rutinitas positif." onClick={() => onNavigate("schedule")} tone="yellow" />
          <ServiceCard icon={<LayoutDashboard />} title="Speech Delay" text="Stimulasi kemampuan bicara, bahasa, dan komunikasi sehari-hari." onClick={() => onNavigate("schedule")} tone="lavender" />
          <ServiceCard icon={<Heart />} title="CP" text="Pendampingan Cerebral Palsy untuk mendukung gerak dan aktivitas anak." onClick={() => onNavigate("schedule")} tone="yellow" />
        </div>
      </section>
      <section className="steps-section"><div className="page-container"><div className="section-title"><div><span className="overline">MUDAH DENGAN LANGKAH NAIRA</span><h2>Mulai dengan langkah kecil.</h2></div></div><div className="steps-grid"><div><b>01</b><h3>Daftarkan si kecil</h3><p>Isi formulir pendaftaran dengan mudah.</p></div><div><b>02</b><h3>Pilih jadwal terapi</h3><p>Tentukan waktu yang paling nyaman.</p></div><div><b>03</b><h3>Mulai bertumbuh</h3><p>Dampingi prosesnya bersama kami.</p></div></div></div></section>
    </main>
  );
}
