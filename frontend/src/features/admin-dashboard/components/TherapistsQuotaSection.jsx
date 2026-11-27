import React from "react";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TherapistsQuotaSection({
  therapists,
  query = "",
  onBackDashboard,
  onOpenSchedule,
}) {
  const filteredTherapists = therapists.filter((t) =>
    `${t.name} ${t.specialty} ${t.room}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const totalUsed = therapists.reduce((sum, t) => sum + t.usedSlots, 0);
  const totalMax = therapists.reduce((sum, t) => sum + t.maxSlots, 0);
  const totalRemaining = Math.max(0, totalMax - totalUsed);

  return (
    <section className="space-y-5">
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EEF0F7] shadow-[0_6px_20px_rgba(45,34,88,0.04)]">
        <Button
          type="button"
          variant="ghost"
          onClick={onBackDashboard}
          className="h-auto p-0 mb-3 text-xs font-semibold text-[#0077B6] hover:bg-transparent hover:underline inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={14} /> Kembali ke Ringkasan Dashboard
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#2D2258]">
              Terapis &amp; Kuota Layanan
            </h1>
            <p className="text-xs sm:text-sm text-[#7B7696] mt-1">
              Pantau kapasitas slot mingguan per terapis dan ruangan untuk mencegah bentrok jadwal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-[#EEF0F7] bg-[#F8F9FD] px-4 py-2 text-center">
              <span className="block text-[10px] font-semibold text-[#7B7696]">
                Slot Terisi
              </span>
              <strong className="font-display text-base font-bold text-[#2D2258]">
                {totalUsed} / {totalMax}
              </strong>
            </div>
            <div className="rounded-xl border border-[#BCEAD0] bg-[#E9F9EF] px-4 py-2 text-center">
              <span className="block text-[10px] font-semibold text-[#1E974B]">
                Kuota Tersedia
              </span>
              <strong className="font-display text-base font-bold text-[#1E974B]">
                {totalRemaining} Slot
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTherapists.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-2xl p-8 text-center text-xs text-slate-400 border border-[#EEF0F7]">
            Tidak ada terapis yang cocok dengan pencarian &ldquo;{query}&rdquo;.
          </div>
        ) : (
          filteredTherapists.map((therapist) => {
            const pct = Math.min(
              100,
              Math.round((therapist.usedSlots / therapist.maxSlots) * 100),
            );
            const remaining = Math.max(0, therapist.maxSlots - therapist.usedSlots);
            const isFull = remaining === 0;

            return (
              <article
                key={therapist.id}
                className="bg-white rounded-2xl p-5 border border-[#EEF0F7] shadow-[0_6px_20px_rgba(45,34,88,0.04)] flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl font-bold text-xs flex items-center justify-center shrink-0 ${therapist.accentCls}`}
                    >
                      {therapist.initials}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-display text-sm font-bold text-[#2D2258] truncate">
                        {therapist.name}
                      </h2>
                      <span className="text-xs font-semibold text-[#5B4B9A]">
                        {therapist.specialty}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      isFull
                        ? "bg-[#FDF2F2] text-[#B33939]"
                        : "bg-[#E9F9EF] text-[#1E974B]"
                    }`}
                  >
                    {isFull ? "Kuota Penuh" : `Sisa ${remaining} Slot`}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#6E698A]">
                  <p className="flex items-center gap-2">
                    <MapPin size={13} className="text-[#0077B6] shrink-0" />
                    <span>{therapist.room}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={13} className="text-[#5B4B9A] shrink-0" />
                    <span>{therapist.scheduleDays}</span>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-[#7B7696]">Okupansi Mingguan</span>
                    <span className="text-[#2D2258]">
                      {therapist.usedSlots}/{therapist.maxSlots} slot ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#F1F2F8] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${therapist.barCls}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end border-t border-[#F4F5FA] pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onOpenSchedule}
                    className="h-8 rounded-full border-[#E5E7F1] px-4 text-xs font-bold text-[#0077B6] hover:bg-[#F0F7FF] gap-1.5"
                  >
                    <CalendarDays size={13} />
                    <span>Kelola Slot Jadwal</span>
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
