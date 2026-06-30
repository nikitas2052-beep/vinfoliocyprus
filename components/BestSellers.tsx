"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { Wine } from "@/lib/types";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";
import { getFeaturedWines, wines as allWines } from "@/lib/wines";
import BottleSilhouette, { isPlaceholderImage } from "./BottleSilhouette";

/**
 * BestSellers — formerly "Featured Bottles".
 *  - exactly 6 bottles
 *  - 3×2 grid on desktop, 2 cols on tablet, 1 on mobile
 *  - 20% smaller cards, 25% reduced padding, 20% shorter bottle image
 *    vs. the standard WineCard
 */
export default function BestSellers() {
  // Reuse featured selection; if fewer than 6, pad from the full catalogue
  let list = getFeaturedWines().slice(0, 6);
  if (list.length < 6) {
    list = [
      ...list,
      ...allWines.filter((w) => !list.includes(w)).slice(0, 6 - list.length),
    ];
  }

  return (
    <section className="py-24 lg:py-32 container-wide">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <p className="eyebrow">Selection</p>
          <h2 className="h-hero mt-6">
            Best <span className="italic text-bronze">Sellers</span>.
          </h2>
          <div className="rule" />
          <p className="text-ink/75 mt-1">
            The six bottles our customers reach for most often, wines we're
            pouring ourselves, right now.
          </p>
        </div>
        <Link href="/products" className="btn-link group">
          View all {allWines.length} wines
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Always 3 columns — even on phones, so the 6 best-sellers fit
          as 3×2 instead of a single tower of 6 huge cards. */}
      <div className="grid grid-cols-3 gap-x-2 sm:gap-x-4 md:gap-x-5 gap-y-6 md:gap-y-10 max-w-[1050px] mx-auto">
        {list.map((w, i) => (
          <CompactWineCard key={w.id} wine={w} index={i} />
        ))}
      </div>
    </section>
  );
}

function typeColor(t: Wine["type"]): string {
  switch (t) {
    case "Red":
      return "border-wine-300 text-wine bg-wine-50";
    case "White":
      return "border-bronze-200 text-bronze-600 bg-bronze-50";
    case "Rosé":
      return "border-pink-300 text-pink-700 bg-pink-50";
    case "Sparkling":
    case "Sparkling Rosé":
      return "border-amber-300 text-amber-700 bg-amber-50";
  }
}

/**
 * Compact variant of WineCard:
 *  - max-w 80% (260px vs ~325px), p-3 (vs p-4 = ~25% less), aspect 5/6
 *    (vs 3/4, ~20% shorter image while keeping the same 3:4-ish feel)
 */
function CompactWineCard({ wine, index }: { wine: Wine; index: number }) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(wine.id, 1, wine.sizeMl);
    toast.success(`${wine.name} added to your request`, {
      action: { label: "View request", onClick: () => openCart() },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group w-full"
    >
      <Link href={`/products/${wine.id}`} className="block">
        <div className="relative aspect-[5/6] bottle-bg overflow-hidden">
          {isPlaceholderImage(wine.image) ? (
            <BottleSilhouette wine={wine} />
          ) : (
            <Image
              src={wine.image}
              alt={wine.name}
              fill
              sizes="(max-width:640px) 33vw, (max-width:1024px) 30vw, 260px"
              className="object-contain p-2 md:p-3 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
            />
          )}
          <span
            className={cn(
              "absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5 type-badge !text-[8px] md:!text-[10px] !px-1.5 md:!px-2",
              typeColor(wine.type),
            )}
          >
            {wine.type}
          </span>
          <button
            onClick={onAdd}
            aria-label={`Add ${wine.name} to cart`}
            className="absolute bottom-2.5 right-2.5 w-9 h-9 bg-ink text-paper
                       hidden md:flex items-center justify-center
                       opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                       transition-all duration-300 hover:bg-wine"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="pt-2 md:pt-3 space-y-0.5">
          <p className="text-[8px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.22em] text-muted font-sans truncate">
            {wine.country}
          </p>
          <h3 className="font-serif text-[13px] md:text-lg text-ink leading-tight line-clamp-2 min-h-[2.25rem] md:min-h-[2.75rem] group-hover:text-bronze transition-colors">
            {wine.name}
          </h3>
          <p className="font-serif text-sm md:text-base text-bronze pt-0.5">
            Request offer
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
