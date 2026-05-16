"use client";

import Link from "next/link";
import LogosMarquee from "./LogosMarquee";

/**
 * AwardPartners — first content section after the hero video.
 *
 * The eyebrow / headline / sub-copy for this section live in the hero
 * itself (HeroVideo's "Layer 3" overlay) — they fade in over the still-
 * playing sticky video as you scroll out of the hero. By the time the
 * user reaches this section, the introduction has already been read,
 * so here we go straight to the marquee + CTA.
 */
export default function AwardPartners() {
  return (
    <section className="pt-10 lg:pt-14 pb-24 lg:pb-28 container-wide">
      <LogosMarquee />

      <div className="mt-12 text-center">
        <Link href="/wineries" className="btn-chalk">
          Meet every winery
        </Link>
      </div>
    </section>
  );
}
