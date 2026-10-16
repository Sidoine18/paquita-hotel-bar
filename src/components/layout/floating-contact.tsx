import { motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingContact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3"
    >
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Nous écrire sur WhatsApp"
        className="flex size-13 items-center justify-center rounded-full bg-forest text-forest-foreground shadow-[var(--shadow-lift)] transition-transform duration-200 hover:scale-105"
      >
        <MessageCircle className="size-5.5" aria-hidden />
      </a>
      <a
        href={SITE.phoneHref}
        aria-label={`Appeler le ${SITE.phoneDisplay}`}
        className="flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-lift)] transition-transform duration-200 hover:scale-105 sm:hidden"
      >
        <Phone className="size-5.5" aria-hidden />
      </a>
    </motion.div>
  );
}
