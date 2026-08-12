import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

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
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Akses tidak diizinkan." }, { status: 401 });
    }

    const data = await request.json();
    const { label, category, src } = data;

    if (!label || !category || !src) {
      return NextResponse.json(
        { error: "Judul Foto, Kategori, dan File Gambar wajib diisi." },
        { status: 400 }
      );
    }

    const created = await db.gallery.create({
      data: {
        label: label.trim(),
        category: category.trim(),
        src: src.trim(),
      },
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error("Create gallery error:", error);
    return NextResponse.json({ error: "Gagal menambah foto galeri baru." }, { status: 500 });
  }
}
