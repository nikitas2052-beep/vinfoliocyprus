"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The homepage hero (HeroVideo) uses a GSAP ScrollTrigger pin, which wraps the
 * hero <section> in a `.pin-spacer` and sets `position: fixed`. On client-side
 * navigation that machinery can leave a pin-spacer (and the fixed partners
 * panel) behind in the DOM, so the "19 wineries" hero bleeds onto other pages.
 *
 * This guard runs on every route change: whenever we are NOT on the homepage,
 * it kills any leftover ScrollTriggers and removes any orphaned pin-spacers,
 * then restores body/scroll state. The hero therefore only ever shows on "/".
 */
export default function RouteHeroCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") return;
    if (typeof window === "undefined") return;

    const w = window as unknown as {
      ScrollTrigger?: { getAll: () => Array<{ kill: (r?: boolean) => void }> };
    };

    const sweep = () => {
      try {
        w.ScrollTrigger?.getAll().forEach((t) => t.kill(true));
      } catch {}
      // Remove any leftover GSAP pin spacers (and whatever they still wrap)…
      document.querySelectorAll(".pin-spacer").forEach((el) => el.remove());
      // …and any stray fixed hero section that escaped React's unmount.
      document
        .querySelectorAll('section[aria-label="Vinfolio — wine to V"]')
        .forEach((el) => el.remove());
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
      document.documentElement.style.removeProperty("overflow");
    };

    // Run immediately, on the next frame, and after short delays so we also
    // catch pin artifacts the (network-loaded) GSAP script creates a beat
    // after navigation on slower/real connections.
    sweep();
    const raf = requestAnimationFrame(sweep);
    const t1 = window.setTimeout(sweep, 150);
    const t2 = window.setTimeout(sweep, 600);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
