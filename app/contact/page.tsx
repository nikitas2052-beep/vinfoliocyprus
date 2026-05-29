import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vinfolio Ltd, based in Kato Polemidia, Limassol, Cyprus. +357 99 571267 · vinfoliowines@gmail.com.",
};

export default function ContactPage() {
  return <ContactView />;
}
