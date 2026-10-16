import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal, Counter, Stagger, StaggerItem } from "@/components/motion-primitives";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Paquita Hôtel Restaurant Bar, Bohicon" },
      {
        name: "description",
        content:
          "L'histoire de Paquita Hôtel Restaurant Bar à Bohicon : une maison d'étape familiale au cœur du Zou, entre Abomey et Cotonou.",
      },
      { property: "og:title", content: "À propos — Paquita Hôtel Bohicon" },
      {
        property: "og:description",
        content: "Une maison d'étape familiale au cœur du Zou, au Bénin.",
      },
    ],
  }),
  component: APropos,
});

const VALUES = [
  ["Propreté", "Ménage quotidien, linge changé à chaque séjour, contrôles réguliers des chambres."],
  ["Fiabilité", "Ce qui est réservé est garanti. Pas de mauvaise surprise à l'arrivée."],
  ["Convivialité", "Une équipe locale qui connaît Bohicon et prend le temps de renseigner."],
];

function APropos() {
  return (
    <>
      <PageHero
        eyebrow="Notre maison"
        title="À propos de Paquita"
        intro="Au carrefour du Zou, Bohicon est la ville d'étape du Bénin. Paquita y accueille depuis des années ceux qui la traversent — et ceux qui décident d'y rester."
      />

      <section className="shell grid gap-14 py-20 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <h2 className="text-3xl leading-[1.1]">Une adresse née d'un besoin simple</h2>
          <div className="mt-5 space-y-4 text-[0.975rem] leading-relaxed text-muted-foreground">
            <p>
              Bohicon voit passer chaque jour commerçants, fonctionnaires, équipes d'ONG et
              familles en route vers Abomey, Dassa ou Cotonou. Il manquait une adresse fiable :
              propre, calme, à prix raisonnable, avec un vrai restaurant ouvert tard.
            </p>
            <p>
              Paquita est né de ce constat. Un hôtel à taille humaine, tenu par une équipe
              locale, où l'on connaît les habitués par leur prénom et où l'on ouvre la cuisine
              pour un client arrivé à minuit.
            </p>
            <p>
              Aujourd'hui, la maison compte quatre catégories de chambres, un restaurant qui
              sert autant l'amiwo que les plats internationaux, et un bar devenu un point de
              rendez-vous du centre-ville.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/chambres">Voir les chambres</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </Reveal>

        <Stagger className="grid gap-px self-start overflow-hidden rounded-md bg-border">
          {[
            { value: <Counter to={SITE.rating} decimals={1} />, label: "Note moyenne Google" },
            { value: <Counter to={SITE.reviewCount} suffix="+" />, label: "Avis déposés" },
            { value: <Counter to={4} />, label: "Catégories de chambres" },
            { value: <Counter to={24} suffix="h/24" />, label: "Réception ouverte" },
          ].map((s, i) => (
            <StaggerItem key={i} className="bg-card p-7">
              <p className="font-display text-4xl text-primary">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-border bg-sand">
        <div className="shell py-20">
          <Reveal>
            <p className="eyebrow">Ce à quoi nous tenons</p>
            <h2 className="mt-3 text-4xl">Trois engagements</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {VALUES.map(([title, text]) => (
              <StaggerItem key={title}>
                <div className="surface-card h-full bg-card p-7">
                  <h3 className="text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
