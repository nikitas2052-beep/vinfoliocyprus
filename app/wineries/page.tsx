import type { Metadata } from "next";
import Link from "next/link";
import { wineries, logoFor } from "@/lib/wineries";
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
    <div className="container-wide py-10 sm:py-14">
      <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <p className="eyebrow">Producers</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-ink mt-2">
          Our Wineries
        </h1>
        <div className="h-px w-12 bg-ink/80 mx-auto my-5" />
        <p className="text-muted text-sm sm:text-base">
          From limestone Chablis cellars to sun-drenched Apalta amphitheaters,
          each estate in our portfolio is chosen for its character and craft.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {wineries.map((w, i) => {
          const count = wines.filter((wine) => wine.winery === w.name).length;
          const logo = logoFor(w);
          return (
            <Reveal key={w.slug} delay={i * 0.03}>
              <article className="card-paper h-full flex flex-col group hover:-translate-y-1 hover:shadow-card transition-all overflow-hidden">
                {/* Monochrome logo tile on chalk — colour appears on hover */}
                <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-chalk">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={`${w.name} logo`}
                      loading="lazy"
                      className="max-w-[72%] max-h-[68%] w-auto h-auto object-contain
                                 [filter:grayscale(100%)_contrast(135%)_brightness(0.25)]
                                 opacity-85 group-hover:[filter:none] group-hover:opacity-100
                                 transition-all duration-300"
                    />
                  ) : (
                    <span className="font-serif italic text-ink text-base sm:text-xl px-2 text-center leading-tight">
                      {w.name}
                    </span>
                  )}
                  <span
                    className="absolute top-1.5 right-1.5 text-sm sm:text-base"
                    title={w.country}
                  >
                    {COUNTRY_FLAGS[w.country]}
                  </span>
                </div>

                {/* Compact caption */}
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <h2 className="font-serif text-sm sm:text-base text-ink leading-tight line-clamp-1">
                    {w.name}
                  </h2>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted mt-1">
                    {w.country}
                  </p>
                  <div className="mt-2 sm:mt-3 flex items-center justify-between text-[10px] sm:text-[11px]">
                    <Link
                      href={`/products?winery=${encodeURIComponent(w.name)}`}
                      className="text-burgundy hover:text-ink uppercase tracking-wider border-b border-ink/30 hover:border-ink pb-0.5"
                    >
                      {count} {count === 1 ? "wine" : "wines"}
                    </Link>
                    {w.website && (
                      <a
                        href={w.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-ink"
                      >
                        ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
