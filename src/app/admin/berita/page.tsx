"use client";

import { useState, useEffect } from "react";
import { Plus, PencilSimple, Trash, Newspaper, Star, CalendarBlank } from "@phosphor-icons/react";
import { NewsModal, type NewsData } from "@/components/admin/news-modal";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { SuccessDialog } from "@/components/admin/success-dialog";
import { formatNewsDate } from "@/lib/news";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminBeritaPage() {
  const router = useRouter();
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);

  // Delete confirmation modal states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Success dialog states
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        setNewsList(data);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setNewsList(data);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadNews();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenAddModal = () => {
    setSelectedNews(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: NewsData) => {
    setSelectedNews(item);
    setModalOpen(true);
  };

  const handleModalSuccess = async () => {
    await fetchNews();
    router.refresh();
    if (selectedNews) {
      setSuccessMessage("Berita berhasil disimpan!");
    } else {
      setSuccessMessage("Berita berhasil ditambahkan!");
    }
    setSuccessDialogOpen(true);
  };

  const promptDelete = (id: string, title: string) => {
    setNewsToDelete({ id, title });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!newsToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/news/${newsToDelete.id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchNews();
        router.refresh();
        setDeleteDialogOpen(false);
        setNewsToDelete(null);
        setSuccessMessage("Berita berhasil dihapus!");
        setSuccessDialogOpen(true);
      } else {
        alert("Gagal menghapus berita.");
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus berita.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div>
          <span className="admin-page-kicker">Manajemen Konten</span>
          <h1>Kelola Berita & Kegiatan Sekolah</h1>
          <p>Tambah, edit, dan atur Berita Utama (Urutan 1, 2, atau 3) SDN Danabhakti.</p>
        </div>

        <button type="button" onClick={handleOpenAddModal} className="admin-btn-primary">
          <Plus size={20} weight="bold" />
          <span>Tambah Berita Baru</span>
        </button>
      </div>

      {loading ? (
        <div className="admin-loading-box">
          <div className="admin-spinner" />
          <span>Memuat data berita...</span>
        </div>
      ) : newsList.length === 0 ? (
        <div className="admin-empty-card">
          <Newspaper size={48} weight="duotone" />
          <h3>Belum ada berita</h3>
          <p>Klik tombol di atas untuk membuat berita atau pengumuman pertama Anda.</p>
        </div>
      ) : (
        /* Card View Layout (Sorted: Utama #1 -> #2 -> #3 -> Normal) */
        <div className="admin-news-cards-grid">
          {[...newsList]
            .sort((a, b) => {
              const orderA = a.featuredOrder || 0;
              const orderB = b.featuredOrder || 0;
              if (orderA > 0 && orderB > 0) return orderA - orderB;
              if (orderA > 0) return -1;
              if (orderB > 0) return 1;
              return 0;
            })
            .map((item) => (
              <div key={item.id} className="admin-news-card">
                <div className="admin-news-card-image">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 639px) calc(100vw - 32px), 320px" unoptimized />
                  <span className="admin-news-category-badge">{item.category}</span>
                  {item.featuredOrder && item.featuredOrder > 0 ? (
                    <span className="admin-news-featured-badge">
                      <Star size={12} weight="fill" /> Utama #{item.featuredOrder}
                    </span>
                  ) : null}
                </div>

                <div className="admin-news-card-body">
                  <div className="admin-news-meta">
                    <CalendarBlank size={14} />
                    <span>{formatNewsDate(item.date)}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="admin-news-excerpt">{item.excerpt}</p>
                </div>

                <div className="admin-news-card-actions">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(item)}
                    className="admin-btn-card-action edit"
                  >
                    <PencilSimple size={16} weight="bold" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => item.id && promptDelete(item.id, item.title)}
                    className="admin-btn-card-action delete"
                  >
                    <Trash size={16} weight="bold" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Pop-Up Modal for Add / Edit News */}
      {modalOpen ? (
        <NewsModal
          key={selectedNews?.id ?? "new"}
          isOpen
          onClose={() => setModalOpen(false)}
          onSuccess={handleModalSuccess}
          initialData={selectedNews}
          allNewsList={newsList}
        />
      ) : null}

      {/* Animated Confirmation Dialog for Deleting News */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Konfirmasi Hapus Berita"
        message={`Apakah Anda yakin ingin menghapus berita "${newsToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus Berita"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setDeleteDialogOpen(false);
          setNewsToDelete(null);
        }}
      />

      {/* Auto-Dismiss Toast Notification (2 Seconds, Zero Button Clicks) */}
      <SuccessDialog
        isOpen={successDialogOpen}
        message={successMessage}
        onClose={() => setSuccessDialogOpen(false)}
      />
    </div>
  );
}
