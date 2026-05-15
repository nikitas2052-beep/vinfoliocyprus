"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CARDS = [
  {
    title: "Bold Reds",
    text: "Amarone, Barolo, Brunello, Carménère.",
    href: "/products?type=Red",
    image:
      "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Crisp Whites",
    text: "Chablis, Sancerre, Assyrtiko, Xynisteri.",
    href: "/products?type=White",
    image:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "For the table",
    text: "Prosecco, rosé, sparkling — every occasion.",
    href: "/products?type=Sparkling",
    image:
      "https://images.unsplash.com/photo-1592912714073-bdc8b4dcb44a?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function WhereToStart() {
  return (
    <section className="py-24 lg:py-32 container-wide">
      <div className="max-w-2xl">
        <p className="eyebrow">Don't know where to start?</p>
        <h2 className="h-hero mt-6">
          A glass for <span className="italic text-bronze">every</span> table.
        </h2>
        <div className="rule" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={c.href}
              className="group block relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-serif text-paper text-3xl">{c.title}</h3>
                <p className="text-paper/80 text-sm mt-2">{c.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-paper text-xs uppercase tracking-[0.22em] border-b border-bronze pb-1 w-fit">
                  Shop now <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
