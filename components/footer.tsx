import Link from "next/link";
import { Heart, Phone, MapPin, Mail } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/blog", label: "Blog" },
  { href: "/explorations", label: "Explorations" },
  { href: "/regimes", label: "Régimes" },
  { href: "/qa", label: "Q&A" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold font-heading text-medical-700"
            >
              <Heart className="h-6 w-6 fill-accent text-accent" aria-hidden="true" />
              <span>CardioConseils</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Un cabinet de cardiologie engagé pour la prévention et la sensibilisation du grand public.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-medical-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-medical-500" aria-hidden="true" />
                <span>12 avenue du Cœur, 75000 Paris</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-medical-500" aria-hidden="true" />
                <a href="tel:0142000000" className="hover:text-medical-700">01 42 00 00 00</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-medical-500" aria-hidden="true" />
                <a href="mailto:contact@cardioconseils.fr" className="hover:text-medical-700">contact@cardioconseils.fr</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            © {new Date().getFullYear()} CardioConseils. Contenu informatif, ne remplace pas une consultation médicale.
          </p>
          <p>
            En cas d'urgence, appelez le <a href="tel:15" className="font-semibold text-accent hover:underline">15</a> (SAMU).
          </p>
        </div>
      </div>
    </footer>
  );
}
