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
        <p className="eyebrow">About Vinfolio</p>
        <h1 className="heading-serif text-5xl md:text-6xl mt-2">
          Strong partnerships<br />
          <span className="italic text-bronze">build stronger companies</span>
        </h1>
        <div className="rule" />
        <p className="text-ink/90 text-lg leading-relaxed mt-4">
          Vinfolio is a Cypriot wine import company founded with the vision of
          bringing carefully curated fine wines from renowned wineries
          worldwide to Cyprus — wines with character, quality, and a compelling
          story to tell.
        </p>
        <blockquote className="mt-8 border-l-2 border-bronze pl-5 bg-chalk py-4">
          <p className="font-serif italic text-ink text-xl">
            "Great wine works wonders and is itself one."
          </p>
          <footer className="text-sm text-muted mt-2">— Edward Steinberg</footer>
        </blockquote>
      </header>

      {/*
        CHANGE 7 — Our Story
        • Full-width pull heading spans the section (above the columns)
        • 55/45 photo|text column ratio on desktop (was 40/60)
        • Photo container ~30% taller (aspect changed from 4/5 to 3/4
          and max-h bumped)
        • Founder caption directly below the photo
      */}
      <section className="mt-20" id="our-story">
        <Reveal>
          <p className="eyebrow">Our Story</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] text-ink leading-[1.05] mt-3 mb-10">
            Twenty-five years in wine —{" "}
            <span className="italic text-bronze">distilled into one Cypriot cellar.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[55fr_45fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden bg-chalk
                              max-h-[820px]">
                <Image
                  src="https://vinfolio.com.cy/wp-content/uploads/elementor/thumbs/About-Us-rd4uusj3pa0jrzs14muo5w9tnlwrlmhhs8zztt40ks.jpg"
                  alt="Yiannakis Aristidou, founder of Vinfolio"
                  fill
                  sizes="(max-width:1024px) 100vw, 55vw"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.08em] text-muted font-sans">
                Yiannakis Aristidou · Founder & Curator
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-ink/85 leading-relaxed pr-0 lg:pr-0">
              <p>
                Vinfolio was founded by{" "}
                <span className="font-serif italic text-bronze">
                  Yiannakis Aristidou
                </span>
                , bringing over <span className="text-bronze">25 years</span>{" "}
                of professional experience in the wine and beverage sector to
                Cyprus.
              </p>
              <p>
                The company was built on principles of{" "}
                <em className="text-ink">trust, collaboration, and respect</em>{" "}
                for clients and partners — values that shape every relationship
                we form with growers and customers alike.
              </p>
              <p>
                To us, wine is more than a commodity. It represents{" "}
                <span className="font-serif italic text-bronze">
                  culture, experience, and a way of life
                </span>
                . Each bottle in our portfolio reflects our philosophy of
                balancing tradition, taste, and authenticity.
              </p>
              <div className="card-paper p-5">
                <p className="eyebrow">Contact the founder</p>
                <p className="mt-2 text-ink">
                  <a href="tel:+35799571267" className="link-bronze">
                    +357 99 571267
                  </a>{" "}
                  ·{" "}
                  <a
                    href="mailto:vinfoliowines@gmail.com"
                    className="link-bronze"
                  >
                    vinfoliowines@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <p className="eyebrow">Mission</p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-ink mt-3">
            What we do, every day.
          </h2>
          <div className="rule" />
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
              <div key={m.title} className="card-paper p-6">
                <h3 className="font-serif text-2xl text-wine">{m.title}</h3>
                <p className="text-ink/85 mt-2">{m.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-20">
        <Reveal>
          <p className="eyebrow">Partners</p>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-ink mt-3">
            Our Wineries.
          </h2>
          <div className="rule" />
          <p className="text-muted mt-2">
            A short list of partner houses — from family estates to
            award-winning New World pioneers.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {wineries.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.03}>
              <div className="card-paper p-4 text-center">
                <p className="text-xl">{COUNTRY_FLAGS[w.country]}</p>
                <p className="font-serif text-sm text-ink mt-1">{w.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted mt-0.5">
                  {w.country}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/wineries" className="btn-chalk">
            Read more about each winery
          </Link>
        </div>
      </section>
    </div>
  );
}
