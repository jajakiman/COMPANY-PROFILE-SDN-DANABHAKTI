import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { isISODate, isNewsCategory } from "@/lib/news";
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
    const { title, category, date, excerpt, content, image, featuredOrder } = data;

    if (![title, excerpt, image].every((value) => typeof value === "string" && value.trim())) {
      return NextResponse.json(
        { error: "Judul, ringkasan berita, dan gambar wajib diisi." },
        { status: 400 }
      );
    }

    if (!isAllowedMediaUrl(image)) {
      return NextResponse.json({ error: "URL gambar berita tidak valid." }, { status: 400 });
    }
    incomingImage = image.trim();

    if (!isNewsCategory(category)) {
      return NextResponse.json({ error: "Kategori berita tidak valid." }, { status: 400 });
    }

    if (!isISODate(date)) {
      return NextResponse.json({ error: "Tanggal berita wajib diisi dengan format yang valid." }, { status: 400 });
    }

    const orderNum = Number(featuredOrder) || 0;

    if (!Number.isInteger(orderNum) || orderNum < 0 || orderNum > 3) {
      return NextResponse.json({ error: "Posisi berita utama tidak valid." }, { status: 400 });
    }

    const previous = await db.news.findUnique({ where: { id }, select: { image: true } });
    if (!previous) {
      return NextResponse.json({ error: "Berita tidak ditemukan." }, { status: 404 });
    }

    const updated = await db.$transaction(async (tx) => {
      if (orderNum > 0) {
        await tx.news.updateMany({
          where: { featuredOrder: orderNum, NOT: { id } },
          data: { featuredOrder: 0, featured: false },
        });
      }

      return tx.news.update({
        where: { id },
        data: {
          title: title.trim(),
          category,
          date,
          excerpt: excerpt.trim(),
          content: typeof content === "string" ? content.trim() : "",
          image: image.trim(),
          featured: orderNum > 0,
          featuredOrder: orderNum,
        },
      });
    });

    revalidatePath("/");
    revalidatePath("/admin");
    if (previous.image !== updated.image) await deleteBlobIfUnused(previous.image);

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update news error:", error);
    await deleteBlobIfUnused(incomingImage);
    return NextResponse.json({ error: "Gagal memperbarui berita." }, { status: 500 });
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
    const deleted = await db.news.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/admin");
    await deleteBlobIfUnused(deleted.image);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete news error:", error);
    return NextResponse.json({ error: "Gagal menghapus berita." }, { status: 500 });
  }
}
