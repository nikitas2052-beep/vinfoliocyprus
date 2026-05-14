import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Globe2, Truck } from "lucide-react";
import { getFeaturedWines } from "@/lib/wines";
import { wineries } from "@/lib/wineries";
import { COUNTRY_FLAGS } from "@/lib/utils";
import WineCard from "@/components/WineCard";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";

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
      <HeroSection />

      {/* Pillars */}
      <section className="container-wide py-16 grid sm:grid-cols-3 gap-6">
        {[
          { Icon: Globe2, title: "Curated Globally", text: "Bottles from Cyprus, Greece, Italy, France, Chile & beyond." },
          { Icon: Award, title: "Award-Winning Estates", text: "Including Ventisquero, New World Winery of the Year 2024." },
          { Icon: Truck, title: "Cyprus Distribution", text: "Trade & retail delivery across the island." },
        ].map(({ Icon, title, text }) => (
          <Reveal key={title}>
            <div className="card-surface p-6 text-center">
              <Icon className="w-7 h-7 text-gold mx-auto" />
              <h3 className="font-serif text-xl text-cream mt-3">{title}</h3>
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
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Selection</p>
              <h2 className="heading-serif text-4xl md:text-5xl text-cream mt-2">
                Featured Wines
              </h2>
              <div className="gold-divider" />
            </div>
            <Link href="/products" className="link-gold inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {featured.map((w, i) => (
            <WineCard key={w.id} wine={w} index={i} />
          ))}
        </div>
      </section>

      {/* Wineries */}
      <section className="bg-gradient-to-b from-burgundy-900/30 to-ink/60 py-20">
        <div className="container-wide">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Partners</p>
              <h2 className="heading-serif text-4xl md:text-5xl text-cream mt-2">
                Our Wineries
              </h2>
              <div className="gold-divider mx-auto" />
              <p className="text-muted mt-4">
                We work with family estates and historic houses, hand-selecting
                bottles that express place and craft.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {wineries.slice(0, 12).map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.04}>
                <div className="card-surface aspect-square flex flex-col items-center justify-center text-center p-4
                                hover:border-gold/50 transition-colors group">
                  <span className="text-2xl mb-2 opacity-80">
                    {COUNTRY_FLAGS[w.country]}
                  </span>
                  <p className="font-serif text-cream text-sm leading-tight group-hover:text-gold transition-colors">
                    {w.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted mt-1">
                    {w.country}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/wineries" className="btn-ghost">
              Discover all wineries
            </Link>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="container-wide py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Origins</p>
            <h2 className="heading-serif text-4xl md:text-5xl text-cream mt-2">
              Wine Regions
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-muted mt-4">
              From the limestone of Chablis to the sun-baked Apalta amphitheater
              and the slopes of the Troodos foothills.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {REGIONS.map((r, i) => (
            <Reveal key={r.country} delay={i * 0.04}>
              <Link
                href={`/products?country=${encodeURIComponent(r.country)}`}
                className="card-surface p-5 block hover:border-gold/50 transition-colors group"
              >
                <p className="text-2xl">{COUNTRY_FLAGS[r.country]}</p>
                <p className="font-serif text-xl text-cream mt-2 group-hover:text-gold transition-colors">
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
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-burgundy-700/50">
              <Image
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80"
                alt="Vineyard at sunset"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">About</p>
              <h2 className="heading-serif text-4xl md:text-5xl text-cream mt-2">
                A Cypriot House of Wine
              </h2>
              <div className="gold-divider" />
              <p className="text-cream/85 mt-4">
                Founded by <span className="font-serif italic text-gold">Yiannakis Aristidou</span>,
                Vinfolio Ltd imports and distributes a hand-picked portfolio of fine wines
                across Cyprus — for restaurants, retailers and private enthusiasts.
              </p>
              <p className="text-muted mt-4">
                Based in Kato Polemidia, Limassol, our cellar bridges the Cypriot table
                with the great vineyards of Europe and the New World.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/about" className="btn-primary">Our story</Link>
                <Link href="/wholesale" className="btn-ghost">B2B inquiry</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
