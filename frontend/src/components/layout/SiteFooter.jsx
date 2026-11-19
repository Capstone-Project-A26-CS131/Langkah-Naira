import React from "react";


export default function SiteFooter() {
  return (
    <footer className="border-t border-[#0F766E] bg-[#8CC0EB] py-7">
      <div className="mx-auto flex w-[min(1120px,calc(100%-64px))] items-start justify-between gap-8 max-md:w-[calc(100%-40px)] max-md:flex-col max-md:gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-slate-600 font-light">Langkah Naira • LK Naira Kencana</span>
          <span className="text-xs text-slate-600 font-light">Mendampingi setiap langkah tumbuh kembang.</span>
        </div>
        <div className="flex flex-col items-start gap-2 max-md:items-start">
          <span className="text-xs font-light text-slate-600">Privasi data • Bantuan pendaftaran</span>
          <span className="text-xs text-slate-600 font-light">&copy; {new Date().getFullYear()} LK Naira Kencana</span>
        </div>
      </div>
    </footer>
  );
}
