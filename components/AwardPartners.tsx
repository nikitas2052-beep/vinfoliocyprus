"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LogosMarquee from "./LogosMarquee";

/**
 * AwardPartners — the first content section after the hero video.
 * Houses the infinite logos marquee. Replaces the old PartnersWall +
 * "A partner not a middleman" sections.
 */
export default function AwardPartners() {
  return (
    <section className="pt-24 lg:pt-32 pb-20 lg:pb-24 container-wide">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="eyebrow">Award Partners</p>
        <h2 className="h-hero mt-6">
          17 Wineries.{" "}
          <span className="italic text-bronze">One Seller.</span>
        </h2>
        <div className="h-px w-12 bg-ink/80 mx-auto my-5" />
        <p className="text-ink/75">
          A handpicked roster of family estates, historic houses and modern
          icons — including Ventisquero,
          <span className="italic"> New World Winery of the Year 2024</span>.
        </p>
      </motion.div>

      <div className="mt-12">
        <LogosMarquee />
      </div>

      <div className="mt-12 text-center">
        <Link href="/wineries" className="btn-chalk">
          Meet every winery
        </Link>
      </div>
    </section>
  );
}
