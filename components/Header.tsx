"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";
import WineriesMegaDropdown from "./WineriesMegaDropdown";

// "Wineries" rendered separately as a mega-dropdown component
const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/wholesale", label: "Trade" },
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
    const onScroll = () => setScrolled(window.scrollY > 30);
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
          ? "bg-paper/95 backdrop-blur-md border-b border-line"
          : "bg-paper/80 backdrop-blur-sm",
      )}
    >
      <div className="container-wide flex items-center justify-between h-20 md:h-24">
        <Link
          href="/"
          className="group flex items-center"
          aria-label="Vinfolio home"
        >
          <Image
            src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
            alt="Vinfolio"
            width={220}
            height={64}
            priority
            className="h-12 md:h-14 w-auto object-contain transition-opacity group-hover:opacity-80"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {/* Shop is first */}
          {navLinks.slice(0, 1).map((link) => renderNav(link, pathname))}
          {/* Mega-dropdown for Wineries */}
          <WineriesMegaDropdown activePath={pathname} />
          {/* Rest */}
          {navLinks.slice(1).map((link) => renderNav(link, pathname))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/products"
            aria-label="Search"
            className="hidden sm:inline-flex p-2.5 text-ink hover:text-bronze transition-colors"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
          <Link
            href="/contact"
            aria-label="Account"
            className="hidden sm:inline-flex p-2.5 text-ink hover:text-bronze transition-colors"
          >
            <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>
          <button
            onClick={openCart}
            aria-label="Open your request list"
            className="relative p-2.5 text-ink hover:text-bronze transition-colors"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-wine text-paper text-[10px] font-sans flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden p-2.5 text-ink hover:text-bronze transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-line bg-paper overflow-hidden"
        >
          <nav className="container-wide py-4 flex flex-col">
            {[
              { href: "/products", label: "Shop" },
              { href: "/wineries", label: "Wineries" },
              { href: "/about", label: "Our Story" },
              { href: "/wholesale", label: "Trade" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-3 text-ink uppercase tracking-[0.18em] text-[13px] font-sans hover:text-bronze border-b border-line last:border-b-0"
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

function renderNav(
  link: { href: string; label: string },
  pathname: string,
) {
  const active =
    pathname === link.href ||
    (link.href !== "/" && pathname.startsWith(link.href));
  return (
    <Link
      key={link.href}
      href={link.href}
      className={cn(
        "relative text-[13px] uppercase tracking-[0.18em] font-sans py-1 transition-colors",
        active ? "text-ink" : "text-ink/70 hover:text-ink",
      )}
    >
      {link.label}
      {active && (
        <motion.span
          layoutId="header-underline"
          className="absolute left-0 right-0 -bottom-1 h-px bg-bronze"
        />
      )}
    </Link>
  );
}
