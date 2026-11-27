import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ParentPortalHeader({
  userName,
  tabs,
  activeTab,
  onSelectTab,
  onBackHome,
  onAddChild,
}) {
  return (
    <div className="rounded-3xl border border-[#ECE7F6] bg-white/95 p-5 sm:p-7 shadow-sm backdrop-blur-sm">
      <Button
        type="button"
        variant="ghost"
        className="h-auto p-0 mb-3 text-xs font-semibold text-[#524480] hover:text-[#3B325E] hover:bg-transparent inline-flex items-center gap-1.5"
        onClick={onBackHome}
      >
        <ArrowLeft size={14} /> Kembali ke beranda
      </Button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-[#F3EEFA] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#524480]">
            Portal Orang Tua / Wali
          </span>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#2A2345]">
            Halo, {userName || "Orang Tua Siswa"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#665D82]">
            Pantau status pendaftaran anak, lengkapi formulir siswa baru, dan pilih jadwal terapi.
          </p>
        </div>

        <Button
          type="button"
          onClick={onAddChild}
          className="inline-flex items-center gap-2 rounded-full bg-[#2EC300] hover:bg-[#37FA00] px-5 py-2.5 h-auto text-xs font-bold text-slate-900 shadow-sm self-start md:self-center"
        >
          <Plus size={15} />
          <span>Daftarkan Anak Baru</span>
        </Button>
      </div>

      <div
        className="mt-6 flex flex-wrap gap-2 rounded-2xl bg-[#F4F1FA] p-1.5"
        role="tablist"
        aria-label="Navigasi Portal Orang Tua"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                isActive
                  ? "bg-white text-[#524480] shadow-sm"
                  : "text-[#786E95] hover:text-[#524480]"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
