import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { deleteBlobIfUnused, isAllowedMediaUrl, isBlobUrl } from "@/lib/media";
import { hasValidOrigin } from "@/lib/request";

export async function GET() {
  try {
    const items = await db.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Fetch gallery error:", error);
    return NextResponse.json({ error: "Gagal mengambil data galeri." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let uploadedImage: string | null = null;

  try {
    const session = await getSession();
    if (!session || !hasValidOrigin(request)) {
      return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
    }

    const data = await request.json();
    const { label, category, src } = data;

    if (![label, category].every((value) => typeof value === "string" && value.trim()) || !isAllowedMediaUrl(src)) {
      return NextResponse.json(
        { error: "Judul foto, kategori, dan URL gambar yang valid wajib diisi." },
        { status: 400 }
      );
    }
    if (isBlobUrl(src)) uploadedImage = src.trim();

    const created = await db.gallery.create({
      data: {
        label: label.trim(),
        category: category.trim(),
        src: src.trim(),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error("Create gallery error:", error);
    await deleteBlobIfUnused(uploadedImage);
    return NextResponse.json({ error: "Gagal menambah foto galeri baru." }, { status: 500 });
  }
}
