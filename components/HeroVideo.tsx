"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
}

const GSAP_CORE = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
const GSAP_ST = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") return resolve();
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("script load failed: " + src));
    document.head.appendChild(s);
  });
}

/**
 * HeroVideo — full-viewport scroll-driven video.
 * - Uses GSAP ScrollTrigger to scrub video.currentTime as you scroll.
 * - Pins for 200% of viewport height, then releases into next section.
 * - V-logo overlay smoothstep-fades in over the last 15% of the scrub.
 * - Honors prefers-reduced-motion: shows a static logo on dark bg instead.
 */
export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    let trigger: any | undefined;

    const init = async () => {
      try {
        await loadScript(GSAP_CORE);
        await loadScript(GSAP_ST);
      } catch (err) {
        console.warn("GSAP failed to load — falling back to static hero", err);
        return;
      }
      if (cancelled) return;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      const video = videoRef.current;
      const section = sectionRef.current;
      const logo = logoRef.current;
      if (!video || !section || !logo) return;

      // Wait for video metadata so we know its duration
      await new Promise<void>((res) => {
        if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) {
          return res();
        }
        const ready = () => res();
        video.addEventListener("loadedmetadata", ready, { once: true });
        // Failsafe: don't hang forever
        setTimeout(ready, 4000);
      });
      if (cancelled) return;

      const duration =
        isFinite(video.duration) && video.duration > 0 ? video.duration : 4;

      try {
        video.pause();
      } catch {}

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        anticipatePin: 1,
        scrub: 0.4,
        onUpdate(self: { progress: number }) {
          const p = self.progress;
          // Drive video time
          const t = Math.max(0, Math.min(p, 0.999)) * duration;
          if (Math.abs(video.currentTime - t) > 0.04) {
            try {
              video.currentTime = t;
            } catch {}
          }
          // Smoothstep-eased fade-in for last 15%
          const lp = Math.max(0, (p - 0.85) / 0.15);
          const eased = lp * lp * (3 - 2 * lp);
          logo.style.opacity = String(eased);
          logo.style.transform = `scale(${(0.95 + 0.05 * eased).toFixed(4)})`;
        },
      });
      setReady(true);
    };

    init();
    return () => {
      cancelled = true;
      try {
        trigger?.kill();
      } catch {}
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(185,141,88,0.25)_0%,_transparent_60%)]" />
        <Image
          src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
          alt="Vinfolio"
          width={520}
          height={150}
          priority
          className="relative h-24 md:h-32 w-auto brightness-0 invert"
        />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-ink"
      aria-label="Hero — Vinfolio"
    >
      <video
        ref={videoRef}
        src="/assets/hero-video.mp4"
        muted
        playsInline
        preload="auto"
        // Poster shown until first frame paints — keeps the section non-empty
        poster="/assets/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark vignette for legibility */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* V-logo fade-in overlay */}
      <div
        ref={logoRef}
        style={{ opacity: 0, transform: "scale(0.95)" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <Image
          src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
          alt="Vinfolio"
          width={520}
          height={150}
          priority
          className="h-24 md:h-36 w-auto brightness-0 invert drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Scroll cue — subtle, fades when GSAP takes over */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-paper/70 text-xs uppercase tracking-[0.32em] font-sans transition-opacity duration-500"
        style={{ opacity: ready ? 0 : 1 }}
      >
        <span>Scroll</span>
      </div>
    </section>
  );
}
