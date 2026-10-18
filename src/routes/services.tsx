import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wifi,
  Car,
  Wind,
  Shirt,
  Coffee,
  ShieldCheck,
  Users,
  Clock,
  Bus,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem, SectionHeading } from "@/components/motion-primitives";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services de l'hôtel — Paquita Bohicon" },
      {
        name: "description",
        content:
          "Wifi gratuit, parking privé, blanchisserie, petit-déjeuner, salle pour réunions et navette : tous les services de Paquita Hôtel à Bohicon.",
      },
      { property: "og:title", content: "Services de l'hôtel — Paquita Bohicon" },
      {
        property: "og:description",
        content: "Wifi, parking, blanchisserie, petit-déjeuner et salle de réunion à Bohicon.",
      },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Wifi, title: "Wifi gratuit", text: "Dans toutes les chambres et les espaces communs." },
  { icon: Car, title: "Parking privé", text: "Cour fermée et gardiennée, sans supplément." },
  { icon: Wind, title: "Climatisation", text: "Chaque chambre dispose de sa climatisation." },
  { icon: Coffee, title: "Petit-déjeuner", text: "Servi dès 7h00 au restaurant de l'hôtel." },
  { icon: Shirt, title: "Blanchisserie", text: "Lavage et repassage sur demande à la réception." },
  { icon: ShieldCheck, title: "Sécurité 24h/24", text: "Gardiennage nuit et jour, accès contrôlé." },
  { icon: Users, title: "Salle pour groupes", text: "Espace modulable pour réunions et séminaires." },
  { icon: Clock, title: "Réception 24h/24", text: "Arrivées tardives et départs matinaux acceptés." },
  { icon: Bus, title: "Navette & taxi", text: "Organisation de transferts vers Abomey ou Cotonou." },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Prestations"
        title="Services"
        intro="Tout ce qu'il faut pour un séjour simple et sans mauvaise surprise, que vous restiez une nuit ou plusieurs semaines."
      />

      <section className="shell py-20">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <div className="surface-card lift-on-hover h-full p-7">
                <s.icon className="size-6 text-primary" aria-hidden />
                <h2 className="mt-5 text-xl">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-border bg-sand">
        <div className="shell grid gap-10 py-20 md:grid-cols-2">
          <SectionHeading
            eyebrow="Bon à savoir"
            title="Horaires & conditions"
            intro="Quelques repères pratiques avant votre arrivée."
          />
          <div className="space-y-4 text-sm">
            {[
              ["Arrivée", "À partir de 12h00 — arrivées tardives possibles, prévenez-nous."],
              ["Départ", "Jusqu'à 12h00. Départ tardif selon disponibilité."],
              ["Réception", SITE.hours.reception],
              ["Restaurant", SITE.hours.restaurant],
              ["Bar", SITE.hours.bar],
              ["Paiement", "Espèces et Mobile Money (MTN / Moov) acceptés sur place."],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-wrap justify-between gap-3 border-b border-border pb-4"
              >
                <span className="font-medium">{label}</span>
                <span className="max-w-sm text-right text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell flex flex-wrap items-center justify-between gap-6 py-16">
        <p className="font-display text-3xl">Une demande particulière ?</p>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/contact">Nous écrire</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          </Button>
        </div>
      </section>
    </>
  );
}
