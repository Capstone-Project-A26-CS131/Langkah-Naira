import React, { useState } from "react";
import axios from "axios";
import { CheckCircle2, Loader2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAMPLE_CHAT_TEXT =
  "Halo admin LK Naira, mau daftarin anak saya Rizky lahir 10 Maret 2019 di Bekasi, tinggal bersama kedua orang tua. Ada keluhan belum lancar bicara (speech delay). Nomor kontak saya 081234567890.";

const normalizeGender = (value) => {
  if (!value) return "";
  const lower = String(value).trim().toLowerCase();
  if (lower === "l" || lower.includes("laki")) return "L";
  if (lower === "p" || lower.includes("perempuan")) return "P";
  return "";
};

export default function AiAutofillCard({ onApplyParsed }) {
  const [expanded, setExpanded] = useState(true);
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filledFields, setFilledFields] = useState([]);

  const handleExtract = async () => {
    const trimmed = rawText.trim();
    if (!trimmed) {
      setError("Tempelkan teks chat pendaftaran terlebih dahulu.");
      return;
    }

    setError("");
    setFilledFields([]);
    setLoading(true);

    try {
      const baseUrl = (
        import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:8000/api/v1"
      ).replace(/\/$/, "");

      const response = await axios.post(`${baseUrl}/extract-registration`, {
        raw_text: trimmed,
      });

      const parsed = response.data?.parsed || response.data?.data || {};
      const nextPatch = {};
      const labels = [];

      const fullName = parsed.child_name || parsed.full_name;
      if (fullName) {
        nextPatch.full_name = fullName;
        labels.push("Nama Lengkap");
      }
      if (parsed.nickname) {
        nextPatch.nickname = parsed.nickname;
        labels.push("Nama Panggilan");
      }
      const gender = normalizeGender(parsed.gender);
      if (gender) {
        nextPatch.gender = gender;
        labels.push("Jenis Kelamin");
      }
      if (parsed.birth_place) {
        nextPatch.birth_place = parsed.birth_place;
        labels.push("Tempat Lahir");
      }
      if (parsed.birth_date) {
        nextPatch.birth_date = parsed.birth_date;
        labels.push("Tanggal Lahir");
      }
      if (parsed.living_with) {
        nextPatch.living_with = parsed.living_with;
        labels.push("Tinggal Bersama");
      }
      if (parsed.special_needs_diagnosis) {
        nextPatch.special_needs_diagnosis = parsed.special_needs_diagnosis;
        nextPatch.is_special_needs = true;
        labels.push("Diagnosa");
      }
      const phone = parsed.parent_phone || parsed.emergency_contact_1_phone;
      if (phone) {
        nextPatch.emergency_contact_1_phone = phone;
        labels.push("No. Kontak");
      }
      if (parsed.religion) {
        nextPatch.religion = parsed.religion;
        labels.push("Agama");
      }
      if (parsed.preferred_schedule) {
        nextPatch.preferred_schedule = parsed.preferred_schedule;
        labels.push("Preferensi Jadwal");
      }

      if (labels.length === 0) {
        setError(
          "AI tidak menemukan data formulir yang dapat diisi dari teks tersebut.",
        );
        return;
      }

      onApplyParsed(nextPatch);
      setFilledFields(labels);
    } catch (requestError) {
      setError(
        requestError.response?.data?.detail ||
          requestError.response?.data?.message ||
          "Gagal terhubung ke layanan AI (pastikan ai-service berjalan di port 8000).",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-[#DCE8F5] bg-gradient-to-br from-[#F4F8FF] via-white to-[#F7F3FF] p-5 shadow-sm mb-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-sm sm:text-base font-bold text-[#2D2258]">
                Isi Otomatis dengan AI
              </h2>
              <span className="rounded-full bg-[#E0F2FE] px-2.5 py-0.5 text-[10px] font-bold text-[#0077B6]">
                Smart Parser
              </span>
            </div>
            <p className="text-xs text-[#6B6587] mt-0.5">
              Tempel pesan chat WhatsApp pendaftaran untuk mengisi kolom formulir secara otomatis.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setExpanded((prev) => !prev)}
          className="h-8 rounded-full border-[#DCE8F5] bg-white px-3.5 text-xs font-bold text-[#0077B6] hover:bg-[#F0F7FF]"
        >
          {expanded ? "Sembunyikan" : "Gunakan AI"}
        </Button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3">
          <textarea
            rows={3}
            value={rawText}
            onChange={(event) => setRawText(event.target.value)}
            placeholder="Tempel chat pendaftaran orang tua di sini... Contoh: Halo admin LK Naira, mau daftarin anak saya Rizky lahir 10 Maret 2019 di Bekasi..."
            className="w-full rounded-xl border border-[#DCE8F5] bg-white p-3 text-xs sm:text-sm text-[#2D2258] placeholder-[#9A95B5] outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/10"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                setRawText(SAMPLE_CHAT_TEXT);
                setError("");
              }}
              className="text-xs font-semibold text-[#0077B6] hover:underline"
            >
              Gunakan contoh chat pendaftaran
            </button>

            <Button
              type="button"
              onClick={handleExtract}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-[#0077B6] hover:bg-[#005F94] px-4 py-2 h-auto text-xs font-bold text-white shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Mengekstrak Data...</span>
                </>
              ) : (
                <>
                  <Wand2 size={14} />
                  <span>Ekstrak &amp; Isi Otomatis</span>
                </>
              )}
            </Button>
          </div>

          {error && (
            <p
              className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          {filledFields.length > 0 && (
            <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs text-emerald-800">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />
              <div>
                <strong className="font-bold">Berhasil mengisi otomatis:</strong>{" "}
                <span>{filledFields.join(", ")}. Silakan periksa kembali data di bawah.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
