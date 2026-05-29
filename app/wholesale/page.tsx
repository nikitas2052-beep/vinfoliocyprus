import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Wholesale & B2B",
  description:
    "Vinfolio's wholesale & B2B program for restaurants, hotels and retailers across Cyprus.",
};

const BENEFITS = [
  "Hand-picked international and Cypriot portfolio",
  "Volume pricing for restaurants, hotels & retailers",
  "Dedicated account manager",
  "Free delivery across Cyprus on qualifying orders",
  "Staff wine training & tastings on request",
  "Custom selection for wine lists",
];

export default function WholesalePage() {
  return (
    <div className="container-wide py-12">
      <header className="max-w-3xl">
        <p className="eyebrow">B2B</p>
        <h1 className="heading-serif text-5xl md:text-6xl mt-2">
          Wholesale & <span className="italic text-bronze">Trade</span>
        </h1>
        <div className="gold-divider" />
        <p className="text-ink/85 text-lg leading-relaxed mt-4">
          Vinfolio supplies restaurants, hotels, wine bars and independent
          retailers across Cyprus. Our portfolio bridges classical European
          regions with awarded New World producers, built for serious wine
          programs.
        </p>
      </header>

      <section className="grid lg:grid-cols-2 gap-10 mt-14">
        <div>
          <h2 className="heading-serif text-3xl text-ink">What we offer</h2>
          <div className="gold-divider" />
          <ul className="mt-4 space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-ink/85">
                <CheckCircle2 className="w-5 h-5 text-bronze flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-8">
          <h2 className="font-serif text-2xl text-ink">Request our trade list</h2>
          <p className="text-muted mt-2">
            Full B2B portfolio and pricing on request. Reach out to discuss
            your venue's needs.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href="tel:+35799571267"
              className="btn-gold w-full"
            >
              <Phone className="w-4 h-4" /> +357 99 571267
            </a>
            <a
              href="mailto:vinfoliowines@gmail.com?subject=Wholesale%20Inquiry"
              className="btn-ghost w-full"
            >
              <Mail className="w-4 h-4" /> vinfoliowines@gmail.com
            </a>
            <Link href="/contact" className="block text-center text-sm text-burgundy hover:underline pt-2">
              Or use our contact form →
            </Link>
          </div>
          <p className="text-xs text-muted mt-6 leading-relaxed">
            Online B2B ordering portal coming soon. In the meantime, please
            contact us directly for trade enquiries.
          </p>
        </div>
      </section>

      <section className="mt-20 card-surface p-8 md:p-12 text-center bg-chalk">
        <p className="font-serif italic text-bronze text-xl">"Wine Enthusiasts"</p>
        <p className="font-serif text-3xl md:text-4xl text-ink mt-2 max-w-3xl mx-auto">
          The same care we put in our personal cellar, extended to your
          restaurant, hotel or shop.
        </p>
        <p className="text-muted mt-4">— Yiannakis Aristidou, founder</p>
      </section>
    </div>
  );
}
