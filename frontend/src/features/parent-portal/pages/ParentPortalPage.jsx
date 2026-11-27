import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import RegistrationPage from "../../registration/pages/RegistrationPage";
import SchedulePage from "../../booking/pages/SchedulePage";
import ParentPortalHeader from "../components/ParentPortalHeader";
import StudentStatusSection from "../components/StudentStatusSection";
import { PARENT_PORTAL_TABS } from "../data/parentPortalData";

export default function ParentPortalPage({
  user,
  form,
  setForm,
  onNavigate,
  activeTab = "status",
  onTabChange,
}) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  const fetchMyStudents = useCallback(async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("parent_token");
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setFetchError("");

    try {
      const response = await axios.get(`${apiUrl}/api/students/my-students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data?.data || []);
    } catch (error) {
      setFetchError(
        error.response?.data?.message ||
          "Tidak dapat memuat daftar anak saat ini. Pastikan server backend aktif.",
      );
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    if (activeTab === "status") {
      fetchMyStudents();
    }
  }, [activeTab, fetchMyStudents]);

  const switchTab = (nextTab) => {
    onTabChange?.(nextTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePortalNavigate = (target) => {
    if (target === "dashboard" || target === "portal" || target === "status") {
      switchTab("status");
      return;
    }
    if (target === "register" || target === "schedule") {
      switchTab(target);
      return;
    }
    onNavigate(target);
  };

  return (
    <main className="subpage min-h-screen py-6 px-4 sm:px-6 relative">
      <div
        className="background-image-hero fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-[min(1120px,100%)] space-y-6">
        <ParentPortalHeader
          userName={user?.name}
          tabs={PARENT_PORTAL_TABS}
          activeTab={activeTab}
          onSelectTab={switchTab}
          onBackHome={() => onNavigate("home")}
          onAddChild={() => switchTab("register")}
        />

        {activeTab === "register" ? (
          <RegistrationPage
            form={form}
            setForm={setForm}
            onNavigate={handlePortalNavigate}
            embedded
            embeddedBackLabel="Kembali ke Status & Anak Saya"
          />
        ) : activeTab === "schedule" ? (
          <SchedulePage
            form={form}
            onNavigate={handlePortalNavigate}
            embedded
            embeddedBackLabel="Kembali ke Status & Anak Saya"
            embeddedModalButtonLabel="Lihat Status Pendaftaran"
          />
        ) : (
          <StudentStatusSection
            students={students}
            loading={loading}
            fetchError={fetchError}
            apiUrl={apiUrl}
            onRefresh={fetchMyStudents}
            onRegisterNew={() => switchTab("register")}
            onSelectSchedule={(child) => {
              setForm((current) => ({
                ...current,
                student_id: child.id,
                full_name: child.full_name,
                photo_url: child.photo_url || "",
              }));
              switchTab("schedule");
            }}
          />
        )}
      </div>
    </main>
  );
}
