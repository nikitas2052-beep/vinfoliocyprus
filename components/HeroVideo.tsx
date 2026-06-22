"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PartnersPanel from "./PartnersPanel";

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
}

const GSAP_CORE = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
const GSAP_ST = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";

// Module-level Promise cache so React Strict Mode's double-mount can't
// race the same loadScript call and resolve before the script executes.
const scriptCache = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const cached = scriptCache.get(src);
  if (cached) return cached;
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existing) {
    const p = new Promise<void>((resolve, reject) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", () => reject(new Error("script error")), { once: true });
      setTimeout(finish, 1500);
    });
    scriptCache.set(src, p);
    return p;
  }
  const p = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("script load failed: " + src));
    document.head.appendChild(s);
  });
  scriptCache.set(src, p);
  return p;
}

/**
 * HeroVideo — splits desktop and mobile experiences.
 *
 *   DESKTOP (≥1024px): GSAP ScrollTrigger pin + scroll-scrubbed video.
 *     - Pin duration is now 150% of viewport (was 250%) so users don't
 *       feel "stuck" while scrolling.
 *     - On route change, ALL ScrollTriggers are killed AND any body
 *       styles GSAP set are reset — this fixes the "navigation jams,
 *       need to refresh" bug.
 *
 *   MOBILE / TABLET (<1024px): no pin, no scroll-scrub. The video
 *     autoplays muted on loop and is overlaid with the wordmark + CTAs.
 *     Phones can't reliably scrub video.currentTime (especially Safari)
 *     and pinning was the slowness source.
 *
 *   reduced-motion: still vineyard image fallback, CTAs render normally.
 */
