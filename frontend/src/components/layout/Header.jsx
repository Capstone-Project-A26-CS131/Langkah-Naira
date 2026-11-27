import { useEffect, useRef, useState } from "react";
import {
  Activity,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileText,
  LogOut,
  Menu,
  UserRound,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "../../assets/images/logo-naira-kencana.webp";

const landingNavLinks = [
  { label: "Beranda", anchor: "pusat-terapi" },
  { label: "Visi & Misi", anchor: "visi-misi" },
  { label: "Aktivitas", anchor: "aktivitas" },
  { label: "Tentang Kami", anchor: "tentang-kami" },
];

export default function Header({ page, user, onNavigate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);
  const [activeAnchor, setActiveAnchor] = useState("pusat-terapi");
  const profileDropdownRef = useRef(null);
  const programmaticScrollTimerRef = useRef(null);
  const isProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 12);

      if (!isProgrammaticScrollRef.current) {
        const delta = currentScrollY - lastScrollY;
        if (currentScrollY <= 80) {
          setHidden(false);
          lastScrollY = currentScrollY;
        } else if (delta > 5) {
          setHidden(true);
          lastScrollY = currentScrollY;
        } else if (delta < -5) {
          setHidden(false);
          lastScrollY = currentScrollY;
        }
      } else {
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (programmaticScrollTimerRef.current) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }
    };
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

  useEffect(() => {
    if (page !== "home") return undefined;

    const sections = ["pusat-terapi", "visi-misi", "aktivitas", "tentang-kami"];

    const updateActiveSection = () => {
      const marker = window.scrollY + 160;
      let current = "pusat-terapi";

      for (const anchor of sections) {
        const element = document.getElementById(anchor);
        if (element && element.offsetTop <= marker) {
          current = anchor;
        }
      }

      setActiveAnchor(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [page]);

  const navigate = (nextPage) => {
    setMenuOpen(false);
    setProfileOpen(false);
    onNavigate(nextPage);
  };

  const scrollToLandingSection = (anchor) => {
    const element = document.getElementById(anchor);
    if (!element) return;

    if (anchor === "pusat-terapi") {
      setHidden(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const elementTop = element.getBoundingClientRect().top + window.scrollY;

    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current) {
      window.clearTimeout(programmaticScrollTimerRef.current);
    }
    programmaticScrollTimerRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 700);

    setHidden(true);

    window.scrollTo({
      top: Math.max(0, elementTop),
      behavior: "smooth",
    });
  };

  const navigateToLandingSection = (anchor) => {
    setMenuOpen(false);
    setProfileOpen(false);
    setActiveAnchor(anchor);

    if (page !== "home") {
      onNavigate("home");
      window.setTimeout(() => scrollToLandingSection(anchor), 150);
      return;
    }

    scrollToLandingSection(anchor);
  };

  const navigateToHome = () => {
    setMenuOpen(false);
    setActiveAnchor("pusat-terapi");
    if (page === "home") {
      scrollToLandingSection("pusat-terapi");
      return;
    }

    onNavigate("home");
  };

  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header
      className={`site-header ${
        page === "home" ? "fixed top-0 left-0 right-0" : "sticky top-0"
      } z-50 scroll-mt-10 backdrop-blur-md will-change-transform transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="reference-header-inner mx-auto flex h-[80px] w-[min(1120px,calc(100%-64px))] items-center justify-between max-md:w-[calc(100%-40px)]">
        <Button
          variant="ghost"
          onClick={navigateToHome}
          className="relative flex items-center gap-2.5 border-0 bg-transparent p-0 h-auto hover:bg-transparent text-left"
          aria-label="Langkah Naira"
        >
          <img
            src={logoImage}
            alt="Logo Langkah Naira"
            className="h-14 w-14 object-contain"
          />
          <span className="flex flex-col">
            <span className="site-brand-name font-display text-[15px] font-semibold tracking-tight">
              Langkah Naira
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase">
              LK NAIRA KENCANA
            </span>
          </span>
        </Button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          {landingNavLinks.map((link) => (
            <Button
              key={link.anchor}
              variant="ghost"
              className={`h-auto border-0 bg-transparent px-2.5 py-2 text-[15px] font-semibold text-slate-600 hover:text-[#524480] hover:bg-transparent ${
                page === "home" && activeAnchor === link.anchor
                  ? "active text-[#524480] font-bold"
                  : ""
              }`}
              onClick={() => navigateToLandingSection(link.anchor)}
            >
              {link.label}
            </Button>
          ))}

          {menuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-[#ECE7F6] space-y-2 w-full">
              {user ? (
                <>
                  <div className="px-3 py-2 bg-[#FAF8FE] rounded-xl mb-2">
                    <span className="text-xs font-bold text-[#2A2345] block">{user.name}</span>
                    <span className="text-[10px] text-[#78718E] block">{user.email}</span>
                  </div>
                  {user.role === "admin" ? (
                    <Button
                      variant="ghost"
                      onClick={() => navigate("dashboard")}
                      className="w-full justify-start gap-2 text-xs font-bold text-white hover:bg-white/10 hover:text-[#2EC300]"
                    >
                      <Activity size={15} />
                      Dashboard Admin
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => navigate("portal")}
                        className="w-full justify-start gap-2 text-xs font-bold text-[#524480]"
                      >
                        <ClipboardList size={15} />
                        Status &amp; Anak Saya
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => navigate("register")}
                        className="w-full justify-start gap-2 text-xs font-bold text-[#524480]"
                      >
                        <FileText size={15} />
                        Data Formulir Siswa
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => navigate("schedule")}
                        className="w-full justify-start gap-2 text-xs font-bold text-[#3B6998]"
                      >
                        <CalendarDays size={15} />
                        Jadwal Terapi
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full justify-start gap-2 text-xs font-bold text-red-600 hover:text-[#2EC300]"
                  >
                    <LogOut size={15} />
                    Keluar Akun
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate("auth")}
                  className="theme-action bg-[#2EC300] hover:bg-[#37FA00] text-black w-full rounded-full py-2.5 text-xs font-bold shadow-sm"
                >
                  <UserRound size={16} className="mr-2" />
                  Masuk / Daftar
                </Button>
              )}
            </div>
          )}
        </nav>

        <div className="header-actions flex items-center gap-3">
          {user ? (
            <div className="relative hidden lg:block" ref={profileDropdownRef}>
              <Button
                variant="outline"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-[#F3EEFA] hover:bg-[#EAE2F7] border-[#DDD3F0] text-[#2A2345] pl-1.5 pr-2.5 py-1 h-auto rounded-full transition-all shadow-sm focus:outline-none"
                aria-expanded={profileOpen}
                aria-label="Menu profil pengguna"
              >
                <div className="w-8 h-8 rounded-full bg-[#524480] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {getUserInitials()}
                </div>
                <span className="text-xs font-bold max-w-[110px] truncate hidden sm:inline text-[#2A2345]">
                  {user.name || "Akun Saya"}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-[#524480] transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#ECE7F6] p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2.5 bg-[#FAF8FE] rounded-xl border border-[#ECE7F6] mb-1.5">
                    <span className="text-xs font-bold text-[#2A2345] block truncate">
                      {user.name || "Pengguna Terdaftar"}
                    </span>
                    <span className="text-[10px] text-[#78718E] block truncate mt-0.5">
                      {user.email || "Orang Tua Siswa"}
                    </span>
                    <span className="inline-block mt-2 bg-[#FFF6D6] text-[#7A610A] border border-[#FBEEC2] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {user.role === "admin" ? "Admin Naira" : "Orang Tua / Wali"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {user.role === "admin" ? (
                      <Button
                        variant="ghost"
                        onClick={() => navigate("dashboard")}
                        className="w-full flex justify-start items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#2A2345] hover:bg-[#F3EEFA] transition-colors h-auto"
                      >
                        <Activity size={15} className="text-[#524480]" />
                        <span>Dashboard Admin</span>
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => navigate("portal")}
                          className="w-full flex justify-start items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#2A2345] hover:bg-[#F3EEFA] transition-colors h-auto"
                        >
                          <ClipboardList size={15} className="text-[#524480]" />
                          <span>Status &amp; Anak Saya</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => navigate("register")}
                          className="w-full flex justify-start items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#2A2345] hover:bg-[#F3EEFA] transition-colors h-auto"
                        >
                          <FileText size={15} className="text-[#524480]" />
                          <span>Data Formulir Siswa</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => navigate("schedule")}
                          className="w-full flex justify-start items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#2A2345] hover:bg-[#DDEBFA] transition-colors h-auto"
                        >
                          <CalendarDays size={15} className="text-[#3B6998]" />
                          <span>Jadwal Terapi</span>
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="my-1.5 border-t border-[#ECE7F6]" />

                  <Button
                    variant="ghost"
                    onClick={() => {
                      setProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full flex justify-start items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#B33939] hover:bg-[#FDF2F2] transition-colors h-auto"
                  >
                    <LogOut size={15} />
                    <span>Keluar Akun</span>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigate("auth")}
              className="theme-action bg-[#2EC300] hover:bg-[#37FA00] text-black hidden rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-all gap-2 lg:inline-flex"
            >
              <UserRound size={14} />
              <span>Masuk / Daftar</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="p-1.5 text-[#524480] hover:bg-[#F3EEFA] rounded-lg lg:hidden h-9 w-9"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Buka menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </Button>
        </div>
      </div>
    </header>
  );
}
