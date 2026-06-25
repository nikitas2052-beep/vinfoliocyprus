import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Infant, Alata } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import RouteHeroCleanup from "@/components/RouteHeroCleanup";

const cormorant = Cormorant_Infant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
const alata = Alata({
  subsets: ["latin"],
  variable: "--font-alata",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vinfolio.com.cy"),
  title: {
    default: "Vinfolio · Fine Wine Importer · Cyprus",
    template: "%s · Vinfolio",
  },
  description:
    "Vinfolio Ltd, importer and distributor of fine wines in Cyprus. Strong partnerships build stronger companies. Curated bottles from Cyprus, Greece, Italy, France, Chile and beyond.",
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
      "Strong partnerships build stronger companies. Curated wines from Cyprus and the great regions of the world.",
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
    description: "Strong partnerships build stronger companies. Fine wine importer in Cyprus.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${alata.variable}`}>
      <head>
        {/*
          Guard against the well-known React + browser auto-translation crash
          ("Failed to execute 'removeChild' on 'Node'"). When Chrome/Google
          Translate rewrites text nodes, React's reconciliation can try to
          remove/insert a node whose parent has changed. Instead of throwing,
          we operate on the node's ACTUAL parent (remove it where it really
          lives / append when the reference is detached). Operating on the
          real parent — rather than no-op'ing — is important so libraries that
          re-parent nodes (e.g. GSAP ScrollTrigger's pin-spacer) still get
          cleaned up on navigation. https://github.com/facebook/react/issues/11538
        */}
        <Script id="translate-crash-guard" strategy="beforeInteractive">
          {`(function(){if(typeof Node==='function'&&Node.prototype){var rc=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c&&c.parentNode!==this){return c.parentNode?rc.call(c.parentNode,c):c;}return rc.apply(this,arguments);};var ib=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,r){if(r&&r.parentNode!==this){return ib.call(this,n,null);}return ib.apply(this,arguments);};}})();`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <RouteHeroCleanup />
        <AgeVerificationModal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster
          theme="light"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              border: "1px solid #E5E2DC",
              color: "#242E35",
              fontFamily: "var(--font-alata)",
              borderRadius: 0,
            },
          }}
        />
      </body>
    </html>
  );
}
