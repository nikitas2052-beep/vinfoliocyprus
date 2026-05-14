import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { wineries } from "@/lib/wineries";
import { COUNTRY_FLAGS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vinfolio Ltd — founded by Yiannakis Aristidou — is an importer and distributor of fine wines in Cyprus, based in Kato Polemidia, Limassol.",
};

export default function AboutPage() {
  return (
    <div className="container-wide py-12">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">About Vinfolio</p>
        <h1 className="heading-serif text-5xl md:text-6xl text-cream mt-2">
          Wine Enthusiasts —<br />
          <span className="italic text-gold">in spirit and in trade</span>
        </h1>
        <div className="gold-divider" />
        <p className="text-cream/85 text-lg leading-relaxed mt-4">
          Vinfolio Ltd is a Cypriot importer and distributor of fine wine.
          From our cellar in Kato Polemidia, Limassol, we supply restaurants,
          retailers and private enthusiasts across the island with a hand-picked
          portfolio of bottles from Cyprus and the great regions of the world.
        </p>
      </header>

      <section className="grid lg:grid-cols-5 gap-10 mt-16 items-start">
        <Reveal>
          <div className="lg:col-span-2 relative aspect-[4/5] rounded-sm overflow-hidden border border-burgundy-700/50">
            <Image
              src="https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1200&q=80"
              alt="Wine cellar"
              fill
              sizes="(max-width:1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="lg:col-span-3 space-y-5 text-cream/85 leading-relaxed">
            <h2 className="heading-serif text-3xl text-cream">The Founder</h2>
            <div className="gold-divider" />
            <p>
              Vinfolio was founded by{" "}
              <span className="font-serif italic text-gold">Yiannakis Aristidou</span> —
              a lifelong wine enthusiast who turned an obsession into a profession.
              Years of travel through the cellars of Tuscany, the Loire and the
              Andes shaped the portfolio you find here today.
            </p>
            <p>
              The brief is simple: bring to Cyprus the bottles we love drinking
              ourselves. Wines that express their place. Producers that respect
              their land. Estates whose work we can stand behind, every bottle.
            </p>
            <p>
              We believe in great wine at honest prices. From the everyday red on
              the Sunday table to the cellar-worthy Brunello, every label in our
              catalogue earns its place.
            </p>
            <div className="card-surface p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Contact the founder</p>
              <p className="mt-2">
                <a href="tel:+35799571267" className="link-gold">+357 99 571267</a> ·{" "}
                <a href="mailto:vinfoliowines@gmail.com" className="link-gold">
                  vinfoliowines@gmail.com
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-20">
        <Reveal>
          <h2 className="heading-serif text-3xl text-cream">Our Mission</h2>
          <div className="gold-divider" />
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {
                title: "Curate",
                text: "Source the most expressive bottles from family estates and emerging producers across continents.",
              },
              {
                title: "Educate",
                text: "Share the story behind each label — terroir, history, vinification — so every glass means more.",
              },
              {
                title: "Distribute",
                text: "Deliver consistent quality to Cypriot restaurants, retailers and private cellars, with care.",
              },
            ].map((m) => (
              <div key={m.title} className="card-surface p-6">
                <h3 className="font-serif text-2xl text-gold">{m.title}</h3>
                <p className="text-cream/80 mt-2">{m.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-20">
        <Reveal>
          <h2 className="heading-serif text-3xl text-cream">Our Wineries</h2>
          <div className="gold-divider" />
          <p className="text-muted mt-2">
            A short list of partner houses — from family estates to award-winning
            New World pioneers.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {wineries.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.03}>
              <div className="card-surface p-4 text-center">
                <p className="text-xl">{COUNTRY_FLAGS[w.country]}</p>
                <p className="font-serif text-sm text-cream mt-1">{w.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted mt-0.5">
                  {w.country}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/wineries" className="btn-ghost">
            Read more about each winery
          </Link>
        </div>
      </section>
    </div>
  );
}
