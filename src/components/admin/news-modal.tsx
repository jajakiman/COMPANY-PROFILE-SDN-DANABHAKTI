"use client";

import { useState, useEffect } from "react";
import { X, UploadSimple, CheckCircle, Warning, Star } from "@phosphor-icons/react";

export type NewsData = {
  id?: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  featured: boolean;
  featuredOrder?: number;
};

type NewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: NewsData | null;
  allNewsList?: NewsData[];
};

export function NewsModal({ isOpen, onClose, onSuccess, initialData, allNewsList = [] }: NewsModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Kegiatan Siswa");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [featuredOrder, setFeaturedOrder] = useState<number>(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getOccupantTitle = (slotNum: number) => {
    const occupant = allNewsList.find(
      (item) => item.id !== initialData?.id && item.featuredOrder === slotNum
    );
    return occupant ? occupant.title : null;
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category || "Kegiatan Siswa");
      setDate(initialData.date || "");
      setExcerpt(initialData.excerpt);
      setContent(initialData.content || "");
      setImage(initialData.image);
      setImagePreview(initialData.image);
      setFeaturedOrder(initialData.featuredOrder || (initialData.featured ? 1 : 0));
    } else {
      setTitle("");
      setCategory("Kegiatan Siswa");
      setDate(new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }));
      setExcerpt("");
      setContent("");
      setImage("");
      setImagePreview("");
      setFeaturedOrder(0);
    }
    setSelectedFile(null);
    setErrorMessage("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Format file tidak valid! Pilih file gambar (.jpg, .png, .webp).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Ukuran file terlalu besar! Maksimal ukuran gambar adalah 5 MB.");
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      let finalImageUrl = image;

      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || "Gagal mengunggah gambar.");
        }
        finalImageUrl = uploadData.url;
      }

      if (!finalImageUrl) {
        throw new Error("Gambar berita wajib diunggah.");
      }

      const payload = {
        title,
        category,
        date: date || "Dokumentasi Kegiatan",
        excerpt,
        content,
        image: finalImageUrl,
        featuredOrder: Number(featuredOrder),
      };

      const isEdit = Boolean(initialData?.id);
      const url = isEdit ? `/api/news/${initialData?.id}` : "/api/news";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal menyimpan data berita.");
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal-container">
        <div className="admin-modal-header">
          <h3>{initialData ? "Edit Berita Sekolah" : "Tambah Berita Baru"}</h3>
          <button type="button" onClick={onClose} className="admin-modal-close">
            <X size={20} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-modal-form">
          {errorMessage && (
            <div className="admin-alert admin-alert-error">
              <Warning size={20} weight="fill" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="admin-form-group">
            <label htmlFor="news-title">Judul Berita *</label>
            <input
              id="news-title"
              type="text"
              required
              placeholder="Masukkan judul berita atau kegiatan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="news-category">Kategori Berita</label>
              <select
                id="news-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Kegiatan Siswa">Kegiatan Siswa</option>
                <option value="Akademik">Akademik</option>
                <option value="Warga Sekolah">Warga Sekolah</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Pengumuman">Pengumuman</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="news-date">Tanggal / Keterangan</label>
              <input
                id="news-date"
                type="text"
                placeholder="Contoh: 10 Agustus 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="news-excerpt">Ringkasan Berita *</label>
            <textarea
              id="news-excerpt"
              required
              rows={2}
              placeholder="Tuliskan 1-2 kalimat ringkasan berita yang akan tampil di halaman depan"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="news-content">Isi Berita Lengkap (Opsional)</label>
            <textarea
              id="news-content"
              rows={4}
              placeholder="Tuliskan detail berita lengkap di sini..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label>Foto Berita (Maksimal 5 MB) *</label>
            <div className="admin-file-upload-box">
              {imagePreview ? (
                <div className="admin-file-preview">
                  <img src={imagePreview} alt="Preview" />
                  <label htmlFor="news-file-change" className="admin-file-change-btn">
                    Ubah Foto
                  </label>
                  <input
                    id="news-file-change"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              ) : (
                <label htmlFor="news-file-input" className="admin-file-dropzone">
                  <UploadSimple size={32} weight="duotone" />
                  <span>Pilih foto dari laptop/HP Anda</span>
                  <small>Format: JPG, PNG, WEBP (Maksimal 5 MB)</small>
                  <input
                    id="news-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Featured Order Selection Dropdown (Slot 1, 2, 3) */}
          <div className="admin-form-group">
            <label htmlFor="featured-order-select">
              <Star size={16} weight="fill" className="text-amber-500" /> Posisi Berita Utama (Maksimal 3 Berita)
            </label>
            <select
              id="featured-order-select"
              value={featuredOrder}
              onChange={(e) => setFeaturedOrder(Number(e.target.value))}
            >
              <option value={0}>Bukan Berita Utama (Tampil Normal)</option>
              {[1, 2, 3].map((slotNum) => {
                const occupantTitle = getOccupantTitle(slotNum);
                return (
                  <option key={slotNum} value={slotNum} disabled={Boolean(occupantTitle)}>
                    {occupantTitle
                      ? `⭐ Berita Utama - Urutan Ke-${slotNum} (Terpakai: "${occupantTitle}")`
                      : `⭐ Berita Utama - Urutan Ke-${slotNum}`}
                  </option>
                );
              })}
            </select>
            <small style={{ color: "#666", marginTop: "2px" }}>
              Pilih urutan 1, 2, atau 3 jika ingin menjadikan berita ini sebagai Berita Utama di website.
            </small>
          </div>

          <div className="admin-modal-actions">
            <button type="button" onClick={onClose} className="admin-btn-secondary">
              Batal
            </button>
            <button type="submit" disabled={loading} className="admin-btn-primary">
              {loading ? "Menyimpan..." : (
                <>
                  <CheckCircle size={18} weight="bold" />
                  <span>Simpan Berita</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
