import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { deleteBlobIfUnused, isAllowedMediaUrl } from "@/lib/media";
import { hasValidOrigin } from "@/lib/request";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let incomingImage: string | null = null;

  try {
    const session = await getSession();
    if (!session || !hasValidOrigin(request)) {
      return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const { label, category, src } = data;

    if (![label, category].every((value) => typeof value === "string" && value.trim()) || !isAllowedMediaUrl(src)) {
      return NextResponse.json(
        { error: "Judul foto, kategori, dan URL gambar yang valid wajib diisi." },
        { status: 400 }
      );
    }
    incomingImage = src.trim();

    const previous = await db.gallery.findUnique({ where: { id }, select: { src: true } });
    if (!previous) {
      return NextResponse.json({ error: "Foto galeri tidak ditemukan." }, { status: 404 });
    }

    const updated = await db.gallery.update({
      where: { id },
      data: {
        label: label?.trim(),
        category: category?.trim(),
        src: src?.trim(),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    if (previous.src !== updated.src) await deleteBlobIfUnused(previous.src);

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update gallery error:", error);
    await deleteBlobIfUnused(incomingImage);
    return NextResponse.json({ error: "Gagal memperbarui foto galeri." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !hasValidOrigin(request)) {
      return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await db.gallery.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/admin");
    await deleteBlobIfUnused(deleted.src);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete gallery error:", error);
    return NextResponse.json({ error: "Gagal menghapus foto galeri." }, { status: 500 });
  }
}
