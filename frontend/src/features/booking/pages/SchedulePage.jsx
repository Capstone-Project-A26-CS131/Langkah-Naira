import React, { useState } from "react";
import { ArrowLeft, Building2, CalendarDays, Check, Clock3, LockKeyhole, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SchedulePage({
  form,
  onNavigate,
  embedded = false,
  embeddedBackLabel = "Kembali ke Ringkasan Dashboard",
  embeddedModalButtonLabel = "Kembali ke Dashboard",
}) {
  const [selected, setSelected] = useState({ day: "Sen", date: "16", time: "09.00–10.00 WIB" });
  const [therapist, setTherapist] = useState("Siti Rahma, S.Tr.Ter");
  const [confirmed, setConfirmed] = useState(false);
  const dates = [
    { day: "Sen", date: "16" },
    { day: "Sel", date: "17" },
    { day: "Rab", date: "18" },
    { day: "Kam", date: "19" },
    { day: "Jum", date: "20" },
  ];
  const slots = [
    ["08.00", "09.00", "10.00"],
    ["08.00", "09.00", "10.00"],
    ["08.00", "09.00", "10.00"],
    ["08.00", "09.00", "10.00"],
    ["08.00", "09.00", "10.00"],
  ];

  const selectSlot = (date, time, available = true) => {
    if (!available) return;
    setSelected({ ...date, time: `${time}–${String(Number(time.split(".")[0]) + 1).padStart(2, "0")}.00 WIB` });
  };

  const Wrapper = embedded ? "div" : "main";
  const wrapperClass = embedded ? "w-full" : "schedule-page";
  const containerClass = embedded ? "w-full" : "schedule-container";

  return (
    <Wrapper className={wrapperClass}>
      <div className={containerClass}>
        {embedded && (
          <Button
            variant="ghost"
            className="back-link h-auto p-0 mb-3 text-[#524480] hover:text-[#3B325E] hover:bg-transparent font-medium inline-flex items-center gap-1.5"
            onClick={() => onNavigate("dashboard")}
          >
            <ArrowLeft size={13} /> {embeddedBackLabel}
          </Button>
        )}
        <p className="schedule-breadcrumb">Pendaftaran / Profil anak / Pilih jadwal</p>
        <div className="schedule-title">
          <h1>Pilih waktu terbaik untuk si kecil</h1>
          <p>Pilih terapis, tanggal, dan satu slot terapi. Seluruh waktu ditampilkan dalam WIB.</p>
        </div>
        <section className="child-profile">
          <span className="profile-avatar"><UserRound size={16} /></span>
          <div><strong>{form.full_name || "Nara Putri"}</strong><small>Speech Delay · 5 tahun · Data contoh</small></div>
          <span className="verified-badge"><Check size={12} /> Profil terverifikasi</span>
        </section>
        <div className="schedule-layout">
          <aside className="schedule-filter">
            <h2>Terapis & tanggal</h2>
            <label htmlFor="therapist">Terapis</label>
            <select id="therapist" value={therapist} onChange={(event) => setTherapist(event.target.value)}>
              <option>Siti Rahma, S.Tr.Ter</option>
              <option>Rizky Hadi, S.Tr.Ter</option>
            </select>
            <small className="filter-caption">Layanan: Terapi Wicara</small>
            <div className="month-picker">
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-[#524480]" aria-label="Bulan sebelumnya">‹</Button>
              <strong>November 2026</strong>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-[#524480]" aria-label="Bulan berikutnya">›</Button>
            </div>
            <small className="filter-caption">Minggu 16–20 November</small>
            <div className="mini-days">
              {dates.map((date) => (
                <Button
                  key={date.date}
                  variant={date.date === selected.date ? "default" : "outline"}
                  className={`h-auto flex flex-col py-2 px-2.5 rounded-xl border transition-all ${
                    date.date === selected.date
                      ? "bg-[#524480] text-white border-[#524480] hover:bg-[#43376B]"
                      : "bg-white text-[#524480] border-[#ECE7F6] hover:bg-[#FAF8FE]"
                  }`}
                  onClick={() => setSelected({ ...date, time: selected.time })}
                >
                  <b className="text-[11px] font-normal">{date.day}</b>
                  <strong className="text-sm font-bold">{date.date}</strong>
                </Button>
              ))}
            </div>
            <p className="filter-note"><Clock3 size={13} /> Sabtu–Minggu tidak tersedia. Pilih tanggal lain untuk melihat slot terapi.</p>
          </aside>
          <section className="availability-card">
            <div className="availability-heading"><div><h2>Jadwal mingguan · 16–20 November</h2><p>Slot sesi 60 menit · Terapis wicara</p></div><div className="availability-legend"><span><i className="dot available" /> Tersedia</span><span><i className="dot selected-dot" /> Dipilih</span><span><i className="dot unavailable" /> Tidak tersedia</span></div></div>
            <div className="slot-grid">{dates.map((date, dateIndex) => slots[dateIndex].map((time, slotIndex) => {
              const isSelected = selected.date === date.date && selected.time.startsWith(time);
              const available = !(dateIndex === 0 && slotIndex === 2) && !(dateIndex === 1 && slotIndex === 1) && !(dateIndex === 2 && slotIndex !== 1) && !(dateIndex === 4 && slotIndex === 1);
              return (
                <Button
                  key={`${date.date}-${time}`}
                  variant={isSelected ? "default" : available ? "outline" : "ghost"}
                  className={`slot h-auto flex flex-col p-3 rounded-xl border text-left items-start transition-all ${
                    isSelected
                      ? "bg-[#524480] text-white border-[#524480] shadow-sm hover:bg-[#43376B]"
                      : available
                      ? "bg-white text-slate-700 border-[#ECE7F6] hover:border-[#524480] hover:bg-[#FAF8FE]"
                      : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                  }`}
                  disabled={!available}
                  onClick={() => selectSlot(date, time, available)}
                >
                  <strong className="text-xs">{date.day} {date.date}</strong>
                  <b className="text-sm">{time}</b>
                  <small className="text-[10px] mt-1 flex items-center gap-1">
                    {available ? (isSelected ? "✓ Dipilih" : "Tersedia") : <><LockKeyhole size={10} /> Terisi</>}
                  </small>
                </Button>
              );
            }))}</div>
            <div className="slot-warning"><LockKeyhole size={13} /> Terkunci setelah dipesan. Teruskan editing dijadwalkan. Slot abu-abu tidak dapat dipilih.</div>
          </section>
          <aside className="booking-summary">
            <span className="summary-overline">RINGKASAN JADWAL</span>
            <dl><dt>Anak</dt><dd>{form.full_name || "Nara Putri"} · Speech Delay</dd><dt>Terapis</dt><dd>{therapist}</dd><dt>Tanggal</dt><dd>{selected.day}, {selected.date} November 2026</dd><dt>Waktu</dt><dd>{selected.time}</dd><dt>Ruang</dt><dd>Ruang Terapi 02</dd></dl>
            <Button
              className="primary-button w-full bg-[#524480] hover:bg-[#43376B] text-white font-bold py-3 rounded-full shadow-md"
              onClick={() => setConfirmed(true)}
            >
              Konfirmasi Jadwal
            </Button>
            <p className="summary-note">Periksa kembali sebelum melanjutkan. Jadwal pilihan Anda 09.00–10.00 WIB.</p>
          </aside>
        </div>
        <p className="schedule-disclaimer"><Check size={14} /> Ketersediaan terapi dan ruang diperiksa saat konfirmasi. Tampilan ini adalah contoh data pendaftaran, bukan pemesanan nyata.</p>
      </div>
      {confirmed && <div className="booking-modal-backdrop" role="presentation">
        <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-confirmation-title">
          <Button
            variant="ghost"
            size="icon"
            className="modal-close absolute top-4 right-4 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Tutup konfirmasi"
            onClick={() => setConfirmed(false)}
          >
            <X size={14} />
          </Button>
          <span className="modal-overline">KONFIRMASI PENDAFTARAN & JADWAL</span>
          <span className="confirmation-icon"><Check size={20} /></span>
          <h2 id="booking-confirmation-title">Pendaftaran & jadwal berhasil<br />dikonfirmasi</h2>
          <p className="modal-intro">Profil Nara Putri telah tercatat dan jadwal terapi telah dikunci. Simpan ringkasan berikut sebagai pengingat.</p>
          <div className="booking-ticket">
            <div className="ticket-code"><span>Kode booking</span><strong>LN-581126-024</strong></div>
            <h3>{form.full_name || "Nara Putri"}</h3>
            <p>Speech Delay · Terapi wicara</p>
            <div className="ticket-detail"><CalendarDays size={13} /> {selected.day}, {selected.date} November 2026</div>
            <div className="ticket-detail"><Clock3 size={13} /> {selected.time}</div>
            <div className="ticket-detail"><UserRound size={13} /> {therapist}</div>
            <div className="ticket-detail"><Building2 size={13} /> Ruang Terapi 02</div>
          </div>
          <p className="modal-reminder">Mohon hadir 10 menit sebelum sesi dimulai. Hubungi admin jika perlu mengubah jadwal.</p>
          <Button
            className="primary-button modal-home-button w-full bg-[#524480] hover:bg-[#43376B] text-white font-bold py-3 rounded-full shadow-md mt-4"
            onClick={() => {
              setConfirmed(false);
              onNavigate(embedded ? "dashboard" : "home");
            }}
          >
            {embedded ? embeddedModalButtonLabel : "Kembali ke beranda"}
          </Button>
          <small className="modal-footnote">Data contoh · Konfirmasi akan tersimpan pada sistem saat terhubung ke backend.</small>
        </section>
      </div>}
    </Wrapper>
  );
}
