import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Wind,
  Wifi,
  UtensilsCrossed,
  Car,
  MapPin,
  Star,
  ArrowRight,
  Phone,
} from "lucide-react";
import heroImage from "@/assets/hero-hotel.jpg";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Reveal,
  Stagger,
  StaggerItem,
  Counter,
  Parallax,
  SectionHeading,
  EASE,
} from "@/components/motion-primitives";
import { MediaImage } from "@/components/media-image";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { useRooms, useMenu } from "@/hooks/use-content";
import { SITE, formatFcfa } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paquita Hôtel Restaurant Bar — Hôtel à Bohicon, Bénin" },
      {
        name: "description",
        content:
          "Hôtel Bohicon : chambres climatisées avec balcon, restaurant et bar au centre de Bohicon (Zou, Bénin). Réservation en ligne, réception 24h/24.",
      },
      { property: "og:title", content: "Paquita Hôtel Restaurant Bar — Bohicon, Bénin" },
      {
        property: "og:description",
        content:
          "Chambres climatisées, restaurant et bar au cœur de Bohicon. Réservez votre séjour en quelques clics.",
      },
    ],
  }),
  component: Home,
});

const WHY = [
  { icon: Wind, title: "Chambres climatisées", text: "Toutes nos chambres sont climatisées et entretenues quotidiennement." },
  { icon: Wifi, title: "Wifi gratuit", text: "Connexion stable dans les chambres et les espaces communs." },
  { icon: UtensilsCrossed, title: "Restaurant sur place", text: "Cuisine béninoise et internationale, du petit-déjeuner au dîner." },
  { icon: Car, title: "Parking privé", text: "Stationnement gratuit et sécurisé pour les clients de l'hôtel." },
  { icon: MapPin, title: "Centre de Bohicon", text: "À quelques minutes de la gare, du marché et de la route d'Abomey." },
  { icon: Phone, title: "Réception 24h/24", text: "Une équipe joignable à toute heure, y compris pour les arrivées tardives." },
];

