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
          Strong partnerships<br />
          <span className="italic text-gold">build stronger companies</span>
        </h1>
        <div className="gold-divider" />
        <p className="text-cream/85 text-lg leading-relaxed mt-4">
          Vinfolio is a Cypriot wine import company founded with the vision of
          bringing carefully curated fine wines from renowned wineries worldwide
          to Cyprus — wines with character, quality, and a compelling story to tell.
        </p>
        <blockquote className="mt-8 border-l-2 border-gold pl-5">
          <p className="font-serif italic text-cream/90 text-xl">
            "Great wine works wonders and is itself one."
          </p>
          <footer className="text-sm text-muted mt-2">— Edward Steinberg</footer>
        </blockquote>
      </header>

      <section className="grid lg:grid-cols-5 gap-10 mt-16 items-start">
        <Reveal>
          <div className="lg:col-span-2 relative aspect-[4/5] rounded-sm overflow-hidden border border-burgundy-700/50">
            <Image
              src="https://vinfolio.com.cy/wp-content/uploads/elementor/thumbs/About-Us-rd4uusj3pa0jrzs14muo5w9tnlwrlmhhs8zztt40ks.jpg"
              alt="Vinfolio cellar"
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
              <span className="font-serif italic text-gold">Yiannakis Aristidou</span>,
              bringing over <span className="text-gold">25 years</span> of
              professional experience in the wine and beverage sector to Cyprus.
            </p>
            <p>
              The company was built on principles of <em className="text-cream">trust,
              collaboration, and respect</em> for clients and partners — values that
              shape every relationship we form with growers and customers alike.
            </p>
            <p>
              To us, wine is more than a commodity. It represents{" "}
              <span className="font-serif italic text-gold">
                culture, experience, and a way of life
              </span>
              . Each bottle in our portfolio reflects our philosophy of balancing
              tradition, taste, and authenticity.
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
