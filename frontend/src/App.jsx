import React, { useState } from "react";
import Header from "./components/common/Header";
import SiteFooter from "./components/common/SiteFooter";
import { initialForm } from "./data/appData";
import DashboardPage from "./features/admin-dashboard/pages/DashboardPage";
import HomePage from "./features/home/pages/HomePage";
import RegistrationPage from "./features/registration/pages/RegistrationPage";
import SchedulePage from "./features/booking/pages/SchedulePage";

export default function App() {
  const [page, setPage] = useState("home");
  const [form, setForm] = useState(initialForm);
  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageContent = {
    home: <HomePage onNavigate={navigate} />,
    register: <RegistrationPage form={form} setForm={setForm} onNavigate={navigate} />,
    schedule: <SchedulePage form={form} onNavigate={navigate} />,
    dashboard: <DashboardPage onNavigate={navigate} />,
  }[page];

  return (
    <div className={`app-shell app-shell-${page}`}>
      <Header page={page} onNavigate={navigate} />
      {pageContent}
      <SiteFooter />
    </div>
  );
}
