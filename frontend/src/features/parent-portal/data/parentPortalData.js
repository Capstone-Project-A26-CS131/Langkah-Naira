import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

export const PARENT_PORTAL_TABS = [
  { id: "status", label: "Status & Anak Saya", icon: ClipboardList },
  { id: "register", label: "Formulir Siswa", icon: FileText },
  { id: "schedule", label: "Jadwal Terapi", icon: CalendarDays },
];

export const STUDENT_STATUS_META = {
  pending_verification: {
    label: "Menunggu Verifikasi",
    badgeClass: "bg-[#FFF6D6] text-[#7A610A] border-[#FBEEC2]",
    icon: Clock3,
  },
  approved: {
    label: "Disetujui",
    badgeClass: "bg-[#E9F9EF] text-[#1E974B] border-[#BCEAD0]",
    icon: CheckCircle2,
  },
  active: {
    label: "Aktif",
    badgeClass: "bg-[#E9F9EF] text-[#1E974B] border-[#BCEAD0]",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Perlu Perbaikan",
    badgeClass: "bg-[#FDF2F2] text-[#B33939] border-[#FAD7D7]",
    icon: XCircle,
  },
};

export const formatBirthDate = (raw) => {
  if (!raw) return "-";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const resolvePhotoSrc = (photoUrl, apiUrl) => {
  if (!photoUrl) return "";
  if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
    return photoUrl;
  }
  return `${apiUrl}${photoUrl.startsWith("/") ? "" : "/"}${photoUrl}`;
};