export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect prefers-reduced-motion + viewport class once on mount,
  // re-evaluate on resize.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sizeMq = window.matchMedia("(max-width: 1023px)");
    const ua = navigator.userAgent;
    const isPhoneUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);

    setReduceMotion(motionMq.matches);
    setIsMobile(sizeMq.matches || isPhoneUA);

    const onMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    const onSizeChange = (e: MediaQueryListEvent) => setIsMobile(e.matches || isPhoneUA);
    motionMq.addEventListener?.("change", onMotionChange);
    sizeMq.addEventListener?.("change", onSizeChange);
    return () => {
      motionMq.removeEventListener?.("change", onMotionChange);
      sizeMq.removeEventListener?.("change", onSizeChange);
    };
  }, []);

  // Mobile / reduced-motion: kick off autoplay loop
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isMobile || reduceMotion) {
      v.loop = true;
      v.muted = true;
      v.play().catch(() => {});
    }
  }, [isMobile, reduceMotion]);

  // ── GSAP scroll-scrub: DESKTOP ONLY ───────────────────────────────────
  useEffect(() => {
    if (isMobile || reduceMotion) return;

    // When returning to the homepage via client navigation, the browser can
    // restore a deep scroll position — which would drop us at the END of the
    // pinned hero (the partners panel) instead of the start. Reset to top so
    // the animation always begins from the bottle/wordmark.
    if (typeof window !== "undefined") window.scrollTo(0, 0);

    let cancelled = false;
    let trigger: { kill: (reset?: boolean) => void } | undefined;
    let resizeHandler: (() => void) | undefined;

    const killAllTriggersAndReset = () => {
      // Aggressive cleanup so route navigation doesn't get jammed by a
      // leftover pin spacer or scroll-lock.
      try {
        trigger?.kill(true);
      } catch {}
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        try {
          window.ScrollTrigger.getAll().forEach((t: { kill: (r?: boolean) => void }) =>
            t.kill(true),
          );
        } catch {}
      }
      if (typeof document !== "undefined") {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
        document.documentElement.style.removeProperty("overflow");
      }
    };

    const init = async () => {
      try {
        await loadScript(GSAP_CORE);
        await loadScript(GSAP_ST);
      } catch {
        const v = videoRef.current;
        if (v) {
          v.loop = true;
          v.play().catch(() => {});
        }
        return;
      }
      if (cancelled) return;

      // Wait for window globals to actually populate
      for (let i = 0; i < 30; i++) {
        if (window.gsap && window.ScrollTrigger) break;
        await new Promise((r) => setTimeout(r, 50));
      }
      if (cancelled) return;

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      const video = videoRef.current;
      const section = sectionRef.current;
      const wordmark = wordmarkRef.current;
      const cta = ctaRef.current;
      const panel = panelRef.current;
      const cue = cueRef.current;
      if (!video || !section) return;

      await new Promise<void>((res) => {
        if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) return res();
        const ready = () => res();
        video.addEventListener("loadedmetadata", ready, { once: true });
        setTimeout(ready, 4000);
      });
      if (cancelled) return;

      const duration =
        isFinite(video.duration) && video.duration > 0 ? video.duration : 8;
      try {
        video.pause();
        video.currentTime = 0;
      } catch {}

      const SCRUB_END = 0.65;
      const PANEL_START = 0.55;
      const PANEL_FULL = 0.9;
      const WORDMARK_OUT_START = 0.15;
      const WORDMARK_OUT_END = 0.5;
      const CTA_OUT_START = 0.1;
      const CTA_OUT_END = 0.38;

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
      const norm = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=150%", // shorter pin: 1.5 viewports of scroll, not 2.5
        pin: true,
        anticipatePin: 1,
        scrub: 0.4,
        onUpdate(self: { progress: number }) {
          const p = self.progress;
          const vp = clamp01(p / SCRUB_END);
          const t = vp * (duration - 0.05);
          if (Math.abs(video.currentTime - t) > 0.03) {
            try {
              video.currentTime = t;
            } catch {}
          }
          if (wordmark) {
            const wOut = norm(p, WORDMARK_OUT_START, WORDMARK_OUT_END);
            wordmark.style.transform = `translate(${lerp(0, -40, wOut)}%, ${lerp(0, -44, wOut)}%) scale(${lerp(1, 0.32, wOut).toFixed(3)})`;
            wordmark.style.opacity = String((1 - wOut).toFixed(3));
          }
          if (cta) {
            const cOut = norm(p, CTA_OUT_START, CTA_OUT_END);
            cta.style.transform = `translateY(${(cOut * 30).toFixed(1)}px)`;
            cta.style.opacity = String((1 - cOut).toFixed(3));
          }
          if (panel) {
            const pp = norm(p, PANEL_START, PANEL_FULL);
            panel.style.opacity = String(pp.toFixed(3));
            panel.style.transform = `translateX(${((1 - pp) * 100).toFixed(2)}%)`;
          }
          if (cue) cue.style.opacity = String((1 - clamp01(p / 0.05)).toFixed(3));
        },
      });

      // Recalculate after the pin/spacer exists and pin from a clean top.
      try {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
        window.scrollTo(0, 0);
      } catch {}

      resizeHandler = () => {
        try {
          window.ScrollTrigger?.refresh();
        } catch {}
      };
      window.addEventListener("resize", resizeHandler);
    };

    init();

    return () => {
      cancelled = true;
      killAllTriggersAndReset();
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    };
  }, [isMobile, reduceMotion]);

  // Also force a kill on EVERY pathname change as a belt-and-suspenders.
  // If we navigate to /products mid-pin, this guarantees nothing leaks.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        try {
          window.ScrollTrigger.getAll().forEach((t: { kill: (r?: boolean) => void }) =>
            t.kill(true),
          );
        } catch {}
      }
      if (typeof document !== "undefined") {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
      }
    };
  }, [pathname]);

  // ── MOBILE + REDUCED-MOTION hero ──────────────────────────────────────
  if (isMobile || reduceMotion) {
    return (
      <>
        <section className="relative w-full h-[90vh] min-h-[560px] overflow-hidden bg-paper -mt-20">
          <video
            ref={videoRef}
            src="/assets/hero-video-web.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-paper to-transparent pointer-events-none" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent pointer-events-none" />
          <div aria-hidden className="absolute inset-0 bg-black/15 pointer-events-none" />

          <div className="relative h-full flex flex-col items-center justify-center text-center px-5 pt-16">
            <Image
              src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
              alt="Vinfolio"
              width={420}
              height={120}
              priority
              className="h-16 sm:h-20 w-auto brightness-0 invert drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)]"
            />
            <p className="font-serif italic text-paper mt-6 text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
              Strong partnerships, poured by hand.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 w-full max-w-[280px]">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3
                           bg-paper text-ink uppercase text-[13px] tracking-[0.06em]"
              >
                Shop Now
              </Link>
              <Link
                href="/wineries"
                className="inline-flex items-center justify-center px-6 py-3
                           bg-transparent text-paper border border-paper/80 uppercase text-[13px] tracking-[0.06em]"
              >
                Meet our partners
              </Link>
            </div>
          </div>
        </section>

        {/* Partners panel renders as a normal section below on mobile */}
        <section className="bg-paper py-10 border-t border-line">
          <PartnersPanel />
        </section>
      </>
    );
  }

  // ── DESKTOP hero with scroll-scrub ────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-paper -mt-20 md:-mt-24"
      aria-label="Vinfolio — wine to V"
    >
      <video
        ref={videoRef}
        src="/assets/hero-video-web.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent pointer-events-none z-[1]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent pointer-events-none z-[1]"
      />

      <div
        ref={wordmarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 will-change-transform"
      >
        <Image
          src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
          alt="Vinfolio"
          width={520}
          height={150}
          priority
          className="h-20 md:h-28 w-auto brightness-0 invert drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
        />
      </div>

      <div
        ref={ctaRef}
        className="absolute inset-x-0 bottom-[18%] flex flex-col items-center text-center px-6 z-10 will-change-transform"
      >
        <p className="font-serif italic text-ink/85 text-xl md:text-2xl">
          Strong partnerships, poured by hand.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center pointer-events-auto">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                       bg-ink text-paper font-sans tracking-[0.06em] text-sm uppercase
                       border border-ink hover:bg-paper hover:text-ink
                       transition-colors duration-300"
          >
            Shop Now
          </Link>
          <Link
            href="/wineries"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                       bg-paper text-ink border border-ink/30
                       hover:bg-ink hover:text-paper hover:border-ink
                       transition-colors duration-300 text-sm tracking-[0.06em] uppercase"
          >
            Meet our partners
          </Link>
        </div>
      </div>

      <motion.aside
        ref={panelRef}
        style={{ opacity: 0, transform: "translateX(100%)" }}
        className="absolute z-20 will-change-transform top-0 right-0 h-full w-full
                   bg-paper shadow-[-30px_0_60px_-40px_rgba(0,0,0,0.18)]"
        aria-label="Our partner wineries"
      >
        <PartnersPanel />
      </motion.aside>

      <div
        ref={cueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink/60 text-[10px] uppercase tracking-[0.32em] font-sans flex flex-col items-center gap-2 pointer-events-none z-10 transition-opacity"
      >
        <span>Scroll to pour</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-ink/40"
        />
      </div>
    </section>
  );
}
