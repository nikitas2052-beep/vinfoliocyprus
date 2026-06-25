import HeroVideo from "@/components/HeroVideo";
import BestSellers from "@/components/BestSellers";
import HowItWorks from "@/components/HowItWorks";
import GiftBoxesCarousel from "@/components/GiftBoxesCarousel";

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

      {/* Real gift-box carousel sourced from the live vinfolio.com.cy
          /shop slider — 5 boxes with coverflow scroll, matches what
          the user already has on the existing WordPress site. */}
      <GiftBoxesCarousel />
    </>
  );
}
