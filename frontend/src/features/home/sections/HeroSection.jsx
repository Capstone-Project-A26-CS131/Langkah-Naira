import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import studentMain from "../../../assets/images/student-main.webp";
import studentsPray from "../../../assets/images/students-pray.webp";
import studentLearning from "../../../assets/images/student-learning.webp";

export default function HeroSection({ onNavigate }) {
  const handleCtaClick = () => {
    onNavigate?.("register");
  };

  return (
    <section
      id="pusat-terapi"
      className="background-image-hero min-h-[800px] flex items-center relative overflow-hidden pt-28 pb-24 md:pt-32 md:pb-28 scroll-mt-15"
    >
      <div className="w-full max-w-[1160px] mx-auto px-5 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 xl:gap-20 items-center">
        {/* Image Collage */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[1/1] lg:aspect-[5/4] max-w-sm sm:max-w-md md:max-w-full mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[62%] aspect-[3/4] rounded-[40%_12%_40%_12%] overflow-hidden border-4 border-white/80 shadow-[0_20px_48px_rgba(79,70,135,0.18)] z-20 transition-transform hover:scale-[1.02] duration-300">
              <img
                src={studentMain}
                alt="Peserta didik berkegiatan"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="absolute top-[4%] right-[2%] w-[36%] aspect-[4/3] rounded-2xl border-2 border-white/90 overflow-hidden shadow-[0_10px_28px_rgba(79,70,135,0.14)] z-30 transition-transform hover:scale-105 duration-300">
            <img
              src={studentsPray}
              alt="Peserta didik Naira Kencana"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-[4%] left-[2%] w-[36%] aspect-[4/3] rounded-2xl border-2 border-white/90 overflow-hidden shadow-[0_10px_28px_rgba(79,70,135,0.14)] z-30 transition-transform hover:scale-105 duration-300">
            <img
              src={studentLearning}
              alt="Kegiatan belajar peserta didik"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center justify-center gap-6 text-center md:items-start md:gap-8 md:text-left">
          <div className="flex max-w-xl flex-col items-center gap-1 px-4 sm:px-6 md:items-start md:px-0">
            <span className="mb-2 font-display text-[15px] tracking-wider text-[#58458A] font-semibold">
              Terapi & Pendidikan Khusus
            </span>
            <span className="mb-2 font-display text-3xl md:text-2xl lg:text-3xl tracking-widest text-[#3B6998] font-bold">
              LK Naira Kencana
            </span>
            <span className="mt-2 text-[10px] font-bold tracking-wide bg-[#FFF8DD] px-3.5 py-1 rounded-full text-[#755711] border border-[#FDECB0] shadow-sm">
              ✦ Mendidik dengan Hati
            </span>
            <p className="mt-5 text-sm md:text-xs lg:text-sm leading-relaxed md:leading-6 lg:leading-8 text-[#5E5777] font-normal">
              Menjadi wadah untuk membentuk kemandirian anak berkebutuhan
              khusus agar dapat bersosialisasi dan berprestasi. Kami percaya
              setiap anak berhak memperoleh pendidikan sesuai potensi dan
              kemampuan dasarnya.
            </p>
            <div className="mt-5">
              <Button
                size="lg"
                onClick={handleCtaClick}
                className="theme-action rounded-full bg-[#4E4383] p-4 text-xs md:text-sm font-bold text-white hover:bg-[#3D336D] transition-all"
              >
                <span className="p-2">Cek Riwayat & Jadwal</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
