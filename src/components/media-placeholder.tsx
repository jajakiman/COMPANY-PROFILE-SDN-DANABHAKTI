import { ImageSquare } from "@phosphor-icons/react/ssr";
import Image from "next/image";

type MediaPlaceholderProps = {
  label: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  src?: string;
  dummy?: boolean;
  showLabel?: boolean;
};

export function MediaPlaceholder({
  label,
  className = "",
  priority = false,
  sizes = "100vw",
  src,
  dummy = false,
  showLabel = true,
}: MediaPlaceholderProps) {
  if (src) {
    return (
      <div className={`media-placeholder media-placeholder--image ${!showLabel ? "media-placeholder--no-label" : ""} ${className}`}>
        <Image
          src={src}
          alt={label}
          fill
          priority={priority}
          sizes={sizes}
          className="media-placeholder-image"
        />
        {showLabel ? <span>{label}</span> : null}
        {dummy ? <small className="media-dummy-badge">Visual dummy</small> : null}
      </div>
    );
  }

  return (
    <div
      className={`media-placeholder ${className}`}
      role="img"
      aria-label={`${label}. Materi foto belum tersedia.`}
      data-priority={priority || undefined}
    >
      <ImageSquare aria-hidden="true" size={28} weight="duotone" />
      <span>{label}</span>
      <small>Materi resmi belum tersedia</small>
    </div>
  );
}
