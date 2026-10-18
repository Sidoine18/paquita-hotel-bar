import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Paquita Hôtel Bohicon" },
      { name: "description", content: "Mentions légales et politique de confidentialité de Paquita Hôtel Restaurant Bar." },
      { property: "og:title", content: "Mentions légales — Paquita Hôtel" },
      { property: "og:description", content: "Informations légales et confidentialité du site Paquita." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Mentions,
});

function Mentions() {
  return (
    <>
      <PageHero eyebrow="Informations" title="Mentions légales" />
      <section className="shell max-w-3xl space-y-6 py-20 text-sm leading-relaxed text-muted-foreground">
        <p>
          {SITE.name} — {SITE.address}. Téléphone : {SITE.phoneDisplay}.
        </p>
        <p>
          Ce site ne conserve aucune donnée personnelle. Les formulaires de réservation et de
          contact préparent simplement un message WhatsApp que vous choisissez d'envoyer à
          l'hôtel.
        </p>
      </section>
    </>
  );
}
