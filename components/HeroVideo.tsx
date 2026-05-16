"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HeroVideo — full-viewport editorial hero with autoplay video.
 *
 *  • Video plays from frame 1, loops muted (no scrubbing, no pin).
 *  • Page scrolls naturally — hero flows away like any other section.
 *  • Shop Now / Meet the Wineries CTAs overlay the video.
 *  • The big VINFOLIO wordmark slides from centre to the left edge as
 *    you scroll, "handing off" to the header logo. Done via framer
 *    scroll-linked transforms — no third-party scroll lib needed.
 *  • White vignette top/bottom blends the video edges into the white
 *    page background so the video feels embedded, not cropped.
 *  • prefers-reduced-motion: video does not autoplay; a still poster
 *    + the same CTAs render instead.
 */
export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Kick autoplay on mount (Safari can be picky)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduceMotion) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("loadeddata", tryPlay, { once: true });
  }, [reduceMotion]);

  // Scroll-linked transforms: logo slides centre → top-left as user scrolls
  // through the hero. Only computed in the browser; SSR shows the centre state.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // logo slides from 0 (centre) to roughly the upper-left corner
  const logoX = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.32]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.4, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.35, 0.6], [1, 0.6, 0]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-paper -mt-20 md:-mt-24"
      aria-label="Vinfolio hero"
    >
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
        // Reduced-motion / video-error fallback: a still vineyard image
        <Image
          src="https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Blend the video into the white page on top + bottom edges so it
          doesn't look "cut". Sides stay clean. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent pointer-events-none"
      />
      {/* Very gentle dark wash for legibility (per spec ~25%) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/15 pointer-events-none"
      />

      {/* CONTENT — wordmark + CTA, both scroll-linked */}
      <div className="relative h-full pt-20 md:pt-28 flex flex-col items-center justify-center text-center px-6">
        {/* Wordmark — slides to corner as you scroll */}
        <motion.div
          style={{
            x: logoX,
            y: logoY,
            scale: logoScale,
            opacity: logoOpacity,
          }}
          className="will-change-transform"
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

        {/* Tagline + CTA */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="mt-10 will-change-transform"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif italic text-paper/95 text-xl md:text-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          >
            Strong partnerships, poured by hand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-7 flex flex-col sm:flex-row gap-3 justify-center"
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

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-paper/70 text-[10px] uppercase tracking-[0.32em] font-sans flex flex-col items-center gap-2"
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
