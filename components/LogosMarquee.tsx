"use client";

import { useEffect, useState } from "react";
import { wineries, logoFor } from "@/lib/wineries";

/**
 * LogosMarquee — infinite horizontal marquee of monochrome partner logos.
 * - Duplicates the logo set so the loop is seamless
 * - Hover pauses
 * - Falls back to a static 3-col grid on mobile or when reduced-motion is on
 */
export default function LogosMarquee() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  if (reduceMotion) {
    return <StaticGrid />;
  }

  return (
    <>
      {/* mobile: static grid */}
      <div className="md:hidden">
        <StaticGrid />
      </div>

      {/* desktop/tablet: infinite marquee */}
      <div
        className="hidden md:block relative overflow-hidden py-6"
        aria-label="Partner wineries"
      >
        {/* edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-paper to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-paper to-transparent" />

        <div className="marquee-track flex items-center gap-14">
          {[...wineries, ...wineries].map((w, i) => (
            <LogoCell key={`${w.slug}-${i}`} winery={w} />
          ))}
        </div>
      </div>
    </>
  );
}

function StaticGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
      {wineries.map((w) => (
        <LogoCell key={w.slug} winery={w} static />
      ))}
    </div>
  );
}

function LogoCell({
  winery,
  static: isStatic,
}: {
  winery: (typeof wineries)[number];
  static?: boolean;
}) {
  const src = logoFor(winery.website);
  return (
    <div
      className={
        "flex-shrink-0 flex flex-col items-center justify-center group " +
        (isStatic ? "" : "min-w-[160px]")
      }
      title={winery.name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${winery.name} logo`}
          loading="lazy"
          className="max-w-[120px] max-h-[60px] w-auto h-auto object-contain
                     [filter:grayscale(100%)_contrast(130%)_brightness(0.2)]
                     opacity-70 group-hover:[filter:none] group-hover:opacity-100
                     transition-all duration-300"
        />
      ) : (
        <span
          className="font-serif italic text-ink/70 group-hover:text-ink text-xl
                     transition-colors duration-300"
        >
          {winery.name}
        </span>
      )}
      <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted/70 group-hover:text-muted transition-colors">
        {winery.country}
      </p>
    </div>
  );
}
