"use client";

import Link from "next/link";
import { wineries, logoFor } from "@/lib/wineries";

/**
 * PartnersPanel — Winestyr-style editorial grid of partner wordmarks.
 * Used inside the HeroVideo sticky stage, slid in from the right as
 * the user scrolls into the second "page" of the hero.
 *
 * Only renders wineries with a real logo asset on the vinfolio.com.cy
 * CDN — anything that would fall back to a generic favicon / wordmark
 * is filtered out (the broken alt-text was visually noisy). The full
 * 19-winery roster is still available on /wineries.
 */
export default function PartnersPanel() {
  const partners = wineries.filter((w) => !!w.logo);

  return (
    <div className="h-full w-full overflow-y-auto px-6 sm:px-8 lg:px-10 py-10 lg:py-14">
      <div className="max-w-md">
        <p className="text-[11px] uppercase tracking-[0.32em] text-bronze font-sans">
          Our portfolio
        </p>
        <h2 className="font-serif text-ink leading-[1.05] text-[clamp(1.75rem,2.6vw,2.6rem)] mt-4">
          {wineries.length} wineries.{" "}
          <span className="italic text-bronze">One seller.</span>
        </h2>
        <p className="mt-3 text-ink/70 text-sm">
          Family estates and historic houses — including Ventisquero,
          <span className="italic"> New World Winery of the Year 2024</span>.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 mt-10">
        {partners.map((w) => {
          const src = logoFor(w);
          return (
            <Link
              key={w.slug}
              href={`/products?winery=${encodeURIComponent(w.name)}`}
              className="group flex flex-col items-center justify-end text-center min-h-[90px]"
              title={w.name}
            >
              <div className="flex items-center justify-center h-[56px] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src!}
                  alt={w.name}
                  loading="lazy"
                  className="max-w-[110px] max-h-[56px] w-auto h-auto object-contain
                             [filter:grayscale(100%)_contrast(140%)_brightness(0.15)]
                             opacity-80 group-hover:[filter:none] group-hover:opacity-100
                             transition-all duration-300"
                />
              </div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted mt-2 group-hover:text-ink transition-colors">
                {w.country}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12">
        <Link href="/wineries" className="btn-link">
          Meet every winery →
        </Link>
      </div>
    </div>
  );
}
