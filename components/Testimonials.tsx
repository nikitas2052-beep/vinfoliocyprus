"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const QUOTES = [
  {
    body: "Vinfolio's curation reads like a love letter to terroir. Every bottle has a name, a face, a vineyard behind it.",
    author: "Anna Markou",
    role: "Head Sommelier, Limassol",
  },
  {
    body: "From Chablis to Cyprus, the range is tight, considered and refreshingly honest. Our list improved overnight.",
    author: "Costas Demetriou",
    role: "Restaurant Owner, Nicosia",
  },
  {
    body: "The kind of importer who actually drinks the wines. You can taste it in every recommendation.",
    author: "Helen Pavlou",
    role: "Private collector, Paphos",
  },
];

export default function Testimonials() {
  return (
    <section className="section-ink py-16 lg:py-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-bronze">
            From the trade
          </p>
          <h2 className="font-serif text-paper text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] mt-4 sm:mt-6">
            Loved by sommeliers,<br />
            <span className="italic text-bronze">collectors</span> & cellars.
          </h2>
          <div className="h-px w-12 bg-bronze mt-4 sm:mt-5" />
        </div>

        {/* Desktop: 3-col grid. Mobile: horizontal swipe carousel with
            snap so each quote settles into the centre. */}
        <div
          className="mt-10 lg:mt-14
                     flex md:grid md:grid-cols-3 md:gap-px md:bg-paper/10
                     overflow-x-auto md:overflow-visible
                     snap-x snap-mandatory md:snap-none
                     gap-4 md:gap-0
                     -mx-4 px-4 md:mx-0 md:px-0
                     pb-2 md:pb-0"
        >
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-ink p-7 sm:p-9 lg:p-10
                         min-w-[82%] sm:min-w-[60%] md:min-w-0
                         snap-center md:snap-align-none
                         border md:border-0 border-paper/15"
            >
              <Quote className="w-6 h-6 lg:w-7 lg:h-7 text-bronze" strokeWidth={1} />
              <blockquote className="font-serif italic text-paper text-base sm:text-lg lg:text-xl leading-relaxed mt-4 lg:mt-6">
                "{q.body}"
              </blockquote>
              <figcaption className="mt-6 lg:mt-8">
                <p className="text-paper text-sm font-sans">{q.author}</p>
                <p className="text-paper/60 text-xs uppercase tracking-[0.22em] font-sans mt-1">
                  {q.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
