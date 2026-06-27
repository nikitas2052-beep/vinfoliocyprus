"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { Wine } from "@/lib/types";
import { COUNTRY_FLAGS, cn } from "@/lib/utils";
import { useCart } from "@/lib/store";
import WineCard from "@/components/WineCard";
import BottleSilhouette, { isPlaceholderImage } from "./BottleSilhouette";

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
  const sizeOptions = [wine.sizeMl, ...(wine.sizesMl ?? [])];
  const [size, setSize] = useState(wine.sizeMl);
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const sizeLabel = (ml: number) =>
    ml >= 1000 ? `${ml / 1000} L` : `${ml} ml`;

  const onAdd = () => {
    addItem(wine.id, qty, size);
    toast.success(`${qty} × ${wine.name} (${sizeLabel(size)}) added to your request`, {
      action: { label: "View request", onClick: () => openCart() },
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
          className="relative aspect-[3/4] bottle-bg rounded-sm overflow-hidden border border-line shadow-card-soft"
        >
          {isPlaceholderImage(wine.image) ? (
            <BottleSilhouette wine={wine} />
          ) : (
            <Image
              src={wine.image}
              alt={wine.name}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-contain p-8 mix-blend-multiply brightness-110"
            />
          )}
          <div className="absolute top-4 right-4 wine-seal !w-14 !h-14 !text-base">
            {wine.year ?? "V"}
          </div>
        </motion.div>

        <div>
          <p className="eyebrow">{wine.winery}</p>
          <h1 className="heading-serif text-4xl md:text-5xl mt-2">
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

          <p className="text-cream/90 mt-5 text-lg leading-relaxed">
            {wine.shortDescription}
          </p>

          <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Spec
              label="Size"
              value={
                sizeOptions.length > 1
                  ? sizeOptions.map(sizeLabel).join(" / ")
                  : sizeLabel(wine.sizeMl)
              }
            />
            <Spec label="Alcohol" value={`${wine.alcohol}%`} />
            <Spec label="Type" value={wine.type} />
            <Spec
              label="Stock"
              value={wine.stock > 5 ? "In stock" : `${wine.stock} left`}
            />
          </dl>

          <div className="mt-8 card-surface p-5 bg-chalk">
            <p className="font-serif text-2xl text-bronze">
              Request a personalised offer
            </p>
            <p className="text-xs text-muted mt-1">
              Choose your quantity and add it to your request, no payment now.
            </p>

            {sizeOptions.length > 1 && (
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-bronze mb-2">
                  Bottle size
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((ml) => (
                    <button
                      key={ml}
                      onClick={() => setSize(ml)}
                      className={cn(
                        "px-4 py-2 text-sm rounded-sm border transition-colors",
                        size === ml
                          ? "bg-ink text-paper border-ink"
                          : "border-line text-ink/80 bg-surface hover:border-ink",
                      )}
                    >
                      {sizeLabel(ml)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-line rounded-sm bg-surface">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                  className="p-2.5 hover:bg-chalk text-burgundy"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium text-ink">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(wine.stock, q + 1))}
                  aria-label="Increase"
                  className="p-2.5 hover:bg-chalk text-burgundy"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={onAdd} className="btn-gold flex-1 min-w-[200px]">
                <ShoppingBag className="w-4 h-4" />
                Add to request
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex gap-1 border-b border-line">
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
                      ? "text-burgundy"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {label}
                  {tab === key && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-bronze"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="py-5 text-cream/90 leading-relaxed whitespace-pre-line min-h-[140px]">
              {tab === "description" && wine.description}
              {tab === "pairing" && (
                <>
                  <p className="text-bronze font-serif italic mb-2">
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
          <h2 className="heading-serif text-3xl">You may also like</h2>
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
    <div className="rounded-sm border border-line bg-surface/60 backdrop-blur-sm p-3">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-bronze">
        {label}
      </dt>
      <dd className="font-serif text-lg text-ink mt-1">{value}</dd>
    </div>
  );
}
