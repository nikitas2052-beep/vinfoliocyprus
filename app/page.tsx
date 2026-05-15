import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedWines, wines } from "@/lib/wines";
import WineCard from "@/components/WineCard";
import HeroEditorial from "@/components/HeroEditorial";
import RealWineries from "@/components/RealWineries";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import WhereToStart from "@/components/WhereToStart";
import PartnersWall from "@/components/PartnersWall";

export default function HomePage() {
  const featured = getFeaturedWines();

  return (
    <>
      <HeroEditorial />

      {/* Featured wines */}
      <section className="py-24 lg:py-32 container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="eyebrow">Selection</p>
            <h2 className="h-hero mt-6">
              Featured <span className="italic text-bronze">bottles</span>.
            </h2>
            <div className="rule" />
            <p className="text-ink/75 mt-1">
              Hand-picked from this season's catalogue — wines we're pouring
              ourselves, right now.
            </p>
          </div>
          <Link href="/products" className="btn-link group">
            View all {wines.length} wines
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {featured.map((w, i) => (
            <WineCard key={w.id} wine={w} index={i} />
          ))}
        </div>
      </section>

      <RealWineries />

      <HowItWorks />

      <Testimonials />

      {/* Partners wall */}
      <section className="py-24 lg:py-32 container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Our partners</p>
          <h2 className="h-hero mt-6">
            17 wineries. <span className="italic text-bronze">One cellar.</span>
          </h2>
          <div className="h-px w-12 bg-ink/80 mx-auto my-5" />
          <p className="text-ink/75">
            Family estates and historic houses we've worked alongside for years.
          </p>
        </div>
        <div className="mt-14">
          <PartnersWall />
        </div>
        <div className="mt-12 text-center">
          <Link href="/wineries" className="btn-chalk">
            Visit the wineries page
          </Link>
        </div>
      </section>

      <WhereToStart />
    </>
  );
}
