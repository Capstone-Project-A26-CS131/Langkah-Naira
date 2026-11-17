export const initialForm = {
  full_name: "",
  nickname: "",
  gender: "",
  birth_place: "",
  birth_date: "",
  religion: "",
  living_with: "",
  preferred_schedule: "",
  phone: "",
  notes: "",
};

export const students = [
  { id: "STU-2026-001", name: "Raka Pratama", parent: "Dewi Lestari", status: "Menunggu", schedule: "Terapi Wicara" },
  { id: "STU-2026-002", name: "Alya Putri", parent: "Budi Santoso", status: "Disetujui", schedule: "Terapi Okupasi" },
  { id: "STU-2026-003", name: "Naira Azzahra", parent: "Siti Rahma", status: "Menunggu", schedule: "Terapi Perilaku" },
  { id: "STU-2026-004", name: "Fathan Ardi", parent: "Rizky Hadi", status: "Disetujui", schedule: "Terapi Wicara" },
];

export const schedules = [
  { day: "Senin", date: "18", times: ["08.00", "10.00", "13.00"] },
  { day: "Selasa", date: "19", times: ["08.00", "11.00", "14.00"] },
  { day: "Rabu", date: "20", times: ["09.00", "11.00", "15.00"] },
  { day: "Kamis", date: "21", times: ["08.00", "10.00", "13.00"] },
  { day: "Jumat", date: "22", times: ["09.00", "11.00"] },
];
