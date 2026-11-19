import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "../../assets/images/logo-naira-kencana.webp";

const links = [
  { page: "home", label: "Beranda" },
  { page: "register", label: "Layanan" },
  { page: "schedule", label: "Alur Pendaftaran" },
];

export default function Header({ page, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (event.clientY <= 24) {
        setHidden(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const navigate = (nextPage) => {
    setMenuOpen(false);
    onNavigate(nextPage);
  };

  return (
    <header
      className={`sticky top-0 z-50 scroll-mt-16 border-b border-[#0F766E]/40 bg-[#8CC0EB]/75 backdrop-blur-0 backdrop-saturate-100 will-change-transform transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-[78px] w-[min(1120px,calc(100%-64px))] items-center justify-between max-md:w-[calc(100%-40px)]">
        <a
          className="relative flex items-center gap-2 text-slate-800 no-underline"
          href="#beranda"
          aria-label="Langkah Naira"
        >
          <img
            src={logoImage}
            alt="Logo Langkah Naira"
            className="h-12 w-12 object-contain"
          />
          <span className="flex flex-col">
            <span className="font-display text-[15px] font-extrabold tracking-tight">
              Langkah Naira
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              LK NAIRA KENCANA
            </span>
          </span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          {links.map((link) => (
            <button
              className={page === link.page ? "active" : ""}
              key={link.page}
              onClick={() => navigate(link.page)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="login-button"
            onClick={() => navigate("dashboard")}
          >
            Masuk / Daftar
          </button>
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Buka menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
