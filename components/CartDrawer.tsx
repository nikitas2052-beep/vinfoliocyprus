"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/store";
import { getWineById } from "@/lib/wines";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const items = useCart((s) => s.items);
  const closeCart = useCart((s) => s.closeCart);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const hydrated = useCart((s) => s.hydrated);

  const lineItems = items.map((item) => {
    const wine = getWineById(item.wineId);
    return { item, wine };
  });

  const subtotal = lineItems.reduce(
    (sum, { item, wine }) => sum + (wine ? wine.price * item.quantity : 0),
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[440px]
                       bg-surface border-l border-burgundy-700/50
                       flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between p-5 border-b border-burgundy-700/50">
              <h2 className="font-serif text-2xl text-cream flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 hover:bg-burgundy/20 rounded-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {!hydrated ? (
                <p className="text-muted text-sm">Loading…</p>
              ) : lineItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="wine-seal mb-4">V</div>
                  <p className="text-muted">Your cart is empty.</p>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="mt-6 btn-gold"
                  >
                    Browse wines
                  </Link>
                </div>
              ) : (
                lineItems.map(({ item, wine }) => {
                  if (!wine) return null;
                  return (
                    <div
                      key={item.wineId}
                      className="flex gap-4 pb-4 border-b border-burgundy-700/30"
                    >
                      <Link
                        href={`/products/${wine.id}`}
                        onClick={closeCart}
                        className="relative w-20 h-24 flex-shrink-0 bg-ink rounded-sm overflow-hidden"
                      >
                        <Image
                          src={wine.image}
                          alt={wine.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-wider text-gold/80">
                          {wine.winery}
                        </p>
                        <Link
                          href={`/products/${wine.id}`}
                          onClick={closeCart}
                          className="font-serif text-cream hover:text-gold transition-colors block truncate"
                        >
                          {wine.name}
                        </Link>
                        <p className="text-xs text-muted mt-0.5">
                          {wine.sizeMl >= 1000
                            ? `${wine.sizeMl / 1000} L`
                            : `${wine.sizeMl} ml`}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center border border-burgundy-700/50 rounded-sm">
                            <button
                              onClick={() =>
                                updateQuantity(item.wineId, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="p-1.5 hover:bg-burgundy/20"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.wineId, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="p-1.5 hover:bg-burgundy/20"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-serif text-gold">
                            {formatPrice(wine.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          removeItem(item.wineId);
                          toast("Removed from cart", { description: wine.name });
                        }}
                        aria-label="Remove"
                        className="self-start text-muted hover:text-seal transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {hydrated && lineItems.length > 0 && (
              <footer className="border-t border-burgundy-700/50 p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal (excl. VAT)</span>
                  <span className="text-cream">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-muted">
                  VAT and shipping calculated at checkout.
                </p>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn-gold w-full"
                >
                  View Cart & Checkout
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
