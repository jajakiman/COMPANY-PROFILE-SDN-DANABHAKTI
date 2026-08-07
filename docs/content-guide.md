# Panduan Konten SDN Danabhakti

Semua konten sementara berada di `src/data/site.ts`. Ganti teks placeholder dengan informasi resmi tanpa mengubah nama properti.

## Materi Utama

- Logo sekolah dalam SVG atau PNG transparan beresolusi tinggi
- Foto utama gedung atau lingkungan sekolah dengan orientasi lanskap
- Foto sejarah atau gedung untuk bagian profil
- Foto kepala sekolah dan pengurus untuk struktur sekolah
- Foto fasilitas, kegiatan belajar, dan kegiatan siswa
- Visi, misi, sejarah, sambutan kepala sekolah, serta identitas sekolah
- Alamat, telepon, email, jam pelayanan, dan tautan Google Maps
- Tiga berita awal dengan judul, tanggal, kategori, ringkasan, dan foto

## Rekomendasi Foto

| Penempatan | Rasio | Ukuran Minimum |
| --- | --- | --- |
| Hero | 4:5 | 1200 x 1500 px |
| Profil | 4:3 | 1200 x 900 px |
| Fasilitas | 4:5 | 1200 x 1500 px |
| Berita utama | 16:9 | 1600 x 900 px |
| Galeri | Campuran | Sisi terpanjang 1600 px |

Pastikan foto memiliki izin publikasi. Hindari foto yang menampilkan data pribadi siswa, dokumen, atau papan informasi sensitif.

## Mengganti Placeholder

Gunakan komponen `next/image` dengan `alt` yang menjelaskan isi foto. Simpan aset di bawah `public/images/` dengan nama huruf kecil dan tanda hubung, misalnya `public/images/school/gedung-utama.webp`.
