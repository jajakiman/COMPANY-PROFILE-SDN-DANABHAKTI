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
    { label: "NPSN", value: "20207787" },
    { label: "Akreditasi", value: "A" },
  ],
};

export const visionMission = {
  vision: "Terwujudnya peserta didik yang bertakwa, mandiri, kreatif, dan berwawasan lingkungan hidup.",
  missions: [
    "Misi sekolah poin pertama akan dilengkapi dari dokumen resmi.",
    "Misi sekolah poin kedua akan dilengkapi dari dokumen resmi.",
    "Misi sekolah poin ketiga akan dilengkapi dari dokumen resmi.",
    "Misi sekolah poin keempat akan dilengkapi dari dokumen resmi.",
  ],
};

export const organization = {
  leader: {
    role: "Kepala Sekolah",
    name: "Lis Sutarsih, S.Pd",
  },
  groups: [
    {
      title: "Guru Mata Pelajaran",
      members: [
        { role: "Guru Pendidikan Agama Islam (PAI)", name: "Nurjanah, S.Pd.I., M.Pd" },
        { role: "Guru Pendidikan Agama Islam (PAI)", name: "Maya Nurmayanti, S.Pd" },
        { role: "Guru PJOK", name: "Gumelar, S.Pd" },
      ],
    },
    {
      title: "Tenaga Kependidikan",
      members: [
        { role: "Operator Sekolah", name: "Rusli Suhendar Tubari" },
        { role: "Tenaga Kependidikan", name: "Dwi Eka Supri Lestari" },
        { role: "Tenaga Kependidikan", name: "Regina Anggun Lestari" },
        { role: "Penjaga Sekolah", name: "Dadang Ruhimat" },
      ],
    },
    {
      title: "Guru Kelas",
      members: [
        { role: "Guru Kelas", name: "Iin Herlina, S.Pd" },
        { role: "Guru Kelas", name: "Widiyawati, S.Pd" },
        { role: "Guru Kelas", name: "Mela Fitriani, S.Pd" },
        { role: "Guru Kelas", name: "Neng Rosimah, S.Pd" },
        { role: "Guru Kelas", name: "Fersa Novyanty Hariansyah, S.Pd" },
      ],
    },
  ],
};

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
  { label: "Foto gedung sekolah", category: "Lingkungan sekolah" },
  { label: "Foto kegiatan belajar", category: "Pembelajaran" },
  { label: "Foto fasilitas", category: "Fasilitas" },
  { label: "Foto kegiatan siswa", category: "Kegiatan siswa" },
  { label: "Foto warga sekolah", category: "Warga sekolah" },
];

export const contact = {
  address: "Jl. Raya Sapan No.32, Tegalluar, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40297",
  phone: "Nomor telepon akan dilengkapi",
  email: "sdn.danabakti@gmail.com",
  hours: "Jam pelayanan akan dilengkapi",
  mapsUrl: "https://maps.app.goo.gl/5tCf1ZwZ8qXHFEwM7",
};
