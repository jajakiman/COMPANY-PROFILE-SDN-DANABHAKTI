# Company Profile SDN Danabhakti

Website company profile dan CMS SDN Danabhakti. Dibangun dengan Next.js App Router, TypeScript, Prisma, Neon PostgreSQL, dan Vercel Blob.

## Menjalankan Proyek

Persyaratan: Node.js 22, npm, database PostgreSQL, dan Vercel Blob untuk fitur upload.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Perintah

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
npm run db:migrate:deploy
npm run db:migrate:status
npm run db:seed
```

## Struktur Utama

```text
src/app/                 Halaman, API, metadata, sitemap, dan style global
src/components/          Komponen publik dan admin
src/data/site.ts         Konten profil sekolah dan fallback publik
prisma/                  Schema, migration, dan seed data awal
docs/deployment.md       Panduan Neon, Blob, Vercel, dan release main
```

## Konfigurasi

Salin `.env.example` menjadi `.env.local`, lalu isi seluruh koneksi development. Jangan commit `.env.local`, URL database, token Blob, JWT secret, atau password admin.

Panduan deployment production dan migrasi data tersedia di `docs/deployment.md`. Slot foto yang belum memiliki aset resmi dijelaskan di `docs/content-guide.md`.
