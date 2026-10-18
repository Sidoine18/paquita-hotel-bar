import { useQuery } from "@tanstack/react-query";
import { ROOMS, MENU, TESTIMONIALS, GALLERY } from "@/data/content";

// Les contenus sont stockés dans src/data/content.ts (aucune base de données).
export function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => [...ROOMS].sort((a, b) => a.price_night - b.price_night),
  });
}

export function useMenu() {
  return useQuery({ queryKey: ["menu"], queryFn: async () => MENU });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () =>
      TESTIMONIALS.filter((t) => t.approved).sort((a, b) =>
        b.review_date.localeCompare(a.review_date),
      ),
  });
}

export function useGallery() {
  return useQuery({ queryKey: ["gallery"], queryFn: async () => GALLERY });
}
