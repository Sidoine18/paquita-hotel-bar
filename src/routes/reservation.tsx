import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion-primitives";
import { useRooms } from "@/hooks/use-content";
import { formatFcfa, nightsBetween, openWhatsApp } from "@/lib/site";

export const Route = createFileRoute("/reservation")({
  validateSearch: (search: Record<string, unknown>): { room?: string } => ({
    room: typeof search.room === "string" ? search.room : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Réserver une chambre — Paquita Hôtel Bohicon" },
      {
        name: "description",
        content:
          "Réservez votre chambre à Bohicon en ligne : choisissez vos dates, votre catégorie de chambre et recevez une confirmation de la réception.",
      },
      { property: "og:title", content: "Réserver une chambre — Paquita Hôtel Bohicon" },
      {
        property: "og:description",
        content: "Réservation en ligne, sans paiement immédiat, à l'hôtel Paquita de Bohicon.",
      },
    ],
  }),
  component: Reservation,
});

const schema = z.object({
  guest_name: z.string().trim().min(2, "Indiquez votre nom").max(100),
  phone: z.string().trim().min(6, "Numéro de téléphone invalide").max(30),
  email: z.string().trim().email("Adresse e-mail invalide").max(255).optional().or(z.literal("")),
  room_id: z.string().uuid("Choisissez une chambre"),
  check_in: z.string().min(1, "Date d'arrivée requise"),
  check_out: z.string().min(1, "Date de départ requise"),
  guests: z.number().int().min(1).max(10),
  special_requests: z.string().trim().max(800).optional().or(z.literal("")),
});

const today = new Date().toISOString().slice(0, 10);

function Reservation() {
  const { room: presetRoom } = Route.useSearch();
  const { data: rooms } = useRooms();

  const [roomId, setRoomId] = useState<string | undefined>(presetRoom);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [confirmed, setConfirmed] = useState<{
    roomName: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    total: number;
  } | null>(null);


  const room = useMemo(
    () => (rooms ?? []).find((r) => r.id === roomId),
    [rooms, roomId],
  );
  const nights = nightsBetween(checkIn, checkOut);
  const total = room ? room.price_night * nights : 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      guest_name: fd.get("guest_name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      room_id: roomId ?? "",
      check_in: checkIn,
      check_out: checkOut,
      guests,
      special_requests: fd.get("special_requests"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (nights < 1) {
      toast.error("La date de départ doit suivre la date d'arrivée.");
      return;
    }
    if (room && guests > room.capacity) {
      toast.error(`Cette chambre accueille ${room.capacity} personne(s) au maximum.`);
      return;
    }

    openWhatsApp([
      "*Demande de réservation de chambre — Paquita*",
      `Chambre : ${room?.name ?? "—"}`,
      `Arrivée : ${parsed.data.check_in}`,
      `Départ : ${parsed.data.check_out}`,
      `Nuits : ${nights}`,
      `Personnes : ${parsed.data.guests}`,
      `Total estimé : ${formatFcfa(total)}`,
      `Nom : ${parsed.data.guest_name}`,
      `Téléphone : ${parsed.data.phone}`,
      parsed.data.email && `E-mail : ${parsed.data.email}`,
      parsed.data.special_requests && `Demandes : ${parsed.data.special_requests}`,
    ]);
    toast.success("Envoyez le message dans WhatsApp pour finaliser.");
    setConfirmed({
      roomName: room?.name ?? "Chambre",
      checkIn: parsed.data.check_in,
      checkOut: parsed.data.check_out,
      nights,
      total,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }



  if (confirmed) {
    return (
      <>
        <PageHero
          eyebrow="Réservation"
          title="Demande prête"
          intro="WhatsApp s'est ouvert avec votre demande : appuyez sur Envoyer. La réception vous confirme rapidement."
        />
        <section className="shell py-20">
          <Reveal className="mx-auto max-w-xl">
            <div className="surface-card space-y-6 bg-sand p-8">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Chambre</dt>
                  <dd>{confirmed.roomName}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Arrivée</dt>
                  <dd>{confirmed.checkIn}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Départ</dt>
                  <dd>{confirmed.checkOut}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Nuits</dt>
                  <dd>{confirmed.nights}</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="font-medium">Total estimé</dt>
                  <dd className="font-display text-3xl text-primary">
                    {formatFcfa(confirmed.total)}
                  </dd>
                </div>
              </dl>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Statut actuel : <span className="text-foreground">en attente de confirmation</span>.
                Règlement sur place, en espèces ou Mobile Money.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => setConfirmed(null)}>
                  Nouvelle réservation
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Réservation"
        title="Réserver une chambre"
        intro="Aucun paiement en ligne : votre demande est confirmée par la réception, par téléphone ou WhatsApp."
      />


      <section className="shell grid gap-10 py-20 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <Reveal>
          <form onSubmit={onSubmit} className="surface-card space-y-6 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="guest_name">Nom complet *</Label>
                <Input id="guest_name" name="guest_name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input id="phone" name="phone" type="tel" required maxLength={30} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={255}
                  
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Chambre *</Label>
              <Select value={roomId} onValueChange={setRoomId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {(rooms ?? [])
                    .filter((r) => r.available)
                    .map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name} — {formatFcfa(r.price_night)} / nuit
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="check_in">Arrivée *</Label>
                <Input
                  id="check_in"
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check_out">Départ *</Label>
                <Input
                  id="check_out"
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Personnes *</Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="special_requests">Demandes particulières</Label>
              <Textarea
                id="special_requests"
                name="special_requests"
                rows={4}
                maxLength={800}
                placeholder="Arrivée tardive, lit supplémentaire, étage bas…"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Envoyer sur WhatsApp
            </Button>

          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="surface-card sticky top-28 bg-sand p-8">
            <p className="eyebrow">Récapitulatif</p>
            <h2 className="mt-3 text-2xl">{room ? room.name : "Aucune chambre choisie"}</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted-foreground">Arrivée</dt>
                <dd>{checkIn || "—"}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted-foreground">Départ</dt>
                <dd>{checkOut || "—"}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted-foreground">Nuits</dt>
                <dd>{nights || "—"}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <dt className="text-muted-foreground">Tarif / nuit</dt>
                <dd>{room ? formatFcfa(room.price_night) : "—"}</dd>
              </div>
              <div className="flex items-baseline justify-between pt-2">
                <dt className="font-medium">Total estimé</dt>
                <dd className="font-display text-3xl text-primary">
                  {total ? formatFcfa(total) : "—"}
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Le règlement se fait sur place, en espèces ou par Mobile Money. Annulation
              gratuite jusqu'à 24h avant l'arrivée.
            </p>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
