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
 *   • Mobile: shows a single full-width slide with swipe (scroll-snap).
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
  const timerRef = useRef<number | undefined>(undefined);
  const mobileRef = useRef<HTMLDivElement>(null);
  const programmatic = useRef(false);
  const scrollEndRef = useRef<number | undefined>(undefined);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setInterval(() => {
      setActive((a) => (a + 1) % BOXES.length);
    }, 6000);
    return () => window.clearInterval(timerRef.current);
  }, [paused]);

  // Keep the mobile swipe strip in sync with the rotating active slide
  useEffect(() => {
    const c = mobileRef.current;
    if (!c) return;
    const child = c.children[active] as HTMLElement | undefined;
    if (!child) return;
    programmatic.current = true;
    c.scrollTo({
      left: child.offsetLeft - (c.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
    const t = window.setTimeout(() => (programmatic.current = false), 800);
    return () => window.clearTimeout(t);
  }, [active]);

  // When the user swipes the mobile strip, adopt the slide they land on
  const onMobileScroll = () => {
    if (programmatic.current) return;
    window.clearTimeout(scrollEndRef.current);
    scrollEndRef.current = window.setTimeout(() => {
      const c = mobileRef.current;
      if (!c) return;
      const center = c.scrollLeft + c.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(c.children).forEach((ch, i) => {
        const el = ch as HTMLElement;
        const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive((a) => (best !== a ? best : a));
    }, 120);
  };

  const prev = () => setActive((a) => (a - 1 + BOXES.length) % BOXES.length);
  const next = () => setActive((a) => (a + 1) % BOXES.length);

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

      {/* ─── Desktop: coverflow with side-peeks ───────────────────────── */}
      <div
        className="hidden md:block relative max-w-6xl mx-auto px-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <div className="relative h-[520px] flex items-center justify-center">
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

            const translateX = wrappedOffset * 280;
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
                    "relative w-[440px] h-[440px] overflow-hidden " +
                    (abs === 0
                      ? "shadow-[0_30px_70px_-20px_rgba(36,46,53,0.45)]"
                      : "shadow-[0_15px_40px_-15px_rgba(36,46,53,0.2)]")
                  }
                >
                  <Image
                    src={box.image}
                    alt={box.title}
                    fill
                    sizes="440px"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                <p
                  className={
                    "font-serif text-ink text-lg mt-4 transition-opacity " +
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
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full bg-paper border border-line
                       flex items-center justify-center text-ink hover:bg-ink hover:text-paper
                       transition-colors shadow-soft"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            aria-label="Next gift box"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 rounded-full bg-paper border border-line
                       flex items-center justify-center text-ink hover:bg-ink hover:text-paper
                       transition-colors shadow-soft"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
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

      {/* ─── Mobile: auto-rotating swipe carousel ─────────────────────── */}
      <div className="md:hidden">
        <div
          ref={mobileRef}
          onScroll={onMobileScroll}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-[11%] pb-3 scrollbar-thin"
        >
          {BOXES.map((box) => (
            <div
              key={box.n}
              className="snap-center flex-shrink-0 w-[78%]"
            >
              <div className="relative aspect-square overflow-hidden shadow-card">
                <Image
                  src={box.image}
                  alt={box.title}
                  fill
                  sizes="78vw"
                  className="object-cover"
                />
              </div>
              <p className="font-serif text-ink text-base mt-3 text-center">
                {box.title}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-5">
          {BOXES.map((b, i) => (
            <button
              key={b.n}
              onClick={() => setActive(i)}
              aria-label={`Go to ${b.title}`}
              className={
                "h-1.5 rounded-full transition-all " +
                (i === active ? "w-8 bg-wine" : "w-1.5 bg-ink/30")
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
