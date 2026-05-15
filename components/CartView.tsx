"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/store";
import { getWineById } from "@/lib/wines";
import { VAT_RATE, formatPrice } from "@/lib/utils";

export default function CartView() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const hydrated = useCart((s) => s.hydrated);
  const clearCart = useCart((s) => s.clearCart);

  const lines = items
    .map((i) => ({ item: i, wine: getWineById(i.wineId) }))
    .filter((l): l is { item: typeof l.item; wine: NonNullable<typeof l.wine> } => Boolean(l.wine));

  const subtotal = lines.reduce(
    (sum, { item, wine }) => sum + wine.price * item.quantity,
    0,
  );
  const vat = +(subtotal * VAT_RATE).toFixed(2);
  const shipping = subtotal === 0 ? 0 : subtotal >= 60 ? 0 : 4.5;
  const total = +(subtotal + vat + shipping).toFixed(2);

  if (!hydrated) {
    return (
      <div className="container-wide py-20">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-wide py-20">
        <div className="card-surface p-12 text-center max-w-xl mx-auto">
          <div className="flex justify-center">
            <div className="wine-seal !w-20 !h-20 text-3xl">V</div>
          </div>
          <h1 className="heading-serif text-4xl mt-6">Your cart is empty</h1>
          <p className="text-muted mt-3">
            Discover wines from Cyprus, Greece, Italy, France, Chile and more.
          </p>
          <Link href="/products" className="btn-gold mt-8 inline-flex">
            <ShoppingBag className="w-4 h-4" /> Browse the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-12">
      <h1 className="heading-serif text-4xl md:text-5xl">Your Cart</h1>
      <div className="gold-divider" />

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-4">
          {lines.map(({ item, wine }) => (
            <div
              key={wine.id}
              className="card-surface p-4 flex gap-4 items-start"
            >
              <Link
                href={`/products/${wine.id}`}
                className="relative w-24 h-32 flex-shrink-0 bg-gradient-to-b from-burgundy-900/40 to-ink rounded-sm overflow-hidden"
              >
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  sizes="96px"
                  className="object-contain p-1.5"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="eyebrow !text-[10px]">
                  {wine.winery}
                </p>
                <Link
                  href={`/products/${wine.id}`}
                  className="font-serif text-xl text-ink hover:text-burgundy transition-colors block"
                >
                  {wine.name}
                </Link>
                <p className="text-xs text-muted mt-1">
                  {wine.country} · {wine.region} ·{" "}
                  {wine.sizeMl >= 1000 ? `${wine.sizeMl / 1000} L` : `${wine.sizeMl} ml`}
                </p>
                <div className="mt-4 flex items-center gap-4 flex-wrap">
                  <div className="inline-flex items-center border border-line rounded-sm bg-ink/50">
                    <button
                      onClick={() => updateQuantity(wine.id, item.quantity - 1)}
                      aria-label="Decrease"
                      className="p-2 hover:bg-chalk text-burgundy"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(wine.id, item.quantity + 1)}
                      aria-label="Increase"
                      className="p-2 hover:bg-chalk text-burgundy"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(wine.id);
                      toast("Removed", { description: wine.name });
                    }}
                    className="inline-flex items-center gap-1 text-sm text-muted hover:text-seal transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
              <p className="font-serif text-xl text-burgundy whitespace-nowrap">
                {formatPrice(wine.price * item.quantity)}
              </p>
            </div>
          ))}

          <button
            onClick={() => {
              clearCart();
              toast("Cart cleared");
            }}
            className="text-sm text-muted hover:text-seal transition-colors"
          >
            Clear cart
          </button>
        </div>

        <aside className="card-surface p-6 h-fit lg:sticky lg:top-24 bg-chalk">
          <h2 className="font-serif text-2xl text-ink">Order Summary</h2>
          <div className="gold-divider" />
          <dl className="space-y-3 mt-4 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label={`VAT (${Math.round(VAT_RATE * 100)}%)`} value={formatPrice(vat)} />
            <Row
              label="Shipping"
              value={shipping === 0 ? "Free" : formatPrice(shipping)}
              hint={subtotal < 60 ? `Free over ${formatPrice(60)}` : undefined}
            />
            <div className="border-t border-line pt-3 flex items-baseline justify-between">
              <dt className="font-serif text-lg text-ink">Total</dt>
              <dd className="font-serif text-2xl text-burgundy">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button
            onClick={() => toast("Checkout coming soon — contact us to complete the order.")}
            className="btn-gold w-full mt-6"
          >
            Proceed to Checkout
          </button>
          <Link
            href="/products"
            className="block text-center text-sm text-muted hover:text-burgundy mt-3"
          >
            ← Continue shopping
          </Link>
          <p className="text-xs text-muted mt-6">
            Secure checkout coming soon. To complete an order today, contact us at{" "}
            <a href="tel:+35799571267" className="link-gold">+357 99 571267</a>.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted">
        {label}
        {hint && <span className="block text-xs text-muted/70">{hint}</span>}
      </dt>
      <dd className="text-ink font-medium">{value}</dd>
    </div>
  );
}
