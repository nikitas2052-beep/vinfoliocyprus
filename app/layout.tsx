import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AgeVerificationModal from "@/components/AgeVerificationModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vinfolio.com.cy"),
  title: {
    default: "Vinfolio · Fine Wine Importer · Cyprus",
    template: "%s · Vinfolio",
  },
  description:
    "Vinfolio Ltd — importer & distributor of fine wines in Cyprus. Strong partnerships build stronger companies. Curated bottles from Cyprus, Greece, Italy, France, Chile and beyond.",
  keywords: [
    "wine Cyprus",
    "Limassol wine shop",
    "Vinfolio",
    "Yiaskouris",
    "Soligo Prosecco",
    "Ventisquero",
    "fine wine importer Cyprus",
  ],
  openGraph: {
    title: "Vinfolio · Fine Wine Importer · Cyprus",
    description:
      "Strong partnerships build stronger companies. Curated wines from Cyprus and the great regions of the world. Importer & distributor — Limassol, Cyprus.",
    url: "https://www.vinfolio.com.cy",
    siteName: "Vinfolio",
    locale: "en_CY",
    type: "website",
    images: [
      {
        url: "https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png",
        alt: "Vinfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinfolio · Cyprus",
    description: "Strong partnerships build stronger companies — fine wine importer in Cyprus.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-ink text-cream">
        <AgeVerificationModal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1A1416",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#F5F0E8",
            },
          }}
        />
      </body>
    </html>
  );
}
