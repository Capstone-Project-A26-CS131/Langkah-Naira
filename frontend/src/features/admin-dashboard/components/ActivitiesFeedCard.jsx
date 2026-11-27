import React from "react";

export default function ActivitiesFeedCard({ activities, onViewAll }) {
  return (
    <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EEF0F7] shadow-[0_6px_20px_rgba(45,34,88,0.04)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm sm:text-base font-bold text-[#2D2258]">
          Aktivitas &amp; Notifikasi
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="rounded-full border border-[#22B559] text-[#22B559] hover:bg-[#22B559] hover:text-white px-3.5 py-1 text-[11px] font-bold transition-colors"
        >
          Lihat Semua
        </button>
      </div>

      <div className="divide-y divide-[#F1F2F8]">
        {activities.map((act) => (
          <div key={act.id} className="py-3.5 first:pt-1 last:pb-1">
            <h3 className="text-xs font-bold text-[#2D2258]">{act.title}</h3>
            <span className="block text-[10px] font-semibold text-[#8E89A8] mt-0.5">
              {act.date}
            </span>
            <p className="text-[11px] leading-relaxed text-[#6E698A] mt-1">
              {act.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
