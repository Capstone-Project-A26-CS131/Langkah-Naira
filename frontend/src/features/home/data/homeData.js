import studentMain from "../../../assets/images/student-main.webp";
import studentsPray from "../../../assets/images/students-pray.webp";
import studentLearning from "../../../assets/images/student-learning.webp";

export const accordionItems = [
  {
    title: "Visi Sekolah",
    desc: "Menjadi wadah dalam membentuk kemandirian anak, sekaligus menjadi ladang amal bagi para orang tua dan pemerhati anak berkebutuhan khusus dalam membantu memberikan pendidikan bagi anak berkebutuhan khusus yang kurang mampu agar dapat mandiri, bersosialisasi dan berprestasi.",
    badgeColor: "bg-[#EAE4F8] text-[#5B488A]",
    type: "text",
  },
  {
    title: "Misi Sekolah",
    badgeColor: "bg-[#FFF4D0] text-[#7A6414]",
    type: "cards",
    points: [
      { no: "01", text: "Menciptakan lingkungan sekolah yang asri, nyaman & bebas bullying." },
      { no: "02", text: "Memberi kesempatan kepada semua peserta didik memperoleh pendidikan sesuai potensi tanpa membedakan stara sosial." },
      { no: "03", text: "Membentuk kepribadian insan berkemampuan khusus agar percaya diri, mandiri dan mampu beradaptasi dengan lingkungan." },
      { no: "04", text: "Mengembangkan bakat & minat dalam bidang akademik, seni, olahraga hingga meraih juara tingkat regional & nasional." },
      { no: "05", text: "Membentuk karakter anak berkebutuhan khusus untuk perilaku jujur dan religius dalam kehidupan sehari-hari." },
      { no: "06", text: "Menanamkan rasa peduli lingkungan di lingkungan sekolah maupun dalam kehidupan bermasyarakat." },
      { no: "07", text: "Memperluas jaringan kerja dalam upaya mengembangkan dan mensosialisasikan pendidikan khusus." },
      { no: "08", text: "Menyelenggarakan program orang tua asuh bagi insan berkemampuan khusus yang kurang mampu." },
    ],
  },
  {
    title: "Yang di Pelajari",
    desc: "Pengembangan Melalui Pembiasaan:\n• Moral dan nilai agama\n• Sosial dan emosional\n• Kemandirian\n\nPengembangan Kemampuan Dasar:\n• Bahasa dan komunikasi\n• Sensor dan motorik siswa\n• Kognitif\n• Pengembangan kemampuan minat, bakat dan potensi siswa",
    badgeColor: "bg-[#DDEBFA] text-[#345D8A]",
    type: "text",
  },
];

export const activityCards = [
  {
    badge: "Kemandirian",
    title: "Activity Daily Living (ADL)",
    tag: "Kegiatan harian",
    image: studentMain,
    desc: "Kegiatan untuk melatih kemampuan melakukan aktivitas sehari-hari dan membangun kemandirian.",
    toneBadge: "bg-[#3B6998] text-white",
    pillBg: "bg-[#EBF2FA] text-[#30557C]",
  },
  {
    badge: "Minat & Bakat",
    title: "Kegiatan Kreatif",
    tag: "Pengembangan potensi",
    image: studentLearning,
    desc: "Kegiatan minat bakat menjadi bagian dari aktivitas belajar peserta didik.",
    toneBadge: "bg-[#655298] text-white",
    pillBg: "bg-[#F3EBF9] text-[#574483]",
  },
  {
    badge: "Kebersamaan",
    title: "Ibadah & Pembiasaan",
    tag: "Aktivitas sekolah",
    image: studentsPray,
    desc: "Kegiatan ibadah dan pembiasaan untuk membentuk karakter religius dan akhlak peserta didik.",
    toneBadge: "bg-[#C4931A] text-white",
    pillBg: "bg-[#FFF8DD] text-[#755711]",
  },
];
