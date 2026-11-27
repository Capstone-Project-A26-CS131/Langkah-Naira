import React from "react";
import { ChevronDown } from "lucide-react";

export default function TopStudentsCard({ students, periodLabel = "Nov 2026" }) {
  return (
    <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EEF0F7] shadow-[0_6px_20px_rgba(45,34,88,0.04)]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-sm sm:text-base font-bold text-[#2D2258]">
          Kemajuan Terbaik
        </h2>
        <span className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7F1] px-2.5 py-1 text-[11px] font-semibold text-[#5E587A]">
          {periodLabel}
          <ChevronDown size={12} />
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {students.map((st) => (
          <div
            key={st.name}
            className={`${st.cardBg} text-white rounded-xl p-4 text-center relative overflow-hidden shadow-sm hover:-translate-y-0.5 transition-transform`}
          >
            <span className="pointer-events-none absolute -top-3 -right-3 w-12 h-12 rounded-full border-2 border-white/15" />
            <span className="pointer-events-none absolute bottom-6 -left-3 w-8 h-8 rounded-full bg-white/10" />

            <div className="relative z-10">
              <div className="w-11 h-11 rounded-full bg-white text-[#2D2258] font-bold text-xs mx-auto flex items-center justify-center shadow-sm mb-2.5">
                {st.initials}
              </div>
              <h3 className="font-display text-xs font-bold truncate">
                {st.name}
              </h3>
              <p className="text-[10px] text-white/80 truncate mt-0.5">
                {st.detail}
              </p>
              <strong className="font-display text-lg font-extrabold block mt-3">
                {st.score}
              </strong>
              <span
                className={`inline-block mt-2 px-5 py-1 rounded-md text-[11px] font-bold ${st.badgeBg}`}
              >
                {st.rank}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
