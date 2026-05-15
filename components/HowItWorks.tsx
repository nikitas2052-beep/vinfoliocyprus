"use client";

import { motion } from "framer-motion";
import { Compass, Truck, Wine } from "lucide-react";

const STEPS = [
  {
    n: "01",
    Icon: Compass,
    title: "Discover",
    text: "Browse 70 bottles from 17 estates — each with tasting notes, food pairings and producer story.",
  },
  {
    n: "02",
    Icon: Wine,
    title: "Curate your case",
    text: "Build a mixed case across reds, whites, rosé and sparkling — or call us for a tailored selection.",
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
    <section className="py-24 lg:py-32 container-wide">
      <div className="max-w-2xl">
        <p className="eyebrow">How it works</p>
        <h2 className="h-hero mt-6">
          From our cellar to <span className="italic text-bronze">yours.</span>
        </h2>
        <div className="rule" />
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-line mt-12">
        {STEPS.map(({ n, Icon, title, text }, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-paper p-10 lg:p-12 group hover:bg-chalk transition-colors"
          >
            <div className="flex items-start justify-between">
              <span className="font-serif text-4xl text-bronze/80">{n}</span>
              <Icon className="w-7 h-7 text-ink/60 group-hover:text-bronze transition-colors" strokeWidth={1.2} />
            </div>
            <h3 className="font-serif text-2xl text-ink mt-8">{title}</h3>
            <p className="text-ink/75 mt-3 leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
