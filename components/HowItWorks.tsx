"use client";

import { motion } from "framer-motion";
import { Compass, Truck, Wine } from "lucide-react";

const STEPS = [
  {
    n: "01",
    Icon: Compass,
    title: "Discover",
    text: "Browse 70 bottles from 17 estates, each with tasting notes, food pairings and producer story.",
  },
  {
    n: "02",
    Icon: Wine,
    title: "Curate your case",
    text: "Build a mixed case across reds, whites, rosé and sparkling, or call us for a tailored selection.",
  },
  {
    n: "03",
    Icon: Truck,
    title: "Delivered in Cyprus",
    text: "Carefully packed and delivered island-wide. Trade orders priced and dispatched the same week.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-32 container-wide">
      <div className="max-w-2xl">
        <p className="eyebrow">How it works</p>
        <h2 className="h-hero mt-6">
          From our cellar to <span className="italic text-bronze">yours.</span>
        </h2>
        <div className="rule" />
      </div>

      {/* Desktop: 3-col grid. Mobile: horizontal swipe carousel.
          (snap-mandatory + overflow-x-auto so each card "clicks" into
          place as the user scrolls horizontally.) */}
      <div
        className="mt-10 lg:mt-12
                   flex md:grid md:grid-cols-3 md:gap-px md:bg-line
                   overflow-x-auto md:overflow-visible
                   snap-x snap-mandatory md:snap-none
                   gap-4 md:gap-0
                   -mx-4 px-4 md:mx-0 md:px-0
                   scrollbar-thin pb-2 md:pb-0"
      >
        {STEPS.map(({ n, Icon, title, text }, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-paper p-7 sm:p-9 lg:p-12 group hover:bg-chalk transition-colors
                       min-w-[78%] sm:min-w-[60%] md:min-w-0
                       snap-center md:snap-align-none
                       border md:border-0 border-line"
          >
            <div className="flex items-start justify-between">
              <span className="font-serif text-3xl lg:text-4xl text-bronze/80">{n}</span>
              <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-ink/60 group-hover:text-bronze transition-colors" strokeWidth={1.2} />
            </div>
            <h3 className="font-serif text-xl lg:text-2xl text-ink mt-6 lg:mt-8">{title}</h3>
            <p className="text-ink/75 mt-2 lg:mt-3 text-sm lg:text-base leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
