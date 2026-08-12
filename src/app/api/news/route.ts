import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

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
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
    }

    const data = await request.json();
    const { title, category, date, excerpt, content, image, featuredOrder } = data;

    if (!title || !category || !excerpt || !image) {
      return NextResponse.json(
        { error: "Judul, Kategori, Ringkasan Berita, dan Gambar wajib diisi." },
        { status: 400 }
      );
    }

    const orderNum = Number(featuredOrder) || 0;

    // If an order (1, 2, or 3) is selected, un-assign any other news with the same order
    if (orderNum > 0) {
      await db.news.updateMany({
        where: { featuredOrder: orderNum },
        data: { featuredOrder: 0, featured: false },
      });
    }

    const created = await db.news.create({
      data: {
        title: title.trim(),
        category: category.trim(),
        date: date?.trim() || "Dokumentasi Kegiatan",
        excerpt: excerpt.trim(),
        content: content?.trim() || "",
        image: image.trim(),
        featured: orderNum > 0,
        featuredOrder: orderNum,
      },
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error("Create news error:", error);
    return NextResponse.json({ error: "Gagal menambah berita baru." }, { status: 500 });
  }
}
