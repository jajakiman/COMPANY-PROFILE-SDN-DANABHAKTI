"use client";

import { useState, useEffect } from "react";
import { Plus, PencilSimple, Trash, ImageSquare } from "@phosphor-icons/react";
import { GalleryModal, type GalleryData } from "@/components/admin/gallery-modal";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { SuccessDialog } from "@/components/admin/success-dialog";

export default function AdminGaleriPage() {
  const [galleryList, setGalleryList] = useState<GalleryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryData | null>(null);

  // Delete confirmation modal states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<{ id: string; label: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Success dialog states
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setGalleryList(data);
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenAddModal = () => {
    setSelectedGallery(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryData) => {
    setSelectedGallery(item);
    setModalOpen(true);
  };

  const handleModalSuccess = () => {
    fetchGallery();
    if (selectedGallery) {
      setSuccessMessage("Foto galeri berhasil disimpan!");
    } else {
      setSuccessMessage("Foto galeri berhasil diupload!");
    }
    setSuccessDialogOpen(true);
  };

  const promptDelete = (id: string, label: string) => {
    setPhotoToDelete({ id, label });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!photoToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/gallery/${photoToDelete.id}`, { method: "DELETE" });
      if (res.ok) {
        fetchGallery();
        setDeleteDialogOpen(false);
        setPhotoToDelete(null);
        setSuccessMessage("Foto galeri berhasil dihapus!");
        setSuccessDialogOpen(true);
      } else {
        alert("Gagal menghapus foto.");
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus foto.");
    } finally {
      setIsDeleting(false);
    }
  };

  const categories = [
    "Semua",
    "Kegiatan Siswa",
    "Prestasi",
    "Pembelajaran",
    "Fasilitas",
    "Warga Sekolah",
    "Lingkungan Sekolah",
  ];

  const filteredItems = selectedCategory === "Semua"
    ? galleryList
    : galleryList.filter((item) => item.category === selectedCategory);

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div>
          <span className="admin-page-kicker">Manajemen Galeri</span>
          <h1>Kelola Galeri Foto Sekolah</h1>
          <p>Upload foto kegiatan, fasilitas, pembelajaran, dan prestasi SDN Danabhakti.</p>
        </div>

        <button type="button" onClick={handleOpenAddModal} className="admin-btn-primary">
          <Plus size={20} weight="bold" />
          <span>Upload Foto Baru</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="admin-filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`admin-filter-btn ${selectedCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="admin-loading-box">
          <div className="admin-spinner" />
          <span>Memuat data galeri foto...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="admin-empty-card">
          <ImageSquare size={48} weight="duotone" />
          <h3>Tidak ada foto dalam kategori ini</h3>
          <p>Klik tombol di atas untuk mengunggah foto galeri baru.</p>
        </div>
      ) : (
        /* Photo Grid Layout */
        <div className="admin-gallery-cards-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="admin-gallery-card">
              <div className="admin-gallery-image-box">
                <img src={item.src} alt={item.label} />
                <span className="admin-gallery-category-badge">{item.category}</span>
              </div>

              <div className="admin-gallery-card-body">
                <h3>{item.label}</h3>
              </div>

              <div className="admin-gallery-card-actions">
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
                  onClick={() => item.id && promptDelete(item.id, item.label)}
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

      {/* Pop-Up Modal for Add / Edit Gallery */}
      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
        initialData={selectedGallery}
      />

      {/* Animated Confirmation Dialog for Deleting Gallery Photo */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Konfirmasi Hapus Foto"
        message={`Apakah Anda yakin ingin menghapus foto "${photoToDelete?.label}" dari galeri?`}
        confirmText="Ya, Hapus Foto"
        cancelText="Batal"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setDeleteDialogOpen(false);
          setPhotoToDelete(null);
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
