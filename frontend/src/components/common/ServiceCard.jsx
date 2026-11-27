import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceCard({ icon, title, text, onClick, tone }) {
  const toneClass =
    tone === "yellow"
      ? "bg-[#FFFBCA]"
      : tone === "lavender"
        ? "bg-[#EFDDF9]"
        : "bg-slate-50";

  return (
    <Button
      variant="ghost"
      className={`group relative min-h-44 h-auto rounded-2xl border border-white/80 p-6 text-left text-slate-700 shadow-[0_8px_24px_rgba(92,88,120,0.06)] transition hover:translate-y-[-4px] hover:shadow-lg flex flex-col items-start justify-start whitespace-normal ${toneClass}`}
      onClick={onClick}
    >
      <div className="text-brand-500">{icon}</div>
      <h3 className="mt-5 font-display text-base font-bold">{title}</h3>
      <p className="mt-2 max-w-[230px] text-sm leading-6 text-slate-500 font-normal">{text}</p>
      <div className="mt-10 flex items-center gap-1 text-sm font-semibold text-brand-500 transition">
        <span className="absolute bottom-6 text-[#33689A] hover:underline">Lihat Jadwal</span>
        <span className="absolute bottom-6 right-32 text-[#33689A]"><ArrowUpRight size={18} /></span>
      </div>
    </Button>
  );
}
