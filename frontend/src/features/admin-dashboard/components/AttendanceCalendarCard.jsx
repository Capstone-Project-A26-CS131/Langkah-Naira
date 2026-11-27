import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AttendanceCalendarCard({
  monthLabel = "16 November, 2026",
  days,
  onOpenSchedule,
}) {
  return (
    <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EEF0F7] shadow-[0_6px_20px_rgba(45,34,88,0.04)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm sm:text-base font-bold text-[#2D2258]">
          Kalender &amp; Kehadiran
        </h2>
        <Button
          type="button"
          variant="link"
          onClick={onOpenSchedule}
          className="text-[11px] font-bold text-[#5B4B9A] p-0 h-auto hover:underline"
        >
          Atur Jadwal →
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          aria-label="Bulan sebelumnya"
          className="w-7 h-7 rounded-full bg-[#FDECEC] text-[#EE726F] hover:bg-[#FAD6D6] flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={15} />
        </button>
        <strong className="text-xs sm:text-sm font-bold text-[#2D2258]">
          {monthLabel}
        </strong>
        <button
          type="button"
          aria-label="Bulan berikutnya"
          className="w-7 h-7 rounded-full bg-[#F3F4F9] text-[#6B6587] hover:bg-[#E7E9F3] flex items-center justify-center transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center bg-[#F7F8FC] rounded-lg py-2 mb-3 text-[11px] font-bold text-[#5E587A]">
        <span>Min</span>
        <span>Sen</span>
        <span>Sel</span>
        <span>Rab</span>
        <span>Kam</span>
        <span>Jum</span>
        <span>Sab</span>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold">
        {days.map((item, idx) => {
          const isStart = item.range === "start";
          const isMiddle = item.range === "middle";
          const isEnd = item.range === "end";

          return (
            <div
              key={`${item.day}-${idx}`}
              className={`h-8 flex items-center justify-center ${
                isStart
                  ? "bg-[#22B559] text-white rounded-l-full font-bold"
                  : isMiddle
                  ? "bg-[#22B559] text-white font-bold"
                  : isEnd
                  ? "bg-[#22B559] text-white rounded-r-full font-bold"
                  : ""
              }`}
            >
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
                  item.muted
                    ? "text-slate-300"
                    : item.highlight === "green-circle"
                    ? "bg-[#22B559] text-white font-bold shadow-sm"
                    : item.highlight === "yellow-circle"
                    ? "bg-[#F5BE1A] text-white font-bold shadow-sm"
                    : item.range
                    ? "text-white"
                    : "text-[#3E375C] hover:bg-[#F3F4F9]"
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
