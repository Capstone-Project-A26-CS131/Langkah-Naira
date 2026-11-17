import React from "react";
import { Activity, CalendarDays, ChevronDown, FileText, LogOut, Menu, Search, ShieldCheck, UserRound, Users, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function DashboardPage({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const students = [
    { id: "LN-0024", name: "Nara Putri", registered: "12 Nov 2026", diagnosis: "Speech Delay", therapist: "Siti Rahma", date: "16 Nov 2026", time: "09.00–10.00 WIB", status: "Terkonfirmasi" },
    { id: "LN-0023", name: "Raka Pratama", registered: "11 Nov 2026", diagnosis: "Autism", therapist: "Dewi Lestari", date: "16 Nov 2026", time: "10.00–11.00 WIB", status: "Terkonfirmasi" },
    { id: "LN-0022", name: "Alin Safira", registered: "10 Nov 2026", diagnosis: "ADHD", therapist: "Arif Hidayat", date: "17 Nov 2026", time: "13.00–14.00 WIB", status: "Terkonfirmasi" },
    { id: "LN-0021", name: "Bima Aditya", registered: "09 Nov 2026", diagnosis: "CP", therapist: "Rina Wulandari", date: "17 Nov 2026", time: "13.00–14.00 WIB", status: "Terkonfirmasi" },
    { id: "LN-0020", name: "Kirana Ayu", registered: "08 Nov 2026", diagnosis: "Speech Delay", therapist: "Belum ditentukan", date: "Belum terjadwal", time: "-", status: "Belum terjadwal" },
  ];
  const filtered = useMemo(() => students.filter((student) => `${student.name} ${student.id} ${student.diagnosis}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const navigation = [
    { label: "Dashboard", icon: <Activity size={14} />, page: "dashboard" },
    { label: "Data Siswa ABK", icon: <Users size={14} />, page: "dashboard" },
    { label: "Jadwal Terapi", icon: <CalendarDays size={14} />, page: "schedule" },
  ];

  return <main className="admin-dashboard">
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="admin-brand"><span className="logo-mark">✦</span><div><strong>Langkah Naira</strong><small>LK NAIRA KENCANA</small></div><button className="sidebar-close" onClick={() => setSidebarOpen(false)}><X size={16} /></button></div>
      <span className="sidebar-label">MENU ADMIN</span>
      <nav className="sidebar-nav">{navigation.map((item) => <button key={item.label} className={item.label === "Dashboard" ? "active" : ""} onClick={() => { setSidebarOpen(false); onNavigate(item.page); }}>{item.icon}{item.label}</button>)}</nav>
      <div className="sidebar-tip"><ShieldCheck size={14} /><p>Data anak hanya untuk keperluan pendaftaran dan pendampingan terapi.</p></div>
      <button className="sidebar-logout" onClick={() => onNavigate("home")}><LogOut size={14} /> Keluar</button>
    </aside>
    <section className="admin-content">
      <header className="admin-topbar"><button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button><div className="admin-search"><Search size={14} /><input placeholder="Cari nama anak / diagnosis" value={query} onChange={(event) => setQuery(event.target.value)} /></div><button className="admin-user"><span>AN</span> Admin Naira <ChevronDown size={12} /></button></header>
      <div className="dashboard-content"><div className="dashboard-heading"><div><h1>Dashboard</h1><p>Selamat pagi. Berikut ringkasan layanan hari ini dengan penekanan pada riwayat pendaftaran.</p></div><small>Senin, 16 November 2026</small></div>
        <div className="admin-stat-grid"><div><span>Total siswa</span><strong>24</strong><small>Profil anak terdaftar</small><Users /></div><div><span>Sesi hari ini</span><strong>12</strong><small>Senin, 16 November</small><CalendarDays /></div><div><span>Terapi aktif</span><strong>6</strong><small>Mendampingi minggu ini</small><Activity /></div><div><span>Perlu verifikasi</span><strong>3</strong><small>Pendaftaran baru</small><FileText /></div></div>
        <section className="registration-history"><div className="history-heading"><div><h2>Riwayat Pendaftaran</h2><p>Lihat riwayat pendaftaran, status jadwal, dan aksi revisi terbaru.</p></div><button className="primary-button" onClick={() => onNavigate("register")}>Tambah Pendaftaran <span>＋</span></button></div>
          <div className="history-filters"><button>Semua diagnosis <ChevronDown size={11} /></button><button>Semua status <ChevronDown size={11} /></button></div>
          <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>ID Siswa</th><th>Nama Anak</th><th>Tanggal Daftar</th><th>Diagnosis</th><th>Terapis ditugaskan</th><th>Jadwal Terapi</th><th>Status Jadwal</th><th>Aksi</th></tr></thead><tbody>{filtered.map((student) => <tr key={student.id}><td>{student.id}</td><td><strong>{student.name}</strong></td><td>{student.registered}</td><td>{student.diagnosis}</td><td>{student.therapist}</td><td><strong>{student.date}</strong><small>{student.time}</small></td><td><span className={`admin-status ${student.status === "Terkonfirmasi" ? "confirmed" : "unscheduled"}`}>{student.status}</span></td><td><button className="row-action" aria-label={`Lihat ${student.name}`}><UserRound size={12} /> <span>⌕</span></button></td></tr>)}</tbody></table></div>
          <div className="history-footer"><span>Menampilkan 1–5 dari 24 siswa</span><div><button>‹</button><button className="current">1</button><button>2</button><button>…</button><button>5</button><button>›</button></div></div>
        </section>
        <p className="admin-disclaimer"><ShieldCheck size={13} /> Data contoh · Seluruh nama, diagnosis, terapis, dan jadwal pada tampilan ini bersifat fiktif.</p>
      </div>
    </section>
  </main>;
}
