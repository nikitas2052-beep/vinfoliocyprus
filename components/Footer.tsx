"use client";

import Link from "next/link";
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
    <footer className="mt-24 bg-gradient-to-b from-ink to-burgundy-900/40 border-t border-burgundy-700/40">
      <div className="container-wide py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-2xl tracking-[0.25em] text-cream">
            VINFOLIO
          </h3>
          <p className="font-serif italic text-gold mt-2">Wine Enthusiasts</p>
          <p className="text-muted text-sm mt-4 max-w-xs">
            Importer & distributor of fine wines in Cyprus. Curating the great
            regions of the world for the Cypriot table.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="https://www.instagram.com/vinfolio_wines"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-sm border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:vinfoliowines@gmail.com"
              aria-label="Email"
              className="p-2.5 rounded-sm border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+35799571267"
              aria-label="Phone"
              className="p-2.5 rounded-sm border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-gold mb-4">
            Shop
          </h4>
          <ul className="space-y-2 text-cream/80">
            <li><Link href="/products" className="hover:text-gold transition-colors">All Wines</Link></li>
            <li><Link href="/products?type=Red" className="hover:text-gold transition-colors">Red Wines</Link></li>
            <li><Link href="/products?type=White" className="hover:text-gold transition-colors">White Wines</Link></li>
            <li><Link href="/products?type=Ros%C3%A9" className="hover:text-gold transition-colors">Rosé</Link></li>
            <li><Link href="/products?type=Sparkling" className="hover:text-gold transition-colors">Sparkling</Link></li>
            <li><Link href="/wineries" className="hover:text-gold transition-colors">Wineries</Link></li>
            <li><Link href="/wholesale" className="hover:text-gold transition-colors">Wholesale</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-gold mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-cream/80">
            <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            <li><Link href="/wholesale" className="hover:text-gold transition-colors">B2B Inquiry</Link></li>
            <li><span className="text-cream/50">Terms (coming soon)</span></li>
            <li><span className="text-cream/50">Privacy (coming soon)</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-gold mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-cream/80 text-sm">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-gold/70" /><span>Kato Polemidia, Limassol, Cyprus</span></li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-gold/70" /><a href="tel:+35799571267" className="hover:text-gold">+357 99 571267</a></li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-gold/70" /><a href="mailto:vinfoliowines@gmail.com" className="hover:text-gold break-all">vinfoliowines@gmail.com</a></li>
          </ul>

          <form onSubmit={onSubscribe} className="mt-6">
            <label className="text-xs uppercase tracking-[0.2em] text-gold">
              Newsletter
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field flex-1"
                required
              />
              <button type="submit" className="btn-gold !px-4 !py-2.5">
                Join
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-burgundy-700/40 py-6">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted">
          <p>© {new Date().getFullYear()} Vinfolio Ltd · All rights reserved.</p>
          <p className="font-serif italic text-gold/80">
            Drink responsibly. 18+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}
