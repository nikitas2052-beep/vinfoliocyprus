"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/**
 * PourHero — a 4-screen scroll-driven sequence:
 *
 *   0 ─ 0.25  Bottle enters from right, settles upright
 *   0.25 ─ 0.55  Bottle tilts left, neck aims at the V
 *   0.40 ─ 0.75  Wine stream pours from bottle into the V
 *   0.55 ─ 0.95  The V fills with burgundy wine
 *   0.85 ─ 1.00  "VINFOLIO" wordmark + tagline reveal
 */
export default function PourHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  // ─── bottle ──────────────────────────────────────────────────────────────
  const bottleX = useTransform(p, [0, 0.2], [380, 0]);
  const bottleY = useTransform(p, [0, 0.2, 0.55], [-40, -10, -30]);
  const bottleRotate = useTransform(p, [0.25, 0.55], [0, -68]);
  const bottleOpacity = useTransform(p, [0, 0.1, 0.9, 1], [0, 1, 1, 0.4]);

  // ─── stream ──────────────────────────────────────────────────────────────
  const streamLength = useTransform(p, [0.42, 0.72], [0, 1]);
  const streamOpacity = useTransform(p, [0.4, 0.45, 0.78, 0.88], [0, 1, 1, 0]);

  // ─── droplets ────────────────────────────────────────────────────────────
  const dropY1 = useTransform(p, [0.5, 0.8], [0, 200]);
  const dropY2 = useTransform(p, [0.55, 0.85], [0, 230]);
  const dropOpacity = useTransform(p, [0.5, 0.55, 0.85, 0.9], [0, 1, 1, 0]);

  // ─── V fill ──────────────────────────────────────────────────────────────
  const fillY = useTransform(p, [0.55, 0.95], [620, 110]);
  const fillHeight = useTransform(p, [0.55, 0.95], [0, 510]);

  // ─── title ───────────────────────────────────────────────────────────────
  const titleOpacity = useTransform(p, [0.82, 0.92], [0, 1]);
  const titleY = useTransform(p, [0.82, 0.92], [30, 0]);

  // ─── overall background brightness ──────────────────────────────────────
  const bgGold = useTransform(
    p,
    [0, 0.5, 1],
    ["rgba(212,175,55,0.06)", "rgba(212,175,55,0.18)", "rgba(212,175,55,0.05)"],
  );

  // Scroll cue fades out as soon as motion begins
  const hintOpacity = useTransform(p, [0, 0.05], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[420vh] -mt-20"
      aria-label="Vinfolio — pour into V"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Soft warm gradient backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: bgGold }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6)_0%,_rgba(248,242,232,1)_70%)]" />

        {/* Decorative grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Scene */}
        <div className="relative h-full flex items-center justify-center">
          <svg
            viewBox="0 0 800 800"
            className="w-full h-full max-w-[1200px]"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            {/* ─── definitions ──────────────────────────────────────── */}
            <defs>
              <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1F0F12" />
                <stop offset="40%" stopColor="#3a181d" />
                <stop offset="55%" stopColor="#581f27" />
                <stop offset="100%" stopColor="#1a0a0c" />
              </linearGradient>
              <linearGradient id="wine-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B1A1A" />
                <stop offset="100%" stopColor="#4a141a" />
              </linearGradient>
              <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E6C75E" />
                <stop offset="100%" stopColor="#A98A2B" />
              </linearGradient>

              {/* The V letter as clipPath */}
              <clipPath id="v-clip">
                <path d="M 240 140 L 330 140 L 400 460 L 470 140 L 560 140 L 440 660 L 360 660 Z" />
              </clipPath>

              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ─── V — empty outline (always visible) ───────────────── */}
            <g>
              <path
                d="M 240 140 L 330 140 L 400 460 L 470 140 L 560 140 L 440 660 L 360 660 Z"
                fill="rgba(114,47,55,0.06)"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeLinejoin="round"
                opacity="0.6"
              />

              {/* Wine inside V — animated fill */}
              <g clipPath="url(#v-clip)">
                <motion.rect
                  x={0}
                  width={800}
                  fill="url(#wine-grad)"
                  style={{
                    y: fillY,
                    height: fillHeight,
                  }}
                />
                {/* Subtle wine surface highlight */}
                <motion.rect
                  x={0}
                  width={800}
                  height={3}
                  fill="rgba(255,200,180,0.55)"
                  style={{ y: fillY }}
                />
              </g>

              {/* Re-overlay gold V outline above the fill */}
              <path
                d="M 240 140 L 330 140 L 400 460 L 470 140 L 560 140 L 440 660 L 360 660 Z"
                fill="none"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinejoin="round"
                opacity="0.85"
              />
            </g>

            {/* ─── Wine stream from bottle mouth ───────────────────── */}
            <Stream length={streamLength} opacity={streamOpacity} />

            {/* ─── Droplets falling onto wine surface ──────────────── */}
            <motion.g style={{ opacity: dropOpacity }}>
              <motion.circle
                cx={398}
                fill="#722F37"
                r={4}
                style={{ cy: useTransform(dropY1, (v) => 320 + v) }}
              />
              <motion.circle
                cx={402}
                fill="#8B1A1A"
                r={3}
                style={{ cy: useTransform(dropY2, (v) => 310 + v) }}
              />
            </motion.g>

            {/* ─── Bottle ──────────────────────────────────────────── */}
            <motion.g
              style={{
                x: bottleX,
                y: bottleY,
                rotate: bottleRotate,
                opacity: bottleOpacity,
                transformOrigin: "180px 180px",
              }}
            >
              <Bottle />
            </motion.g>
          </svg>

          {/* ─── Title overlay ────────────────────────────────────── */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-x-0 bottom-[10%] flex flex-col items-center text-center px-6 pointer-events-none"
          >
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-gold-dark">
              Vinfolio Ltd · Cyprus
            </p>
            <h1 className="font-serif text-5xl sm:text-7xl text-burgundy mt-3 tracking-tight">
              <span className="italic text-gold">Strong</span> partnerships
            </h1>
            <p className="font-serif italic text-burgundy/70 mt-2 text-lg sm:text-xl">
              build stronger companies
            </p>
            <div className="pointer-events-auto mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/products" className="btn-gold">
                Explore the cellar
              </Link>
              <Link href="/about" className="btn-ghost">
                Our story
              </Link>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-burgundy/60 text-xs uppercase tracking-[0.3em] flex flex-col items-center gap-2"
          >
            <span>Scroll to pour</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-burgundy/0 to-burgundy/60"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── A stylized wine bottle ───────────────────────────────────────────── */
function Bottle() {
  return (
    <g>
      {/* Body shadow */}
      <ellipse cx={180} cy={580} rx={70} ry={6} fill="rgba(20,8,10,0.18)" />

      {/* Bottle shape */}
      <path
        d="
          M 170 60
          L 190 60
          L 190 150
          C 190 165, 215 175, 230 200
          C 240 215, 240 230, 240 260
          L 240 560
          C 240 575, 230 585, 215 585
          L 145 585
          C 130 585, 120 575, 120 560
          L 120 260
          C 120 230, 120 215, 130 200
          C 145 175, 170 165, 170 150
          Z
        "
        fill="url(#glass)"
        stroke="#0a0405"
        strokeWidth="1"
      />

      {/* Cork foil */}
      <rect x="165" y="40" width="30" height="35" rx="2" fill="#5a1014" />
      <rect x="165" y="40" width="30" height="6" fill="#3d0a0c" />

      {/* Highlight on glass body */}
      <path
        d="M 135 280 Q 130 380 135 500"
        stroke="rgba(255,235,210,0.18)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 220 290 Q 225 380 220 470"
        stroke="rgba(255,235,210,0.07)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Label */}
      <rect
        x="135"
        y="340"
        width="90"
        height="120"
        fill="#F5EFE3"
        stroke="#722F37"
        strokeWidth="0.8"
      />
      <text
        x="180"
        y="385"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="11"
        fill="#722F37"
        letterSpacing="2"
        fontStyle="italic"
      >
        VINFOLIO
      </text>
      <line x1="155" y1="395" x2="205" y2="395" stroke="#D4AF37" strokeWidth="0.6" />
      <text
        x="180"
        y="420"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="7"
        fill="#722F37"
        letterSpacing="1.5"
      >
        FINE WINE
      </text>
      <text
        x="180"
        y="440"
        textAnchor="middle"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="6"
        fill="#722F37"
        letterSpacing="2"
      >
        CYPRUS · 2026
      </text>
    </g>
  );
}

/* ── The pouring stream of wine ───────────────────────────────────────── */
function Stream({
  length,
  opacity,
}: {
  length: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  // The stream is drawn from the (rotated) bottle mouth into the V.
  // We use pathLength to grow the path with scroll.
  // The path is a curved Bezier from upper-left toward the V's inside bowl.
  return (
    <motion.g style={{ opacity }}>
      <motion.path
        d="M 175 195 C 245 215, 320 260, 400 320"
        stroke="#8B1A1A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: length }}
        filter="url(#glow)"
      />
      <motion.path
        d="M 175 195 C 245 215, 320 260, 400 320"
        stroke="rgba(255,180,160,0.55)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: length }}
      />
    </motion.g>
  );
}
