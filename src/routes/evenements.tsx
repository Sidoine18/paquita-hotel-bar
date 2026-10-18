import { createFileRoute, Link } from "@tanstack/react-router";
import { PartyPopper, Briefcase, Heart, Music } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem, Reveal } from "@/components/motion-primitives";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements & réceptions — Paquita Bohicon" },
      {
        name: "description",
        content:
          "Séminaires, anniversaires, mariages et soirées à Bohicon : espaces modulables, service traiteur et hébergement sur place chez Paquita.",
      },
      { property: "og:title", content: "Événements & réceptions — Paquita Bohicon" },
      {
        property: "og:description",
        content: "Organisez séminaires, mariages et soirées à Bohicon avec hébergement sur place.",
      },
    ],
  }),
  component: Evenements,
});

const TYPES = [
  {
    icon: Briefcase,
    title: "Séminaires & ateliers",
    text: "Salle équipée, pauses café, déjeuner sur place et chambres pour vos participants. Formule journée ou résidentielle.",
  },
  {
    icon: Heart,
    title: "Mariages & baptêmes",
    text: "Cour aménagée, menu personnalisé et hébergement des invités venus de Cotonou, Abomey ou de la diaspora.",
  },
  {
    icon: PartyPopper,
    title: "Anniversaires",
    text: "Réservation privative du restaurant ou d'un coin de la terrasse, gâteau et décoration sur demande.",
  },
  {
    icon: Music,
    title: "Soirées & afterworks",
    text: "Le bar accueille vos soirées d'entreprise et afterworks, avec formules boissons adaptées.",
  },
];

function Evenements() {
  return (
    <>
      <PageHero
        eyebrow="Recevoir"
        title="Événements & réceptions"
        intro="Réunir vos équipes, vos proches ou vos partenaires à Bohicon, avec le confort d'un hôtel sur place."
      >
        <Button asChild>
          <Link to="/contact">Demander un devis</Link>
        </Button>
      </PageHero>

      <section className="shell py-20">
        <Stagger className="grid gap-6 md:grid-cols-2">
          {TYPES.map((t) => (
            <StaggerItem key={t.title}>
              <div className="surface-card lift-on-hover h-full p-8">
                <t.icon className="size-6 text-primary" aria-hidden />
                <h2 className="mt-5 text-2xl">{t.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-forest text-forest-foreground">
        <div className="shell grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-forest-foreground/55">
              Sur mesure
            </p>
            <h2 className="mt-4 text-4xl leading-[1.06]">Chaque événement est différent</h2>
            <p className="mt-5 text-[0.975rem] leading-relaxed text-forest-foreground/75">
              Dites-nous le nombre d'invités, la date et le budget : nous revenons vers vous
              avec une proposition claire, incluant salle, menu et chambres si besoin.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild variant="secondary">
              <Link to="/contact">Formulaire de contact</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-forest-foreground/30 bg-transparent text-forest-foreground hover:bg-forest-foreground/12 hover:text-forest-foreground"
            >
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer noopener">
                WhatsApp
              </a>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
