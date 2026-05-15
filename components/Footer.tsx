"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you — you're on the Vinfolio list.");
    setEmail("");
  };

  return (
    <footer className="section-ink mt-24">
      <div className="container-wide pt-20 pb-12 grid gap-12 lg:grid-cols-12">
        {/* Brand block */}
        <div className="lg:col-span-4">
          <Image
            src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
            alt="Vinfolio"
            width={220}
            height={64}
            className="h-14 w-auto object-contain brightness-0 invert"
          />
          <p className="font-serif italic text-bronze mt-5 text-lg">
            Strong partnerships build stronger companies.
          </p>
          <p className="text-paper/70 text-sm mt-5 max-w-sm">
            Vinfolio Ltd is a Cypriot fine-wine importer & distributor based in
            Kato Polemidia, Limassol — curating wines with character from the
            great regions of the world.
          </p>
          <div className="flex gap-3 mt-7">
            <a
              href="https://www.instagram.com/vinfolio_wines"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 border border-paper/25 text-paper hover:bg-paper hover:text-ink transition-colors"
            >
              <Instagram className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="mailto:vinfoliowines@gmail.com"
              aria-label="Email"
              className="p-2.5 border border-paper/25 text-paper hover:bg-paper hover:text-ink transition-colors"
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="tel:+35799571267"
              aria-label="Phone"
              className="p-2.5 border border-paper/25 text-paper hover:bg-paper hover:text-ink transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div className="lg:col-span-2">
          <h4 className="text-[11px] uppercase tracking-[0.28em] text-bronze mb-5">Shop</h4>
          <ul className="space-y-3 text-paper/80 text-sm font-sans">
            <li><Link href="/products" className="hover:text-paper transition-colors">All Wines</Link></li>
            <li><Link href="/products?type=Red" className="hover:text-paper transition-colors">Red</Link></li>
            <li><Link href="/products?type=White" className="hover:text-paper transition-colors">White</Link></li>
            <li><Link href="/products?type=Ros%C3%A9" className="hover:text-paper transition-colors">Rosé</Link></li>
            <li><Link href="/products?type=Sparkling" className="hover:text-paper transition-colors">Sparkling</Link></li>
            <li><Link href="/wineries" className="hover:text-paper transition-colors">Wineries</Link></li>
          </ul>
        </div>

        {/* Company links */}
        <div className="lg:col-span-2">
          <h4 className="text-[11px] uppercase tracking-[0.28em] text-bronze mb-5">Company</h4>
          <ul className="space-y-3 text-paper/80 text-sm font-sans">
            <li><Link href="/about" className="hover:text-paper transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-paper transition-colors">Contact</Link></li>
            <li><Link href="/wholesale" className="hover:text-paper transition-colors">Trade</Link></li>
            <li><span className="text-paper/40">Terms</span></li>
            <li><span className="text-paper/40">Privacy</span></li>
          </ul>
        </div>

        {/* Visit + newsletter */}
        <div className="lg:col-span-4">
          <h4 className="text-[11px] uppercase tracking-[0.28em] text-bronze mb-5">Visit</h4>
          <ul className="space-y-3 text-paper/80 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-bronze flex-shrink-0" strokeWidth={1.5} />
              <span>Kato Polemidia, Limassol, Cyprus</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="w-4 h-4 mt-0.5 text-bronze flex-shrink-0" strokeWidth={1.5} />
              <a href="tel:+35799571267" className="hover:text-paper">+357 99 571267</a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="w-4 h-4 mt-0.5 text-bronze flex-shrink-0" strokeWidth={1.5} />
              <a href="mailto:vinfoliowines@gmail.com" className="hover:text-paper break-all">
                vinfoliowines@gmail.com
              </a>
            </li>
          </ul>

          <form onSubmit={onSubscribe} className="mt-7">
            <label className="text-[11px] uppercase tracking-[0.28em] text-bronze">
              Stay in the cellar
            </label>
            <div className="mt-2 flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-paper/40 px-0 py-2.5 text-paper placeholder:text-paper/40 focus:outline-none focus:border-bronze transition-colors"
                required
              />
              <button
                type="submit"
                className="px-5 text-paper hover:text-bronze transition-colors text-[12px] uppercase tracking-[0.18em] border-b border-paper/40"
              >
                Join →
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-sans text-paper/60">
          <p>© {new Date().getFullYear()} Vinfolio Ltd · All rights reserved.</p>
          <p className="italic font-serif text-paper/80">
            Drink responsibly. 18+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}
