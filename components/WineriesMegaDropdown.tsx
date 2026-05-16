"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { wineries, logoFor } from "@/lib/wineries";

/**
 * WineriesMegaDropdown — nav-item with hover/focus-triggered mega-panel.
 * - 4 / 2 / 1 column responsive grid of partner cards
 * - Monochrome filter on logos (per spec); colour on hover
 * - Click-outside + Escape close
 * - Keyboard accessible
 */
export default function WineriesMegaDropdown({
  activePath,
}: {
  activePath: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const active = activePath.startsWith("/wineries");

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      className="relative"
    >
      <Link
        href="/wineries"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(false)}
        className={
          "relative inline-flex items-center gap-1 text-[13px] uppercase tracking-[0.18em] font-sans py-1 transition-colors " +
          (active ? "text-ink" : "text-ink/70 hover:text-ink")
        }
      >
        Wineries
        <ChevronDown
          className={
            "w-3 h-3 transition-transform duration-200 " +
            (open ? "rotate-180" : "")
          }
          strokeWidth={2}
        />
        {active && (
          <motion.span
            layoutId="header-underline"
            className="absolute left-0 right-4 -bottom-1 h-px bg-bronze"
          />
        )}
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            // Pull the panel out to full screen width below the header
            className="fixed left-0 right-0 top-20 md:top-24 bg-paper border-b border-line shadow-soft z-50"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            role="menu"
          >
            <div className="container-wide py-10">
              <div className="flex items-end justify-between mb-7">
                <div>
                  <p className="eyebrow">Our 17 Partner Wineries</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink mt-2">
                    From Cyprus to the great cellars of the world.
                  </h3>
                </div>
                <Link
                  href="/wineries"
                  className="hidden md:inline-flex btn-link text-xs"
                  onClick={() => setOpen(false)}
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                {wineries.map((w) => {
                  const src = logoFor(w.website);
                  return (
                    <Link
                      key={w.slug}
                      href={`/products?winery=${encodeURIComponent(w.name)}`}
                      onClick={() => setOpen(false)}
                      role="menuitem"
                      className="group focus:outline-none"
                    >
                      <div
                        className="relative h-14 w-14 mb-3 grid place-items-center
                                   bg-chalk border border-line"
                      >
                        {src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={src}
                            alt={`${w.name} logo`}
                            width={56}
                            height={56}
                            loading="lazy"
                            className="w-9 h-9 object-contain transition-all duration-300
                                       [filter:grayscale(100%)_contrast(130%)_brightness(0.2)]
                                       opacity-70 group-hover:[filter:none] group-hover:opacity-100"
                          />
                        ) : (
                          <span className="font-serif italic text-ink text-2xl">
                            {w.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <p className="font-serif text-base text-ink leading-tight group-hover:text-bronze group-focus:text-bronze transition-colors">
                        {w.name}
                      </p>
                      <p className="text-xs text-muted mt-1 line-clamp-2">
                        {w.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
