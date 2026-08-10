export const siteConfig = {
  name: "SDN Danabhakti",
  shortName: "SDN Danabhakti",
  description:
    "Website resmi SDN Danabhakti Kecamatan Bojongsoang, Kabupaten Bandung. Informasi profil, Kurikulum Merdeka, kegiatan sekolah, dan layanan masyarakat.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const navigation = [
  { label: "Profil", href: "#profil" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Struktur", href: "#struktur" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Kegiatan", href: "#kegiatan" },
  { label: "Kontak", href: "#kontak" },
];

export const schoolProfile = {
  motto: "AKSI (Agamis, Kreatif, Solidaritas, Indah)",
  heroTitle: "Tempat tumbuh, belajar, dan berkarya bersama.",
  heroDescription:
    "SDN Danabhakti berkomitmen menghadirkan pendidikan inklusif yang agamis, kreatif, dan berwawasan lingkungan hidup (Adiwiyata).",
  introduction:
    "Sekolah Dasar Negeri Danabhakti adalah sekolah umum di Desa Tegalluar, Kec. Bojongsoang yang membina 271 siswa (11 rombongan belajar). Kami menyelenggarakan Kurikulum Merdeka berpusat pada peserta didik dengan prinsip pembiasaan 7 Kebiasaan Anak Indonesia Hebat.",
  history:
    "Berdiri sejak 1 Januari 1977 berdasarkan Instruksi Presiden No. 3 Tahun 1977 (Izin Operasional No. 421/PSD/1980). SDN Danabhakti terletak di jalur strategis Desa Tegalluar dekat stasiun Kereta Cepat Tegalluar, Masjid Raya Al-Jabbar, dan Stadion GBLA. Sekolah aktif sebagai peserta Sekolah Adiwiyata Tingkat Provinsi Jawa Barat.",
  principalMessage:
    "Kurikulum SDN Danabhakti Tahun Ajaran 2025/2026 ini merupakan komitmen bersama warga sekolah untuk mengantarkan peserta didik menjadi pribadi bertakwa, mandiri, bernalar kritis, dan berwawasan lingkungan hidup.",
  identity: [
    { label: "Nama Sekolah", value: "SDN Danabhakti" },
    { label: "NPSN", value: "20207787" },
    { label: "Status Sekolah", value: "Negeri (Akreditasi A)" },
    { label: "SK Pendirian", value: "Inpres No. 3 Tahun 1977" },
    { label: "Izin Operasional", value: "421/PSD/1980" },
    { label: "Jumlah Peserta Didik", value: "271 Siswa (11 Rombel)" },
    { label: "Pendidik & Tendik", value: "15 Orang" },
    { label: "Waktu Penyelenggaraan", value: "5 Hari / Double Shift" },
  ],
};

export const heroSlides = [
  { label: "Kegiatan pembelajaran outdoor siswa", src: "/images/hero/foto belajar outdoor.png" },
  { label: "Kegiatan ekstrakurikuler Pramuka", src: "/images/hero/foto pramuka.png" },
  { label: "Suasana belajar mengajar di kelas", src: "/images/hero/foto belajar dikelas.png" },
];

export const visionMission = {
  motto: "AKSI (Agamis, Kreatif, Solidaritas, Indah)",
  vision: "TERWUJUDNYA PESERTA DIDIK YANG BERTAKWA, MANDIRI, KREATIF DAN BERWAWASAN LINGKUNGAN HIDUP",
  missions: [
    "Meningkatkan mutu pendidikan sesuai dengan tuntutan masyarakat dan perkembangan ilmu pengetahuan dan teknologi (IPTEK).",
    "Meningkatkan prestasi di bidang seni budaya sehingga memperkuat budaya bangsa.",
    "Membentuk siswa berkepribadian, berbudi pekerti luhur, taat beribadah sesuai agamanya dan kuat dalam IMTAK.",
    "Membekali siswa agar mempunyai wawasan luas secara global.",
    "Menciptakan lingkungan sekolah yang sejuk, nyaman, indah, asri, dan berwawasan lingkungan hidup.",
    "Meningkatkan lingkungan sekolah peduli terhadap kelestarian sumber daya alam sekitar.",
    "Meningkatkan upaya pelestarian lingkungan hidup.",
    "Meningkatkan kualitas lulusan.",
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
        { role: "Guru PAI", name: "Nurjanah, S.Pd.I., M.Pd" },
        { role: "Guru PAI", name: "Maya Nurmayanti, S.Pd.I" },
        { role: "Guru PJOK", name: "Gumelar, S.Pd" },
      ],
    },
    {
      title: "Guru Kelas",
      members: [
        { role: "Guru Kelas", name: "Iin Herlina, S.Pd" },
        { role: "Guru Kelas", name: "Widiawati, S.Pd" },
        { role: "Guru Kelas", name: "Mela Fitriani, S.Pd" },
        { role: "Guru Kelas", name: "Neng Rosimah, S.Pd" },
        { role: "Guru Kelas", name: "Fersa Novyanty Hariansyah, S.Pd" },
        { role: "Guru Kelas", name: "Oneng Kordiah, S.Pd" },
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
  ],
};

export const facilities = [
  {
    title: "Ruang Belajar Interaktif",
    description: "7 ruang kelas lengkap dengan sarana pembelajaran digital (LCD Proyektor & Akses Internet 30 Mbps).",
  },
  {
    title: "Perpustakaan & Media Literasi",
    description: "Ruang perpustakaan sekolah penunjang Gerakan Literasi (Garasi) dan Readathon.",
  },
  {
    title: "Kebun Edukasi & Kolam Ikan",
    description: "Fasilitas kebun dan kolam sekolah untuk pembelajaran berbasis pelestarian lingkungan (Adiwiyata).",
  },
  {
    title: "Sarana Kesehatan & Sanitasi",
    description: "Ruang UKS bekerjasama dengan Puskesmas Bojongsoang, 6 unit toilet, dan 7 wastapel cuci tangan.",
  },
];

export const extracurriculars = [
  {
    name: "Pramuka (Wajib)",
    description: "Ekstrakurikuler wajib bagi siswa Kelas 1–6 untuk membentuk kedisiplinan dan jiwa kepemimpinan.",
  },
  {
    name: "Hifdzil Qur'an",
    description: "Program pembinaan hafalan Al-Qur'an bagi peserta didik Kelas 4 dan 5.",
  },
  {
    name: "Olahraga Futsal",
    description: "Pengembangan bakat dan kebugaran fisik siswa Kelas 4, 5, dan 6 di bidang futsal.",
  },
  {
    name: "Besti (Badan Eksekutif Siswa Danabhakti)",
    description: "Pengembangan kreativitas siswa dalam kriya bahan alam dan pengelolaan daur ulang sampah.",
  },
  {
    name: "Seni Musik Pianika",
    description: "Wadah ekspresi seni dan kreativitas musik untuk siswa Kelas 5.",
  },
];

export const habituations = [
  { title: "Gerakan 3S", detail: "Senyum, Sapa, Salam setiap menyambut warga sekolah" },
  { title: "Genit (Gerakan 5 Menit)", detail: "Memungut sampah & menjaga kebersihan lingkungan" },
  { title: "Garasi (Gerakan Literasi)", detail: "Membaca buku 15 menit sebelum kegiatan belajar" },
  { title: "Pagi Ceria & Senam", detail: "Senam Anak Indonesia Hebat, Indonesia Raya, & Berdoa bersama" },
  { title: "One Day One Ayat", detail: "Pembiasaan membaca dan menghafal ayat Al-Qur'an harian" },
];

export const news = [
  {
    title: "Kegiatan Pramuka & Ekstrakurikuler SDN Danabhakti",
    date: "Dokumentasi Kegiatan",
    category: "Kegiatan Siswa",
    excerpt:
      "Dokumentasi kebersamaan dan kedisiplinan siswa-siswi SDN Danabhakti dalam kegiatan Pramuka wajib.",
    image: "/images/hero/foto pramuka.png",
    featured: true,
  },
  {
    title: "Aktivitas Pembelajaran Interaktif di Kelas",
    date: "Kegiatan Akademik",
    category: "Akademik",
    excerpt: "Suasana belajar mengajar yang aktif dan menyenangkan berbasis Kurikulum Merdeka.",
    image: "/images/hero/foto belajar dikelas.png",
    featured: false,
  },
  {
    title: "Kekompakan Guru dan Tenaga Kependidikan",
    date: "Warga Sekolah",
    category: "Warga Sekolah",
    excerpt: "Kekompakan 15 pendidik dan tenaga kependidikan dalam mengawal mutu sekolah.",
    image: "/images/hero/foto guru di kantor.png",
    featured: false,
  },
];

export const gallery = [
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
    category: "Fasilitas & Lingkungan",
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
];

export const contact = {
  address: "Jl. Raya Sapan Gudang RT 03/RW 01, Desa Tegalluar, Kec. Bojongsoang, Kab. Bandung, Jawa Barat 40287",
  phone: "Informasi Pendaftaran / Kontak Sekolah",
  email: "sdn.danabakti@gmail.com",
  hours: "Senin - Jumat: 06.30 - 15.15 WIB (5 Hari Kerja)",
  mapsUrl: "https://maps.app.goo.gl/5tCf1ZwZ8qXHFEwM7",
  mapsEmbedUrl: "https://www.google.com/maps?q=-6.9798795,107.6862452&z=17&output=embed",
};
