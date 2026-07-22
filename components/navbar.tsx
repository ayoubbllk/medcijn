"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/blog", label: "Blog" },
  { href: "/explorations", label: "Explorations" },
  { href: "/regimes", label: "Régimes" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold font-heading text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-hero text-white shadow-soft">
            <HeartPulse className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            Cardio<span className="text-medical-600">Conseils</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-white px-2 py-1 shadow-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                pathname === link.href
                  ? "bg-medical-600 text-white"
                  : "text-muted-foreground hover:bg-medical-50 hover:text-medical-700"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/qa"
            className="inline-flex items-center rounded-full bg-medical-600 px-6 py-2.5 text-sm font-semibold text-white shadow-teal transition-colors hover:bg-medical-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Posez votre question
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-medical-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-white"
          >
            <div className="flex flex-col px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    pathname === link.href
                      ? "bg-medical-600 text-white"
                      : "text-muted-foreground hover:bg-medical-50 hover:text-medical-700"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/qa"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-medical-600 px-6 py-3 text-base font-semibold text-white"
              >
                Posez votre question
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
