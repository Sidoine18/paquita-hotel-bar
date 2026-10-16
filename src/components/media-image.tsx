import { cn } from "@/lib/utils";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  path?: string | null;
  fallback?: string;
};

/** Affiche une image à partir d'un lien (https://...) ou d'un fichier de /public (ex. /images/x.jpg). */
export function MediaImage({ path, fallback, className, alt = "", ...rest }: Props) {
  const src = path || fallback;
  if (!src) return <div className={cn("bg-muted", className)} aria-hidden />;
  return <img src={src} alt={alt} loading="lazy" className={className} {...rest} />;
}
