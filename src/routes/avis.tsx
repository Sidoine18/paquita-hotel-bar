import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { Stars } from "@/components/testimonial-carousel";
import { useTestimonials } from "@/hooks/use-content";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/avis")({
  head: () => ({
    meta: [
      { title: "Avis clients — Paquita Hôtel Bohicon" },
      {
        name: "description",
        content:
          "Ce que disent les voyageurs de Paquita Hôtel Restaurant Bar à Bohicon : accueil, propreté, restaurant et rapport qualité-prix.",
      },
      { property: "og:title", content: "Avis clients — Paquita Hôtel Bohicon" },
      {
        property: "og:description",
        content: `Note moyenne ${SITE.rating}/5 sur ${SITE.reviewCount} avis.`,
      },
    ],
  }),
  component: Avis,
});

function Avis() {
  const { data, isLoading } = useTestimonials();
  const items = data ?? [];

  return (
    <>
      <PageHero
        eyebrow="Retours clients"
        title="Avis"
        intro={`Nous publions les avis tels qu'ils nous parviennent. Note moyenne de ${SITE.rating}/5 sur ${SITE.reviewCount} avis Google.`}
      >
        <div className="flex items-center gap-3">
          <Stars rating={Math.round(SITE.rating)} />
          <span className="text-sm text-muted-foreground">
            {SITE.rating}/5 — {SITE.reviewCount} avis
          </span>
        </div>
      </PageHero>

      <section className="shell py-20">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-44 w-full" />
            ))}
          </div>
        ) : items.length ? (
          <Stagger className="grid gap-6 md:grid-cols-2">
            {items.map((t) => (
              <StaggerItem key={t.id}>
                <figure className="surface-card lift-on-hover h-full p-7">
                  <Stars rating={t.rating} />
                  <blockquote className="mt-4 font-display text-xl leading-snug">
                    « {t.comment} »
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t.guest_name}</span>
                    {" · "}
                    {new Date(t.review_date).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Aucun avis publié pour le moment.
          </p>
        )}
      </section>

      <section className="border-t border-border bg-sand">
        <div className="shell flex flex-wrap items-center justify-between gap-6 py-14">
          <div className="flex items-center gap-4">
            <Star className="size-6 fill-ochre text-ochre" aria-hidden />
            <p className="font-display text-2xl">Vous avez séjourné chez nous ?</p>
          </div>
          <Button asChild>
            <Link to="/contact">Partager votre expérience</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
