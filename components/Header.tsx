"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Wines" },
  { href: "/wineries", label: "Wineries" },
  { href: "/about", label: "About" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCart((s) => s.items);
  const hydrated = useCart((s) => s.hydrated);
  const openCart = useCart((s) => s.openCart);

  const totalItems = hydrated
    ? items.reduce((acc, i) => acc + i.quantity, 0)
    : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-line shadow-card-soft"
          : "bg-gradient-to-b from-ink/70 to-transparent",
      )}
    >
      <div className="container-wide flex items-center justify-between h-20">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Vinfolio home"
        >
          <Image
            src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
            alt="Vinfolio"
            width={200}
            height={56}
            priority
            className="h-11 md:h-14 w-auto object-contain
                       transition-transform group-hover:scale-105"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm uppercase tracking-[0.18em] transition-colors py-1",
                  active
                    ? "text-burgundy font-medium"
                    : "text-cream/70 hover:text-burgundy",
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            aria-label="Search wines"
            className="hidden sm:inline-flex p-2.5 rounded-sm text-burgundy/70 hover:text-burgundy hover:bg-burgundy/10 transition-colors"
          >
            <Search className="w-5 h-5" />
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2.5 rounded-sm text-burgundy/70 hover:text-burgundy hover:bg-burgundy/10 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-burgundy text-[#F8F2E7] text-xs font-bold flex items-center justify-center shadow-wine-soft"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden p-2.5 rounded-sm text-burgundy/70 hover:text-burgundy hover:bg-burgundy/10 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-line bg-ink/95 backdrop-blur-md"
        >
          <nav className="container-wide py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-cream uppercase tracking-[0.18em] text-sm hover:bg-burgundy/10 hover:text-burgundy rounded-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
