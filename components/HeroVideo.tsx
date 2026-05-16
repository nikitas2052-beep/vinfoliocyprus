"use client";

import Image from "next/image";
import Link from "next/link";
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
 * HeroVideo — full landing-page intro powered by scroll-scrubbed video.
 *
 * The video tells the story (8.1s, 243 frames, every frame a keyframe so
 * seeking is instant):
 *   t=0     full upright wine bottle, white bg
 *   t=4s    bottle has fallen, wine splashes into a giant V shape
 *   t=8s    bottle gone, only the red V splash on the LEFT half, white
 *           negative space on the RIGHT half (perfect for partners)
 *
 * Scroll narrative
 * ----------------
 *   0 ─ 65%  Section is PINNED, video.currentTime is scrubbed proportionally
 *            so scrolling drives the pour (bottle → splash → final V).
 *            Wordmark + Shop Now CTA float over the video and fade out
 *            during the second half.
 *   65 ─ 100% Video frozen at its final frame (V splash on the left).
 *            Partners panel slides in from the right (where the video's
 *            own white space lives) — they sit side-by-side, exactly
 *            like the user's screenshot 2.
 *
 *   After ScrollTrigger releases the pin, the next section continues
 *   normally with the rest of the page.
 *
 * Graceful degradation
 * --------------------
 *   • GSAP fails to load → falls back to muted autoplay loop, no scrub
 *   • prefers-reduced-motion → no scrub; final-frame poster + CTAs
 */
