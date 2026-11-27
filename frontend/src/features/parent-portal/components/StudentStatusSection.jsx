import React from "react";
import { Plus, RefreshCw, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChildStatusCard from "./ChildStatusCard";

export default function StudentStatusSection({
  students,
  loading,
  fetchError,
  apiUrl,
  onRefresh,
  onRegisterNew,
  onSelectSchedule,
}) {
  return (
    <section className="rounded-3xl border border-[#ECE7F6] bg-white/95 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F2EEF9]">
        <div>
          <h2 className="font-display text-lg font-bold text-[#2A2345]">
            Daftar Anak &amp; Status Pendaftaran
          </h2>
          <p className="text-xs text-[#78718E] mt-0.5">
            Status akan diperbarui setelah admin memverifikasi formulir pendaftaran.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="h-8 rounded-full border-[#DDD3F0] px-3.5 text-xs font-bold text-[#524480] hover:bg-[#F3EEFA] gap-1.5"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          <span>Muat Ulang</span>
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs font-semibold text-[#78718E]">
          Memuat data pendaftaran anak...
        </div>
      ) : fetchError ? (
        <div className="mt-5 rounded-2xl border border-[#FAD7D7] bg-[#FDF2F2] p-5 text-center space-y-3">
          <p className="text-xs font-semibold text-[#B33939]">{fetchError}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="rounded-full text-xs font-bold"
            >
              Coba Lagi
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={onRegisterNew}
              className="rounded-full bg-[#524480] hover:bg-[#3E3263] text-white text-xs font-bold"
            >
              Isi Formulir Siswa Baru
            </Button>
          </div>
        </div>
      ) : students.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-[#DDD3F0] bg-[#FAF8FE] p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAE2F7] text-[#524480]">
            <UserRound size={22} />
          </div>
          <h3 className="font-display text-base font-bold text-[#2A2345]">
            Belum ada data anak terdaftar
          </h3>
          <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-[#78718E]">
            Silakan lengkapi formulir pendaftaran anak terlebih dahulu untuk memulai proses verifikasi dan pemilihan jadwal terapi.
          </p>
          <Button
            type="button"
            onClick={onRegisterNew}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#524480] hover:bg-[#3E3263] px-5 py-2.5 h-auto text-xs font-bold text-white"
          >
            <Plus size={15} />
            <span>Daftarkan Anak Sekarang</span>
          </Button>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((child) => (
            <ChildStatusCard
              key={child.id}
              child={child}
              apiUrl={apiUrl}
              onSelectSchedule={onSelectSchedule}
            />
          ))}
        </div>
      )}
    </section>
  );
}
