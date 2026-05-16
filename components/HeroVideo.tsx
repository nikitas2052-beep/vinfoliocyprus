"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HeroVideo — full-viewport editorial hero with autoplay video.
 *
 * Behaviour
 * ---------
 *   • Video autoplays muted on loop (no scroll-scrubbing of currentTime).
 *   • The hero section is ~160vh tall; inside, the video lives in a
 *     `position: sticky` container so it stays in view as you scroll
 *     OUT of the hero and INTO the next section ("video continues with
 *     the page" — per user spec).
 *   • Two overlay layers cross-fade against the sticky video:
 *       1. The big VINFOLIO wordmark + Shop Now CTA  (scroll 0 → 50%)
 *       2. The "Award Partners — 17 wineries" intro  (scroll 50 → 95%)
 *     The wordmark also slides centre → upper-left as it fades,
 *     handing off to the header logo.
 *   • Top + bottom of the video are masked with paper-to-transparent
 *     gradients so the video edges blend seamlessly into the white page.
 *   • prefers-reduced-motion: video is replaced with a still photo and
 *     the overlay layers render statically.
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

  // Track scroll through the entire hero section (160vh)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Wordmark: centre → upper-left, fades during first 50% of hero scroll
  const wordmarkX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-40%"]);
  const wordmarkY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-44%"]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 0.4, 0]);

  // CTA: fades out during first 35%
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 0.6, 0]);
  const ctaY = useTransform(scrollYProgress, [0, 0.5], [0, 30]);

  // Partners intro: fades IN during the second half — this is the
  // "video connects to the next section" handoff. The video stays on
  // screen while the partners headline materialises over it.
  const partnersOpacity = useTransform(scrollYProgress, [0.45, 0.7, 0.95], [0, 1, 1]);
  const partnersY = useTransform(scrollYProgress, [0.45, 0.7], [30, 0]);

  // Scroll cue fades out as soon as user starts scrolling
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[160vh] -mt-20 md:-mt-24 bg-paper"
      aria-label="Vinfolio hero"
    >
      {/* Sticky stage — stays in view for the full 160vh of the hero,
          so the video "continues with the page" into the partners area. */}
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

        {/* Edge blending so the video melts into the white page */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-paper to-transparent pointer-events-none"
        />
        {/* Light wash for legibility (per spec ~25%) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-black/15 pointer-events-none"
        />

        {/* ── LAYER 1 — Wordmark (scroll 0 → 50%) ─────────────────────── */}
        <motion.div
          style={{
            x: wordmarkX,
            y: wordmarkY,
            scale: wordmarkScale,
            opacity: wordmarkOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
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

        {/* ── LAYER 2 — Tagline + CTA (scroll 0 → 40%) ────────────────── */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-x-0 bottom-[18%] flex flex-col items-center text-center px-6 will-change-transform"
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

        {/* ── LAYER 3 — Award Partners intro (scroll 45 → 95%) ────────── */}
        <motion.div
          style={{ opacity: partnersOpacity, y: partnersY }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center px-6 will-change-transform pointer-events-none"
          aria-hidden
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-bronze font-sans">
            Award Partners
          </p>
          <h2 className="font-serif text-paper text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] mt-4 max-w-3xl drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
            19 Wineries.{" "}
            <span className="italic text-bronze">One Seller.</span>
          </h2>
          <p className="mt-4 text-paper/85 text-base max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            A handpicked roster of family estates, historic houses and modern
            icons — including Ventisquero,
            <span className="italic"> New World Winery of the Year 2024</span>.
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-paper/70 text-[10px] uppercase tracking-[0.32em] font-sans flex flex-col items-center gap-2 pointer-events-none"
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
