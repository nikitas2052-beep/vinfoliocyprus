"use client";

import Link from "next/link";
import { wineries } from "@/lib/wineries";
import { COUNTRY_FLAGS } from "@/lib/utils";

/**
 * WineryMarquee — infinite horizontal scroll of winery cards.
 * Duplicates the list inline so the animation can loop seamlessly.
 */
export default function WineryMarquee() {
  const list = [...wineries, ...wineries];

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden">
        <div className="marquee-track flex gap-6 w-max">
          {list.map((w, i) => (
            <Link
              key={`${w.slug}-${i}`}
              href={`/products?winery=${encodeURIComponent(w.name)}`}
              className="card-surface min-w-[200px] w-[200px] p-5 flex flex-col items-center text-center
                         hover:-translate-y-1 hover:shadow-wine-soft hover:border-gold/60
                         transition-all"
            >
              <span className="text-3xl">{COUNTRY_FLAGS[w.country]}</span>
              <p className="font-serif text-burgundy-700 mt-2 text-sm leading-tight">
                {w.name}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-dark mt-1">
                {w.country}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
