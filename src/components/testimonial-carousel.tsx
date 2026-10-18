import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonials } from "@/hooks/use-content";
import { EASE } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i <= rating ? "fill-ochre text-ochre" : "text-muted-foreground/35",
          )}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function TestimonialCarousel() {
  const { data, isLoading } = useTestimonials();
  const items = data ?? [];
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % items.length);
    }, 6500);
    return () => clearInterval(id);
  }, [items.length]);

  if (isLoading) {
    return (
      <div className="surface-card mx-auto max-w-3xl space-y-4 p-10">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-4 w-40" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Aucun avis publié pour le moment.
      </p>
    );
  }

  const current = items[index];
  const go = (delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + items.length) % items.length);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="surface-card relative overflow-hidden bg-card px-7 py-12 sm:px-14">
        <Quote className="absolute right-8 top-8 size-12 text-accent" aria-hidden />
        <AnimatePresence mode="wait" custom={dir}>
          <motion.blockquote
            key={current.id}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative"
          >
            <Stars rating={current.rating} />
            <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">
              « {current.comment} »
            </p>
            <footer className="mt-6 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{current.guest_name}</span>
              {" · "}
              {new Date(current.review_date).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Avis précédent"
          className="rounded-full border border-border p-2 transition-all duration-200 hover:scale-105 hover:bg-muted"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <div className="flex gap-1.5">
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Avis ${i + 1}`}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-7 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Avis suivant"
          className="rounded-full border border-border p-2 transition-all duration-200 hover:scale-105 hover:bg-muted"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
