"use client";

import Link from "next/link";
import { wineries, logoFor } from "@/lib/wineries";

/**
 * PartnersPanel — Winestyr-style editorial grid of partner wordmarks.
 * Used inside the HeroVideo sticky stage, slid in from the right as
 * the user scrolls into the second "page" of the hero.
 */
export default function PartnersPanel() {
  return (
    <div className="h-full w-full overflow-y-auto px-6 sm:px-10 lg:px-14 py-10 lg:py-16">
      <div className="max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.32em] text-bronze font-sans">
          Our portfolio
        </p>
        <h2 className="font-serif text-ink leading-[1.05] text-[clamp(2rem,3.6vw,3.25rem)] mt-4">
          {wineries.length} wineries.{" "}
          <span className="italic text-bronze">One seller.</span>
        </h2>
        <p className="mt-3 text-ink/70 text-sm max-w-md">
          Family estates and historic houses we've poured ourselves —
          including Ventisquero,
          <span className="italic"> New World Winery of the Year 2024</span>.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10 mt-12">
        {wineries.map((w) => {
          const src = logoFor(w);
          return (
            <Link
              key={w.slug}
              href={`/products?winery=${encodeURIComponent(w.name)}`}
              className="group flex flex-col items-center justify-end text-center min-h-[100px]"
              title={w.name}
            >
              <div className="flex items-center justify-center h-[60px] w-full">
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={`${w.name} logo`}
                    loading="lazy"
                    className="max-w-[120px] max-h-[60px] w-auto h-auto object-contain
                               [filter:grayscale(100%)_contrast(140%)_brightness(0.15)]
                               opacity-80 group-hover:[filter:none] group-hover:opacity-100
                               transition-all duration-300"
                  />
                ) : (
                  <span
                    className="font-serif italic text-ink/80 group-hover:text-ink
                               text-xl leading-tight text-center px-1
                               transition-colors"
                  >
                    {w.name}
                  </span>
                )}
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
