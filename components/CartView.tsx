"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Wine as WineIcon, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/store";
import { getWineById } from "@/lib/wines";

export default function CartView() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const hydrated = useCart((s) => s.hydrated);
  const clearCart = useCart((s) => s.clearCart);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const lines = items
    .map((i) => ({ item: i, wine: getWineById(i.wineId) }))
    .filter(
      (l): l is { item: typeof l.item; wine: NonNullable<typeof l.wine> } =>
        Boolean(l.wine),
    );

  const onField =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/request-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: lines.map(({ item, wine }) => ({
            name: wine.name,
            winery: wine.winery,
            vintage: wine.year,
            size:
              wine.sizeMl >= 1000
                ? `${wine.sizeMl / 1000} L`
                : `${wine.sizeMl} ml`,
            quantity: item.quantity,
          })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      clearCart();
      setDone(true);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not send your request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="container-wide py-20">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="container-wide py-20">
        <div className="card-surface p-12 text-center max-w-xl mx-auto">
          <div className="flex justify-center text-bronze">
            <CheckCircle2 className="w-14 h-14" strokeWidth={1.25} />
          </div>
          <h1 className="heading-serif text-4xl mt-6">Request sent</h1>
          <p className="text-muted mt-3">
            Thank you. We&apos;ve received your selection and will get back to
            you shortly with a personalised offer.
          </p>
          <Link href="/products" className="btn-gold mt-8 inline-flex">
            Back to the collection
          </Link>
        </div>
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
          <h1 className="heading-serif text-4xl mt-6">Your selection is empty</h1>
          <p className="text-muted mt-3">
            Add the wines you&apos;re interested in and request a personalised
            offer.
          </p>
          <Link href="/products" className="btn-gold mt-8 inline-flex">
            <WineIcon className="w-4 h-4" /> Browse the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-12">
      <p className="eyebrow">No commitment</p>
      <h1 className="heading-serif text-4xl md:text-5xl mt-2">
        Request an Offer
      </h1>
      <div className="gold-divider" />
      <p className="text-muted mt-2 max-w-2xl">
        Choose the wines you&apos;re interested in and leave your details. We&apos;ll
        reply with a tailored quote, no payment needed now.
      </p>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* Selected wines */}
        <div className="lg:col-span-2 space-y-4">
          {lines.map(({ item, wine }) => (
            <div
              key={wine.id}
              className="card-surface p-4 flex gap-4 items-start"
            >
              <Link
                href={`/products/${wine.id}`}
                className="relative w-24 h-32 flex-shrink-0 bottle-bg rounded-sm overflow-hidden"
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
                <p className="eyebrow !text-[10px]">{wine.winery}</p>
                <Link
                  href={`/products/${wine.id}`}
                  className="font-serif text-xl text-ink hover:text-bronze transition-colors block"
                >
                  {wine.name}
                </Link>
                <p className="text-xs text-muted mt-1">
                  {wine.country} · {wine.region} ·{" "}
                  {wine.sizeMl >= 1000
                    ? `${wine.sizeMl / 1000} L`
                    : `${wine.sizeMl} ml`}
                </p>
                <div className="mt-4 flex items-center gap-4 flex-wrap">
                  <div className="inline-flex items-center border border-line rounded-sm">
                    <button
                      onClick={() => updateQuantity(wine.id, item.quantity - 1)}
                      aria-label="Decrease"
                      className="p-2 hover:bg-chalk text-bronze"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(wine.id, item.quantity + 1)}
                      aria-label="Increase"
                      className="p-2 hover:bg-chalk text-bronze"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(wine.id);
                      toast("Removed", { description: wine.name });
                    }}
                    className="inline-flex items-center gap-1 text-sm text-muted hover:text-wine transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              clearCart();
              toast("Selection cleared");
            }}
            className="text-sm text-muted hover:text-wine transition-colors"
          >
            Clear selection
          </button>
        </div>

        {/* Request form */}
        <aside className="card-surface p-6 h-fit lg:sticky lg:top-24 bg-chalk">
          <h2 className="font-serif text-2xl text-ink">Your details</h2>
          <div className="gold-divider" />
          <form onSubmit={submit} className="space-y-3 mt-4">
            <input
              className="input-field"
              placeholder="Full name *"
              value={form.name}
              onChange={onField("name")}
              required
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={onField("email")}
              required
            />
            <input
              className="input-field"
              placeholder="Phone"
              value={form.phone}
              onChange={onField("phone")}
            />
            <input
              className="input-field"
              placeholder="Company (optional)"
              value={form.company}
              onChange={onField("company")}
            />
            <textarea
              className="input-field min-h-[96px] resize-y"
              placeholder="Notes (delivery area, occasion, questions…)"
              value={form.message}
              onChange={onField("message")}
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending…" : "Request offer"}
            </button>
          </form>
          <Link
            href="/products"
            className="block text-center text-sm text-muted hover:text-bronze mt-3"
          >
            ← Continue browsing
          </Link>
          <p className="text-xs text-muted mt-6">
            Prefer to talk? Call us at{" "}
            <a href="tel:+35799571267" className="link-gold">
              +357 99 571267
            </a>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
