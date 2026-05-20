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

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {wineries.map((w, i) => {
          const count = wines.filter((wine) => wine.winery === w.name).length;
          const logo = logoFor(w);
          const bg = w.logoBg ?? "#F9F8F4";
          return (
            <Reveal key={w.slug} delay={i * 0.04}>
              <article className="card-paper h-full flex flex-col group hover:-translate-y-1 hover:shadow-card transition-all overflow-hidden">
                {/* Logo tile on the winery's own brand background */}
                <div
                  className="relative aspect-[3/2] flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: bg }}
                >
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={`${w.name} logo`}
                      loading="lazy"
                      className="max-w-[78%] max-h-[68%] w-auto h-auto object-contain
                                 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="font-serif italic text-ink text-2xl sm:text-3xl px-3 text-center leading-tight">
                      {w.name}
                    </span>
                  )}
                  <span
                    className="absolute top-2 right-2 text-lg sm:text-xl"
                    title={w.country}
                  >
                    {COUNTRY_FLAGS[w.country]}
                  </span>
                </div>

                {/* Caption */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h2 className="font-serif text-base sm:text-xl text-ink leading-tight">
                    {w.name}
                  </h2>
                  <p className="eyebrow !text-[9px] sm:!text-[10px] mt-1">
                    {w.country}
                  </p>
                  <p className="text-ink/70 mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3 sm:line-clamp-none">
                    {w.description}
                  </p>
                  <div className="mt-3 sm:mt-4 flex items-center justify-between text-[11px] sm:text-xs">
                    <Link
                      href={`/products?winery=${encodeURIComponent(w.name)}`}
                      className="text-burgundy hover:text-ink uppercase tracking-wider border-b border-ink/30 hover:border-ink pb-0.5"
                    >
                      Wines ({count})
                    </Link>
                    {w.website && (
                      <a
                        href={w.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-ink"
                      >
                        Site ↗
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
