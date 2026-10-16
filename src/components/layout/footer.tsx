import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Facebook } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="shell grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">Paquita</p>
          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-ink-foreground/50">
            Hôtel · Restaurant · Bar
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            Au cœur de Bohicon, une adresse chaleureuse pour les voyageurs d'affaires, les
            familles et les visiteurs d'Abomey. Chambres climatisées, cuisine locale et
            internationale, bar convivial.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-sm border border-ink-foreground/20 px-4 py-2 text-sm transition-colors duration-200 hover:bg-ink-foreground/10"
            >
              <Phone className="size-4" aria-hidden />
              {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-sm border border-ink-foreground/20 px-4 py-2 text-sm transition-colors duration-200 hover:bg-ink-foreground/10"
            >
              <Facebook className="size-4" aria-hidden />
              Facebook
            </a>
          </div>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-ink-foreground/45">
            Navigation
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-ink-foreground/70 transition-colors duration-200 hover:text-ink-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-ink-foreground/45">
            Informations
          </p>
          <ul className="mt-5 space-y-3 text-sm text-ink-foreground/70">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {SITE.hours.reception}
                <br />
                {SITE.hours.restaurant}
                <br />
                {SITE.hours.bar}
              </span>
            </li>
          </ul>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <Link
                to="/mentions-legales"
                className="text-ink-foreground/70 transition-colors hover:text-ink-foreground"
              >
                Mentions légales & confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-ink-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Tous droits réservés.</p>
          <p>Bohicon · Zou · Bénin</p>
        </div>
      </div>
    </footer>
  );
}
