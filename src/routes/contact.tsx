import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion-primitives";
import { SITE, openWhatsApp } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & accès — Paquita Hôtel Bohicon" },
      {
        name: "description",
        content:
          "Contactez Paquita Hôtel Restaurant Bar à Bohicon : téléphone, WhatsApp, formulaire en ligne et plan d'accès au centre-ville.",
      },
      { property: "og:title", content: "Contact & accès — Paquita Hôtel Bohicon" },
      {
        property: "og:description",
        content: "Téléphone, WhatsApp et plan d'accès à l'hôtel Paquita, Bohicon, Bénin.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom").max(100),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message trop court").max(1500),
});

function Contact() {

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    openWhatsApp([
      "*Message — Paquita Hôtel*",
      `Nom : ${parsed.data.name}`,
      `E-mail : ${parsed.data.email}`,
      parsed.data.phone && `Téléphone : ${parsed.data.phone}`,
      parsed.data.subject && `Objet : ${parsed.data.subject}`,
      "",
      parsed.data.message,
    ]);
    toast.success("Envoyez le message dans WhatsApp.");
    form.reset();
  }

  return (
    <>
      <PageHero
        eyebrow="Nous joindre"
        title="Contact & accès"
        intro="Une question sur une réservation, un événement ou un tarif ? Écrivez-nous, appelez la réception ou passez nous voir."
      />

      <section className="shell grid gap-14 py-20 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="space-y-6 text-sm">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium">Adresse</p>
                <p className="text-muted-foreground">{SITE.address}</p>
                <a
                  href={SITE.mapLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Ouvrir dans Google Maps
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium">Téléphone & WhatsApp</p>
                <a href={SITE.phoneHref} className="text-muted-foreground hover:text-primary">
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium">Horaires</p>
                <p className="text-muted-foreground">{SITE.hours.reception}</p>
                <p className="text-muted-foreground">{SITE.hours.restaurant}</p>
                <p className="text-muted-foreground">{SITE.hours.bar}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-medium">Écrire</p>
                <p className="text-muted-foreground">
                  Utilisez le formulaire — la réception traite les demandes chaque jour.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-md border border-border">
            <iframe
              title="Plan d'accès à Paquita Hôtel Restaurant Bar, Bohicon"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full border-0"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="surface-card space-y-5 p-8">
            <h2 className="text-2xl">Nous écrire</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input id="name" name="name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" name="phone" type="tel" maxLength={30} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" name="subject" maxLength={150} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" name="message" rows={6} required maxLength={1500} />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Envoyer sur WhatsApp
            </Button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
