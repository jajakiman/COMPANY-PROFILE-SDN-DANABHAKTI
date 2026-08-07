import { ImageSquare } from "@phosphor-icons/react/ssr";

type MediaPlaceholderProps = {
  label: string;
  className?: string;
  priority?: boolean;
};

export function MediaPlaceholder({
  label,
  className = "",
  priority = false,
}: MediaPlaceholderProps) {
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
