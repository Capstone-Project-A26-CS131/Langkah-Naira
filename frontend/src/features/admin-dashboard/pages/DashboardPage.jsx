import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  FileText,
  HeartHandshake,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { initialForm } from "../../../data/appData";
import RegistrationPage from "../../registration/pages/RegistrationPage";
import SchedulePage from "../../booking/pages/SchedulePage";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import StatCardsGrid from "../components/StatCardsGrid";
import AttendanceCalendarCard from "../components/AttendanceCalendarCard";
import ActivitiesFeedCard from "../components/ActivitiesFeedCard";
import ProgramPerformanceCard from "../components/ProgramPerformanceCard";
import TopStudentsCard from "../components/TopStudentsCard";
import StudentTableSection from "../components/StudentTableSection";
import StudentVerifyModal from "../components/StudentVerifyModal";
import TherapistsQuotaSection from "../components/TherapistsQuotaSection";
import {
  calendarDays,
  dashboardStats,
  initialStudents,
  programPerformance,
  recentActivities,
  therapistsQuota,
  topStudents,
} from "../data/dashboardData";

import logoImage from "../../../assets/images/logo-naira-kencana.webp";

export default function DashboardPage({ form, setForm, onNavigate, onLogout }) {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeNavId, setActiveNavId] = useState("overview");
  const [localForm, setLocalForm] = useState(initialForm);

  const [apiStudents, setApiStudents] = useState([]);
  const [studentsMeta, setStudentsMeta] = useState({ page: 1, total: 0, totalPages: 1 });
  const [kpiTotals, setKpiTotals] = useState({ totalStudents: null, pendingVerify: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [verifyTargetId, setVerifyTargetId] = useState(null);
  const [verifyNotice, setVerifyNotice] = useState("");

  const activeForm = form ?? localForm;
  const updateForm = setForm ?? setLocalForm;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  const fetchStudents = useCallback(async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("parent_token");
    if (!token) {
      setUsingFallback(true);
      return;
    }

    setStudentsLoading(true);
    try {
      const params = { page: currentPage, limit: 8 };
      if (selectedFilter !== "all") params.status = selectedFilter;
      if (query.trim()) params.search = query.trim();

      const [listRes, totalRes, pendingRes] = await Promise.all([
        axios.get(`${apiUrl}/api/students`, {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/api/students`, {
          params: { page: 1, limit: 1 },
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/api/students`, {
          params: { page: 1, limit: 1, status: "pending_verification" },
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setApiStudents(listRes.data?.data || []);
      setStudentsMeta(
        listRes.data?.meta || { page: currentPage, total: 0, totalPages: 1 },
      );
      setKpiTotals({
        totalStudents: totalRes.data?.meta?.total ?? 0,
        pendingVerify: pendingRes.data?.meta?.total ?? 0,
      });
      setUsingFallback(false);
    } catch {
      setUsingFallback(true);
    } finally {
      setStudentsLoading(false);
    }
  }, [apiUrl, currentPage, selectedFilter, query]);

  useEffect(() => {
    if (activeTab === "overview" || activeTab === "students") {
      fetchStudents();
    }
  }, [activeTab, fetchStudents]);

  const fallbackMapped = useMemo(() => {
    const mapStatus = {
      Terkonfirmasi: "approved",
      "Belum terjadwal": "pending_verification",
    };
    return initialStudents
      .map((s) => ({
        id: s.id,
        full_name: s.name,
        registeredLabel: `Terdaftar ${s.registered}`,
        diagnosis: s.diagnosis,
        therapist: s.therapist,
        date: s.date,
        time: s.time,
        preferred_schedule: s.time !== "-" ? s.time : "Belum dijadwalkan",
        status: mapStatus[s.status] || "pending_verification",
        isSample: true,
      }))
      .filter((student) => {
        const matchesQuery = `${student.full_name} ${student.id} ${student.diagnosis} ${student.therapist}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesFilter =
          selectedFilter === "all" || student.status === selectedFilter;
        return matchesQuery && matchesFilter;
      });
  }, [query, selectedFilter]);

  const displayedStudents = useMemo(() => {
    if (usingFallback) return fallbackMapped;
    return apiStudents.map((s) => ({
      ...s,
      registeredLabel: s.parent_name
        ? `Wali: ${s.parent_name}`
        : `Terdaftar ${new Date(s.created_at).toLocaleDateString("id-ID")}`,
      diagnosis: s.nickname
        ? `Panggilan: ${s.nickname}`
        : s.gender === "P"
        ? "Perempuan"
        : "Laki-laki",
      therapist: s.parent_phone || "-",
      date: s.preferred_schedule ? `Sesi ${s.preferred_schedule}` : "Belum dipilih",
      time: s.parent_email || "",
      isSample: false,
    }));
  }, [usingFallback, fallbackMapped, apiStudents]);

  const resolvedStats = useMemo(() => {
    return dashboardStats.map((stat) => {
      if (stat.id === "students" && kpiTotals.totalStudents !== null) {
        return { ...stat, value: String(kpiTotals.totalStudents) };
      }
      if (stat.id === "pending" && kpiTotals.pendingVerify !== null) {
        return { ...stat, value: String(kpiTotals.pendingVerify) };
      }
      return stat;
    });
  }, [kpiTotals]);

  const navigation = [
    { id: "overview", label: "Dashboard", icon: <Activity size={16} />, tab: "overview" },
    { id: "register", label: "Pendaftaran Siswa Baru", icon: <FileText size={16} />, tab: "register" },
    { id: "schedule", label: "Jadwal Terapi", icon: <CalendarDays size={16} />, tab: "schedule" },
    { id: "students", label: "Data Siswa ABK", icon: <Users size={16} />, tab: "students" },
    { id: "therapists", label: "Terapis & Kuota", icon: <HeartHandshake size={16} />, tab: "therapists" },
  ];

  const handleMenuSelect = (item) => {
    setSidebarOpen(false);
    setActiveNavId(item.id);
    setActiveTab(item.tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmbeddedNavigate = (target) => {
    if (target === "dashboard" || target === "overview") {
      setActiveTab("overview");
      setActiveNavId("overview");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (
      target === "register" ||
      target === "schedule" ||
      target === "students" ||
      target === "therapists"
    ) {
      setActiveTab(target);
      setActiveNavId(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    onNavigate(target);
  };

  const handleSidebarLogout = () => {
    setSidebarOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("parent_token");
    localStorage.removeItem("user");
    if (onLogout) {
      onLogout();
      return;
    }
    onNavigate("home");
  };

  return (
    <main className="font-sans min-h-screen bg-[#F4F5FA] text-[#2D2258] flex relative">
      <div
        className={`background-image-hero fixed inset-0 pointer-events-none z-0 transition-all duration-300 ${
          desktopSidebarOpen ? "lg:left-[240px]" : "lg:left-[80px]"
        }`}
        aria-hidden="true"
      />

      <AdminSidebar
        logoSrc={logoImage}
        navigation={navigation}
        activeNavId={activeNavId}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        desktopSidebarOpen={desktopSidebarOpen}
        setDesktopSidebarOpen={setDesktopSidebarOpen}
        onSelectMenu={handleMenuSelect}
        onLogout={handleSidebarLogout}
      />

      <section className="relative z-10 flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminTopbar
          sidebarOpen={sidebarOpen}
          onToggleMobileSidebar={() => setSidebarOpen((prev) => !prev)}
          query={query}
          onSearchChange={(nextQuery) => {
            setQuery(nextQuery);
            setCurrentPage(1);
            if (activeTab !== "overview" && activeTab !== "students" && activeTab !== "therapists") {
              setActiveTab("students");
              setActiveNavId("students");
            }
          }}
          onQuickRegister={() => handleEmbeddedNavigate("register")}
          onQuickSchedule={() => handleEmbeddedNavigate("schedule")}
        />

        <div className="p-4 sm:p-6 lg:p-7 space-y-5 max-w-[1320px] w-full mx-auto">
          {activeTab === "register" ? (
            <RegistrationPage
              form={activeForm}
              setForm={updateForm}
              onNavigate={handleEmbeddedNavigate}
              embedded
            />
          ) : activeTab === "schedule" ? (
            <SchedulePage
              form={activeForm}
              onNavigate={handleEmbeddedNavigate}
              embedded
            />
          ) : activeTab === "students" ? (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EEF0F7] shadow-[0_6px_20px_rgba(45,34,88,0.04)]">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleEmbeddedNavigate("overview")}
                  className="h-auto p-0 mb-2 text-xs font-semibold text-[#0077B6] hover:bg-transparent hover:underline inline-flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Kembali ke Ringkasan Dashboard
                </Button>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-[#2D2258]">
                  Data Siswa ABK
                </h1>
                <p className="text-xs sm:text-sm text-[#7B7696] mt-1">
                  Kelola seluruh profil siswa berkebutuhan khusus, status verifikasi pendaftaran, dan penugasan jadwal.
                </p>
              </div>

              <StudentTableSection
                students={displayedStudents}
                totalSampleCount={initialStudents.length}
                meta={studentsMeta}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                selectedFilter={selectedFilter}
                onFilterChange={(nextFilter) => {
                  setSelectedFilter(nextFilter);
                  setCurrentPage(1);
                }}
                query={query}
                loading={studentsLoading}
                usingFallback={usingFallback}
                verifyNotice={verifyNotice}
                onDismissNotice={() => setVerifyNotice("")}
                onRefresh={fetchStudents}
                onAddRegistration={() => handleEmbeddedNavigate("register")}
                onOpenVerify={(id) => setVerifyTargetId(id)}
                onOpenSchedule={(student) => {
                  updateForm((prev) => ({
                    ...prev,
                    student_id: student.id,
                    full_name: student.full_name,
                  }));
                  handleEmbeddedNavigate("schedule");
                }}
              />
            </div>
          ) : activeTab === "therapists" ? (
            <div className="space-y-5">
              <TherapistsQuotaSection
                therapists={therapistsQuota}
                query={query}
                onBackDashboard={() => handleEmbeddedNavigate("overview")}
                onOpenSchedule={() => handleEmbeddedNavigate("schedule")}
              />
              <ProgramPerformanceCard programs={programPerformance} />
            </div>
          ) : (
            <>
              <StatCardsGrid stats={resolvedStats} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                <div className="lg:col-span-6 space-y-5">
                  <AttendanceCalendarCard
                    days={calendarDays}
                    onOpenSchedule={() => handleEmbeddedNavigate("schedule")}
                  />
                  <ActivitiesFeedCard
                    activities={recentActivities}
                    onViewAll={() => handleMenuSelect(navigation[3])}
                  />
                </div>

                <div className="lg:col-span-6 space-y-5">
                  <ProgramPerformanceCard programs={programPerformance} />
                  <TopStudentsCard students={topStudents} />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <StudentVerifyModal
        studentId={verifyTargetId}
        onClose={() => setVerifyTargetId(null)}
        onVerified={(updated) => {
          setVerifyNotice(
            `Status ${updated?.full_name || "siswa"} berhasil diperbarui menjadi ${
              updated?.status === "approved" ? "Disetujui" : "Ditolak"
            }.`,
          );
          fetchStudents();
        }}
      />
    </main>
  );
}