function Home() {
  const rooms = useRooms();
  const menu = useMenu();
  const featured = (rooms.data ?? []).slice(0, 3);
  const signature = (menu.data ?? [])
    .filter((m) => m.category === "Plats locaux" || m.category === "Plats internationaux")
    .slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <Parallax className="absolute inset-0 -z-10" distance={90}>
          <img
            src={heroImage}
            alt="Façade de Paquita Hôtel Restaurant Bar à Bohicon au coucher du soleil"
            width={1920}
            height={1088}
            className="h-[112%] w-full object-cover"
          />
        </Parallax>
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: "var(--gradient-dusk)" }}
          aria-hidden
        />

        <div className="shell pb-16 pt-32 sm:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[0.7rem] uppercase tracking-[0.34em] text-ink-foreground/70"
          >
            Bohicon · Zou · Bénin
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="mt-5 max-w-3xl text-[3.25rem] leading-[0.98] text-ink-foreground sm:text-7xl"
          >
            L'hospitalité béninoise,
            <br />
            <em className="not-italic text-ochre">avec le confort qu'il faut.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/80"
          >
            Chambres climatisées avec balcon, restaurant ouvert du matin au soir et bar
            convivial — au centre de Bohicon, à quinze minutes des palais royaux d'Abomey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <Link to="/reservation">Réserver une chambre</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-ink-foreground/35 bg-transparent text-ink-foreground hover:bg-ink-foreground/12 hover:text-ink-foreground"
            >
              <Link to="/restaurant">Voir le menu</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CHIFFRES + PRESENTATION */}
      <section className="border-b border-border bg-background">
        <div className="shell grid gap-12 py-20 md:grid-cols-[1.15fr_1fr] md:items-center">
          <Reveal>
            <p className="eyebrow">Bienvenue</p>
            <h2 className="mt-4 text-4xl leading-[1.06] sm:text-5xl">
              Une maison d'étape pensée pour ceux qui travaillent, voyagent et se retrouvent.
            </h2>
            <p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-muted-foreground">
              Depuis des années, Paquita accueille voyageurs d'affaires, équipes d'ONG,
              familles et visiteurs du Zou. Un accueil chaleureux, des chambres soignées, une
              cuisine généreuse à prix juste : notre promesse tient en trois mots — propre,
              fiable, convivial.
            </p>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/a-propos">
                Notre histoire <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border">
            {[
              { value: <Counter to={SITE.rating} decimals={1} />, label: "Note Google", sub: "sur 5" },
              { value: <Counter to={SITE.reviewCount} suffix="+" />, label: "Avis clients", sub: "Google" },
              { value: <Counter to={24} suffix="h/24" />, label: "Réception", sub: "7j/7" },
              { value: <Counter to={4} />, label: "Catégories", sub: "de chambres" },
            ].map((stat, i) => (
              <StaggerItem key={i} className="bg-card p-7">
                <p className="font-display text-4xl text-primary">{stat.value}</p>
                <p className="mt-2 text-sm font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CHAMBRES */}
      <section className="shell py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Séjourner"
            title="Nos chambres"
            intro="Quatre catégories, toutes climatisées, avec salle de bain privée et wifi gratuit."
          />
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link to="/chambres">Toutes les chambres</Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.isLoading
            ? [0, 1, 2].map((i) => (
                <div key={i} className="surface-card overflow-hidden">
                  <Skeleton className="h-52 w-full rounded-none" />
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ))
            : featured.map((room, i) => (
                <Reveal key={room.id} delay={i * 0.08}>
                  <article className="surface-card lift-on-hover group h-full overflow-hidden">
                    <div className="h-52 overflow-hidden bg-muted">
                      <MediaImage
                        path={room.photos?.[0]}
                        fallback={`https://images.unsplash.com/photo-${
                          ["1611892440504-42a792e24d32", "1590490360182-c33d57733427", "1566665797739-1674de7a421a"][i % 3]
                        }?w=900&q=60`}
                        alt={room.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="p-6">
                      <p className="eyebrow">{room.room_type}</p>
                      <h3 className="mt-2 text-2xl">{room.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {room.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                        <p className="text-sm">
                          <span className="text-muted-foreground">À partir de </span>
                          <span className="font-medium text-primary">
                            {formatFcfa(room.price_night)}
                          </span>
                          <span className="text-muted-foreground"> / nuit</span>
                        </p>
                        <Button asChild size="sm" variant="ghost">
                          <Link to="/reservation" search={{ room: room.id }}>
                            Réserver
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
        </div>
      </section>

      {/* RESTAURANT */}
      <section className="bg-forest text-forest-foreground">
        <div className="shell grid gap-14 py-24 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-forest-foreground/55">
              Se régaler
            </p>
            <h2 className="mt-4 text-4xl leading-[1.06] sm:text-5xl">
              Restaurant & Bar
            </h2>
            <p className="mt-5 max-w-lg text-[0.975rem] leading-relaxed text-forest-foreground/75">
              Poulet bicyclette braisé, amiwo au poisson, filet de capitaine grillé : notre
              carte marie recettes du Zou et classiques internationaux. Le soir, le bar sert
              cocktails maison et bières fraîches jusque tard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link to="/restaurant">Découvrir la carte</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-forest-foreground/30 bg-transparent text-forest-foreground hover:bg-forest-foreground/12 hover:text-forest-foreground"
              >
                <Link to="/reservation-table">Réserver une table</Link>
              </Button>
            </div>
          </Reveal>

          <Stagger className="grid gap-px overflow-hidden rounded-md bg-forest-foreground/12">
            {(signature.length ? signature : Array.from({ length: 4 })).map((item, i) =>
              item ? (
                <StaggerItem
                  key={(item as { id: string }).id}
                  className="flex items-baseline justify-between gap-6 bg-forest px-6 py-5"
                >
                  <div>
                    <p className="font-display text-xl">{(item as { name: string }).name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-forest-foreground/60">
                      {(item as { description: string }).description}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm text-ochre">
                    {formatFcfa((item as { price: number }).price)}
                  </p>
                </StaggerItem>
              ) : (
                <StaggerItem key={i} className="bg-forest px-6 py-5">
                  <Skeleton className="h-6 w-40 bg-forest-foreground/10" />
                </StaggerItem>
              ),
            )}
          </Stagger>
        </div>
      </section>

      {/* AVIS */}
      <section className="shell py-24">
        <SectionHeading
          eyebrow="Ils sont passés"
          title="Ce que disent nos clients"
          intro={`Note moyenne de ${SITE.rating}/5 sur ${SITE.reviewCount} avis Google.`}
          align="center"
        />
        <div className="mt-12">
          <TestimonialCarousel />
        </div>
        <Reveal className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to="/avis">Lire tous les avis</Link>
          </Button>
        </Reveal>
      </section>

      {/* POURQUOI NOUS */}
      <section className="border-y border-border bg-sand">
        <div className="shell py-24">
          <SectionHeading eyebrow="Nos atouts" title="Pourquoi choisir Paquita" />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item) => (
              <StaggerItem key={item.title}>
                <div className="surface-card lift-on-hover h-full bg-card p-7">
                  <item.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CARTE */}
      <section className="shell py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Nous trouver</p>
            <h2 className="mt-4 text-4xl leading-[1.06]">Au centre de Bohicon</h2>
            <p className="mt-5 text-[0.975rem] leading-relaxed text-muted-foreground">
              {SITE.address}
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <Phone className="size-4 text-primary" aria-hidden />
                {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.mapLink}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <MapPin className="size-4 text-primary" aria-hidden />
                Ouvrir dans Google Maps
              </a>
              <p className="flex items-center gap-3 text-muted-foreground">
                <Star className="size-4 text-ochre" aria-hidden />
                {SITE.rating}/5 — {SITE.reviewCount} avis
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-md border border-border shadow-[var(--shadow-soft)]">
              <iframe
                title="Localisation de Paquita Hôtel Restaurant Bar à Bohicon"
                src={SITE.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-warm">
        <div className="shell py-20 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-4xl leading-[1.06] text-primary-foreground sm:text-5xl">
              Votre chambre vous attend à Bohicon.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/80">
              Réservation en ligne en moins de deux minutes, sans paiement immédiat.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/reservation">Réserver maintenant</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
              >
                <a href={SITE.phoneHref}>Appeler l'hôtel</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
