import React from "react";
import { ChevronsLeft, ChevronsRight, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSidebar({
  logoSrc,
  brandTitle = "Langkah Naira",
  brandSubtitle = "Admin Portal Layanan ABK",
  navigation,
  activeNavId,
  sidebarOpen,
  setSidebarOpen,
  desktopSidebarOpen,
  setDesktopSidebarOpen,
  onSelectMenu,
  onLogout,
}) {
  const handleLogoToggle = () => {
    if (window.innerWidth >= 1024) {
      setDesktopSidebarOpen((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#1B1438]/40 backdrop-blur-[1px] z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`bg-[#0077B6] text-white shrink-0 fixed inset-y-0 left-0 z-50 w-[240px] flex flex-col justify-between overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:z-40 lg:translate-x-0 ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          } ${desktopSidebarOpen ? "lg:w-[240px]" : "lg:w-[80px]"}`}
      >
        <div className="flex flex-col flex-1 pt-5">
          <div
            className={`flex items-center px-4 pb-6 ${desktopSidebarOpen
                ? "justify-between"
                : "lg:flex-col lg:gap-3 justify-between"
              }`}
          >
            <button
              type="button"
              onClick={handleLogoToggle}
              aria-label={desktopSidebarOpen ? "Perkecil sidebar" : "Perlebar sidebar"}
              title={desktopSidebarOpen ? "Perkecil sidebar" : "Perlebar sidebar"}
              className="flex items-center gap-3 min-w-0 text-left rounded-xl p-1 -m-1 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 shadow-sm flex items-center justify-center shrink-0">
                <img
                  src={logoSrc}
                  alt={`Logo ${brandTitle}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className={`min-w-0 ${desktopSidebarOpen ? "block" : "lg:hidden"}`}>
                <strong className="font-display text-sm font-bold tracking-wide text-white leading-tight block truncate">
                  {brandTitle}
                </strong>
                <small className="text-[10px] text-[#BAE6FD] block truncate">
                  {brandSubtitle}
                </small>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDesktopSidebarOpen((prev) => !prev)}
              className="hidden lg:inline-flex w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white items-center justify-center shrink-0 transition-colors"
              aria-label={desktopSidebarOpen ? "Perkecil sidebar" : "Perlebar sidebar"}
              title={desktopSidebarOpen ? "Perkecil sidebar" : "Perlebar sidebar"}
            >
              {desktopSidebarOpen ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
            </button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/80 hover:text-white hover:bg-white/15 h-8 w-8 rounded-full shrink-0"
              aria-label="Tutup sidebar"
            >
              <X size={18} />
            </Button>
          </div>

          <nav className="space-y-2 px-3">
            {navigation.map((item) => {
              const isActive = activeNavId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectMenu(item)}
                  title={!desktopSidebarOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-all text-left rounded-full ${!desktopSidebarOpen
                      ? "lg:w-11 lg:h-11 lg:mx-auto lg:px-0 lg:justify-center"
                      : ""
                    } ${isActive
                      ? "bg-[#0096C7] text-white font-bold shadow-sm"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className={`truncate ${desktopSidebarOpen ? "block" : "lg:hidden"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 pt-3">
          <button
            type="button"
            onClick={onLogout}
            title={!desktopSidebarOpen ? "Keluar" : undefined}
            className={`w-full flex items-center justify-between gap-2 rounded-full bg-white hover:bg-slate-100 px-4 py-2.5 text-xs font-bold text-[#1E293B] shadow-sm transition-colors ${!desktopSidebarOpen
                ? "lg:w-11 lg:h-11 lg:mx-auto lg:px-0 lg:justify-center"
                : ""
              }`}
          >
            <span className={desktopSidebarOpen ? "block" : "lg:hidden"}>Keluar</span>
            <LogOut size={15} className="shrink-0 text-[#1E293B]" />
          </button>
        </div>
      </aside>
    </>
  );
}
