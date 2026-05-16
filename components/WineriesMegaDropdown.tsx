"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { wineries, logoFor } from "@/lib/wineries";

/**
 * WineriesMegaDropdown — nav trigger that opens a full-width mega-panel
 * with all 17 partner wineries.
 *
 * Open behaviour:
 *   • Click / Enter / Space on the trigger toggles the panel
 *   • Hover the trigger opens (with a small grace timer when leaving)
 *   • Click outside, Escape, or following any link closes
 *
 * Logo treatment per spec: monochrome filter idle → full colour + opacity 1
 * on hover. Real partner logos come from vinfolio.com.cy CDN; favicon
 * fallback otherwise.
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

  // Click outside / Escape → close
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
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
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
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={
          "relative inline-flex items-center gap-1 text-[13px] uppercase tracking-[0.18em] font-sans py-1 transition-colors " +
          (active || open ? "text-ink" : "text-ink/70 hover:text-ink")
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
      </button>

      {/* Bridge — covers the gap between trigger and panel so hover
          intent isn't lost as the user moves the mouse down. */}
      {open && (
        <div
          aria-hidden
          className="fixed left-0 right-0 top-20 md:top-24 h-3 z-50"
          onMouseEnter={cancelClose}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed left-0 right-0 top-20 md:top-24 bg-paper border-b border-line shadow-soft z-50 max-h-[80vh] overflow-y-auto"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            role="menu"
          >
            <div className="container-wide py-10">
              <div className="flex items-end justify-between mb-7 gap-4">
                <div>
                  <p className="eyebrow">Our {wineries.length} Partner Wineries</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink mt-2">
                    From Cyprus to the great cellars of the world.
                  </h3>
                </div>
                <Link
                  href="/wineries"
                  className="hidden md:inline-flex btn-link text-xs whitespace-nowrap"
                  onClick={() => setOpen(false)}
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                {wineries.map((w) => {
                  const src = logoFor(w);
                  return (
                    <Link
                      key={w.slug}
                      href={`/products?winery=${encodeURIComponent(w.name)}`}
                      onClick={() => setOpen(false)}
                      role="menuitem"
                      className="group focus:outline-none"
                    >
                      <div
                        className="relative h-14 w-20 mb-3 grid place-items-center
                                   bg-chalk border border-line overflow-hidden"
                      >
                        {src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={src}
                            alt={`${w.name} logo`}
                            width={80}
                            height={56}
                            loading="lazy"
                            className="max-w-[68px] max-h-[44px] w-auto h-auto object-contain transition-all duration-300
                                       [filter:grayscale(100%)_contrast(130%)_brightness(0.2)]
                                       opacity-70 group-hover:[filter:none] group-hover:opacity-100"
                          />
                        ) : (
                          <span className="font-serif italic text-ink text-xl">
                            {w.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <p className="font-serif text-base font-semibold text-ink leading-tight group-hover:text-bronze group-focus:text-bronze transition-colors">
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
