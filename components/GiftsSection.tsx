"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { getGiftWines } from "@/lib/wines";
import type { Wine } from "@/lib/types";
import BottleSilhouette, { isPlaceholderImage } from "./BottleSilhouette";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  variant?: "default" | "chalk";
}

/**
 * GiftsSection — reusable section that renders actual gift-tagged
 * products from the catalogue. Both "Don't Know Where to Start" and
 * "A Glass for Every Table" homepage slots use this component.
 *
 * If no gift-tagged wines exist, falls back to 3 "Coming Soon" cards.
 */
export default function GiftsSection({
  eyebrow,
  title,
  intro,
  variant = "default",
}: Props) {
  const gifts = getGiftWines(6);

  return (
    <section
      className={
        variant === "chalk"
          ? "section-chalk py-24 lg:py-32"
          : "py-24 lg:py-32"
      }
    >
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-hero mt-6">{title}</h2>
          <div className="rule" />
          {intro && <p className="text-ink/75 mt-1 max-w-xl">{intro}</p>}
        </div>

        <div className="grid grid-cols-3 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-12 mt-8 md:mt-12">
          {gifts.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))
            : gifts.slice(0, 6).map((w, i) => (
                <GiftCard key={w.id} wine={w} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}

function GiftCard({ wine, index }: { wine: Wine; index: number }) {
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="card-paper p-2 sm:p-4 md:p-5 flex flex-col h-full hover:-translate-y-1
                 hover:shadow-card transition-all duration-300"
    >
      <Link href={`/products/${wine.id}`} className="block">
        <div className="relative aspect-[5/6] bottle-bg overflow-hidden mb-2 md:mb-4">
          {isPlaceholderImage(wine.image) ? (
            <BottleSilhouette wine={wine} />
          ) : (
            <Image
              src={wine.image}
              alt={wine.name}
              fill
              sizes="(max-width:640px) 33vw, (max-width:1024px) 30vw, 360px"
              loading="lazy"
              className="object-contain p-2 md:p-4 transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.22em] text-muted font-sans truncate">
          {wine.country}
        </p>
        <h3 className="font-serif text-[13px] md:text-base font-semibold text-ink mt-0.5 md:mt-1 line-clamp-2 min-h-[2rem] md:min-h-0 leading-tight">
          {wine.name}
        </h3>
        <p className="hidden md:block text-sm text-muted font-sans line-clamp-2 mt-1 min-h-[2.5rem]">
          {wine.shortDescription}
        </p>
      </Link>
      <div className="mt-2 md:mt-4 flex items-end justify-between gap-1">
        <p className="font-serif text-sm md:text-base text-wine">
          {formatPrice(wine.price)}
        </p>
        <button
          onClick={onAdd}
          className="btn-chalk !px-2 md:!px-4 !py-1.5 md:!py-2 !text-[9px] md:!text-[11px]"
        >
          Shop
        </button>
      </div>
    </motion.article>
  );
}

function PlaceholderCard() {
  return (
    <div className="card-paper p-5 flex flex-col h-full">
      <div className="aspect-[5/6] bg-chalk mb-4 grid place-items-center">
        <span className="wine-seal">V</span>
      </div>
      <p className="eyebrow">Coming soon</p>
      <h3 className="font-serif text-base font-semibold text-ink mt-1">
        Gift selection
      </h3>
      <p className="text-sm text-muted font-sans mt-1 min-h-[2.5rem]">
        Curated gift boxes launching soon.
      </p>
    </div>
  );
}
