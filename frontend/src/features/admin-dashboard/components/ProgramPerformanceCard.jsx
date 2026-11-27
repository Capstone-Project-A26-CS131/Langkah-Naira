import React from "react";

export default function ProgramPerformanceCard({ programs }) {
  return (
    <section
      id="performa-terapi"
      className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EEF0F7] shadow-[0_6px_20px_rgba(45,34,88,0.04)] scroll-mt-20"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h2 className="font-display text-sm sm:text-base font-bold text-[#2D2258]">
          Performa Program Terapi
        </h2>
        <span className="text-[10px] font-medium text-[#8E89A8]">
          Semua data dalam persentase (%)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div className="sm:col-span-5 space-y-4">
          {programs.map((prog) => (
            <div key={prog.label} className="flex items-start gap-2.5">
              <span
                className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${prog.dotColor}`}
              />
              <div>
                <strong className="block text-xs font-bold text-[#2D2258]">
                  {prog.label}
                </strong>
                <span className="block text-[10px] text-[#8E89A8]">
                  {prog.sublabel} · {prog.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Bar Chart */}
        <div className="sm:col-span-7 relative h-48 flex flex-col justify-end pl-7 pr-2">
          {[100, 75, 50, 25, 0].map((tick) => (
            <div
              key={tick}
              className="flex items-center w-full"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: `${tick * 0.8 + 16}%`,
              }}
            >
              <span className="w-6 text-right pr-2 text-[9px] font-semibold text-[#9A95B5]">
                {tick}
              </span>
              <div className="flex-1 border-b border-dashed border-[#ECEEF6]" />
            </div>
          ))}

          <div className="relative z-10 flex items-end justify-around h-[80%] pb-3 px-2">
            {programs.map((prog) => (
              <div
                key={prog.label}
                className="flex flex-col items-center group"
                style={{ height: `${prog.percent}%` }}
                title={`${prog.label}: ${prog.percent}%`}
              >
                <div
                  className="w-7 h-2.5 -mb-1 skew-x-[-35deg] translate-x-1 rounded-t-[2px]"
                  style={{ backgroundColor: prog.topColor }}
                />
                <div className="flex flex-1">
                  <div
                    className="w-7 h-full rounded-b-[2px] transition-all group-hover:brightness-105"
                    style={{ backgroundColor: prog.barColor }}
                  />
                  <div
                    className="w-2 h-full rounded-br-[2px]"
                    style={{ backgroundColor: prog.sideColor }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
