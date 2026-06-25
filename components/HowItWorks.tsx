"use client";

import { motion, type Variants } from "framer-motion";
import { Compass, ClipboardList, Truck } from "lucide-react";
import { wines } from "@/lib/wines";
import { wineries } from "@/lib/wineries";

const STEPS = [
  {
    n: "01",
    Icon: Compass,
    title: "Explore the collection",
    text: `Browse our curated portfolio of ${wines.length} wines from ${wineries.length} estates worldwide — each with tasting notes, food pairings and the producer's story.`,
  },
  {
    n: "02",
    Icon: ClipboardList,
    title: "Request a tailored offer",
    text: "Add the bottles you're interested in and send us your selection. No obligation — we reply with a personalised quote, made for you.",
  },
  {
    n: "03",
    Icon: Truck,
    title: "Delivered across Cyprus",
    text: "Once you approve, your order is carefully packed and delivered island-wide, with the same care for private clients and trade alike.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const badge: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 240, damping: 16 },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 section-chalk overflow-hidden">
      <div className="container-wide">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="eyebrow">How it works</p>
          <h2 className="h-hero mt-6">
            From our cellar to <span className="italic text-bronze">yours.</span>
          </h2>
          <div className="rule" />
          <p className="text-ink/70 mt-2 max-w-xl">
            A considered, no-pressure way to build your selection: explore the
            wines, request a tailored offer, and let us take care of the rest.
          </p>
        </motion.div>

        <motion.div
          className="relative mt-14 lg:mt-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Hairline that draws itself through the step markers on desktop */}
          <motion.div
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-line origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          />
          {/* A bronze pulse that travels along the line once */}
          <motion.span
            aria-hidden
            className="hidden lg:block absolute top-7 h-px w-24 bg-gradient-to-r from-transparent via-bronze to-transparent"
            initial={{ left: "-10%", opacity: 0 }}
            whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Desktop: 3-col. Mobile: horizontal snap carousel. */}
          <div
            className="flex lg:grid lg:grid-cols-3 gap-5 lg:gap-12
                       overflow-x-auto lg:overflow-visible
                       snap-x snap-mandatory lg:snap-none
                       -mx-5 px-5 lg:mx-0 lg:px-0
                       scrollbar-thin pb-2 lg:pb-0"
          >
            {STEPS.map(({ n, Icon, title, text }) => (
              <motion.div
                key={n}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative min-w-[82%] sm:min-w-[55%] lg:min-w-0
                           snap-center lg:snap-align-none
                           bg-paper lg:bg-transparent
                           border border-line lg:border-0 p-7 lg:p-0"
              >
                <div className="flex items-center gap-4">
                  <motion.span
                    variants={badge}
                    whileHover={{ scale: 1.12, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 14 }}
                    className="relative z-10 inline-flex h-14 w-14 flex-shrink-0
                               items-center justify-center rounded-full
                               border border-line bg-paper
                               text-bronze shadow-[0_1px_0_rgba(0,0,0,0.02)]
                               group-hover:border-bronze transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </motion.span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-muted">
                    Step {n}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-ink mt-6 lg:mt-7">
                  {title}
                </h3>
                <p className="text-ink/70 mt-2.5 text-[15px] leading-relaxed">
                  {text}
                </p>

                {/* underline accent that grows on hover */}
                <span
                  className="mt-5 block h-px w-10 bg-bronze/70 origin-left
                             scale-x-100 lg:scale-x-0 lg:group-hover:scale-x-100
                             transition-transform duration-500 ease-out"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
