"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Wine } from "@/lib/types";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";
import BottleSilhouette, { isPlaceholderImage } from "./BottleSilhouette";

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

export default function WineCard({
  wine,
  index = 0,
}: {
  wine: Wine;
  index?: number;
}) {
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/products/${wine.id}`} className="block">
        {/* Bottle */}
        <div className="relative aspect-[3/4] bottle-bg overflow-hidden">
          {isPlaceholderImage(wine.image) ? (
            <BottleSilhouette wine={wine} />
          ) : (
            <Image
              src={wine.image}
              alt={wine.name}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 33vw, 25vw"
              className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply brightness-110"
            />
          )}
          <span
            className={cn(
              "absolute top-3 left-3 type-badge",
              typeColor(wine.type),
            )}
          >
            {wine.type}
          </span>
          <button
            onClick={onAdd}
            aria-label={`Add ${wine.name} to your request`}
            className="absolute bottom-3 right-3 w-10 h-10 bg-ink text-paper
                       flex items-center justify-center
                       opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                       transition-all duration-300
                       hover:bg-wine"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Caption */}
        <div className="pt-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-sans">
            {wine.country} · {wine.region}
          </p>
          <h3 className="font-serif text-xl text-ink leading-tight line-clamp-2 min-h-[3.25rem] group-hover:text-bronze transition-colors">
            {wine.name}
          </h3>
          <p className="text-sm text-muted font-sans">{wine.winery}</p>
          <p className="font-serif text-base text-bronze pt-1 flex items-center gap-1.5">
            Request offer
            <span className="text-[10px] text-muted uppercase tracking-wider font-sans">
              {wine.sizeMl >= 1000 ? `${wine.sizeMl / 1000}L` : `${wine.sizeMl}ml`}
            </span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
