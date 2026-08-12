# Deployment Production

Dokumen ini menjelaskan perubahan persistence dan urutan aman deployment SDN Danabhakti ke Vercel.

## Arsitektur

- Aplikasi: Next.js di Vercel.
- Database: Neon PostgreSQL melalui Prisma.
- Gambar CMS: public Vercel Blob.
- Production branch: `main`.
- Preview branch: `develop` atau Pull Request.

SQLite `prisma/dev.db` dan penulisan ke `public/uploads` tidak digunakan lagi karena filesystem Vercel tidak persisten.

## Perubahan Implementasi

### PostgreSQL

- `prisma/schema.prisma` menggunakan provider `postgresql`.
- `DATABASE_URL` digunakan oleh runtime dan sebaiknya memakai URL Neon pooled.
- `DIRECT_URL` digunakan Prisma migration dan memakai URL Neon direct/unpooled.
- Migration awal tersedia di `prisma/migrations/20260812150000_init_postgresql`.
- `prisma/seed.ts` berisi salinan idempotent data SQLite terakhir: 3 berita dan 5 galeri.
- Seed tidak menyalin hash/password admin lokal.
- Admin production dibuat hanya dari `ADMIN_USERNAME` dan `ADMIN_PASSWORD` yang eksplisit.
- Seed tidak mereset password jika username tersebut sudah ada.

### Vercel Blob

- Browser mengunggah gambar langsung dengan `@vercel/blob/client`.
- `/api/upload` hanya menerbitkan upload token setelah session admin diverifikasi.
- Format yang diterima: JPEG, PNG, dan WebP.
- Ukuran maksimal: 5 MB.
- URL media database hanya menerima `/images/...` atau URL milik hostname Blob yang dikonfigurasi.
- Blob lama dibersihkan setelah gambar diganti atau record dihapus, selama tidak dipakai record lain.
- Blob baru yang gagal disimpan ke database dibersihkan secara best-effort.

### Keamanan dan Operasional

- `JWT_SECRET` production wajib minimal 32 karakter dan tidak memiliki fallback production.
- Mutasi login, logout, berita, galeri, dan upload memvalidasi same-origin request.
- Login dibatasi 5 kegagalan per IP atau username dalam 15 menit menggunakan PostgreSQL.
- `/api/health` memeriksa koneksi database dan mengembalikan `503` ketika Neon tidak tersedia.
- `/admin`, `/login`, dan `/api` dilarang pada `robots.txt`.
- Build menjalankan `prisma generate` sebelum `next build`.
- Migration dan seed tidak dijalankan otomatis dari Vercel build untuk mencegah race condition Preview/Production.

## 1. Buat Neon PostgreSQL

1. Buat project Neon production.
2. Ambil pooled connection string sebagai `DATABASE_URL`.
3. Ambil direct connection string sebagai `DIRECT_URL`.
4. Pastikan kedua URL menyertakan konfigurasi SSL yang diberikan Neon.
5. Untuk Preview, buat Neon branch/database terpisah. Jangan arahkan Preview ke database production.

Contoh bentuk URL, bukan nilai aktual:

```text
DATABASE_URL=postgresql://user:password@pooled-host/database?sslmode=require
DIRECT_URL=postgresql://user:password@direct-host/database?sslmode=require
```

## 2. Buat Vercel Blob

1. Buka Vercel Project lalu tab Storage.
2. Buat atau hubungkan Blob store production.
3. Hubungkan store ke project agar `BLOB_READ_WRITE_TOKEN` tersedia.
4. Salin hostname public store, tanpa `https://` dan tanpa path, sebagai `BLOB_STORE_HOSTNAME`.

Contoh:

```text
BLOB_STORE_HOSTNAME=abc123.public.blob.vercel-storage.com
```

Gunakan Blob store terpisah untuk Preview agar file uji tidak bercampur dengan production.

## 3. Environment Vercel

Isi pada Settings > Environment Variables > Production:

