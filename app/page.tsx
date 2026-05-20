import HeroVideo from "@/components/HeroVideo";
import BestSellers from "@/components/BestSellers";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import GiftsSection from "@/components/GiftsSection";

export default function HomePage() {
  return (
    <>
      {/*
        Unified landing — the hero is one continuous narrative:
          • Phase 1: bottle + Shop Now / Meet our partners
          • Phase 2: wordmark migrates to the corner, CTAs fade
          • Phase 3: partners panel slides in from the right
                     (Winestyr-style logo grid) over the still-playing
                     video — feels like ONE landing, not two pages.
      */}
      <HeroVideo />

      {/* CHANGE 3 — Best Sellers (6, compact 3×2) */}
      <BestSellers />

      <HowItWorks />

      <Testimonials />

      {/* Single Gifts section (the "A glass for every table" variant
          was removed per user request — too repetitive). */}
      <GiftsSection
        eyebrow="Don't know where to start?"
        title={
          <>
            Gifts they'll <span className="italic text-bronze">remember</span>.
          </>
        }
        intro="Hand-selected magnums and cellar-worthy bottles, ready to wrap."
        variant="chalk"
      />
    </>
  );
}
