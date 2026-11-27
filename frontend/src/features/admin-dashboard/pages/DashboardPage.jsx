import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  HeartHandshake,
  Lock,
  LogOut,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

import logoImage from "../../../assets/images/logo-naira-kencana.webp";

export default function DashboardPage({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const students = [
    {
      id: "LN-0024",
      name: "Nara Putri",
      registered: "12 Nov 2026",
      diagnosis: "Speech Delay",
      therapist: "Siti Rahma, S.Tr.Ter",
      date: "16 Nov 2026",
      time: "09.00–10.00 WIB",
      status: "Terkonfirmasi",
      room: "Ruang Terapi 01",
    },
    {
      id: "LN-0023",
      name: "Raka Pratama",
      registered: "11 Nov 2026",
      diagnosis: "Autism",
      therapist: "Dewi Lestari, S.Tr.Kes",
      date: "16 Nov 2026",
      time: "10.00–11.00 WIB",
      status: "Terkonfirmasi",
      room: "Ruang Sensori",
    },
    {
      id: "LN-0022",
      name: "Alin Safira",
      registered: "10 Nov 2026",
      diagnosis: "ADHD",
      therapist: "Arif Hidayat, S.Psi",
      date: "17 Nov 2026",
      time: "13.00–14.00 WIB",
      status: "Terkonfirmasi",
      room: "Ruang Okupasi",
    },
    {
      id: "LN-0021",
      name: "Bima Aditya",
      registered: "09 Nov 2026",
      diagnosis: "Cerebral Palsy",
      therapist: "Rina Wulandari, S.Tr.Ftr",
      date: "17 Nov 2026",
      time: "13.00–14.00 WIB",
      status: "Terkonfirmasi",
      room: "Ruang Fisioterapi",
    },
    {
      id: "LN-0020",
      name: "Kirana Ayu",
      registered: "08 Nov 2026",
      diagnosis: "Speech Delay",
      therapist: "Belum ditentukan",
      date: "Belum terjadwal",
      time: "-",
      status: "Belum terjadwal",
      room: "-",
    },
  ];

  const filtered = useMemo(() => {
    return students.filter((student) => {
      const matchesQuery = `${student.name} ${student.id} ${student.diagnosis} ${student.therapist}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesFilter =
        selectedFilter === "all" ||
        (selectedFilter === "confirmed" && student.status === "Terkonfirmasi") ||
        (selectedFilter === "pending" && student.status === "Belum terjadwal") ||
        student.diagnosis.toLowerCase().includes(selectedFilter.toLowerCase());
      return matchesQuery && matchesFilter;
    });
  }, [query, selectedFilter]);

  const navigation = [
    { label: "Dashboard", icon: <Activity size={16} />, page: "dashboard", active: true },
    { label: "Data Siswa ABK", icon: <Users size={16} />, page: "dashboard" },
    { label: "Jadwal Terapi", icon: <CalendarDays size={16} />, page: "schedule" },
    { label: "Terapis & Kuota", icon: <HeartHandshake size={16} />, page: "dashboard" },
  ];

  const calendarDays = [
    { day: "29", muted: true }, { day: "30", muted: true }, { day: "31", muted: true },
    { day: "1" }, { day: "2" }, { day: "3" }, { day: "4" },
    { day: "5" }, { day: "6" }, { day: "7" }, { day: "8" }, { day: "9" }, { day: "10" }, { day: "11" },
    { day: "12" }, { day: "13" }, { day: "14", hasSession: true, tone: "blue" },
    { day: "15", hasSession: true, tone: "blue" }, { day: "16", hasSession: true, tone: "purple" },
    { day: "17", hasSession: true, tone: "purple" }, { day: "18" },
    { day: "19" }, { day: "20" }, { day: "21" }, { day: "22" }, { day: "23" }, { day: "24" }, { day: "25" },
    { day: "26" }, { day: "27" }, { day: "28" }, { day: "29" }, { day: "30" },
  ];

  const topStudents = [
    {
      name: "Nara Putri",
      detail: "Speech Delay · Terapi Wicara",
      score: "99.8%",
      rank: "1st",
      bgTone: "bg-[#FFFCEE] border-[#FCEEC2]",
      badgeTone: "bg-[#FFF4C4] text-[#7A610A]",
      avatarTone: "bg-[#EAE0FA] text-[#553E87]",
      scoreTone: "text-[#553E87]",
      initials: "NP",
    },
    {
      name: "Raka Pratama",
      detail: "Autism · Sensori Integrasi",
      score: "98.5%",
      rank: "2nd",
      bgTone: "bg-[#F3F8FD] border-[#D6E6F7]",
      badgeTone: "bg-[#DDECFB] text-[#295A8D]",
      avatarTone: "bg-[#DDECFB] text-[#295A8D]",
      scoreTone: "text-[#295A8D]",
      initials: "RP",
    },
    {
      name: "Alin Safira",
      detail: "ADHD · Terapi Perilaku",
      score: "97.4%",
      rank: "3rd",
      bgTone: "bg-[#FAF7FE] border-[#E8DCF9]",
      badgeTone: "bg-[#EFE5FB] text-[#5E4190]",
      avatarTone: "bg-[#EFE5FB] text-[#5E4190]",
      scoreTone: "text-[#5E4190]",
      initials: "AS",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Pendaftaran siswa baru online",
      desc: "Nara Putri didaftarkan oleh Ibu Ratna",
      time: "5 menit lalu",
      icon: <Users size={15} />,
      color: "bg-[#EFE5FB] text-[#583E8C]",
    },
    {
      id: 2,
      title: "Slot jadwal berhasil dikunci",
      desc: "Raka Pratama · Senin, 16 Nov 10.00 WIB (Zero Double-Booking)",
      time: "25 menit lalu",
      icon: <Lock size={15} />,
      color: "bg-[#FFF4C4] text-[#785E07]",
    },
    {
      id: 3,
      title: "Catatan kemajuan sesi diperbarui",
      desc: "Alin Safira menyelesaikan sesi Terapi Okupasi ke-4",
      time: "1 jam lalu",
      icon: <GraduationCap size={15} />,
      color: "bg-[#E0EEFA] text-[#2C5B8E]",
    },
  ];

  return (
    <main className="admin-dashboard font-sans min-h-screen bg-[#F8F9FD] text-[#2A2345] flex">
      <aside
        className={`admin-sidebar w-64 bg-[#262040] text-white flex flex-col justify-between p-6 shrink-0 z-40 transition-transform duration-300 max-lg:fixed max-lg:inset-y-0 max-lg:left-0 ${
          sidebarOpen ? "max-lg:translate-x-0 shadow-2xl" : "max-lg:-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="Logo Naira"
                className="w-10 h-10 object-contain rounded-full bg-white p-1"
              />
              <div>
                <strong className="font-display text-sm font-bold block leading-tight text-white">
                  Langkah Naira
                </strong>
                <small className="text-[9px] tracking-widest text-[#C4B7E5] uppercase block">
                  ADMIN PORTAL
                </small>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white hover:bg-white/10 h-8 w-8"
              aria-label="Tutup sidebar"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="pt-6">
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#C4B7E5] uppercase block mb-3 px-3">
              Menu Utama
            </span>
            <nav className="space-y-1.5">
              {navigation.map((item) => (
                <Button
                  key={item.label}
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setSidebarOpen(false);
                    onNavigate(item.page);
                  }}
                  className={`w-full justify-start gap-3 px-3.5 py-2.5 h-auto rounded-xl text-xs font-semibold transition-all ${
                    item.active
                      ? "bg-white text-[#262040] shadow-sm font-bold hover:bg-white hover:text-[#262040]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={item.active ? "text-[#58458A]" : "text-[#C4B7E5]"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          <div className="mt-8 bg-white/10 border border-white/10 rounded-2xl p-4 text-[11px] leading-relaxed text-white/80">
            <div className="flex items-center gap-2 text-[#FFE58F] font-bold mb-1">
              <ShieldCheck size={14} />
              <span>Keamanan Terpadu</span>
            </div>
            <p className="text-[10px] text-white/70">
              Data medis siswa ABK dienkripsi dan terlindungi di server relasional Neon DB.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3B325E] flex items-center justify-center font-bold text-xs text-[#E9E0FA] border border-[#5E518D]">
                AN
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold block truncate text-white">Admin Naira</span>
                <span className="text-[10px] text-[#A8C7EC] block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#82E0AA] inline-block animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("home")}
              className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 rounded-lg transition-colors"
              title="Keluar ke Beranda"
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </aside>

      <section className="admin-content flex-1 flex flex-col min-w-0">
        <header className="admin-topbar h-16 bg-white border-b border-[#ECE7F6] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#262040] hover:bg-[#F3EEFA] h-8 w-8 rounded-lg"
              aria-label="Buka menu"
            >
              <Menu size={20} />
            </Button>

            <div className="relative min-w-0 w-[min(16rem,calc(100vw-128px))] sm:w-64 md:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F7499]" />
              <input
                type="text"
                placeholder="Cari siswa, diagnosis, atau terapis..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#F6F7FC] border border-[#E3DEEF] rounded-full pl-9 pr-4 py-2 text-xs text-[#2A2345] placeholder-[#9086AB] focus:outline-none focus:border-[#58458A] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative w-9 h-9 rounded-full bg-[#F3EEFA] text-[#58458A] hover:bg-[#EAE1F7] transition-colors"
              aria-label="Notifikasi"
            >
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E55977] border border-white" />
            </Button>

            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-[#ECE7F6]">
              <div className="w-8 h-8 rounded-full bg-[#524480] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                AN
              </div>
              <div className="text-left">
                <span className="text-xs font-bold block text-[#2A2345] leading-tight">Admin Naira</span>
                <span className="text-[10px] text-[#7E7497] block">Pusat Layanan ABK</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content p-6 md:p-8 space-y-6 max-w-[1300px] w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#58458A]">
                <Sparkles size={14} className="text-[#3B6998]" />
                <span>Ringkasan Harian · Senin, 16 November 2026</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-[#2A2345] mt-1">
                Halo, Admin Naira! 👋
              </h1>
              <p className="text-xs md:text-sm text-[#665D82] mt-1">
                Pantau pendaftaran baru, ketersediaan terapis, dan slot jadwal anti double-booking secara real-time.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => onNavigate("register")}
              className="inline-flex items-center gap-2 rounded-full bg-[#4E4383] px-5 py-2.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(78,67,131,0.22)] hover:bg-[#3D336D] transition-all self-start md:self-center"
            >
              <Plus size={15} />
              <span>Tambah Pendaftaran Siswa</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F1F7FD] rounded-2xl p-5 border border-[#D5E6F7] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#355B85]">Siswa Terdaftar</span>
                <span className="w-10 h-10 rounded-xl bg-white text-[#2C5B8E] flex items-center justify-center shadow-sm">
                  <Users size={18} />
                </span>
              </div>
              <strong className="font-display text-3xl font-bold text-[#1E3B5C] block mt-3">24</strong>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#355B85] font-semibold">
                <TrendingUp size={13} />
                <span>+3 siswa baru minggu ini</span>
              </div>
            </div>

            <div className="bg-[#FFFCEE] rounded-2xl p-5 border border-[#FBEEC2] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7E6511]">Sesi Terapi Hari Ini</span>
                <span className="w-10 h-10 rounded-xl bg-white text-[#8A670D] flex items-center justify-center shadow-sm">
                  <CalendarDays size={18} />
                </span>
              </div>
              <strong className="font-display text-3xl font-bold text-[#453403] block mt-3">12</strong>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#7E6511] font-semibold">
                <CheckCircle2 size={13} />
                <span>100% terjadwal anti-bentrok</span>
              </div>
            </div>

            <div className="bg-[#F8F4FD] rounded-2xl p-5 border border-[#E9DDF9] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#574087]">Terapis Bertugas</span>
                <span className="w-10 h-10 rounded-xl bg-white text-[#583E8C] flex items-center justify-center shadow-sm">
                  <Activity size={18} />
                </span>
              </div>
              <strong className="font-display text-3xl font-bold text-[#2A1E43] block mt-3">6</strong>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#574087] font-semibold">
                <UserCheck size={13} />
                <span>Seluruh ruangan aktif</span>
              </div>
            </div>

            <div className="bg-[#FFF8F3] rounded-2xl p-5 border border-[#FCE6D6] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8C5E3D]">Perlu Verifikasi</span>
                <span className="w-10 h-10 rounded-xl bg-white text-[#995B30] flex items-center justify-center shadow-sm">
                  <Clock size={18} />
                </span>
              </div>
              <strong className="font-display text-3xl font-bold text-[#4D2D16] block mt-3">3</strong>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#8C5E3D] font-semibold">
                <Lock size={13} />
                <span>Menunggu pemilihan jadwal</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#ECE7F6] shadow-sm">
              <div className="flex flex-col gap-3 border-b border-[#F2EEF9] pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-base font-bold text-[#2A2345]">
                    Kalender Sesi & Kehadiran
                  </h2>
                  <p className="text-xs text-[#7B7196] mt-0.5">Jadwal program terapi bulan berjalan</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#553E87] bg-[#F2ECFB] px-3 py-1 rounded-full border border-[#E4D9F7]">
                    <span className="w-2 h-2 rounded-full bg-[#553E87]" />
                    <span>Sesi Aktif</span>
                  </div>
                  <div className="flex items-center border border-[#DDD3F0] rounded-lg overflow-hidden bg-white">
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7 rounded-none p-1 hover:bg-[#F3EEFA] text-[#553E87]" aria-label="Bulan sebelumnya">
                      <ChevronLeft size={16} />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7 rounded-none p-1 hover:bg-[#F3EEFA] text-[#553E87]" aria-label="Bulan berikutnya">
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="py-4 text-center">
                <strong className="text-sm font-bold text-[#2A2345]">November 2026</strong>
              </div>

              <div className="grid grid-cols-7 text-center pb-2 text-[10px] font-bold uppercase tracking-wider text-[#8A7EA6]">
                <span>Min</span>
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span>Sab</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center">
                {calendarDays.map((item, idx) => {
                  const isToday = item.day === "16";
                  return (
                    <div
                      key={`${item.day}-${idx}`}
                      className={`h-9 flex items-center justify-center rounded-xl text-xs font-semibold transition-all ${
                        item.muted
                          ? "text-slate-300 pointer-events-none"
                          : isToday
                          ? "bg-[#524480] text-white shadow-sm font-bold"
                          : item.hasSession
                          ? item.tone === "blue"
                            ? "bg-[#E3EFFB] text-[#2C5B8E] hover:bg-[#D5E7FA] font-bold"
                            : "bg-[#F1E8FB] text-[#5A3F8E] hover:bg-[#E8DAFA] font-bold"
                          : "text-[#5E5579] hover:bg-[#F8F6FD]"
                      }`}
                    >
                      <span>{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#ECE7F6] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F2EEF9]">
                  <div>
                    <h2 className="font-display text-base font-bold text-[#2A2345]">
                      Performa Program Terapi
                    </h2>
                    <p className="text-xs text-[#7B7196] mt-0.5">Tingkat kehadiran & kepatuhan jadwal</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#553E87] bg-[#F2ECFB] px-3 py-1 rounded-full border border-[#E5DBF7]">
                    Bulan ini
                  </span>
                </div>

                <div className="space-y-5 pt-5">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#524480]" />
                        <span className="font-bold text-[#2A2345]">Terapi Wicara (Speech Delay)</span>
                      </div>
                      <span className="font-bold text-[#524480]">88%</span>
                    </div>
                    <div className="h-2 w-full bg-[#F3EEFA] rounded-full overflow-hidden">
                      <div className="h-full bg-[#524480] rounded-full" style={{ width: "88%" }} />
                    </div>
                    <span className="text-[10px] text-[#7B7196] mt-1 block">12 siswa aktif · 4 terapis</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3B6998]" />
                        <span className="font-bold text-[#2A2345]">Sensori Integrasi (Autism / ADHD)</span>
                      </div>
                      <span className="font-bold text-[#3B6998]">76%</span>
                    </div>
                    <div className="h-2 w-full bg-[#E5EEF8] rounded-full overflow-hidden">
                      <div className="h-full bg-[#3B6998] rounded-full" style={{ width: "76%" }} />
                    </div>
                    <span className="text-[10px] text-[#7B7196] mt-1 block">8 siswa aktif · 2 terapis</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#CFA121]" />
                        <span className="font-bold text-[#2A2345]">Terapi Okupasi (Cerebral Palsy)</span>
                      </div>
                      <span className="font-bold text-[#8A670D]">64%</span>
                    </div>
                    <div className="h-2 w-full bg-[#FFF7D9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#CFA121] rounded-full" style={{ width: "64%" }} />
                    </div>
                    <span className="text-[10px] text-[#7B7196] mt-1 block">4 siswa aktif · 2 terapis</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2EEF9] text-[11px] text-[#675E82] flex items-center justify-between">
                <span>Rata-rata kepatuhan jadwal: <strong className="text-[#524480]">76%</strong></span>
                <Button type="button" variant="link" onClick={() => onNavigate("schedule")} className="text-[#3B6998] font-bold p-0 h-auto hover:underline">
                  Lihat Jadwal →
                </Button>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#ECE7F6] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2EEF9] mb-5">
                <div>
                  <h2 className="font-display text-base font-bold text-[#2A2345]">
                    Siswa dengan Kemajuan Terbaik
                  </h2>
                  <p className="text-xs text-[#7B7196] mt-0.5">Evaluasi keteraturan & adaptasi sensori</p>
                </div>
                <Button type="button" variant="link" className="text-xs font-bold text-[#524480] p-0 h-auto hover:underline">
                  Semua Siswa
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {topStudents.map((st) => (
                  <div
                    key={st.name}
                    className={`rounded-2xl p-4 border text-center relative hover:shadow-sm transition-shadow ${st.bgTone}`}
                  >
                    <span className={`absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${st.badgeTone}`}>
                      {st.rank}
                    </span>
                    <div className={`w-12 h-12 rounded-full font-bold text-sm mx-auto flex items-center justify-center shadow-sm mb-3 ${st.avatarTone}`}>
                      {st.initials}
                    </div>
                    <h3 className="font-display text-sm font-bold text-[#2A2345] truncate">
                      {st.name}
                    </h3>
                    <p className="text-[10px] text-[#786E95] mt-0.5 truncate">{st.detail}</p>
                    <div className="mt-3 pt-2 border-t border-black/5">
                      <span className="text-[10px] text-[#786E95] block">Kemajuan Sesi</span>
                      <strong className={`text-sm font-bold ${st.scoreTone}`}>{st.score}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#ECE7F6] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2EEF9] mb-4">
                <div>
                  <h2 className="font-display text-base font-bold text-[#2A2345]">
                    Aktivitas Terbaru
                  </h2>
                  <p className="text-xs text-[#7B7196] mt-0.5">Log peristiwa sistem & pendaftaran</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#524480] animate-ping" />
              </div>

              <div className="space-y-3.5">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F9F7FD] transition-colors">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${act.color}`}>
                      {act.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#2A2345] truncate">{act.title}</h4>
                      <p className="text-[11px] text-[#696084] truncate mt-0.5">{act.desc}</p>
                      <span className="text-[10px] text-[#938AAB] block mt-1">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#ECE7F6] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F2EEF9]">
              <div>
                <h2 className="font-display text-base font-bold text-[#2A2345]">
                  Riwayat Pendaftaran & Penjadwalan Siswa
                </h2>
                <p className="text-xs text-[#7B7196] mt-0.5">
                  Daftar profil siswa ABK, penugasan terapis, dan status penguncian slot jadwal.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 bg-[#F4F1FA] p-1 rounded-xl text-xs font-semibold">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedFilter("all")}
                  className={`px-3 py-1.5 h-auto rounded-lg transition-all ${
                    selectedFilter === "all" ? "bg-white text-[#524480] shadow-sm font-bold hover:bg-white hover:text-[#524480]" : "text-[#756A92] hover:bg-white/50"
                  }`}
                >
                  Semua
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedFilter("confirmed")}
                  className={`px-3 py-1.5 h-auto rounded-lg transition-all ${
                    selectedFilter === "confirmed" ? "bg-white text-[#2B5A8C] shadow-sm font-bold hover:bg-white hover:text-[#2B5A8C]" : "text-[#756A92] hover:bg-white/50"
                  }`}
                >
                  Terkonfirmasi
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedFilter("pending")}
                  className={`px-3 py-1.5 h-auto rounded-lg transition-all ${
                    selectedFilter === "pending" ? "bg-white text-[#785E07] shadow-sm font-bold hover:bg-white hover:text-[#785E07]" : "text-[#756A92] hover:bg-white/50"
                  }`}
                >
                  Belum Terjadwal
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs text-[#5D5578] border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-[#F0EBF8] text-[10px] font-bold uppercase tracking-wider text-[#8C80A8]">
                    <th className="py-3 px-3">ID Siswa</th>
                    <th className="py-3 px-3">Nama Anak</th>
                    <th className="py-3 px-3">Diagnosis ABK</th>
                    <th className="py-3 px-3">Terapis Ditugaskan</th>
                    <th className="py-3 px-3">Jadwal Sesi Terapi</th>
                    <th className="py-3 px-3">Status Penguncian</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F4FB]">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-xs text-slate-400">
                        Tidak ada data siswa yang cocok dengan pencarian "{query}".
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <tr key={s.id} className="hover:bg-[#FAF8FE] transition-colors">
                        <td className="py-3.5 px-3 font-mono text-[11px] font-bold text-[#524480]">
                          {s.id}
                        </td>
                        <td className="py-3.5 px-3">
                          <strong className="font-bold text-[#2A2345] block">{s.name}</strong>
                          <span className="text-[10px] text-[#7E7497]">Terdaftar {s.registered}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-block bg-[#F3EEFA] border border-[#E4D9F7] text-[#524480] font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                            {s.diagnosis}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-[#2A2345]">
                          {s.therapist}
                        </td>
                        <td className="py-3.5 px-3">
                          <strong className="block text-[#2A2345]">{s.date}</strong>
                          <span className="text-[10px] text-[#7E7497]">{s.time}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              s.status === "Terkonfirmasi"
                                ? "bg-[#E3EFFB] text-[#285789]"
                                : "bg-[#FFF6D4] text-[#7A610A]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                s.status === "Terkonfirmasi" ? "bg-[#285789]" : "bg-[#7A610A]"
                              }`}
                            />
                            <span>{s.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <Button
                            type="button"
                            variant="link"
                            onClick={() => onNavigate("schedule")}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3B6998] p-0 h-auto hover:underline"
                          >
                            <span>Atur Jadwal</span>
                            <ArrowRight size={13} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-[#F2EEF9] flex items-center justify-between text-xs text-[#7B7196]">
              <span>Menampilkan {filtered.length} dari {students.length} siswa</span>
              <div className="flex items-center gap-1">
                <Button type="button" variant="outline" size="icon" className="w-7 h-7 rounded-lg border border-[#DDD3F0] hover:bg-[#F3EEFA] text-[#524480]">
                  ‹
                </Button>
                <Button type="button" variant="default" size="icon" className="w-7 h-7 rounded-lg bg-[#524480] text-white font-bold shadow-sm hover:bg-[#43376B]">
                  1
                </Button>
                <Button type="button" variant="outline" size="icon" className="w-7 h-7 rounded-lg border border-[#DDD3F0] hover:bg-[#F3EEFA] text-[#524480]">
                  2
                </Button>
                <Button type="button" variant="outline" size="icon" className="w-7 h-7 rounded-lg border border-[#DDD3F0] hover:bg-[#F3EEFA] text-[#524480]">
                  ›
                </Button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
