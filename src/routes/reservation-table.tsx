import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion-primitives";
import { SITE, openWhatsApp } from "@/lib/site";

export const Route = createFileRoute("/reservation-table")({
  head: () => ({
    meta: [
      { title: "Réserver une table — Restaurant Paquita, Bohicon" },
      {
        name: "description",
        content:
          "Réservez votre table au restaurant Paquita à Bohicon : dîner en famille, repas d'affaires ou occasion spéciale, 7 jours sur 7.",
      },
      { property: "og:title", content: "Réserver une table — Restaurant Paquita" },
      {
        property: "og:description",
        content: "Réservation de table au restaurant Paquita, Bohicon, Bénin.",
      },
    ],
  }),
  component: ReservationTable,
});

const schema = z.object({
  guest_name: z.string().trim().min(2, "Indiquez votre nom").max(100),
  phone: z.string().trim().min(6, "Numéro de téléphone invalide").max(30),
  email: z.string().trim().email("Adresse e-mail invalide").max(255).optional().or(z.literal("")),
  booking_date: z.string().min(1, "Date requise"),
  booking_time: z.string().min(1, "Heure requise"),
  party_size: z.number().int().min(1).max(30),
  occasion: z.string().trim().max(200).optional().or(z.literal("")),
});

const today = new Date().toISOString().slice(0, 10);

function ReservationTable() {
  const [confirmed, setConfirmed] = useState<{
    date: string;
    time: string;
    party: number;
  } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      guest_name: fd.get("guest_name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      booking_date: fd.get("booking_date"),
      booking_time: fd.get("booking_time"),
      party_size: Number(fd.get("party_size")),
      occasion: fd.get("occasion"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    openWhatsApp([
      "*Réservation de table — Restaurant Paquita*",
      `Date : ${parsed.data.booking_date}`,
      `Heure : ${parsed.data.booking_time}`,
      `Convives : ${parsed.data.party_size}`,
      `Nom : ${parsed.data.guest_name}`,
      `Téléphone : ${parsed.data.phone}`,
      parsed.data.email && `E-mail : ${parsed.data.email}`,
      parsed.data.occasion && `Occasion : ${parsed.data.occasion}`,
    ]);
    toast.success("Envoyez le message dans WhatsApp pour finaliser.");
    form.reset();
    setConfirmed({
      date: parsed.data.booking_date,
      time: parsed.data.booking_time,
      party: parsed.data.party_size,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (confirmed) {
    return (
      <>
        <PageHero
          eyebrow="Restaurant"
          title="Table demandée"
          intro="WhatsApp s'est ouvert avec votre demande : appuyez sur Envoyer pour la transmettre."
        />
        <section className="shell py-20">
          <Reveal className="mx-auto max-w-xl">
            <div className="surface-card space-y-6 bg-sand p-8">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd>{confirmed.date}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Heure</dt>
                  <dd>{confirmed.time}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Convives</dt>
                  <dd>{confirmed.party}</dd>
                </div>
              </dl>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Statut actuel : <span className="text-foreground">en attente de confirmation</span>.
                Une question ? Appelez-nous au {SITE.phoneDisplay}.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => setConfirmed(null)}>
                  Nouvelle demande
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
        eyebrow="Restaurant"
        title="Réserver une table"
        intro={`Service de 07h00 à 23h00. Pour les groupes de plus de dix personnes, appelez-nous au ${SITE.phoneDisplay}.`}
      />

      <section className="shell py-20">
        <Reveal className="mx-auto max-w-2xl">
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
              <div className="space-y-2">
                <Label htmlFor="booking_date">Date *</Label>
                <Input id="booking_date" name="booking_date" type="date" min={today} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking_time">Heure *</Label>
                <Input
                  id="booking_time"
                  name="booking_time"
                  type="time"
                  min="07:00"
                  max="23:00"
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="party_size">Nombre de convives *</Label>
                <Input
                  id="party_size"
                  name="party_size"
                  type="number"
                  min={1}
                  max={30}
                  defaultValue={2}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occasion">Occasion / précisions</Label>
              <Textarea
                id="occasion"
                name="occasion"
                rows={4}
                maxLength={200}
                placeholder="Anniversaire, repas d'affaires, table en terrasse…"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Envoyer sur WhatsApp
            </Button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
