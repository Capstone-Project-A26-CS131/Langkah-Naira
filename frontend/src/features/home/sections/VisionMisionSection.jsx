import React from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import studentsTim from "../../../assets/images/students-tim.webp";
import { accordionItems } from "../data/homeData";

export default function VisiMisiSection({ activeAccordion, setActiveAccordion }) {
  return (
    <section
      id="visi-misi"
      className="background-image-landing min-h-screen flex items-center py-12 md:py-14 relative scroll-mt-20"
    >
      <div className="w-full max-w-[1100px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] md:rounded-[36px] overflow-hidden">
              <img
                src={studentsTim}
                alt="Kegiatan peserta didik Naira Kencana"
                className="w-full h-80 md:h-[420px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="mb-6">
              <span className="font-display text-[15px] tracking-wider text-[#58458A] font-semibold">
                Visi, Misi & Pembelajaran
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-2xl lg:text-3xl tracking-widest text-[#3B6998] font-bold">
                Tumbuh, Mandiri, dan Berprestasi
              </h2>
            </div>

            {accordionItems.map((item, index) => {
              const isOpen = activeAccordion === index;
              return (
                <div
                  key={item.title}
                  className={`theme-card rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#C9B9E7] bg-[#FAF8FE] shadow-sm"
                      : "border-[#ECE8F5] bg-white hover:border-[#D8CCE8]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveAccordion(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div>
                      <span
                        className={`text-sm font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-1 ${item.badgeColor}`}
                      >
                        {item.title}
                      </span>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-colors ${
                        isOpen
                          ? "bg-[#4E4383] text-white"
                          : "bg-[#F0ECF8] text-[#554286]"
                      }`}
                    >
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1">
                      {item.type === "cards" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {item.points.map((point) => (
                            <div
                              key={point.no}
                              className="flex items-start gap-3 bg-white border border-[#EDE7F6] rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-[#C9B9E7] transition-all duration-200"
                            >
                              <div className="shrink-0 w-8 h-8 rounded-full bg-[#EAE4F8] flex items-center justify-center text-[11px] font-bold text-[#5B488A]">
                                {point.no}
                              </div>
                              <p className="text-xs leading-relaxed text-[#4A4268] pt-1">{point.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="whitespace-pre-line text-sm leading-relaxed text-[#5F5878]">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
