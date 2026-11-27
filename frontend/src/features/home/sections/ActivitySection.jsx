import React from "react";
import { Calendar } from "lucide-react";
import { activityCards } from "../data/homeData";

export default function AktivitasSection() {
  return (
    <section
      id="aktivitas"
      className="background-image-hero min-h-screen flex items-center py-16 md:py-24 relative scroll-mt-20"
    >
      <div className="w-full max-w-[1100px] mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-display text-[15px] tracking-wider text-[#58458A] font-semibold">
              Aktivitas Sekolah
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-2xl lg:text-3xl tracking-widest text-[#3B6998] font-bold">
              Belajar, Berkarya, dan Bersosialisasi
            </h2>
            <p className="mt-2 text-sm md:text-xs lg:text-sm text-[#5E5777] font-normal">
              Beragam kegiatan sekolah mendukung kemandirian serta minat dan
              bakat peserta didik.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activityCards.map((card) => (
            <div
              key={card.title}
              className="theme-card bg-white rounded-3xl overflow-hidden border border-[#E5E9F5] shadow-[0_10px_25px_rgba(59,105,152,0.06)] group hover:shadow-[0_16px_35px_rgba(59,105,152,0.12)] transition-all duration-300"
            >
              <div className="relative h-64 md:h-72 overflow-hidden rounded-b-2xl">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute top-4 left-4 ${card.toneBadge} text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5`}
                >
                  <Calendar size={12} />
                  <span>{card.badge}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span
                    className={`inline-block ${card.pillBg} text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm`}
                  >
                    {card.tag}
                  </span>
                </div>
              </div>

              <div className="p-5 text-center">
                <h3 className="font-display text-base font-bold text-[#2A2345]">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#625B7C]">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
