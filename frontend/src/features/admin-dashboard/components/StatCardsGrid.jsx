import React from "react";
import { CalendarDays, Clock, UserCheck, Users } from "lucide-react";

function StatIcon({ id }) {
  if (id === "students") return <Users size={22} />;
  if (id === "sessions") return <CalendarDays size={22} />;
  if (id === "therapists") return <UserCheck size={22} />;
  return <Clock size={22} />;
}

export default function StatCardsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`bg-white rounded-xl border border-[#EEF0F7] border-l-[5px] ${stat.accentBorder} px-5 py-4 shadow-[0_6px_20px_rgba(45,34,88,0.04)] flex items-center justify-between gap-4 hover:shadow-[0_10px_24px_rgba(45,34,88,0.08)] transition-shadow`}
        >
          <div
            className={`w-12 h-12 rounded-xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center shrink-0`}
          >
            <StatIcon id={stat.id} />
          </div>
          <div className="text-right min-w-0">
            <span className="block text-xs font-medium text-[#7B7696] truncate">
              {stat.label}
            </span>
            <strong className="font-display text-2xl sm:text-[28px] font-bold text-[#2D2258] leading-tight block mt-0.5">
              {stat.value}
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
}
