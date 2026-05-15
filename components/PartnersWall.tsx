"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { wineries } from "@/lib/wineries";

/**
 * PartnersWall — editorial grid of partner wineries rendered as
 * serif wordmarks (consistent typography beats mismatched bitmap logos).
 * Subtle hover bronze underline + scroll-stagger reveal.
 */
export default function PartnersWall() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-line">
      {wineries.map((w, i) => (
        <motion.div
          key={w.slug}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: Math.min(i * 0.04, 0.5), ease: [0.22, 1, 0.36, 1] }}
          className="bg-paper"
        >
          <Link
            href={`/products?winery=${encodeURIComponent(w.name)}`}
            className="group flex flex-col items-center justify-center
                       aspect-[5/3] sm:aspect-[5/3] px-6 py-8 text-center
                       transition-colors hover:bg-chalk"
          >
            <span
              className="font-serif text-ink leading-none transition-colors
                         group-hover:text-bronze
                         text-[clamp(1.05rem,1.7vw,1.4rem)]
                         tracking-[-0.005em]"
            >
              {w.name}
            </span>
            <span className="mt-2.5 text-[10px] uppercase tracking-[0.3em] text-muted">
              {w.country}
            </span>
            <span className="mt-4 h-px w-6 bg-bronze opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
