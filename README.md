# Company Profile SDN Danabhakti

Website company profile single-page untuk SDN Danabhakti. Dibangun dengan Next.js App Router, TypeScript, dan Tailwind CSS v4.

## Menjalankan Proyek

Persyaratan: Node.js 20.9 atau lebih baru dan npm.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Perintah

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Struktur Utama

```text
src/app/                 Route, metadata, sitemap, dan style global
src/components/          Header, form, dan placeholder media
src/data/site.ts         Seluruh konten sekolah
docs/content-guide.md    Daftar materi dan panduan penggantian konten
```

## Konfigurasi

Salin `.env.example` menjadi `.env.local`, lalu isi `NEXT_PUBLIC_SITE_URL` dengan domain produksi sekolah. Konten dan data kontak dapat diperbarui melalui `src/data/site.ts`.

Slot foto sengaja menggunakan placeholder sampai aset resmi sekolah tersedia. Lihat `docs/content-guide.md` untuk kebutuhan foto dan konten.
