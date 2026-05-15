"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { Wine } from "@/lib/types";
import { COUNTRY_FLAGS, cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/store";
import WineCard from "@/components/WineCard";

type Tab = "description" | "pairing" | "producer";

export default function ProductDetail({
  wine,
  related,
}: {
  wine: Wine;
  related: Wine[];
}) {
  const [tab, setTab] = useState<Tab>("description");
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const onAdd = () => {
    addItem(wine.id, qty);
    toast.success(`${qty} × ${wine.name} added to cart`, {
      action: { label: "View cart", onClick: () => openCart() },
    });
  };

  return (
    <div className="container-wide py-10">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to collection
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[3/4] bg-gradient-to-b from-burgundy-900/40 via-ink to-ink rounded-sm overflow-hidden border border-burgundy-700/40"
        >
          <Image
            src={wine.image}
            alt={wine.name}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-contain p-8"
          />
          <div className="absolute top-4 right-4 wine-seal !w-14 !h-14 !text-base bg-ink/70 backdrop-blur-sm">
            {wine.year ?? "V"}
          </div>
        </motion.div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {wine.winery}
          </p>
          <h1 className="heading-serif text-4xl md:text-5xl text-cream mt-2">
            {wine.name}
          </h1>
          <div className="gold-divider" />

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted mt-4">
            <span>{COUNTRY_FLAGS[wine.country]} {wine.country}</span>
            <span>·</span>
            <span>{wine.region}</span>
            <span>·</span>
            <span>{wine.type}</span>
            {wine.year && (
              <>
                <span>·</span>
                <span>Vintage {wine.year}</span>
              </>
            )}
          </div>

          <p className="text-cream/85 mt-5 text-lg leading-relaxed">
            {wine.shortDescription}
          </p>

          <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Spec label="Size" value={wine.sizeMl >= 1000 ? `${wine.sizeMl / 1000} L` : `${wine.sizeMl} ml`} />
            <Spec label="Alcohol" value={`${wine.alcohol}%`} />
            <Spec label="Type" value={wine.type} />
            <Spec
              label="Stock"
              value={wine.stock > 5 ? "In stock" : `${wine.stock} left`}
            />
          </dl>

          <div className="mt-8 card-surface p-5">
            <div className="flex items-baseline gap-3">
              <p className="font-serif text-4xl text-gold">
                {formatPrice(wine.price)}
              </p>
              <p className="text-xs text-muted uppercase tracking-wider">
                excl. VAT
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-burgundy-700/50 rounded-sm">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                  className="p-2.5 hover:bg-burgundy/20"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(wine.stock, q + 1))}
                  aria-label="Increase"
                  className="p-2.5 hover:bg-burgundy/20"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={onAdd} className="btn-gold flex-1 min-w-[200px]">
                <ShoppingBag className="w-4 h-4" />
                Add to cart · {formatPrice(wine.price * qty)}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex gap-1 border-b border-burgundy-700/40">
              {(
                [
                  ["description", "Description"],
                  ["pairing", "Pairing"],
                  ["producer", "Producer"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={cn(
                    "px-4 py-3 text-sm uppercase tracking-wider transition-colors relative",
                    tab === key
                      ? "text-gold"
                      : "text-cream/60 hover:text-cream",
                  )}
                >
                  {label}
                  {tab === key && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-0 inset-x-0 h-px bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="py-5 text-cream/80 leading-relaxed whitespace-pre-line min-h-[140px]">
              {tab === "description" && wine.description}
              {tab === "pairing" && (
                <>
                  <p className="text-gold font-serif italic mb-2">
                    Pairs beautifully with
                  </p>
                  {wine.pairing}
                </>
              )}
              {tab === "producer" && wine.producerInfo}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="heading-serif text-3xl text-cream">You may also like</h2>
          <div className="gold-divider" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {related.map((w, i) => (
              <WineCard key={w.id} wine={w} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.2em] text-gold/70">
        {label}
      </dt>
      <dd className="font-serif text-lg text-cream mt-1">{value}</dd>
    </div>
  );
}
