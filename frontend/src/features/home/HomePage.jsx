import React from "react";
import {
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Puzzle,
  ScanFace,
  MessagesSquare,
  Accessibility,
} from "lucide-react";
import ServiceCard from "../../components/common/ServiceCard";

export default function HomePage({ onNavigate }) {
  return (
    <main>
      <section className="hero-background px-5 py-20 max-md:py-12">
        <div className="mx-auto grid w-[min(1120px,100%)] grid-cols-2 items-stretch gap-16 max-md:grid-cols-1">
          <div>
            <span className="text-[14px] font-extrabold tracking-wider text-[#0F766E]">
              PUSAT TERAPI & TUMBUH KEMBANG ANAK
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-800 max-md:text-4xl">
              Langkah Tepat untuk Tumbuh Kembang Buah Hati
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-500">
              Bersama LK Naira Kencana, temukan pendampingan terapi yang sesuai
              dengan kebutuhan unik anak. Mulai dengan pendaftaran yang
              sederhana dan jadwal yang jelas.
            </p>
            <div className="mt-5 flex flex-wrap gap-5">
              <button
                className="inline-flex items-center gap-2 rounded-lg border-0 bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 hover:bg-[#0F8C7E]"
                onClick={() => onNavigate("register")}
              >
                Daftar Siswa Baru <ArrowRight size={17} />
              </button>
            </div>
            <div className="mt-5">
              <button
                className="inline-flex items-center gap-2 rounded-lg border-0 bg-[#8CC0EB] text-black/70 px-5 py-3 text-sm font-semibold shadow-lg shadow-brand-500/20 hover:bg-[#A0D1F5]"
                onClick={() => onNavigate("schedule")}
              >
                Cek Riwayat & Jadwal <ArrowRight size={16} />
              </button>
            </div>
          </div>
          {/* Section 2 */}
          <div className="relative flex h-[500px] flex-col items-center overflow-hidden max-md:h-fit">
            <div className="relative z-10 mt-20 ml-24 flex h-fit w-[calc(80%-100px)] items-center gap-2 rounded-xl border border-[#0F766E] bg-[#A0D1F5] p-4 shadow-lg max-md:mt-0 max-md:ml-0 max-md:w-full">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="shrink-0 rounded-lg bg-emerald-50 p-1 text-[#0F766E]">
                    <HeartHandshake size={25} />
                  </div>
                  <strong className="text-sm text-slate-800">
                    Satu langkah kecil, dukungan yang berarti.
                  </strong>
                </div>
                <div className="mt-3 text-[12px] leading-5">
                  <p>Kebutuhan setiap anak berbeda. Kami membantu keluarga memulai dengan alur yang terarah.</p>
                  <div className="mt-3 flex items-center gap-3 leading-8">
                  <p className="border rounded-full w-6 h-6 flex items-center justify-center text-[12px] text-[#0F766E] shadow-sm font-bold bg-emerald-50">
                    01
                  </p>
                  <p className="text-[12px] font-medium">
                      Kenali kebutuhan anak
                  </p>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                  <p className="border rounded-full w-6 h-6 flex items-center justify-center text-[12px] text-[#0F766E] shadow-sm font-bold bg-emerald-50">
                    02
                  </p>
                  <p className="text-[12px] font-medium">
                      Pilih pendampingan yang sesuai
                  </p>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                  <p className="border rounded-full w-6 h-6 flex items-center justify-center text-[12px] text-[#0F766E] shadow-sm font-bold bg-emerald-50">
                    03
                  </p>
                  <p className="text-[12px] font-medium">
                      Jalani terapi secara terjadwal
                  </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 ml-24 flex w-[calc(70%-50px)] items-center justify-center gap-2 rounded-xl bg-slate-50 p-2 text-[12px] font-medium text-slate-500 shadow-md max-md:ml-0 max-md:w-full">
              <ShieldCheck style={{ color: "#0F766E" }} size={16} /> Data anak
              dijaga dan ditinjau oleh admin
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page 2 */}
      <section className="hero-landing px-5 py-20 max-md:py-12">
        <div className="mx-auto w-[min(1120px,100%)] items-stretch gap-16 max-md:grid-cols-1">
          <div>
            <span className="text-[14px] font-extrabold tracking-widest text-[#0F766E]">
              DUKUNGAN SESUAI KEBUTUHAN ANAK
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold leading-tight text-slate-800 max-md:text-2xl">
              Dukungan sesuai kebutuhan anak
            </h1>
            <p className="mt-3 max-w-xl text-base leading-8 text-slate-500">
              Empat layanan terapi, dengan tujuan tumbuh kembang yang personal.
            </p>
          </div>
        </div>
        <div className="mx-auto grid w-[min(1120px,100%)] grid-cols-4 gap-5 item-center max-md:grid-cols-1 mt-5">
          <ServiceCard
            icon={<Puzzle />}
            title="Autism"
            text="Pendampingan interaksi sosial, komunikasi, dan kemandirian anak."
            onClick={() => onNavigate("schedule")}
            tone="lavender"
          />
          <ServiceCard
            icon={<ScanFace />}
            title="ADHD"
            text="Dukungan untuk membangun fokus, regulasi diri, dan rutinitas positif."
            onClick={() => onNavigate("schedule")}
            tone="yellow"
          />
          <ServiceCard
            icon={<MessagesSquare />}
            title="Speech Delay"
            text="Stimulasi kemampuan bicara, bahasa, dan komunikasi sehari-hari."
            onClick={() => onNavigate("schedule")}
            tone="lavender"
          />
          <ServiceCard
            icon={<Accessibility />}
            title="CP"
            text="Pendampingan Cerebral Palsy untuk mendukung gerak dan aktivitas anak."
            onClick={() => onNavigate("schedule")}
            tone="yellow"
          />
        </div>
      
      {/* Landing Page 3 */}
        <div className="px-5 py-20 max-md:py-12">
          <div className="mx-auto w-[min(1120px,100%)] items-stretch gap-16 max-md:grid-cols-1">
            <div>
              <span className="text-[14px] font-extrabold tracking-widest text-[#0F766E]">
                MUDAH DENGAN LANGKAH NAIRA
              </span>
              <h1 className="mt-5 font-display text-2xl font-bold leading-tight text-slate-800 max-md:text-2xl">
                Mulai dengan tiga langkah sederhana
              </h1>
            </div>
          </div>
          <div className="mx-auto grid w-[min(1120px,100%)] grid-cols-3 gap-5 item-center max-md:grid-cols-1 mt-5">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <b className="text-2xl text-brand-500">01</b>
              </div>
              <h3 className="mt-4 font-display font-bold">
                Daftarkan anak Anda
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Isi formulir pendaftaran dengan mudah.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <b className="text-2xl text-brand-500">02</b>
              <h3 className="mt-4 font-display font-bold">
                Pilih jadwal terapi
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Tentukan waktu yang paling nyaman.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <b className="text-2xl text-brand-500">03</b>
              <h3 className="mt-4 font-display font-bold">Mulai bertumbuh</h3>
              <p className="mt-2 text-sm text-slate-500">
                Dampingi prosesnya bersama kami.
              </p>
            </div>
          </div>
        </div>
        </section>
    </main>
  );
}