```text
NEXT_PUBLIC_SITE_URL=https://www.sdn-danabhakti.my.id
DATABASE_URL=<Neon pooled URL>
DIRECT_URL=<Neon direct URL>
JWT_SECRET=<secret acak minimal 32 karakter>
BLOB_READ_WRITE_TOKEN=<token dari Vercel Blob>
BLOB_STORE_HOSTNAME=<hostname public Blob store>
```

Untuk satu kali seed/provisioning:

```text
ADMIN_USERNAME=<username admin production>
ADMIN_PASSWORD=<password baru minimal 12 karakter>
```

Jangan menggunakan password admin lokal. Hapus `ADMIN_PASSWORD` dari Vercel setelah provisioning selesai jika proses operasional memungkinkan.

Untuk menghasilkan JWT secret:

```bash
openssl rand -base64 48
```

Jangan menambahkan prefix `NEXT_PUBLIC_` pada secret, token, password, atau URL database.

## 4. Migration dan Data Awal

Jalankan dari mesin/release environment yang memiliki environment production. Jangan menjalankannya otomatis di setiap Preview build.

```bash
npm ci
npm run db:migrate:deploy
npm run db:migrate:status
npm run db:seed
```

Hasil seed yang diharapkan:

```text
3 berita
5 galeri
1 admin baru, atau admin lama dipertahankan
```

Seed dapat dijalankan ulang. Record berita/galeri menggunakan ID tetap dan tidak diduplikasi. Password admin existing tidak diubah.

## 5. Vercel Project Settings

```text
Production Branch : main
Framework Preset  : Next.js
Root Directory    : ./
Install Command   : default (npm install)
Build Command     : npm run build
Output Directory  : default Next.js
Node.js Version   : 22.x
```

Variabel Preview wajib mengarah ke Neon branch dan Blob store Preview. Preview yang membawa CMS sebaiknya memakai Deployment Protection.

## 6. Release ke Main

1. Pastikan perubahan aplikasi sudah committed pada `develop`.
2. Jangan commit `.env.local`, `prisma/dev.db`, `public/uploads`, token, secret, atau password.
3. Jalankan verifikasi lokal/CI:

```bash
npm ci
npm run lint
npm run typecheck
npm exec prisma validate
npm run build
```

4. Deploy `develop` sebagai Preview dengan resource staging.
5. Uji login dan seluruh CRUD berita/galeri.
6. Upload satu gambar, redeploy Preview, lalu pastikan data dan gambar tetap tersedia.
7. Jalankan migration dan seed production seperti bagian 4.
8. Merge Pull Request `develop` ke `main`.
9. Pastikan Vercel Production deploy menggunakan commit `main` yang benar.

## 7. Verifikasi Production

Periksa health dan redirect:

```bash
curl -fsS https://www.sdn-danabhakti.my.id/api/health
curl -I https://sdn-danabhakti.my.id
curl -I https://www.sdn-danabhakti.my.id
```

Health yang benar:

```json
{"status":"ok","database":"connected"}
```

Lakukan smoke test CMS:

1. Login dengan admin production.
2. Tambah berita beserta gambar baru.
3. Pastikan berita muncul di halaman publik.
4. Ganti gambar berita dan pastikan URL baru berasal dari Blob production.
5. Tambah, edit, dan hapus satu foto galeri.
6. Redeploy production.
7. Pastikan data dan semua gambar tetap ada setelah redeploy.
8. Pastikan request tanpa login ke mutation API menghasilkan `401`.

## Rollback

- Untuk rilis cutover pertama, jangan rollback ke commit SQLite. Gunakan commit rollback yang tetap memakai Neon/Blob.
- Setelah seluruh deployment history sudah memakai Neon/Blob, rollback kode dapat memakai deployment Vercel sebelumnya yang kompatibel.
- Jangan menghapus migration yang sudah diterapkan.
- Backup/branch database Neon sebelum perubahan schema berikutnya.
- Perubahan schema berikutnya harus backward-compatible dengan deployment sebelumnya selama proses rollout.
