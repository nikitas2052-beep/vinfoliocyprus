"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PartnersPanel from "./PartnersPanel";

/**
 * HeroVideo — full landing-page intro, one continuous scroll narrative.
 *
 * Three phases, all scroll-linked against a sticky video stage:
 *
 *   0 ─ 30%  Bottle + VINFOLIO wordmark + Shop Now / Meet our partners
 *            CTAs centred over the playing video. (~ first screenshot)
 *
 *   30 ─ 55% Wordmark scales down & slides toward the upper-left
 *            (handing off to the header logo). CTAs fade out. Video
 *            continues playing.
 *
 *   55 ─ 95% A paper-white panel slides in from the right covering the
 *            right half of the viewport. It contains the editorial
 *            partner-logos grid ("Our portfolio — 19 wineries. One
 *            seller.") in monochrome treatment. The video keeps playing
 *            on the left, so the V splash from the video sits next to
 *            the partner logos. (~ second screenshot)
 *
 *  On mobile the panel slides up from the bottom and covers the lower
 *  half instead of the right half (more readable on narrow viewports).
 *
 *  No GSAP, no scroll-scrubbing of the video — only framer's
 *  useScroll-driven CSS transforms. Video autoplays muted on loop.
 *
 *  prefers-reduced-motion: video → still vineyard image; the panel
 *  is rendered statically open below the hero CTAs.
 */
export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Safari-safe autoplay kick
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduceMotion) return;
    const play = () => v.play().catch(() => {});
    play();
    v.addEventListener("loadeddata", play, { once: true });
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // ── Phase 1 → 2: wordmark migrates to upper-left + CTA fades ─────────
  const wordmarkX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-40%"]);
  const wordmarkY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-44%"]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 0.4, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0, 0.25, 0.42], [1, 0.6, 0]);
  const ctaY = useTransform(scrollYProgress, [0, 0.5], [0, 30]);

  // ── Phase 3: partners panel slides in from right (desktop) /
  //    from bottom (mobile, handled via CSS) ───────────────────────────
  const panelOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.95], [0, 1, 1]);
  // x maps to "translateX" in % of element width — only meaningful on lg+
  const panelX = useTransform(scrollYProgress, [0.45, 0.7], ["100%", "0%"]);
  const panelYMobile = useTransform(scrollYProgress, [0.45, 0.7], ["100%", "0%"]);

  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[220vh] -mt-20 md:-mt-24 bg-paper"
      aria-label="Vinfolio hero"
    >
      {/* Sticky stage — video + overlays remain in view for the full hero */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {videoOk && !reduceMotion ? (
          <video
            ref={videoRef}
            src="/assets/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoOk(false)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=2400&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* Edge blending — video melts into the white page */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent pointer-events-none z-[1]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-paper to-transparent pointer-events-none z-[1]"
        />
        {/* Subtle wash for legibility (~15%) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-black/10 pointer-events-none z-[1]"
        />

        {/* ── LAYER 1 — Wordmark (always rendered, animates phase 1→2) ── */}
        <motion.div
          style={{
            x: wordmarkX,
            y: wordmarkY,
            scale: wordmarkScale,
            opacity: wordmarkOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none z-10"
        >
          <Image
            src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
            alt="Vinfolio"
            width={520}
            height={150}
            priority
            className="h-20 md:h-28 w-auto brightness-0 invert drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        {/* ── LAYER 2 — Tagline + CTA buttons (phase 1) ──────────────── */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-x-0 bottom-[16%] flex flex-col items-center text-center px-6 will-change-transform z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif italic text-paper text-xl md:text-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          >
            Strong partnerships, poured by hand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center pointer-events-auto"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                         bg-paper text-ink font-sans tracking-[0.06em] text-sm uppercase
                         border border-paper hover:bg-transparent hover:text-paper
                         transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              href="/wineries"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                         bg-transparent text-paper border border-paper/70
                         hover:bg-paper hover:text-ink
                         transition-colors duration-300 text-sm tracking-[0.06em] uppercase"
            >
              Meet our partners
            </Link>
          </motion.div>
        </motion.div>

        {/* ── LAYER 3 — Partners panel (phase 3) ─────────────────────── */}
        {/* Desktop: slides in from right, fills right half */}
        <motion.aside
          style={{
            opacity: panelOpacity,
            x: panelX,
          }}
          className="hidden lg:block absolute top-0 right-0 h-full w-1/2 bg-paper
                     border-l border-line z-20 will-change-transform shadow-[-30px_0_60px_-40px_rgba(0,0,0,0.25)]"
          aria-label="Our partner wineries"
        >
          <PartnersPanel />
        </motion.aside>

        {/* Mobile/tablet: slides up from bottom, fills lower 70% */}
        <motion.aside
          style={{
            opacity: panelOpacity,
            y: panelYMobile,
          }}
          className="lg:hidden absolute inset-x-0 bottom-0 h-[72vh] bg-paper
                     border-t border-line z-20 will-change-transform shadow-[0_-30px_60px_-40px_rgba(0,0,0,0.25)]"
          aria-label="Our partner wineries"
        >
          <PartnersPanel />
        </motion.aside>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-paper/70 text-[10px] uppercase tracking-[0.32em] font-sans flex flex-col items-center gap-2 pointer-events-none z-10"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-paper/50"
          />
        </motion.div>
      </div>
    </section>
  );
}
