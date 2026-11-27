import React from "react";
import { ArrowUp, Phone, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "../../assets/images/logo-naira-kencana.webp";

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-white pt-14 pb-10 px-5 relative font-sans">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-10">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Logo Naira Kencana"
              className="h-12 w-12 object-contain"
            />
            <div>
              <span className="font-display text-base font-bold tracking-tight block text-white">
                LK Naira Kencana
              </span>
              <span className="text-[10px] text-[#C4B7E5] tracking-widest uppercase block">
                TERAPI & PENDIDIKAN KHUSUS
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#E7DCF8] hover:text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/10 h-auto"
            aria-label="Kembali ke atas"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp size={13} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          <div className="md:col-span-5 space-y-3 text-xs leading-relaxed text-white/80">
            <p className="flex items-start gap-2.5">
              <MapPin size={16} className="shrink-0 text-[#FFE58F] mt-0.5" />
              <span>
                Graha Duta 3, RT 010/RW 023, Margahayu, Kecamatan Bekasi Timur,
                Kota Bekasi, Jawa Barat 17113
              </span>
            </p>
            <p className="text-[11px] text-[#C5B9E2] pl-6 break-all">
              nairapurikencana@gmail.com
            </p>

            <div className="pt-2">
              <Button
                variant="green"
                asChild
                className="w-full max-w-full rounded-full shadow-md h-auto py-2.5 px-5 font-bold whitespace-normal sm:w-auto"
              >
                <a
                  href="https://wa.me/628111020417"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-w-0 items-center gap-2.5 text-left"
                >
                  <Phone size={14} className="text-slate-900" />
                  <span className="min-w-0 break-words text-slate-900">
                    +62 811-1020-417 (WhatsApp)
                  </span>
                </a>
              </Button>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#FFE58F] block mb-3">
                Tentang Sekolah
              </span>
              <ul className="space-y-2 text-[#C4B7E5] font-medium">
                <li><a href="#visi-misi" className="hover:text-white transition-colors">Visi Sekolah</a></li>
                <li><a href="#visi-misi" className="hover:text-white transition-colors">Misi Sekolah</a></li>
                <li><a href="#visi-misi" className="hover:text-white transition-colors">Yang Dipelajari</a></li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#FFE58F] block mb-3">
                Program Sekolah
              </span>
              <ul className="space-y-2 text-[#C4B7E5] font-medium">
                <li><a href="#visi-misi" className="hover:text-white transition-colors">Pembiasaan</a></li>
                <li><a href="#visi-misi" className="hover:text-white transition-colors">Kemampuan Dasar</a></li>
                <li><a href="#aktivitas" className="hover:text-white transition-colors">Aktivitas Sekolah</a></li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#FFE58F] block mb-3">
                Informasi & Kontak
              </span>
              <ul className="space-y-2 text-[#C4B7E5] font-medium">
                <li><a href="#tentang-kami" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="https://www.tiktok.com/@nairakencana" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
                <li><a href="https://www.instagram.com/naira_kencana/" target="_blank">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-[11px] text-white/60">
          <div className="flex flex-col items-start gap-2">
            <p>Langkah Naira • LK Naira Kencana</p>
            <p>Terapi & Pendidikan Khusus</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p>Privasi Data • Bantuan Pendaftaran </p>
            <p>&copy; {new Date().getFullYear()} Naira Kencana </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
