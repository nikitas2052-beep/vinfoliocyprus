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

      {/* Dense grid — more columns, smaller tiles. The hero panel
          is full-screen on desktop now, so 6 cols breathes nicely
          and the 11 logos sit as 2 tidy rows. */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 mt-5 sm:mt-8 lg:mt-10">
        {partners.map((w) => (
          <Link
            key={w.slug}
            href={`/products?winery=${encodeURIComponent(w.name)}`}
            className="group flex flex-col items-center text-center"
            title={w.name}
          >
            {/* Uniform chalk tile, monochrome at rest, full colour on hover. */}
            <div
              className="relative w-full aspect-[4/3] flex items-center justify-center
                         overflow-hidden border border-line bg-chalk"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoFor(w)!}
                alt={w.name}
                loading="lazy"
                className="max-w-[70%] max-h-[60%] w-auto h-auto object-contain
                           [filter:grayscale(100%)_contrast(135%)_brightness(0.25)]
                           opacity-85 group-hover:[filter:none] group-hover:opacity-100
                           transition-all duration-300"
              />
            </div>
            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-muted mt-1.5 group-hover:text-ink transition-colors truncate w-full">
              {w.country}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12">
        <Link href="/wineries" className="btn-link text-xs">
          Meet every winery →
        </Link>
      </div>
    </div>
  );
}
