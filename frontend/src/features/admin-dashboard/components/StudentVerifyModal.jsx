import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle2,
  Loader2,
  Phone,
  ShieldCheck,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_BADGE = {
  pending_verification: {
    label: "Menunggu Verifikasi",
    cls: "bg-[#FFF7DC] text-[#B8860B] border-[#FCEBB2]",
  },
  approved: {
    label: "Disetujui",
    cls: "bg-[#E9F9EF] text-[#1E974B] border-[#BCEAD0]",
  },
  active: {
    label: "Aktif",
    cls: "bg-[#E9F9EF] text-[#1E974B] border-[#BCEAD0]",
  },
  rejected: {
    label: "Ditolak",
    cls: "bg-[#FDF2F2] text-[#B33939] border-[#FAD7D7]",
  },
};

const formatDate = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const resolvePhoto = (url, apiUrl) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${apiUrl}${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function StudentVerifyModal({ studentId, onClose, onVerified }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    if (!studentId) return;

    let cancelled = false;
    const fetchDetail = async () => {
      setLoading(true);
      setError("");
      setRejectMode(false);
      setRejectionNote("");

      const token =
        localStorage.getItem("token") || localStorage.getItem("parent_token");
      if (!token) {
        setError("Sesi login admin tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${apiUrl}/api/students/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cancelled) {
          setStudent(res.data?.data || null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Gagal memuat detail formulir siswa.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [studentId, apiUrl]);

  useEffect(() => {
    if (!studentId) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !submitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [studentId, submitting, onClose]);

  if (!studentId) return null;

  const submitVerify = async (status) => {
    setError("");
    if (status === "rejected" && rejectionNote.trim().length < 5) {
      setError("Alasan penolakan minimal 5 karakter.");
      return;
    }

    const token =
      localStorage.getItem("token") || localStorage.getItem("parent_token");
    if (!token) {
      setError("Sesi login admin tidak ditemukan.");
      return;
    }

    setSubmitting(true);
    try {
      const payload =
        status === "rejected"
          ? { status: "rejected", rejection_note: rejectionNote.trim() }
          : { status: "approved" };

      const res = await axios.patch(
        `${apiUrl}/api/students/${studentId}/verify`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      onVerified?.(res.data?.data);
      onClose();
    } catch (err) {
      const details = err.response?.data?.details;
      if (Array.isArray(details) && details.length > 0) {
        setError(details.map((d) => d.message).join(" "));
      } else {
        setError(
          err.response?.data?.message ||
            "Gagal memproses verifikasi siswa.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadge =
    STATUS_BADGE[student?.status] || STATUS_BADGE.pending_verification;
  const photoSrc = resolvePhoto(student?.photo_url, apiUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B1438]/50 p-4 backdrop-blur-[2px]"
      onClick={() => {
        if (!submitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="verify-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#ECE7F6] bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F5FA] text-[#5E587A] hover:bg-[#EAE8F5]"
        >
          <X size={16} />
        </button>

        <div className="pr-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0077B6]">
            Verifikasi Pendaftaran Siswa
          </span>
          <h2
            id="verify-modal-title"
            className="mt-1 font-display text-lg font-bold text-[#2D2258]"
          >
            Tinjau Formulir Siswa ({studentId})
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-xs font-semibold text-[#7B7696]">
            <Loader2 size={16} className="animate-spin text-[#0077B6]" />
            <span>Memuat detail data siswa...</span>
          </div>
        ) : student ? (
          <div className="mt-5 space-y-5 text-xs text-[#4A4268]">
            <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-[#EEF0F7] bg-[#F8F9FD] p-4">
              <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-[#E3DEEF] bg-white flex items-center justify-center text-[#5B4B9A]">
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt={student.full_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={24} />
                )}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <strong className="font-display text-base font-bold text-[#2D2258]">
                    {student.full_name}
                  </strong>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${statusBadge.cls}`}
                  >
                    {statusBadge.label}
                  </span>
                </div>
                <p className="text-[#6E698A]">
                  Panggilan: <b>{student.nickname || "-"}</b> ·{" "}
                  {student.gender === "P" ? "Perempuan" : "Laki-laki"} · Lahir{" "}
                  {student.birth_place ? `${student.birth_place}, ` : ""}
                  {formatDate(student.birth_date)}
                </p>
                <p className="text-[#6E698A]">
                  Tinggal bersama: <b>{student.living_with || "-"}</b> · Gol. Darah:{" "}
                  <b>{student.blood_type || "-"}</b> · TB/BB:{" "}
                  <b>{student.height_cm ? `${student.height_cm} cm` : "-"}</b> /{" "}
                  <b>{student.weight_kg ? `${student.weight_kg} kg` : "-"}</b>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#EEF0F7] p-4 space-y-1.5">
                <h3 className="font-bold text-[#2D2258] text-xs mb-2">
                  Orang Tua &amp; Kontak
                </h3>
                <p>
                  Wali: <b>{student.parent_name || "-"}</b>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone size={12} className="text-[#0077B6]" />
                  <span>{student.parent_phone || "-"}</span>
                </p>
                <p>Email: {student.parent_email || "-"}</p>
                <p>
                  Darurat 1: <b>{student.emergency_contact_1_phone || "-"}</b>{" "}
                  {student.emergency_contact_1_relation
                    ? `(${student.emergency_contact_1_relation})`
                    : ""}
                </p>
                <p>
                  Preferensi Jadwal: <b>{student.preferred_schedule || "-"}</b>
                </p>
              </div>

              <div className="rounded-2xl border border-[#EEF0F7] p-4 space-y-1.5">
                <h3 className="font-bold text-[#2D2258] text-xs mb-2">
                  Riwayat Kesehatan &amp; ABK
                </h3>
                <p>
                  Diagnosa:{" "}
                  <b className="text-[#5B4B9A]">
                    {student.special_needs_diagnosis || "Belum diisi"}
                  </b>
                </p>
                <p>Riwayat Lahir: {student.birth_history || "-"}</p>
                <p>
                  Alergi:{" "}
                  {student.is_allergic
                    ? student.allergy_detail || "Ya"
                    : "Tidak ada"}
                </p>
                <p>
                  Rawat Inap:{" "}
                  {student.ever_hospitalized
                    ? student.hospitalized_detail || "Pernah"
                    : "Tidak pernah"}
                </p>
                <p>Catatan: {student.health_notes_other || "-"}</p>
              </div>
            </div>

            {student.status === "rejected" && student.rejection_note && (
              <div className="rounded-xl border border-[#FAD7D7] bg-[#FDF2F2] p-3 text-xs text-[#B33939]">
                <strong>Catatan Penolakan Sebelumnya:</strong>{" "}
                {student.rejection_note}
              </div>
            )}

            {error && (
              <p
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}

            {rejectMode && (
              <div className="rounded-2xl border border-[#FAD7D7] bg-[#FFF9F9] p-4 space-y-2.5">
                <label className="block text-xs font-bold text-[#9B2C2C]">
                  Alasan Penolakan / Catatan Perbaikan (minimal 5 karakter)
                </label>
                <textarea
                  rows={3}
                  value={rejectionNote}
                  onChange={(e) => setRejectionNote(e.target.value)}
                  placeholder="Contoh: Mohon lengkapi detail riwayat alergi dan unggah foto anak 3x4 yang jelas."
                  className="w-full rounded-xl border border-[#FAD7D7] bg-white p-3 text-xs text-[#2D2258] outline-none focus:border-[#B33939]"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRejectMode(false);
                      setError("");
                    }}
                    className="rounded-full text-xs font-bold"
                  >
                    Batal
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    disabled={submitting}
                    onClick={() => submitVerify("rejected")}
                    className="rounded-full bg-[#D93838] hover:bg-[#B32828] text-white text-xs font-bold"
                  >
                    {submitting ? "Mengirim..." : "Konfirmasi Tolak"}
                  </Button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F1F2F8] pt-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#7B7696]">
                <ShieldCheck size={14} className="text-[#0077B6]" />
                Keputusan verifikasi langsung tersinkron ke Portal Orang Tua.
              </span>

              {!rejectMode && (
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={submitting}
                    onClick={() => setRejectMode(true)}
                    className="rounded-full border-[#FAD7D7] text-[#B33939] hover:bg-[#FDF2F2] text-xs font-bold gap-1.5"
                  >
                    <XCircle size={14} />
                    <span>Tolak</span>
                  </Button>
                  <Button
                    type="button"
                    disabled={submitting}
                    onClick={() => submitVerify("approved")}
                    className="rounded-full bg-[#22B559] hover:bg-[#1C9E4C] text-white text-xs font-bold gap-1.5"
                  >
                    {submitting ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={14} />
                    )}
                    <span>Setujui Pendaftaran</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-10 text-center space-y-3">
            <p className="text-xs font-semibold text-red-600">{error}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-full text-xs font-bold"
            >
              Tutup
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
