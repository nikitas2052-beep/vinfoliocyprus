import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Globe2, Truck } from "lucide-react";
import { getFeaturedWines, wines } from "@/lib/wines";
import { wineries } from "@/lib/wineries";
import { COUNTRY_FLAGS } from "@/lib/utils";
import WineCard from "@/components/WineCard";
import PourHero from "@/components/PourHero";
import Reveal from "@/components/Reveal";
import WineryMarquee from "@/components/WineryMarquee";
import AnimatedHeading from "@/components/AnimatedHeading";
import CountUp from "@/components/CountUp";

const REGIONS = [
  { country: "Cyprus", note: "Indigenous Xynisteri & Maratheftiko" },
  { country: "Greece", note: "Agiorgitiko, Assyrtiko, Moschofilero" },
  { country: "Italy", note: "Tuscany, Veneto, Piedmont" },
  { country: "France", note: "Rhône, Burgundy, Loire, Provence" },
  { country: "Chile", note: "Maipo, Apalta, Casablanca" },
  { country: "Argentina", note: "High-altitude Mendoza Malbec" },
  { country: "New Zealand", note: "Marlborough Sauvignon Blanc" },
  { country: "South Africa", note: "Pinotage & Chenin Blanc" },
];

export default function HomePage() {
  const featured = getFeaturedWines();

  return (
    <>
      <PourHero />

      {/* Stats strip */}
      <section className="relative -mt-12 z-10">
        <div className="container-wide">
          <div className="card-surface px-6 py-8 wash-cream grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat value={25} suffix="+" label="Years in wine" />
            <Stat value={wineries.length} label="Partner wineries" />
            <Stat value={wines.length} label="Curated bottles" />
            <Stat value={9} label="Wine regions" />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-wide py-20 grid sm:grid-cols-3 gap-6">
        {[
          { Icon: Globe2, title: "Curated Globally", text: "Bottles from Cyprus, Greece, Italy, France, Chile & beyond." },
          { Icon: Award, title: "Award-Winning Estates", text: "Including Ventisquero — New World Winery of the Year 2024." },
          { Icon: Truck, title: "Cyprus Distribution", text: "Trade & retail delivery across the island." },
        ].map(({ Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className="card-surface p-6 text-center group hover:-translate-y-1 hover:shadow-wine-soft transition-all">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold text-burgundy-700 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-burgundy-700 mt-4">{title}</h3>
              <p className="text-sm text-muted mt-2">{text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Featured wines */}
      <section className="container-wide py-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow">Selection</p>
              <AnimatedHeading className="text-4xl md:text-5xl mt-2">
                Featured Wines
              </AnimatedHeading>
              <div className="gold-divider" />
            </div>
            <Link
              href="/products"
              className="link-gold inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((w, i) => (
            <WineCard key={w.id} wine={w} index={i} />
          ))}
        </div>
      </section>

      {/* Wineries marquee */}
      <section className="wash-burgundy py-20 overflow-hidden">
        <div className="container-wide">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="eyebrow">Partners</p>
              <AnimatedHeading className="text-4xl md:text-5xl mt-2">
                Our Wineries
              </AnimatedHeading>
              <div className="gold-divider mx-auto" />
              <p className="text-muted mt-4">
                Family estates and historic houses, hand-selected for the
                Cypriot table.
              </p>
            </div>
          </Reveal>
        </div>

        <WineryMarquee />

        <div className="mt-12 text-center">
          <Link href="/wineries" className="btn-ghost">
            Discover all wineries
          </Link>
        </div>
      </section>

      {/* Regions */}
      <section className="container-wide py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow">Origins</p>
            <AnimatedHeading className="text-4xl md:text-5xl mt-2">
              Wine Regions
            </AnimatedHeading>
            <div className="gold-divider mx-auto" />
            <p className="text-muted mt-4">
              From the limestone of Chablis to the sun-baked Apalta amphitheater
              and the slopes of the Troodos foothills.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {REGIONS.map((r, i) => (
            <Reveal key={r.country} delay={i * 0.05}>
              <Link
                href={`/products?country=${encodeURIComponent(r.country)}`}
                className="card-surface p-5 block group hover:-translate-y-1 hover:shadow-wine-soft hover:border-gold/60 transition-all"
              >
                <p className="text-3xl group-hover:scale-110 inline-block transition-transform">
                  {COUNTRY_FLAGS[r.country]}
                </p>
                <p className="font-serif text-xl text-burgundy-700 mt-2 group-hover:text-burgundy transition-colors">
                  {r.country}
                </p>
                <p className="text-xs text-muted mt-1">{r.note}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="container-wide py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-line shadow-wine-soft group">
              <Image
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80"
                alt="Vineyard at sunset"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-burgundy-900/30 via-transparent to-gold/20" />
              <div className="absolute bottom-6 left-6 text-[#F8F2E7] font-serif italic text-2xl drop-shadow-lg">
                <span className="text-gold-light">"</span>Wine —{" "}
                a way of life.<span className="text-gold-light">"</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <p className="eyebrow">About</p>
              <AnimatedHeading className="text-4xl md:text-5xl mt-2">
                More than wine —{" "}
                <span className="italic text-gold-dark">a way of life.</span>
              </AnimatedHeading>
              <div className="gold-divider" />
              <p className="text-cream/90 mt-4 leading-relaxed">
                Founded by{" "}
                <span className="font-serif italic text-burgundy">
                  Yiannakis Aristidou
                </span>{" "}
                with over 25 years in the wine and beverage sector, Vinfolio
                Ltd curates fine wines from renowned wineries worldwide — wines
                with character, quality, and a story to tell.
              </p>
              <p className="text-muted mt-4 leading-relaxed">
                Our work is built on trust, collaboration and respect — for the
                land, for our growers, and for the Cypriot table.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/about" className="btn-primary">
                  Our story
                </Link>
                <Link href="/wholesale" className="btn-ghost">
                  B2B inquiry
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <p className="font-serif text-4xl md:text-5xl text-burgundy">
        <CountUp end={value} />
        {suffix}
      </p>
      <p className="eyebrow mt-2">{label}</p>
    </div>
  );
}
