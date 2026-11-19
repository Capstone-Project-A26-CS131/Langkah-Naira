import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({ icon, title, text, onClick, tone }) {
  const toneClass =
    tone === "yellow"
      ? "bg-[#F8FAB4]"
      : tone === "lavender"
        ? "bg-[#B7BDF7]"
        : "bg-slate-50";

  return (
    <button className={`group relative min-h-44 rounded-xl border-0 p-6 text-left text-slate-700 transition hover:translate-y-[-4px] hover:shadow-md ${toneClass}`} onClick={onClick}>
      <div className="text-brand-500">{icon}</div>
      <h3 className="mt-5 font-display text-base font-bold">{title}</h3>
      <p className="mt-2 max-w-[230px] text-sm leading-6 text-slate-500">{text}</p>
      <div className="mt-10 flex items-center gap-1 text-sm font-semibold text-brand-500 transition">
        <span className="absolute bottom-6 text-[#0F766E] hover:underline">Lihat Jadwal</span>
        <span className="absolute bottom-6 right-32 text-[#0F766E]"><ArrowUpRight size={18} /></span>
      </div>
    </button>
  );
}
