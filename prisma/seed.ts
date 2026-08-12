import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Admin user from environment variable or default fallback
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  await db.user.upsert({
    where: { username: adminUsername },
    update: { password: adminPasswordHash },
    create: {
      username: adminUsername,
      password: adminPasswordHash,
      name: "Lis Sutarsih, S.Pd (Admin)",
    },
  });
  console.log(`Default admin created: username '${adminUsername}'`);

  // Seed News initial data if empty
  const newsCount = await db.news.count();
  if (newsCount === 0) {
    await db.news.createMany({
      data: [
        {
          title: "Kegiatan Pramuka & Ekstrakurikuler SDN Danabhakti",
          category: "Kegiatan Siswa",
          date: "Dokumentasi Kegiatan",
          excerpt:
            "Dokumentasi kebersamaan dan kedisiplinan siswa-siswi SDN Danabhakti dalam kegiatan Pramuka wajib.",
          content:
            "Ekstrakurikuler Pramuka di SDN Danabhakti dilaksanakan secara rutin setiap minggu untuk membentuk karakter kedisiplinan, kemandirian, dan semangat gotong royong peserta didik.",
          image: "/images/hero/foto pramuka.png",
          featured: true,
        },
        {
          title: "Aktivitas Pembelajaran Interaktif di Kelas",
          category: "Akademik",
          date: "Kegiatan Akademik",
          excerpt:
            "Suasana belajar mengajar yang aktif dan menyenangkan berbasis Kurikulum Merdeka.",
          content:
            "Proses pembelajaran di SDN Danabhakti mengedepankan pendekatan interaktif, kolaboratif, dan berdiferensiasi agar setiap siswa dapat mengembangkan potensinya secara maksimal.",
          image: "/images/hero/foto belajar dikelas.png",
          featured: false,
        },
        {
          title: "Kekompakan Guru dan Tenaga Kependidikan",
          category: "Warga Sekolah",
          date: "Warga Sekolah",
          excerpt:
            "Kekompakan 15 pendidik dan tenaga kependidikan dalam mengawal mutu sekolah.",
          content:
            "Bapak dan ibu guru serta tenaga kependidikan SDN Danabhakti berkomitmen meningkatkan mutu pelayanan pendidikan demi mewujudkan lulusan yang agamis, kreatif, dan berwawasan lingkungan.",
          image: "/images/hero/foto guru di kantor.png",
          featured: false,
        },
      ],
    });
    console.log("Initial news seeded.");
  }

  // Seed Gallery initial data if empty
  const galleryCount = await db.gallery.count();
  if (galleryCount === 0) {
    await db.gallery.createMany({
      data: [
        {
          label: "Kegiatan belajar outdoor di lingkungan sekolah",
          category: "Lingkungan Sekolah",
          src: "/images/hero/foto belajar outdoor.png",
        },
        {
          label: "Proses pembelajaran aktif di dalam ruang kelas",
          category: "Pembelajaran",
          src: "/images/hero/foto belajar dikelas.png",
        },
        {
          label: "Area kebun dan edukasi lingkungan hidup",
          category: "Fasilitas",
          src: "/images/hero/foto dikebun.png",
        },
        {
          label: "Kegiatan ekstrakurikuler Pramuka siswa",
          category: "Kegiatan Siswa",
          src: "/images/hero/foto pramuka.png",
        },
        {
          label: "Bapak & Ibu Guru SDN Danabhakti",
          category: "Warga Sekolah",
          src: "/images/hero/foto guru di kantor.png",
        },
      ],
    });
    console.log("Initial gallery seeded.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
