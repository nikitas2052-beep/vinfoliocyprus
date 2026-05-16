import HeroVideo from "@/components/HeroVideo";
import AwardPartners from "@/components/AwardPartners";
import BestSellers from "@/components/BestSellers";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import GiftsSection from "@/components/GiftsSection";

export default function HomePage() {
  return (
    <>
      {/* CHANGE 1 — scroll-driven video hero (replaces editorial split) */}
      <HeroVideo />

      {/* CHANGE 5 — Award Partners is the FIRST content section after hero,
          replacing the old "A partner not a middleman" + PartnersWall combo. */}
      <AwardPartners />

      {/* CHANGE 3 — formerly "Featured Bottles", now Best Sellers (6, smaller 3×2) */}
      <BestSellers />

      <HowItWorks />

      <Testimonials />

      {/* CHANGE 6 — Two Gifts sections backed by real gift-tagged products */}
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

      <GiftsSection
        eyebrow="A glass for every table"
        title={
          <>
            From the cellar —{" "}
            <span className="italic text-bronze">straight to the table</span>.
          </>
        }
        intro="Six gifts that work as well for a dinner party as for a milestone."
      />
    </>
  );
}
