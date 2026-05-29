import type { Metadata } from "next";
import Link from "next/link";
import { wineries, logoFor } from "@/lib/wineries";
import { wines } from "@/lib/wines";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Wineries",
  description:
    "The producers behind Vinfolio's portfolio: historic family estates and pioneering New World winemakers.",
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

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
        {wineries.map((w, i) => {
          const count = wines.filter((wine) => wine.winery === w.name).length;
          const logo = logoFor(w);
          return (
            <Reveal key={w.slug} delay={i * 0.02}>
              <Link
                href={`/products?winery=${encodeURIComponent(w.name)}`}
                className="card-paper h-full flex flex-col group hover:-translate-y-0.5 hover:shadow-card transition-all overflow-hidden"
              >
                {/* Monochrome logo tile on chalk — colour appears on hover */}
                <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-chalk">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={`${w.name} logo`}
                      loading="lazy"
                      className="max-w-[90%] max-h-[70%] w-auto h-auto object-contain
                                 [filter:grayscale(100%)_contrast(135%)_brightness(0.25)]
                                 opacity-85 group-hover:[filter:none] group-hover:opacity-100
                                 transition-all duration-300"
                    />
                  ) : (
                    <span className="font-serif italic text-ink text-[11px] sm:text-sm px-1 text-center leading-tight">
                      {w.name}
                    </span>
                  )}
                </div>

                {/* Ultra-compact caption */}
                <div className="p-2 sm:p-2.5 flex flex-col flex-1">
                  <h2 className="font-serif text-[11px] sm:text-xs text-ink leading-tight line-clamp-1">
                    {w.name}
                  </h2>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-muted mt-0.5 truncate">
                    {w.country} · {count}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
