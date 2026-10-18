import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { MediaImage } from "@/components/media-image";
import { useGallery } from "@/hooks/use-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie photos — Paquita Hôtel Bohicon" },
      {
        name: "description",
        content:
          "Découvrez en images les chambres, le restaurant, le bar et les espaces communs de Paquita Hôtel Restaurant Bar à Bohicon.",
      },
      { property: "og:title", content: "Galerie photos — Paquita Hôtel Bohicon" },
      {
        property: "og:description",
        content: "Chambres, restaurant, bar et extérieurs de l'hôtel Paquita à Bohicon.",
      },
    ],
  }),
  component: Galerie,
});

function Galerie() {
  const { data, isLoading } = useGallery();
  const images = data ?? [];
  const [filter, setFilter] = useState("Toutes");
  const [open, setOpen] = useState<string | null>(null);

  const categories = ["Toutes", ...Array.from(new Set(images.map((i) => i.category)))];
  const visible = filter === "Toutes" ? images : images.filter((i) => i.category === filter);

  return (
    <>
      <PageHero
        eyebrow="En images"
        title="Galerie"
        intro="Un aperçu honnête de l'hôtel : les chambres telles qu'elles sont, la salle du restaurant, le bar et la cour."
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="shell py-20">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-60 w-full" />
            ))}
          </div>
        ) : visible.length ? (
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((img) => (
              <StaggerItem key={img.id}>
                <button
                  type="button"
                  onClick={() => setOpen(img.image_url)}
                  className="group block w-full overflow-hidden rounded-md border border-border bg-muted"
                >
                  <MediaImage
                    path={img.image_url}
                    alt={img.caption ?? img.category}
                    className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  {img.caption ? (
                    <span className="block bg-card px-4 py-3 text-left text-xs text-muted-foreground">
                      {img.caption}
                    </span>
                  ) : null}
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Aucune photo dans cette catégorie pour le moment.
          </p>
        )}
      </section>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          <DialogTitle className="sr-only">Photo agrandie</DialogTitle>
          {open ? (
            <MediaImage path={open} alt="" className="h-auto w-full object-contain" />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
