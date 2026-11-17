import React from "react";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <Logo />
        <span>© 2026 Langkah Naira Kencana</span>
        <span className="footer-tagline">Teman tumbuh buah hati.</span>
      </div>
    </footer>
  );
}
