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
    const { label, category, src } = data;

    const updated = await db.gallery.update({
      where: { id },
      data: {
        label: label?.trim(),
        category: category?.trim(),
        src: src?.trim(),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update gallery error:", error);
    return NextResponse.json({ error: "Gagal memperbarui foto galeri." }, { status: 500 });
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
    await db.gallery.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete gallery error:", error);
    return NextResponse.json({ error: "Gagal menghapus foto galeri." }, { status: 500 });
  }
}
