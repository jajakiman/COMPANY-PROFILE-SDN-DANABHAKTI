import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { isISODate, isNewsCategory } from "@/lib/news";
import { deleteBlobIfUnused, isAllowedMediaUrl, isBlobUrl } from "@/lib/media";
import { hasValidOrigin } from "@/lib/request";

export async function GET() {
  try {
    const news = await db.news.findMany({
      orderBy: { createdAt: "desc" },
    });

    const sortedNews = [...news].sort((a, b) => {
      const orderA = a.featuredOrder || 0;
      const orderB = b.featuredOrder || 0;
      if (orderA > 0 && orderB > 0) return orderA - orderB;
      if (orderA > 0) return -1;
      if (orderB > 0) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json(sortedNews);
  } catch (error) {
    console.error("Fetch news error:", error);
    return NextResponse.json({ error: "Gagal mengambil data berita." }, { status: 500 });
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
    if (isBlobUrl(image)) uploadedImage = image.trim();

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

    const created = await db.$transaction(async (tx) => {
      if (orderNum > 0) {
        await tx.news.updateMany({
          where: { featuredOrder: orderNum },
          data: { featuredOrder: 0, featured: false },
        });
      }

      return tx.news.create({
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

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error("Create news error:", error);
    await deleteBlobIfUnused(uploadedImage);
    return NextResponse.json({ error: "Gagal menambah berita baru." }, { status: 500 });
  }
}
