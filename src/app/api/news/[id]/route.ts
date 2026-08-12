import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const { title, category, date, excerpt, content, image, featuredOrder } = data;

    const orderNum = Number(featuredOrder) || 0;

    // Un-assign any other news with the same order slot
    if (orderNum > 0) {
      await db.news.updateMany({
        where: { featuredOrder: orderNum, NOT: { id } },
        data: { featuredOrder: 0, featured: false },
      });
    }

    const updated = await db.news.update({
      where: { id },
      data: {
        title: title?.trim(),
        category: category?.trim(),
        date: date?.trim(),
        excerpt: excerpt?.trim(),
        content: content?.trim(),
        image: image?.trim(),
        featured: orderNum > 0,
        featuredOrder: orderNum,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update news error:", error);
    return NextResponse.json({ error: "Gagal memperbarui berita." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
    }

    const { id } = await params;
    await db.news.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete news error:", error);
    return NextResponse.json({ error: "Gagal menghapus berita." }, { status: 500 });
  }
}
