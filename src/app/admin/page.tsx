import Link from "next/link";
import { db } from "@/lib/db";
import {
  Newspaper,
  ImageSquare,
  ArrowRight,
  Sparkle,
  TrendUp,
  FolderSimple,
} from "@phosphor-icons/react/ssr";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const newsCount = await db.news.count();
  const galleryCount = await db.gallery.count();

  return (
    <div className="admin-page-container">
      {/* 1. Header Banner */}
      <div className="admin-page-header">
        <div>
          <span className="admin-page-kicker">
            <Sparkle size={14} weight="fill" /> Panel Dashboard Admin
          </span>
          <h1>Statistik & Pengelolaan Konten</h1>
          <p>Ringkasan total berita, foto galeri, dan akses cepat pengelolaan sekolah.</p>
        </div>
      </div>

      {/* 2. Executive Integrated Grid (2 Stat Summary Cards & 2 Action Banners) */}
      <div className="admin-dashboard-hero-layout">
        {/* Left Column: 2 Stat Summary Cards */}
        <div className="admin-stats-column">
          <div className="admin-stat-card stat-card-green">
            <div className="stat-card-top">
              <div className="stat-card-icon icon-green">
                <Newspaper size={30} weight="duotone" />
              </div>
              <span className="stat-badge badge-green">
                <TrendUp size={13} weight="bold" /> Terpublikasi
              </span>
            </div>
            <div className="stat-card-middle">
              <span className="stat-card-label">Total Berita Sekolah</span>
              <h2 className="stat-card-number">{newsCount} <small>Artikel</small></h2>
            </div>
            {/* Watermark Background Icon */}
            <Newspaper size={120} weight="duotone" className="stat-card-watermark" />
          </div>

          <div className="admin-stat-card stat-card-purple">
            <div className="stat-card-top">
              <div className="stat-card-icon icon-purple">
                <ImageSquare size={30} weight="duotone" />
              </div>
              <span className="stat-badge badge-purple">
                <FolderSimple size={13} weight="bold" /> Album Foto
              </span>
            </div>
            <div className="stat-card-middle">
              <span className="stat-card-label">Total Foto Galeri</span>
              <h2 className="stat-card-number">{galleryCount} <small>Foto</small></h2>
            </div>
            {/* Watermark Background Icon */}
            <ImageSquare size={120} weight="duotone" className="stat-card-watermark" />
          </div>
        </div>

        {/* Right Column: 2 Feature Action Banners */}
        <div className="admin-actions-column">
          <div className="action-banner-card banner-green">
            <div className="action-banner-header">
              <div className="action-banner-icon icon-news">
                <Newspaper size={32} weight="duotone" />
              </div>
              <div className="action-banner-content">
                <h3>Kelola Berita Sekolah</h3>
                <p>Tambah berita baru, edit artikel, dan atur posisi Berita Utama.</p>
              </div>
            </div>
            <Link href="/admin/berita" className="action-banner-button btn-news">
              <span>Kelola Berita</span>
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>

          <div className="action-banner-card banner-purple">
            <div className="action-banner-header">
              <div className="action-banner-icon icon-gallery">
                <ImageSquare size={32} weight="duotone" />
              </div>
              <div className="action-banner-content">
                <h3>Kelola Galeri Foto</h3>
                <p>Upload foto kegiatan siswa, fasilitas, dan dokumentasi sekolah.</p>
              </div>
            </div>
            <Link href="/admin/galeri" className="action-banner-button btn-gallery">
              <span>Kelola Galeri</span>
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
