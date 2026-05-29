"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

/**
 * GiftBoxesCarousel — coverflow-style gift box showcase modelled on
 * the live vinfolio.com.cy /shop slider the user shared.
 *
 *   • One large centre slide flanked by smaller peeks of the next /
 *     previous box on each side.
 *   • Prev / next arrow buttons + pagination dots.
 *   • Auto-rotates every 6s, pauses on hover.
 *   • Tap a side card to bring it to centre.
 *   • Fully responsive — same coverflow on phone, tablet and desktop,
 *     just with smaller card / spread values on narrow screens.
 *
 * The five gift box photos are the actual product images from
 * vinfolio.com.cy (uploaded Nov 2025, ~500KB each).
 */
const BOXES = [
  {
    n: 1,
    title: "Gift Box 1",
    image:
      "https://vinfolio.com.cy/wp-content/uploads/2025/11/0-02-0b-3e238aca8bb9d205ba3c5b6662194d27ce2a355faea72f4a0c42b34f4c61515b_a9c99ca620c0a296.jpg",
  },
  {
    n: 2,
    title: "Gift Box 2",
    image:
      "https://vinfolio.com.cy/wp-content/uploads/2025/11/0-02-0b-78e065c0a1ea63294618fcf232c736ffef782ca69e2da7161ac7a772d27f3b4f_8fab07626c33b1a5.jpg",
  },
  {
    n: 3,
    title: "Gift Box 3",
    image:
      "https://vinfolio.com.cy/wp-content/uploads/2025/11/0-02-0b-a8f4e96a6ea3cd76f852080070be341c623be029ac41f5a18cb34434e3eb75b1_2df3ae433e176c99.jpg",
  },
  {
    n: 4,
    title: "Gift Box 4",
    image:
      "https://vinfolio.com.cy/wp-content/uploads/2025/11/0-02-0b-b898ffdb4fda38721ab4d322fcb820d0539d50d18dfc0fcf9885f8826150fbab_6788a2307c17169.jpg",
  },
  {
    n: 5,
    title: "Gift Box 5",
    image:
      "https://vinfolio.com.cy/wp-content/uploads/2025/11/0-02-0b-e8ac7d08308faf526deb39f5be1c728d22d8e032b5cf2d24bc6dfb7f4bfbf6f4_b7554d4b9836805a.jpg",
  },
];

export default function GiftBoxesCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [vw, setVw] = useState(1280);
  const timerRef = useRef<number | undefined>(undefined);

  // Track viewport width to size the coverflow responsively
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setInterval(() => {
      setActive((a) => (a + 1) % BOXES.length);
    }, 6000);
    return () => window.clearInterval(timerRef.current);
  }, [paused]);

  const prev = () => setActive((a) => (a - 1 + BOXES.length) % BOXES.length);
  const next = () => setActive((a) => (a + 1) % BOXES.length);

  // Responsive coverflow geometry
  const card =
    vw < 640 ? Math.min(300, Math.round(vw * 0.66)) : vw < 1024 ? 360 : 440;
  const spread = Math.round(card * 0.62);
  const stageH = card + (vw < 640 ? 64 : 80);

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="container-wide text-center mb-10">
        <p className="eyebrow">Gift Boxes</p>
        <h2 className="h-hero mt-4">
          For a friend, a partner,{" "}
          <span className="italic text-bronze">a moment.</span>
        </h2>
        <div className="h-px w-12 bg-ink/80 mx-auto my-5" />
        <p className="text-ink/75 max-w-xl mx-auto text-sm sm:text-base">
          Curated boxes of our favourite bottles, ready to wrap.
        </p>
      </div>

      {/* ─── Responsive coverflow with side-peeks ─────────────────────── */}
      <div
        className="relative max-w-6xl mx-auto px-2 sm:px-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <div
          className="relative flex items-center justify-center"
          style={{ height: stageH }}
        >
          {BOXES.map((box, i) => {
            const offset = i - active;
            // Wrap around for circular feel
            const wrappedOffset =
              offset > BOXES.length / 2
                ? offset - BOXES.length
                : offset < -BOXES.length / 2
                  ? offset + BOXES.length
                  : offset;
            const abs = Math.abs(wrappedOffset);
            if (abs > 2) return null;

            const translateX = wrappedOffset * spread;
            const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.6;
            const opacity = abs === 0 ? 1 : abs === 1 ? 0.75 : 0.4;
            const z = 10 - abs;

            return (
              <button
                key={box.n}
                onClick={() => setActive(i)}
                aria-label={`Show ${box.title}`}
                className="absolute transition-all duration-700 ease-out cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: z,
                }}
              >
                <div
                  className={
                    "relative overflow-hidden " +
                    (abs === 0
                      ? "shadow-[0_30px_70px_-20px_rgba(36,46,53,0.45)]"
                      : "shadow-[0_15px_40px_-15px_rgba(36,46,53,0.2)]")
                  }
                  style={{ width: card, height: card }}
                >
                  <Image
                    src={box.image}
                    alt={box.title}
                    fill
                    sizes={`${card}px`}
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                <p
                  className={
                    "font-serif text-ink text-base sm:text-lg mt-3 sm:mt-4 transition-opacity " +
                    (abs === 0 ? "opacity-100" : "opacity-60")
                  }
                >
                  {box.title}
                </p>
              </button>
            );
          })}

          {/* Arrow controls */}
          <button
            onClick={prev}
            aria-label="Previous gift box"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20
                       w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-paper border border-line
                       flex items-center justify-center text-ink hover:bg-ink hover:text-paper
                       transition-colors shadow-soft"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Next gift box"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20
                       w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-paper border border-line
                       flex items-center justify-center text-ink hover:bg-ink hover:text-paper
                       transition-colors shadow-soft"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {BOXES.map((b, i) => (
            <button
              key={b.n}
              onClick={() => setActive(i)}
              aria-label={`Go to ${b.title}`}
              className={
                "h-1.5 rounded-full transition-all " +
                (i === active ? "w-8 bg-wine" : "w-1.5 bg-ink/30 hover:bg-ink/60")
              }
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          href="/products?tag=gift"
          className="inline-flex items-center gap-2 font-serif italic text-ink text-lg sm:text-xl hover:text-bronze transition-colors"
        >
          View our Gift Boxes
          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
