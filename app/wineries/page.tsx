import type { Metadata } from "next";
import Link from "next/link";
import { wineries } from "@/lib/wineries";
import { wines } from "@/lib/wines";
import { COUNTRY_FLAGS } from "@/lib/utils";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Wineries",
  description:
    "The producers behind Vinfolio's portfolio — historic family estates and pioneering New World winemakers.",
};

export default function WineriesPage() {
  return (
    <div className="container-wide py-12">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Producers</p>
        <h1 className="heading-serif text-5xl text-cream mt-2">Our Wineries</h1>
        <div className="gold-divider mx-auto" />
        <p className="text-muted mt-4">
          From limestone Chablis cellars to sun-drenched Apalta amphitheaters,
          each estate in our portfolio is chosen for its character and craft.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wineries.map((w, i) => {
          const count = wines.filter((wine) => wine.winery === w.name).length;
          return (
            <Reveal key={w.slug} delay={i * 0.04}>
              <article className="card-surface p-6 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="wine-seal !w-12 !h-12 text-lg">
                    {w.name.charAt(0)}
                  </div>
                  <span className="text-2xl" title={w.country}>
                    {COUNTRY_FLAGS[w.country]}
                  </span>
                </div>
                <h2 className="font-serif text-2xl text-cream mt-4">
                  {w.name}
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] text-gold mt-1">
                  {w.country}
                </p>
                <p className="text-cream/75 mt-3 text-sm flex-1">
                  {w.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <Link
                    href={`/products?winery=${encodeURIComponent(w.name)}`}
                    className="link-gold text-sm uppercase tracking-wider"
                  >
                    View wines ({count})
                  </Link>
                  {w.website && (
                    <a
                      href={w.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted hover:text-gold"
                    >
                      Website ↗
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
