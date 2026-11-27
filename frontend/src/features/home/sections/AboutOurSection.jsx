import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import studentLearning from "../../../assets/images/student-learning.webp";
import studentsPray from "../../../assets/images/students-pray.webp";

export default function TentangKamiSection() {
  return (
    <section
      id="tentang-kami"
      className="background-image-landing flex items-center py-16 md:py-24 bg-white relative scroll-mt-20"
    >
      <div className="w-full max-w-[1100px] mx-auto px-5">
        <div className="theme-card relative bg-[#FFFBEA] rounded-[32px] md:rounded-[40px] border border-[#FBEEC2] p-6 md:p-12 overflow-hidden shadow-[0_12px_35px_rgba(200,160,50,0.06)]">
          <div className="max-w-2xl mb-8">
            <span className="font-display text-[15px] tracking-wider text-[#58458A] font-semibold">
              Tentang Kami
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-2xl lg:text-3xl tracking-widest text-[#3B6998] font-bold">
              Naira Kencana, Mendidik dengan Hati
            </h2>
            <p className="mt-2 text-sm md:text-xs lg:text-sm text-[#5E5777] font-normal">
              Menjadi wadah untuk membentuk kemandirian anak sekaligus ladang
              amal bagi orang tua dan pemerhati anak berkebutuhan khusus,
              agar anak dapat mandiri, bersosialisasi, dan berprestasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="theme-card bg-white rounded-2xl overflow-hidden border border-[#F4E3AB] shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="h-44 md:h-52 rounded-xl overflow-hidden mb-4">
                <img
                  src={studentLearning}
                  alt="Kegiatan peserta didik Naira Kencana"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-display text-[12px] md:text-[12px] lg:text-[15px] font-bold text-[#3B2C08]">
                  Lingkungan asri, nyaman, dan bebas bullying
                </span>
                <Button
                  variant="ghost"
                  asChild
                  className="gap-1.5 text-[12px] md:text-[12px] lg:text-[14px] font-bold text-[#3B6998] hover:bg-[#E5EEF8] rounded-full"
                >
                  <a href="#visi-misi">
                    <span>Lihat Visi & Misi</span>
                    <ArrowRight size={14} />
                  </a>
                </Button>
              </div>
            </div>

            <div className="theme-card bg-white rounded-2xl overflow-hidden border border-[#F4E3AB] shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="h-44 md:h-52 rounded-xl overflow-hidden mb-4">
                <img
                  src={studentsPray}
                  alt="Peserta didik Naira Kencana"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-display text-[14px] md:text-[14px] lg:text-[15px] font-bold text-[#3B2C08]">
                  Pendidikan sesuai potensi peserta didik
                </span>
                <Button
                  variant="ghost"
                  asChild
                  className="gap-1.5 text-[12px] md:text-[12px] lg:text-[14px] font-bold text-[#4E4383] hover:bg-[#EFE8F9] rounded-full"
                >
                  <a href="#visi-misi">
                    <span>Yang Dipelajari</span>
                    <ArrowRight size={14} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