export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [scrubReady, setScrubReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // ── GSAP scroll-scrub setup ───────────────────────────────────────────
  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    let trigger: { kill: () => void } | undefined;
    let resizeHandler: (() => void) | undefined;

    const init = async () => {
      try {
        await loadScript(GSAP_CORE);
        await loadScript(GSAP_ST);
      } catch (err) {
        console.warn("GSAP failed to load — falling back to autoplay", err);
        const v = videoRef.current;
        if (v) {
          v.loop = true;
          v.play().catch(() => {});
        }
        return;
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

      // Wait for video metadata so duration is known
      await new Promise<void>((res) => {
        if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) {
          return res();
        }
        const ready = () => res();
        video.addEventListener("loadedmetadata", ready, { once: true });
        setTimeout(ready, 4000); // failsafe
      });
      if (cancelled) return;

      const duration = isFinite(video.duration) && video.duration > 0 ? video.duration : 8;
      try {
        video.pause();
        video.currentTime = 0;
      } catch {}

      // Scroll-progress thresholds
      const SCRUB_END = 0.65; // video done by here
      const PANEL_START = 0.6; // panel begins appearing
      const PANEL_FULL = 0.9; // panel fully in place
      const WORDMARK_OUT_START = 0.18;
      const WORDMARK_OUT_END = 0.55;
      const CTA_OUT_START = 0.12;
      const CTA_OUT_END = 0.4;

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
      const norm = (v: number, a: number, b: number) =>
        clamp01((v - a) / (b - a));

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=250%", // pinned for 2.5 viewports of scroll
        pin: true,
        anticipatePin: 1,
        scrub: 0.4,
        onUpdate(self: { progress: number }) {
          const p = self.progress;

          // 1) Drive the video frame
          const vp = clamp01(p / SCRUB_END);
          const t = vp * (duration - 0.05);
          if (Math.abs(video.currentTime - t) > 0.03) {
            try {
              video.currentTime = t;
            } catch {}
          }

          // 2) Wordmark — migrates centre → upper-left, scales down, fades
          if (wordmark) {
            const wOut = norm(p, WORDMARK_OUT_START, WORDMARK_OUT_END);
            const x = lerp(0, -40, wOut);
            const y = lerp(0, -44, wOut);
            const s = lerp(1, 0.32, wOut);
            const o = 1 - wOut;
            wordmark.style.transform =
              `translate(${x}%, ${y}%) scale(${s.toFixed(3)})`;
            wordmark.style.opacity = String(o.toFixed(3));
          }

          // 3) CTA — fades and slides down a little
          if (cta) {
            const cOut = norm(p, CTA_OUT_START, CTA_OUT_END);
            cta.style.transform = `translateY(${(cOut * 30).toFixed(1)}px)`;
            cta.style.opacity = String((1 - cOut).toFixed(3));
          }

          // 4) Partners panel — slides in (right-side desktop, bottom mobile)
          if (panel) {
            const pp = norm(p, PANEL_START, PANEL_FULL);
            const isMobile = window.innerWidth < 1024;
            panel.style.opacity = String(pp.toFixed(3));
            if (isMobile) {
              panel.style.transform = `translateY(${((1 - pp) * 100).toFixed(2)}%)`;
            } else {
              panel.style.transform = `translateX(${((1 - pp) * 100).toFixed(2)}%)`;
            }
          }

          // 5) Scroll cue — fades quickly once user starts
          if (cue) cue.style.opacity = String((1 - clamp01(p / 0.05)).toFixed(3));
        },
      });

      // Re-position on resize (mobile/desktop break)
      resizeHandler = () => {
        try { ScrollTrigger.refresh(); } catch {}
      };
      window.addEventListener("resize", resizeHandler);

      setScrubReady(true);
    };

    init();
    return () => {
      cancelled = true;
      try { trigger?.kill(); } catch {}
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    };
  }, [reduceMotion]);

  // ── Reduced-motion fallback hero ───────────────────────────────────────
  if (reduceMotion) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center bg-paper overflow-hidden -mt-20 md:-mt-24">
        <Image
          src="https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative text-center px-6">
          <Image
            src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
            alt="Vinfolio"
            width={520}
            height={150}
            priority
            className="h-24 md:h-32 w-auto brightness-0 invert mx-auto"
          />
          <p className="font-serif italic text-paper text-xl mt-6">
            Strong partnerships, poured by hand.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-paper text-ink uppercase text-sm tracking-[0.06em] hover:bg-bronze hover:text-paper transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/wineries"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent text-paper border border-paper/70 uppercase text-sm tracking-[0.06em] hover:bg-paper hover:text-ink transition-colors"
            >
              Meet our partners
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-paper -mt-20 md:-mt-24"
      aria-label="Vinfolio — wine to V"
    >
      {/* THE VIDEO — full-bleed, scrubs frame-by-frame with scroll */}
      <video
        ref={videoRef}
        src="/assets/hero-video-web.mp4"
        muted
        playsInline
        preload="auto"
        // Important: NOT autoplay (we drive currentTime manually)
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top/bottom paper fades — blend video edges into the white page */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent pointer-events-none z-[1]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent pointer-events-none z-[1]"
      />

      {/* Wordmark — centre on load, migrates to upper-left as you scroll.
          Filtered to pure white so it stands cleanly on the video. */}
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

      {/* Tagline + CTAs — fade as scroll begins */}
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

      {/* Partners panel — slides in from the right (desktop) or bottom
          (mobile/tablet). Width tuned to 42% of viewport so the red V
          splash from the video stays clearly visible on the left. */}
      <motion.aside
        ref={panelRef}
        style={{
          opacity: 0,
          transform:
            typeof window !== "undefined" && window.innerWidth < 1024
              ? "translateY(100%)"
              : "translateX(100%)",
        }}
        className="absolute z-20 will-change-transform
                   lg:top-0 lg:right-0 lg:h-full lg:w-[42%]
                   inset-x-0 bottom-0 h-[72vh]
                   bg-paper border-l border-line
                   shadow-[-30px_0_60px_-40px_rgba(0,0,0,0.18)]"
        aria-label="Our partner wineries"
      >
        <PartnersPanel />
      </motion.aside>

      {/* Scroll cue */}
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

      {/* Tiny invisible status node for debugging GSAP readiness */}
      <span aria-hidden className="sr-only">{scrubReady ? "ok" : "loading"}</span>
    </section>
  );
}
