import React from "react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { page: "home", label: "Beranda" },
  { page: "register", label: "Layanan" },
  { page: "schedule", label: "Alur Pendaftaran" },
];

export default function Header({ page, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (nextPage) => {
    setMenuOpen(false);
    onNavigate(nextPage);
  };

  return (
    <header className={`site-header site-header-${page}`}>
      <div className="header-inner">
        <Logo />
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
          <button className="login-button" onClick={() => navigate("dashboard")}>
            Admin Login
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
