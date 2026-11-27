import React from "react";
import { CalendarDays, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatBirthDate,
  resolvePhotoSrc,
  STUDENT_STATUS_META,
} from "../data/parentPortalData";

export default function ChildStatusCard({ child, apiUrl, onSelectSchedule }) {
  const statusInfo =
    STUDENT_STATUS_META[child.status] ||
    STUDENT_STATUS_META.pending_verification;
  const StatusIcon = statusInfo.icon;
  const photoSrc = resolvePhotoSrc(child.photo_url, apiUrl);

  return (
    <article className="flex flex-col justify-between gap-4 rounded-2xl border border-[#ECE7F6] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3.5">
        <div className="h-16 w-12 shrink-0 overflow-hidden rounded-xl border border-[#ECE7F6] bg-[#F4F1FA] flex items-center justify-center text-[#524480]">
          {photoSrc ? (
            <img
              src={photoSrc}
              alt={`Foto ${child.full_name}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={20} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-bold text-[#524480]">
              {child.id}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${statusInfo.badgeClass}`}
            >
              <StatusIcon size={11} />
              <span>{statusInfo.label}</span>
            </span>
          </div>

          <h3 className="mt-1 font-display text-base font-bold text-[#2A2345] truncate">
            {child.full_name}
          </h3>
          <p className="text-xs text-[#78718E]">
            {child.nickname ? `Panggilan: ${child.nickname} · ` : ""}
            {child.gender === "P" ? "Perempuan" : "Laki-laki"} · Lahir{" "}
            {formatBirthDate(child.birth_date)}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold text-[#3B6998]">
            Preferensi Jadwal: {child.preferred_schedule || "Belum dipilih"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[#F4F1FA] pt-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onSelectSchedule(child)}
          className="h-8 rounded-full border-[#DDD3F0] px-4 text-xs font-bold text-[#524480] hover:bg-[#F3EEFA]"
        >
          <CalendarDays size={13} className="mr-1.5" />
          <span>Pilih / Lihat Jadwal</span>
        </Button>
      </div>
    </article>
  );
}
