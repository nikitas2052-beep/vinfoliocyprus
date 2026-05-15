"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Editorial value-prop section: text on left, layered images on right.
 * "Only real wineries" — adapted to Vinfolio's importer story.
 */
export default function RealWineries() {
  return (
    <section className="section-chalk py-24 lg:py-32">
      <div className="container-wide grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=900&q=80"
                alt="Vines"
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden mt-10">
              <Image
                src="https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=900&q=80"
                alt="Bottle close-up"
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="eyebrow">A partner, not a middleman</p>
          <h2 className="h-hero mt-6 max-w-2xl">
            Only <span className="italic text-bronze">real</span> wineries —
            chosen one cellar at a time.
          </h2>
          <div className="rule" />
          <p className="text-ink/80 text-lg leading-relaxed max-w-xl">
            Every label in our catalogue comes from a family-run or
            independent estate we know personally. No private-label tricks,
            no anonymous bulk wine — just bottles with a name, a place, and
            a story to tell.
          </p>
          <p className="text-ink/70 mt-4 leading-relaxed max-w-xl">
            From the limestone of Chablis to the Apalta amphitheater and the
            slopes of Cyprus's Troodos foothills, we bring you the cellar we
            built ourselves.
          </p>

          <div className="mt-9 grid sm:grid-cols-3 gap-px bg-line max-w-xl">
            <Fact value="25" label="Years in wine" />
            <Fact value="17" label="Partner estates" />
            <Fact value="9" label="Wine regions" />
          </div>

          <Link href="/wineries" className="mt-10 inline-flex btn-link">
            Meet the wineries →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-chalk px-5 py-6">
      <p className="font-serif text-4xl text-ink">{value}</p>
      <p className="eyebrow mt-1">{label}</p>
    </div>
  );
}
