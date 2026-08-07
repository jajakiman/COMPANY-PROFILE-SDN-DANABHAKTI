export const siteConfig = {
  name: "SDN Danabhakti",
  shortName: "SDN Danabhakti",
  description:
    "Website resmi SDN Danabhakti untuk informasi profil, struktur sekolah, kegiatan, dan layanan masyarakat.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const navigation = [
  { label: "Profil", href: "#profil" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Struktur", href: "#struktur" },
  { label: "Kegiatan", href: "#kegiatan" },
  { label: "Kontak", href: "#kontak" },
];

export const schoolProfile = {
  heroTitle: "Tempat tumbuh, belajar, dan berkarya bersama.",
  heroDescription:
    "Mengenal SDN Danabhakti lebih dekat melalui profil, warga sekolah, dan kegiatan kami.",
  introduction:
    "SDN Danabhakti berkomitmen menghadirkan lingkungan belajar yang aman, aktif, dan mendukung perkembangan setiap peserta didik.",
  history:
    "Sejarah, identitas, dan perjalanan SDN Danabhakti akan dilengkapi berdasarkan informasi resmi dari pihak sekolah.",
  principalMessage:
    "Sambutan resmi Kepala Sekolah akan ditampilkan di area ini setelah materi diterima.",
  identity: [
    { label: "Nama sekolah", value: "SDN Danabhakti" },
    { label: "Status sekolah", value: "Sekolah Dasar Negeri" },
    { label: "NPSN", value: "Akan dilengkapi" },
    { label: "Akreditasi", value: "Akan dilengkapi" },
  ],
};

export const visionMission = {
  vision:
    "Visi resmi sekolah akan ditempatkan di sini sebagai arah utama penyelenggaraan pendidikan SDN Danabhakti.",
  missions: [
    "Misi sekolah poin pertama akan dilengkapi dari dokumen resmi.",
    "Misi sekolah poin kedua akan dilengkapi dari dokumen resmi.",
    "Misi sekolah poin ketiga akan dilengkapi dari dokumen resmi.",
    "Misi sekolah poin keempat akan dilengkapi dari dokumen resmi.",
  ],
};

export const organization = [
  {
    role: "Kepala Sekolah",
    name: "Nama akan dilengkapi",
    description: "Memimpin penyelenggaraan pendidikan dan pengembangan sekolah.",
    level: 1,
  },
  {
    role: "Komite Sekolah",
    name: "Nama akan dilengkapi",
    description: "Mendukung kolaborasi antara sekolah, orang tua, dan masyarakat.",
    level: 2,
  },
  {
    role: "Koordinator Guru",
    name: "Nama akan dilengkapi",
    description: "Mengoordinasikan pelaksanaan pembelajaran dan kegiatan akademik.",
    level: 2,
  },
  {
    role: "Tenaga Kependidikan",
    name: "Nama akan dilengkapi",
    description: "Mendukung layanan administrasi dan operasional sekolah.",
    level: 2,
  },
];

export const facilities = [
  {
    title: "Ruang Belajar",
    description: "Informasi ruang kelas dan sarana pembelajaran akan dilengkapi.",
  },
  {
    title: "Perpustakaan",
    description: "Informasi koleksi dan layanan literasi sekolah akan dilengkapi.",
  },
  {
    title: "Area Kegiatan",
    description: "Informasi lapangan dan ruang kegiatan siswa akan dilengkapi.",
  },
];

export const news = [
  {
    title: "Kegiatan terbaru SDN Danabhakti",
    date: "Tanggal akan dilengkapi",
    category: "Kegiatan Sekolah",
    excerpt:
      "Dokumentasi dan ringkasan kegiatan terbaru akan ditampilkan setelah materi resmi tersedia.",
    featured: true,
  },
  {
    title: "Informasi akademik sekolah",
    date: "Tanggal akan dilengkapi",
    category: "Akademik",
    excerpt: "Pengumuman akademik akan dimuat pada area ini.",
    featured: false,
  },
  {
    title: "Kabar warga sekolah",
    date: "Tanggal akan dilengkapi",
    category: "Warga Sekolah",
    excerpt: "Kabar guru, siswa, dan lingkungan sekolah akan dimuat di sini.",
    featured: false,
  },
];

export const gallery = [
  { label: "Foto gedung sekolah", size: "wide" },
  { label: "Foto kegiatan belajar", size: "square" },
  { label: "Foto fasilitas", size: "tall" },
  { label: "Foto kegiatan siswa", size: "square" },
  { label: "Foto warga sekolah", size: "wide" },
];

export const contact = {
  address: "Alamat lengkap sekolah akan dilengkapi",
  phone: "Nomor telepon akan dilengkapi",
  email: "Email sekolah akan dilengkapi",
  hours: "Jam pelayanan akan dilengkapi",
};
