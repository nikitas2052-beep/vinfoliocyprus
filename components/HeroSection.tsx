"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[92vh] min-h-[600px] overflow-hidden -mt-20"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=2400&q=80"
          alt="Vineyard"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 hero-overlay" />

      <motion.div
        style={{ opacity }}
        className="relative h-full container-wide flex flex-col items-center justify-center text-center pt-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xs uppercase tracking-[0.4em] text-gold"
        >
          Vinfolio Ltd · Cyprus
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl text-cream mt-4 tracking-tight"
        >
          Wine{" "}
          <span className="italic text-gold relative">
            Enthusiasts
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -bottom-2 left-0 right-0 h-px bg-gold origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-cream/80 max-w-xl mt-6 font-light"
        >
          Importer & distributor of fine wines in Cyprus. Curating the great
          regions of the world — for the Cypriot table.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Link href="/products" className="btn-gold">
            Explore Collection
          </Link>
          <Link href="/wineries" className="btn-ghost">
            Our Wineries
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 text-gold/60"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
