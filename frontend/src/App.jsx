import React, { useState } from "react";
import Header from "./components/layout/Header";
import SiteFooter from "./components/layout/SiteFooter";
import { initialForm } from "./data/appData";
import DashboardPage from "./features/admin-dashboard/pages/DashboardPage";
import HomePage from "./features/home/HomePage";
import RegistrationPage from "./features/registration/pages/RegistrationPage";
import SchedulePage from "./features/booking/pages/SchedulePage";
import ParentPortalPage from "./features/parent-portal/pages/ParentPortalPage";
import AuthPage from "./features/auth/pages/AuthPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [portalTab, setPortalTab] = useState("status");
  const [form, setForm] = useState(initialForm);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });
  const clearAuthSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("parent_token");
    localStorage.removeItem("user");
    setUser(null);
    setForm(initialForm);
  };

  const navigate = (nextPage) => {
    const hasToken = Boolean(localStorage.getItem("token"));
    let activeUser = null;
    try {
      const rawUser = localStorage.getItem("user");
      activeUser = rawUser ? JSON.parse(rawUser) : null;
    } catch {
      activeUser = null;
    }

    if ((nextPage === "portal" || nextPage === "register" || nextPage === "schedule") && !hasToken) {
      setPage("auth");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (nextPage === "dashboard" && (!hasToken || activeUser?.role !== "admin")) {
      setPage("auth");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (nextPage === "portal") {
      setPortalTab("status");
      setPage("portal");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (nextPage === "register" || nextPage === "schedule") {
      setPortalTab(nextPage);
      setPage("portal");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    clearAuthSession();
    setPortalTab("status");
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageContent = {
    home: <HomePage onNavigate={navigate} />,
    auth: <AuthPage onNavigate={navigate} onAuthenticated={setUser} />,
    portal: (
      <ParentPortalPage
        user={user}
        form={form}
        setForm={setForm}
        onNavigate={navigate}
        activeTab={portalTab}
        onTabChange={setPortalTab}
      />
    ),
    register: <RegistrationPage form={form} setForm={setForm} onNavigate={navigate} />,
    schedule: <SchedulePage form={form} onNavigate={navigate} />,
    dashboard: (
      <DashboardPage
        form={form}
        setForm={setForm}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
    ),
  }[page];

  return (
    <div className={`app-shell app-shell-${page}`}>
      {page !== "auth" && page !== "dashboard" && (
        <Header
          page={page}
          user={user}
          onNavigate={navigate}
          onLogout={handleLogout}
        />
      )}
      {pageContent}
      {page !== "dashboard" && <SiteFooter />}
    </div>
  );
}
