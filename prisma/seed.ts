import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const news = [
  {
    id: "af0e86ab-cead-4e35-80cb-46acc0311e8b",
    title: "Kegiatan Pramuka & Ekstrakurikuler SDN Danabhakti",
    category: "Akademik",
    date: "2026-07-28",
    excerpt:
      "Dokumentasi kebersamaan dan kedisiplinan siswa-siswi SDN Danabhakti dalam kegiatan Pramuka wajib.",
    content:
      "Ekstrakurikuler Pramuka di SDN Danabhakti dilaksanakan secara rutin setiap minggu untuk membentuk karakter kedisiplinan, kemandirian, dan semangat gotong royong peserta didik",
    image: "/images/hero/foto pramuka.png",
    featured: true,
    featuredOrder: 2,
    createdAt: new Date("2026-08-11T16:06:08.822Z"),
    updatedAt: new Date("2026-08-12T13:09:26.974Z"),
  },
  {
    id: "41179a26-a9ba-4e35-abe6-1831ff520d8f",
    title: "Aktivitas Pembelajaran Interaktif di Kelas",
    category: "Akademik",
    date: "2026-07-27",
    excerpt: "Suasana belajar mengajar yang aktif dan menyenangkan berbasis Kurikulum Merdeka.",
    content:
      "Proses pembelajaran di SDN Danabhakti mengedepankan pendekatan interaktif, kolaboratif, dan berdiferensiasi agar setiap siswa dapat mengembangkan potensinya secara maksimal.",
    image: "/images/hero/foto belajar dikelas.png",
    featured: true,
    featuredOrder: 1,
    createdAt: new Date("2026-08-11T16:06:08.822Z"),
    updatedAt: new Date("2026-08-12T13:09:18.549Z"),
  },
  {
    id: "de5a2e84-8842-402a-94f2-684c569c463e",
    title: "Kekompakan Guru dan Tenaga Kependidikan",
    category: "Warga Sekolah",
    date: "2026-07-31",
    excerpt: "Kekompakan 15 pendidik dan tenaga kependidikan dalam mengawal mutu sekolah.",
    content:
      "Bapak dan ibu guru serta tenaga kependidikan SDN Danabhakti berkomitmen meningkatkan mutu pelayanan pendidikan demi mewujudkan lulusan yang agamis, kreatif, dan berwawasan lingkungan.",
    image: "/images/hero/foto guru di kantor.png",
    featured: true,
    featuredOrder: 3,
    createdAt: new Date("2026-08-11T16:06:08.822Z"),
    updatedAt: new Date("2026-08-12T13:10:33.146Z"),
  },
];

const gallery = [
  {
    id: "27bedd25-0f5a-4e83-bcf5-78524bd4902b",
    label: "Kegiatan belajar outdoor di lingkungan sekolah.",
    category: "Lingkungan Sekolah",
    src: "/images/hero/foto belajar outdoor.png",
    createdAt: new Date("2026-08-11T16:06:08.837Z"),
    updatedAt: new Date("2026-08-12T03:44:13.896Z"),
  },
  {
    id: "49b90f79-9e83-446d-af00-20b737589149",
    label: "Proses pembelajaran aktif di dalam ruang kelas",
    category: "Pembelajaran",
    src: "/images/hero/foto belajar dikelas.png",
    createdAt: new Date("2026-08-11T16:06:08.837Z"),
    updatedAt: new Date("2026-08-11T16:06:08.837Z"),
  },
  {
    id: "fcca1c2e-6b41-421a-a168-b55cb3e37166",
    label: "Area kebun dan edukasi lingkungan hidup",
    category: "Fasilitas",
    src: "/images/hero/foto dikebun.png",
    createdAt: new Date("2026-08-11T16:06:08.837Z"),
    updatedAt: new Date("2026-08-11T16:06:08.837Z"),
  },
  {
    id: "21e19a05-2a1c-4aaa-97bf-cb06b7d7671f",
    label: "Kegiatan ekstrakurikuler Pramuka siswa",
    category: "Kegiatan Siswa",
    src: "/images/hero/foto pramuka.png",
    createdAt: new Date("2026-08-11T16:06:08.837Z"),
    updatedAt: new Date("2026-08-11T16:06:08.837Z"),
  },
  {
    id: "b653bba2-321c-469d-938b-330d2b4f7f77",
    label: "Bapak & Ibu Guru SDN Danabhakti",
    category: "Warga Sekolah",
    src: "/images/hero/foto guru di kantor.png",
    createdAt: new Date("2026-08-11T16:06:08.837Z"),
    updatedAt: new Date("2026-08-11T16:06:08.837Z"),
  },
];

function requiredEnvironment(name: "ADMIN_USERNAME" | "ADMIN_PASSWORD") {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} wajib diisi untuk provisioning admin.`);
  return value;
}

async function main() {
  const username = requiredEnvironment("ADMIN_USERNAME").toLowerCase();
  const password = requiredEnvironment("ADMIN_PASSWORD");

  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD minimal 12 karakter.");
  }

  for (const item of news) {
    await db.news.upsert({ where: { id: item.id }, update: {}, create: item });
  }

  for (const item of gallery) {
    await db.gallery.upsert({ where: { id: item.id }, update: {}, create: item });
  }

  const existingAdmin = await db.user.findUnique({ where: { username } });
  if (!existingAdmin) {
    await db.user.create({
      data: {
        username,
        password: await bcrypt.hash(password, 12),
        name: "Admin Sekolah",
      },
    });
  }

  console.log(
    `Seed selesai: ${news.length} berita, ${gallery.length} galeri, admin ${existingAdmin ? "sudah ada" : "dibuat"}.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
