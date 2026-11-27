import React, { useState } from "react";
import HeroSection from "./sections/HeroSection";
import VisiMisiSection from "./sections/VisionMisionSection";
import AktivitasSection from "./sections/ActivitySection";
import TentangKamiSection from "./sections/AboutOurSection";

export default function HomePage({ onNavigate }) {
  const [activeAccordion, setActiveAccordion] = useState(0);

  return (
    <main className="ref-landing font-sans bg-[#2C5788] text-[#312B47] overflow-x-hidden">
      <HeroSection onNavigate={onNavigate} />
      <VisiMisiSection
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
      />
      <AktivitasSection />
      <TentangKamiSection />
    </main>
  );
}
