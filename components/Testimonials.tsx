"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const QUOTES = [
  {
    body: "Vinfolio's curation reads like a love letter to terroir — every bottle has a name, a face, a vineyard behind it.",
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
    <section className="section-ink py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-bronze">From the trade</p>
          <h2 className="font-serif text-paper text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] mt-6">
            Loved by sommeliers,<br />
            <span className="italic text-bronze">collectors</span> & cellars.
          </h2>
          <div className="h-px w-12 bg-bronze mt-5" />
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-paper/10 mt-14">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-ink p-10"
            >
              <Quote className="w-7 h-7 text-bronze" strokeWidth={1} />
              <blockquote className="font-serif italic text-paper text-xl leading-relaxed mt-6">
                "{q.body}"
              </blockquote>
              <figcaption className="mt-8">
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
