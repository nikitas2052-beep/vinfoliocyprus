"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroEditorial() {
  return (
    <section className="relative bg-paper overflow-hidden">
      <div className="container-wide grid lg:grid-cols-12 gap-10 lg:gap-16 pt-12 lg:pt-20 pb-20 lg:pb-28 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <p className="eyebrow">Vinfolio · Limassol · Cyprus</p>
          <h1 className="display mt-6">
            Cyprus's cellar of{" "}
            <span className="italic text-bronze">artisanal</span> wines.
          </h1>
          <p className="mt-7 max-w-xl text-ink/80 text-lg leading-relaxed">
            We import and distribute fine wines from family-run estates across
            Europe, the Mediterranean and the New World — chosen with care by
            <span className="italic"> Yiannakis Aristidou</span>, with 25 years
            in the wine and beverage sector.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary">
              Shop the cellar
            </Link>
            <Link href="/wineries" className="btn-chalk">
              Meet our wineries
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-xs uppercase tracking-[0.22em] text-muted">
            <span>17 Wineries</span>
            <span className="h-3 w-px bg-line" />
            <span>70 Bottles</span>
            <span className="h-3 w-px bg-line" />
            <span>9 Regions</span>
          </div>
        </motion.div>

        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="lg:col-span-6 relative"
        >
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <div className="col-span-7 relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80"
                alt="Vineyard at golden hour"
                fill
                priority
                sizes="(max-width:1024px) 50vw, 35vw"
                className="object-cover kb-image"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=900&q=80"
                  alt="Wine cellar"
                  fill
                  sizes="(max-width:1024px) 30vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="relative flex-1 bg-chalk flex items-center justify-center p-6 text-center">
                <p className="font-serif italic text-ink text-lg leading-snug">
                  "Wine is culture,<br />
                  experience,<br />
                  <span className="text-bronze">a way of life.</span>"
                </p>
              </div>
            </div>
          </div>

          {/* Floating accolade */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden sm:flex absolute -left-4 lg:-left-8 bottom-6 bg-ink text-paper py-4 pl-5 pr-7 max-w-[260px]"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-bronze">
                New World Winery
              </p>
              <p className="font-serif text-xl leading-tight mt-1">
                of the Year — 2024
              </p>
              <p className="text-xs text-paper/60 mt-2 font-sans">
                Ventisquero, among our partners.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
