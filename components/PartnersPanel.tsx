"use client";

import Link from "next/link";
import { wineries, logoFor } from "@/lib/wineries";

/**
 * PartnersPanel — editorial grid of partner wordmarks.
 *
 * Renders on each winery's natural brand-tile background (logoBg field
 * from /lib/wineries.ts). Logos stay in colour so they don't look like
 * uneven black blocks — every cell looks deliberate and balanced.
 *
 * Filters out wineries without a real logo asset on the vinfolio.com.cy
 * CDN (those would otherwise render with broken-favicon visuals). Full
 * 19-winery roster is still browsable on /wineries.
 */
export default function PartnersPanel() {
  const partners = wineries.filter((w) => !!w.logo);

  return (
    <div className="h-full w-full overflow-y-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-14">
      <div className="max-w-xl">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-bronze font-sans">
          Our portfolio
        </p>
        <h2 className="font-serif text-ink leading-[1.05] text-[clamp(1.5rem,2.8vw,2.8rem)] mt-2 sm:mt-4">
          {wineries.length} wineries.{" "}
          <span className="italic text-bronze">One seller.</span>
        </h2>
        <p className="mt-2 sm:mt-3 text-ink/70 text-xs sm:text-sm">
          Including Ventisquero,
          <span className="italic"> New World Winery of the Year 2024</span>.
        </p>
      </div>

      {/* On desktop full-width panel: 4 cols. On the narrow side-panel
          layout: 2 cols. Mobile section: 2 cols. */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-6 sm:mt-8 lg:mt-12">
        {partners.map((w) => {
          const src = logoFor(w);
          const bg = w.logoBg ?? "#F9F8F4";
          return (
            <Link
              key={w.slug}
              href={`/products?winery=${encodeURIComponent(w.name)}`}
              className="group flex flex-col items-center text-center"
              title={w.name}
            >
              {/* Logo tile with the winery's native brand background —
                  keeps gold-on-dark logos legible, white-on-dark
                  consistent, and never produces black blobs. */}
              <div
                className="relative w-full aspect-[3/2] flex items-center justify-center
                           overflow-hidden border border-line transition-transform
                           duration-300 group-hover:scale-[1.03]"
                style={{ backgroundColor: bg }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src!}
                  alt={w.name}
                  loading="lazy"
                  className="max-w-[78%] max-h-[68%] w-auto h-auto object-contain
                             transition-opacity duration-300 opacity-95 group-hover:opacity-100"
                />
              </div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-muted mt-2 group-hover:text-ink transition-colors">
                {w.country}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12">
        <Link href="/wineries" className="btn-link text-xs">
          Meet every winery →
        </Link>
      </div>
    </div>
  );
}
