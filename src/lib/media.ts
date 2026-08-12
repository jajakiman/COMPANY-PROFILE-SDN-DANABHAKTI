import { del } from "@vercel/blob";
import { db } from "@/lib/db";

export function isBlobUrl(value: string) {
  try {
    const url = new URL(value);
    const allowedHostname = process.env.BLOB_STORE_HOSTNAME;
    return Boolean(
      allowedHostname &&
        url.protocol === "https:" &&
        url.hostname === allowedHostname &&
        url.pathname.startsWith("/school-media/")
    );
  } catch {
    return false;
  }
}

export function isAllowedMediaUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const normalized = value.trim();
  const isStaticImage = normalized.startsWith("/images/") && !normalized.includes("..");
  return isStaticImage || isBlobUrl(normalized);
}

export async function deleteBlobIfUnused(url: string | null | undefined) {
  if (!url || !isBlobUrl(url) || !process.env.BLOB_READ_WRITE_TOKEN) return;

  try {
    const [newsReferences, galleryReferences] = await Promise.all([
      db.news.count({ where: { image: url } }),
      db.gallery.count({ where: { src: url } }),
    ]);

    if (newsReferences + galleryReferences > 0) return;
    await del(url);
  } catch (error) {
    console.error("Blob cleanup error:", error);
  }
}
