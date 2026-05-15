"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Wine } from "@/lib/types";
import { useCart } from "@/lib/store";
import { COUNTRY_FLAGS, cn, formatPrice } from "@/lib/utils";

function typeBadgeClass(t: Wine["type"]) {
  switch (t) {
    case "Red":
      return "badge-red";
    case "White":
      return "badge-white";
    case "Rosé":
      return "badge-rose";
    case "Sparkling":
    case "Sparkling Rosé":
      return "badge-sparkling";
  }
}

export default function WineCard({ wine, index = 0 }: { wine: Wine; index?: number }) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(wine.id, 1);
    toast.success(`${wine.name} added to cart`, {
      action: { label: "View cart", onClick: () => openCart() },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative"
    >
      <Link
        href={`/products/${wine.id}`}
        className="block card-surface overflow-hidden transition-all duration-300
                   hover:-translate-y-1 hover:border-gold/50
                   hover:shadow-[0_20px_40px_-20px_rgba(212,175,55,0.4)]"
      >
        <div className="relative aspect-[3/4] bg-gradient-to-b from-burgundy-900/50 via-ink to-ink overflow-hidden">
          <Image
            src={wine.image}
            alt={wine.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 33vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          <span className={cn("absolute top-3 left-3", typeBadgeClass(wine.type))}>
            {wine.type}
          </span>
          <span className="absolute top-3 right-3 text-lg" title={wine.country}>
            {COUNTRY_FLAGS[wine.country]}
          </span>
        </div>

        <div className="p-4 space-y-1.5">
          <p className="text-xs uppercase tracking-[0.18em] text-gold/80">
            {wine.winery}
          </p>
          <h3 className="font-serif text-lg leading-tight text-cream line-clamp-2 min-h-[3.25rem]">
            {wine.name}
          </h3>
          <p className="text-xs text-muted">
            {wine.region} · {wine.sizeMl >= 1000 ? `${wine.sizeMl / 1000} L` : `${wine.sizeMl} ml`}
          </p>
          <div className="flex items-end justify-between pt-2">
            <p className="font-serif text-xl text-gold">
              {formatPrice(wine.price)}
            </p>
            <button
              onClick={onAdd}
              className="opacity-0 group-hover:opacity-100 transition-all
                         inline-flex items-center gap-1.5 text-xs uppercase tracking-wider
                         px-3 py-2 bg-burgundy hover:bg-burgundy-400 text-cream rounded-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
