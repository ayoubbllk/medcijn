import Link from "next/link";
import { HeartPulse, Phone, MapPin, Mail } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/blog", label: "Blog" },
  { href: "/explorations", label: "Explorations" },
  { href: "/regimes", label: "Régimes" },
  { href: "/qa", label: "Q&A" },
];

export function Footer() {
  return (
    <footer className="w-full px-3 pb-3 md:px-4 md:pb-4">
      <div className="gradient-hero relative overflow-hidden rounded-[2.5rem] text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-medical-900/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2.5 text-xl font-bold font-heading text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <HeartPulse className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>CardioConseils</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-white/85">
                Un cabinet de cardiologie engagé pour la prévention et la
                sensibilisation, au service des patients de toute l&apos;Algérie.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Navigation</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-white" aria-hidden="true" />
                  <span>12 rue Didouche Mourad, Alger Centre</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white" aria-hidden="true" />
                  <a href="tel:+213211234567" className="hover:text-white">+213 21 12 34 56</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white" aria-hidden="true" />
                  <a href="mailto:contact@cardioconseils.dz" className="hover:text-white">contact@cardioconseils.dz</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/80">
            <p className="mb-2">
              © {new Date().getFullYear()} CardioConseils. Contenu informatif, ne
              remplace pas une consultation médicale.
            </p>
            <p>
              En cas d&apos;urgence, appelez le{" "}
              <a href="tel:14" className="font-semibold text-white underline underline-offset-4 hover:no-underline">
                14
              </a>{" "}
              (Protection civile).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
