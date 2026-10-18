import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Wine, UtensilsCrossed } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { useMenu } from "@/hooks/use-content";
import { SITE, formatFcfa } from "@/lib/site";

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant & Bar — Paquita Bohicon" },
      {
        name: "description",
        content:
          "Cuisine béninoise et internationale à Bohicon : poulet bicyclette, amiwo, poisson braisé. Bar à cocktails ouvert en soirée. Réservez votre table.",
      },
      { property: "og:title", content: "Restaurant & Bar — Paquita Bohicon" },
      {
        property: "og:description",
        content: "Saveurs du Zou et classiques internationaux, sept jours sur sept.",
      },
    ],
  }),
  component: Restaurant,
});

function Restaurant() {
  const { data, isLoading } = useMenu();
  const items = data ?? [];
  const categories = Array.from(new Set(items.map((i) => i.category)));

  return (
    <>
      <PageHero
        eyebrow="Se régaler"
        title="Restaurant & Bar"
        intro="Une carte qui célèbre le Zou : produits frais du marché de Bohicon, recettes de famille et quelques classiques internationaux pour les voyageurs."
      >
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <UtensilsCrossed className="size-4 text-primary" aria-hidden />
            {SITE.hours.restaurant}
          </span>
          <span className="flex items-center gap-2">
            <Wine className="size-4 text-primary" aria-hidden />
            {SITE.hours.bar}
          </span>
        </div>
        <div className="mt-6">
          <Button asChild>
            <Link to="/reservation-table">Réserver une table</Link>
          </Button>
        </div>
      </PageHero>

      <section className="shell py-20">
        {isLoading ? (
          <div className="space-y-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((cat) => (
              <div key={cat}>
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <h2 className="text-3xl">{cat}</h2>
                    <span className="h-px flex-1 bg-border" aria-hidden />
                  </div>
                </Reveal>
                <Stagger className="mt-7 grid gap-x-12 gap-y-7 md:grid-cols-2">
                  {items
                    .filter((i) => i.category === cat)
                    .map((item) => (
                      <StaggerItem key={item.id}>
                        <div className="flex items-baseline gap-4">
                          <div className="min-w-0">
                            <h3 className="font-display text-xl">
                              {item.name}
                              {!item.available ? (
                                <span className="ml-2 text-xs uppercase tracking-widest text-muted-foreground">
                                  épuisé
                                </span>
                              ) : null}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <span
                            className="h-px flex-1 translate-y-[-2px] border-b border-dashed border-border"
                            aria-hidden
                          />
                          <span className="shrink-0 text-sm font-medium text-primary">
                            {formatFcfa(item.price)}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                </Stagger>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-sand">
        <div className="shell flex flex-wrap items-center justify-between gap-6 py-14">
          <div className="flex items-center gap-4">
            <Clock className="size-6 text-primary" aria-hidden />
            <div>
              <p className="font-display text-2xl">Service continu, 7j/7</p>
              <p className="text-sm text-muted-foreground">
                Petit-déjeuner inclus pour les clients de l'hôtel.
              </p>
            </div>
          </div>
          <Button asChild variant="outline">
            <a href={SITE.phoneHref}>Commander par téléphone</a>
          </Button>
        </div>
      </section>
    </>
  );
}
