export const SITE = {
  name: "Paquita Hôtel Restaurant Bar",
  shortName: "Paquita",
  city: "Bohicon",
  region: "Zou",
  country: "Bénin",
  address: "Bohicon, Zou, Bénin — Plus Code 52HQ+JC5",
  phoneDisplay: "+229 01 97 09 09 10",
  phoneHref: "tel:+2290197090910",
  whatsapp: "https://wa.me/2290197090910",
  facebook: "https://www.facebook.com/",
  rating: 3.8,
  reviewCount: 394,
  mapEmbed:
    "https://www.google.com/maps?q=52HQ%2BJC5%20Bohicon%2C%20B%C3%A9nin&output=embed",
  mapLink: "https://maps.google.com/?q=52HQ%2BJC5+Bohicon+Benin",
  hours: {
    reception: "Réception ouverte 24h/24, 7j/7",
    restaurant: "Restaurant : 07h00 – 23h00",
    bar: "Bar : 16h00 – 01h00 (02h00 le week-end)",
  },
} as const;

export const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/chambres", label: "Chambres" },
  { to: "/restaurant", label: "Restaurant & Bar" },
  { to: "/galerie", label: "Galerie" },
  { to: "/services", label: "Services" },
  { to: "/evenements", label: "Événements" },
  { to: "/a-propos", label: "À propos" },
  { to: "/avis", label: "Avis" },
  { to: "/contact", label: "Contact" },
] as const;

export function formatFcfa(value: number | null | undefined) {
  if (value == null) return "—";
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}

export function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

export const STATUS_LABEL: Record<string, string> = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  annulee: "Annulée",
  terminee: "Terminée",
};

export const STATUS_CLASS: Record<string, string> = {
  en_attente: "bg-accent text-accent-foreground",
  confirmee: "bg-forest text-forest-foreground",
  annulee: "bg-destructive/12 text-destructive",
  terminee: "bg-muted text-muted-foreground",
};

/** Ouvre WhatsApp avec un message pré-rempli vers le numéro de l'hôtel. */
export function openWhatsApp(lines: (string | false | null | undefined)[]) {
  const text = lines.filter(Boolean).join("\n");
  const url = `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url;
}
