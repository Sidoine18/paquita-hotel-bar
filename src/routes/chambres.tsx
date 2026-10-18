import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Wind, BedDouble } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/motion-primitives";
import { MediaImage } from "@/components/media-image";
import { useRooms } from "@/hooks/use-content";
import { formatFcfa } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chambres")({
  head: () => ({
    meta: [
      { title: "Chambres & tarifs — Paquita Hôtel Bohicon" },
      {
        name: "description",
        content:
          "Chambres Standard, Confort, Familiale et Suite à Bohicon : climatisation, wifi, salle de bain privée. Tarifs à partir de 18 000 FCFA la nuit.",
      },
      { property: "og:title", content: "Chambres & tarifs — Paquita Hôtel Bohicon" },
      {
        property: "og:description",
        content: "Quatre catégories de chambres climatisées au centre de Bohicon, Bénin.",
      },
    ],
  }),
  component: Chambres,
});

const FALLBACK = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000&q=60",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=60",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1000&q=60",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&q=60",
];

function Chambres() {
  const { data, isLoading } = useRooms();
  const [filter, setFilter] = useState<string>("Toutes");

  const rooms = data ?? [];
  const types = ["Toutes", ...Array.from(new Set(rooms.map((r) => r.room_type)))];
  const visible = filter === "Toutes" ? rooms : rooms.filter((r) => r.room_type === filter);

  return (
    <>
      <PageHero
        eyebrow="Séjourner"
        title="Nos chambres"
        intro="Toutes nos chambres sont climatisées, équipées d'une salle de bain privée et du wifi gratuit. Ménage quotidien et réception 24h/24."
      >
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                filter === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="shell py-20">
        {isLoading ? (
          <div className="grid gap-8">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-72 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-10">
            {visible.map((room, i) => (
              <Reveal key={room.id} delay={i * 0.05}>
                <article className="surface-card grid overflow-hidden md:grid-cols-[1.1fr_1fr]">
                  <div className="h-64 overflow-hidden bg-muted md:h-full">
                    <MediaImage
                      path={room.photos?.[0]}
                      fallback={FALLBACK[i % FALLBACK.length]}
                      alt={room.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-8">
                    <div>
                      <p className="eyebrow">{room.room_type}</p>
                      <h2 className="mt-2 text-3xl">{room.name}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {room.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {room.amenities?.map((a) => (
                          <Badge key={a} variant="secondary" className="font-normal">
                            {a}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Users className="size-4 text-primary" aria-hidden />
                          {room.capacity} personne{room.capacity > 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-2">
                          <Wind className="size-4 text-primary" aria-hidden />
                          Climatisée
                        </span>
                        <span className="flex items-center gap-2">
                          <BedDouble className="size-4 text-primary" aria-hidden />
                          Salle de bain privée
                        </span>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                      <p className="font-display text-3xl text-primary">
                        {formatFcfa(room.price_night)}
                        <span className="font-sans text-xs text-muted-foreground"> / nuit</span>
                      </p>
                      <Button asChild disabled={!room.available}>
                        <Link to="/reservation" search={{ room: room.id }}>
                          {room.available ? "Réserver" : "Indisponible"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
