"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Clock, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactView() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    toast.success("Message sent. We'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="container-wide py-12">
      <header className="max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="heading-serif text-5xl mt-2">Get in Touch</h1>
        <div className="gold-divider" />
        <p className="text-muted mt-3">
          Trade inquiries, retail orders, private events — we're happy to help.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <form onSubmit={onSubmit} className="lg:col-span-2 card-surface p-6 space-y-4">
          <h2 className="font-serif text-2xl text-ink">Send us a message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
          </div>
          <Field
            label="Phone (optional)"
            type="tel"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <div>
            <label className="eyebrow">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              required
              className="input-field mt-2"
              placeholder="Tell us how we can help…"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="btn-gold disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {busy ? "Sending…" : "Send message"}
          </button>
        </form>

        <aside className="space-y-6">
          <div className="card-surface p-6">
            <h2 className="font-serif text-2xl text-ink">Vinfolio Ltd</h2>
            <ul className="mt-4 space-y-3 text-cream/90">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" />
                <span>Kato Polemidia, Limassol, Cyprus</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" />
                <a href="tel:+35799571267" className="hover:text-burgundy">+357 99 571267</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:vinfoliowines@gmail.com"
                  className="hover:text-burgundy break-all"
                >
                  vinfoliowines@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <Instagram className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.instagram.com/vinfolio_wines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-burgundy"
                >
                  @vinfolio_wines
                </a>
              </li>
            </ul>
          </div>

          <div className="card-surface p-6">
            <h3 className="font-serif text-xl text-ink flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              Business Hours
            </h3>
            <dl className="mt-3 text-sm space-y-1 text-cream/90">
              <Hours day="Mon – Fri" hours="09:00 – 18:00" />
              <Hours day="Saturday" hours="09:00 – 14:00" />
              <Hours day="Sunday" hours="Closed" />
            </dl>
          </div>

          <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-burgundy-700/50">
            <iframe
              title="Kato Polemidia, Limassol"
              src="https://www.google.com/maps?q=Kato+Polemidia%2C+Limassol%2C+Cyprus&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "saturate(0.85) hue-rotate(-10deg)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="input-field mt-2"
      />
    </div>
  );
}

function Hours({ day, hours }: { day: string; hours: string }) {
  return (
    <div className="flex justify-between">
      <dt>{day}</dt>
      <dd className="text-muted">{hours}</dd>
    </div>
  );
}
