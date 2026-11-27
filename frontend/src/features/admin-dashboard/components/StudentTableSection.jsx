import React from "react";
import { ArrowRight, CheckCircle2, Plus, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FILTER_TABS = [
  { id: "all", label: "Semua", activeCls: "text-[#5B4B9A]" },
  { id: "pending_verification", label: "Perlu Verifikasi", activeCls: "text-[#D9A307]" },
  { id: "approved", label: "Disetujui", activeCls: "text-[#22B559]" },
  { id: "rejected", label: "Ditolak", activeCls: "text-[#B33939]" },
];

const STATUS_BADGE = {
  approved: {
    label: "Disetujui",
    cls: "bg-[#E9F9EF] text-[#1E974B]",
    dot: "bg-[#22B559]",
  },
  active: {
    label: "Aktif",
    cls: "bg-[#E9F9EF] text-[#1E974B]",
    dot: "bg-[#22B559]",
  },
  rejected: {
    label: "Ditolak",
    cls: "bg-[#FDF2F2] text-[#B33939]",
    dot: "bg-[#D93838]",
  },
  pending_verification: {
    label: "Perlu Verifikasi",
    cls: "bg-[#FFF7DC] text-[#B8860B]",
    dot: "bg-[#F5BE1A]",
  },
};

export default function StudentTableSection({
  students,
  totalSampleCount,
  meta,
  currentPage,
  onPageChange,
  selectedFilter,
  onFilterChange,
  query,
  loading,
  usingFallback,
  verifyNotice,
  onDismissNotice,
  onRefresh,
  onAddRegistration,
  onOpenVerify,
  onOpenSchedule,
}) {
  const totalPages = usingFallback ? 1 : Math.max(1, meta.totalPages);

  return (
    <section
      id="data-siswa-abk"
      className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EEF0F7] shadow-[0_6px_20px_rgba(45,34,88,0.04)] scroll-mt-20"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F1F2F8]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-sm sm:text-base font-bold text-[#2D2258]">
              Daftar Pendaftaran &amp; Verifikasi Siswa
            </h2>
            {usingFallback && (
              <span className="rounded-full bg-[#FFF7DC] px-2.5 py-0.5 text-[10px] font-bold text-[#B8860B]">
                Data Contoh (Offline)
              </span>
            )}
          </div>
          <p className="text-xs text-[#7B7696] mt-0.5">
            Tinjau formulir pendaftaran baru dari orang tua, verifikasi (Setujui/Tolak), dan atur jadwal terapi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1 bg-[#F4F5FA] p-1 rounded-xl text-xs font-semibold">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedFilter === tab.id
                    ? `bg-white ${tab.activeCls} shadow-sm font-bold`
                    : "text-[#7B7696] hover:text-[#2D2258]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={loading}
            className="h-8 w-8 rounded-full border-[#E5E7F1] text-[#5B4B9A]"
            aria-label="Muat ulang data siswa"
            title="Muat ulang"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </Button>

          <Button
            type="button"
            onClick={onAddRegistration}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#5B4B9A] hover:bg-[#493B80] px-4 py-2 h-auto text-xs font-bold text-white"
          >
            <Plus size={14} />
            <span>Tambah Pendaftaran</span>
          </Button>
        </div>
      </div>

      {verifyNotice && (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-[#BCEAD0] bg-[#E9F9EF] px-4 py-2.5 text-xs font-semibold text-[#1E974B]">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={15} />
            {verifyNotice}
          </span>
          <button
            type="button"
            onClick={onDismissNotice}
            className="text-[#1E974B]/70 hover:text-[#1E974B]"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs text-[#5E587A] border-collapse min-w-[780px]">
          <thead>
            <tr className="border-b border-[#F1F2F8] text-[10px] font-bold uppercase tracking-wider text-[#928DAE]">
              <th className="py-3 px-3">ID Siswa</th>
              <th className="py-3 px-3">Nama Anak</th>
              <th className="py-3 px-3">Info / Profil</th>
              <th className="py-3 px-3">{usingFallback ? "Terapis" : "Kontak Wali"}</th>
              <th className="py-3 px-3">Jadwal / Preferensi</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F6F7FC]">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-xs text-[#7B7696]">
                  Memuat data siswa dari server...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-xs text-slate-400">
                  {query
                    ? `Tidak ada data siswa yang cocok dengan pencarian "${query}".`
                    : "Belum ada data siswa pada filter ini."}
                </td>
              </tr>
            ) : (
              students.map((s) => {
                const badge = STATUS_BADGE[s.status] || STATUS_BADGE.pending_verification;

                return (
                  <tr key={s.id} className="hover:bg-[#FAFBFD] transition-colors">
                    <td className="py-3.5 px-3 font-mono text-[11px] font-bold text-[#5B4B9A]">
                      {s.id}
                    </td>
                    <td className="py-3.5 px-3">
                      <strong className="font-bold text-[#2D2258] block">
                        {s.full_name}
                      </strong>
                      <span className="text-[10px] text-[#8E89A8]">
                        {s.registeredLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-block bg-[#F2EFFA] text-[#5B4B9A] font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        {s.diagnosis}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-[#2D2258]">
                      {s.therapist}
                    </td>
                    <td className="py-3.5 px-3">
                      <strong className="block text-[#2D2258]">{s.date}</strong>
                      {s.time && (
                        <span className="text-[10px] text-[#8E89A8]">{s.time}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${badge.cls}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="inline-flex items-center gap-3">
                        {!s.isSample && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onOpenVerify(s.id)}
                            className={`h-7 rounded-full px-3 text-[11px] font-bold ${
                              s.status === "pending_verification"
                                ? "border-[#F5BE1A] bg-[#FFFCEE] text-[#9A6E00] hover:bg-[#FFF3C4]"
                                : "border-[#E5E7F1] text-[#0077B6] hover:bg-[#F0F7FF]"
                            }`}
                          >
                            {s.status === "pending_verification" ? "Verifikasi" : "Detail"}
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => onOpenSchedule(s)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5B4B9A] p-0 h-auto hover:underline"
                        >
                          <span>Atur Jadwal</span>
                          <ArrowRight size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="pt-4 border-t border-[#F1F2F8] flex flex-wrap items-center justify-between gap-2 text-xs text-[#7B7696]">
        <span>
          {usingFallback
            ? `Menampilkan ${students.length} dari ${totalSampleCount} data contoh`
            : `Menampilkan ${students.length} dari ${meta.total} siswa (Halaman ${meta.page} / ${totalPages})`}
        </span>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={usingFallback || currentPage <= 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="w-7 h-7 rounded-lg border border-[#E5E7F1] hover:bg-[#F4F5FA] text-[#5B4B9A]"
          >
            ‹
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              type="button"
              variant={currentPage === pageNum ? "default" : "outline"}
              size="icon"
              disabled={usingFallback}
              onClick={() => onPageChange(pageNum)}
              className={`w-7 h-7 rounded-lg text-xs font-bold ${
                currentPage === pageNum
                  ? "bg-[#5B4B9A] text-white shadow-sm hover:bg-[#493B80]"
                  : "border border-[#E5E7F1] hover:bg-[#F4F5FA] text-[#5B4B9A]"
              }`}
            >
              {pageNum}
            </Button>
          ))}
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={usingFallback || currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="w-7 h-7 rounded-lg border border-[#E5E7F1] hover:bg-[#F4F5FA] text-[#5B4B9A]"
          >
            ›
          </Button>
        </div>
      </div>
    </section>
  );
}
