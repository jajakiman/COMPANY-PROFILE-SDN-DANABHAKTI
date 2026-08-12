import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteBlobIfUnused, isBlobUrl } from "@/lib/media";
import { hasValidOrigin } from "@/lib/request";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.BLOB_STORE_HOSTNAME) {
      return NextResponse.json({ error: "Penyimpanan gambar belum dikonfigurasi." }, { status: 503 });
    }

    const body = (await request.json()) as HandleUploadBody;
    if (body.type === "blob.generate-client-token") {
      const session = await getSession();
      if (!session || !hasValidOrigin(request)) {
        return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
      }
    }

    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("school-media/")) {
          throw new Error("Lokasi unggahan tidak valid.");
        }

        return {
          allowedContentTypes: ALLOWED_MIME_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE,
          addRandomSuffix: true,
          allowOverwrite: false,
        };
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Upload token error:", error);
    return NextResponse.json({ error: "Gagal menyiapkan unggahan gambar." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || !hasValidOrigin(request)) {
    return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
  }

  const data = await request.json().catch(() => null);
  if (!data || !isBlobUrl(data.url)) {
    return NextResponse.json({ error: "URL gambar tidak valid." }, { status: 400 });
  }

  await deleteBlobIfUnused(data.url);
  return NextResponse.json({ success: true });
}
