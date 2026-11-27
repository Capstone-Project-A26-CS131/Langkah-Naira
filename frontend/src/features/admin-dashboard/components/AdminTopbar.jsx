import React from "react";
import { Bell, Mail, Menu, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminTopbar({
  adminName = "Admin Naira",
  initials = "AN",
  sidebarOpen,
  onToggleMobileSidebar,
  query,
  onSearchChange,
  onQuickRegister,
  onQuickSchedule,
}) {
  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-[#EBEDF5] px-4 sm:px-7 flex items-center justify-between gap-4 sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleMobileSidebar}
          className="lg:hidden text-[#2D2258] hover:bg-[#F4F5FA] h-9 w-9 rounded-lg shrink-0"
          aria-label={sidebarOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <span className="text-xs sm:text-sm font-semibold text-[#5E587A] truncate">
          Selamat Datang, <strong className="text-[#2D2258] font-bold">{adminName}</strong>
        </span>
      </div>

      <div className="hidden md:flex items-center w-full max-w-sm bg-[#F4F5FA] rounded-full p-1 pl-4 border border-[#EBEDF5]">
        <input
          type="text"
          placeholder="Cari siswa, diagnosis, atau terapis..."
          value={query}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent text-xs text-[#2D2258] placeholder-[#948FB0] focus:outline-none"
        />
        <button
          type="button"
          aria-label="Cari"
          className="w-8 h-8 rounded-full bg-[#5B4B9A] hover:bg-[#493B80] text-white flex items-center justify-center shrink-0 transition-colors"
        >
          <Search size={14} />
        </button>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <Button
          type="button"
          onClick={onQuickRegister}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#22B559] hover:bg-[#1C9E4C] text-white px-3.5 py-1.5 h-8 text-[11px] font-bold shadow-sm"
        >
          <Plus size={13} />
          <span>Daftar Siswa</span>
        </Button>

        <button
          type="button"
          onClick={onQuickSchedule}
          aria-label="Jadwal Terapi"
          className="relative w-9 h-9 rounded-full bg-[#F6F7FB] hover:bg-[#ECEEF7] text-[#5E587A] flex items-center justify-center transition-colors"
        >
          <Mail size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#5B4B9A]" />
        </button>

        <button
          type="button"
          aria-label="Notifikasi"
          className="relative w-9 h-9 rounded-full bg-[#F6F7FB] hover:bg-[#ECEEF7] text-[#5E587A] flex items-center justify-center transition-colors"
        >
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#EE726F]" />
        </button>

        <div className="w-9 h-9 rounded-full bg-[#5B4B9A] text-white flex items-center justify-center text-xs font-bold shadow-sm">
          {initials}
        </div>
      </div>
    </header>
  );
}
