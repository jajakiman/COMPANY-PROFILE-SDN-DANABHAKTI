"use client";

import { useState } from "react";
import { CaretDown, CheckCircle, LockSimple, Star, UploadSimple, Warning, X } from "@phosphor-icons/react";
import { isISODate, NEWS_CATEGORIES, todayISODate } from "@/lib/news";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

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
  onSuccess: () => void | Promise<void>;
  initialData?: NewsData | null;
  allNewsList?: NewsData[];
};

export function NewsModal({ isOpen, onClose, onSuccess, initialData, allNewsList = [] }: NewsModalProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "Kegiatan Siswa");
  const [date, setDate] = useState(
    initialData ? (isISODate(initialData.date) ? initialData.date : "") : todayISODate()
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [image] = useState(initialData?.image ?? "");
  const [featuredOrder, setFeaturedOrder] = useState<number>(
    initialData?.featuredOrder ?? (initialData?.featured ? 1 : 0)
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image ?? "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getOccupantTitle = (slotNum: number) => {
    const occupant = allNewsList.find(
      (item) => item.id !== initialData?.id && item.featuredOrder === slotNum
    );
    return occupant ? occupant.title : null;
  };

  const isFeatured = featuredOrder > 0;
  const availableFeaturedSlots = [1, 2, 3].filter((slotNum) => !getOccupantTitle(slotNum));
  const featuredSlotsFull = !isFeatured && availableFeaturedSlots.length === 0;

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
    let uploadedBlobUrl: string | null = null;

    try {
      let finalImageUrl = image;

      if (selectedFile) {
        const safeName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const blob = await upload(`school-media/${Date.now()}-${safeName}`, selectedFile, {
          access: "public",
          handleUploadUrl: "/api/upload",
          contentType: selectedFile.type,
        });
        finalImageUrl = blob.url;
        uploadedBlobUrl = blob.url;
      }

      if (!finalImageUrl) {
        throw new Error("Gambar berita wajib diunggah.");
      }

      const payload = {
        title,
        category,
        date,
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

      await onSuccess();
      onClose();
    } catch (err: unknown) {
      if (uploadedBlobUrl) {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: uploadedBlobUrl }),
        }).catch(() => undefined);
      }
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal-container" role="dialog" aria-modal="true" aria-labelledby="news-modal-title">
        <div className="admin-modal-header">
          <h3 id="news-modal-title">{initialData ? "Edit Berita Sekolah" : "Tambah Berita Baru"}</h3>
          <button type="button" onClick={onClose} className="admin-modal-close" aria-label="Tutup form berita">
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
              <div className="admin-select-wrapper">
                <select
                  id="news-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {NEWS_CATEGORIES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <span className="admin-select-icon" aria-hidden="true">
                  <CaretDown size={18} weight="bold" />
                </span>
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="news-date">Tanggal Berita *</label>
              <input
                id="news-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {initialData && !isISODate(initialData.date) ? (
                <small>Tanggal lama belum valid. Pilih tanggal sebelum menyimpan.</small>
              ) : null}
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
                  <Image src={imagePreview} alt="Preview foto berita" width={640} height={360} unoptimized />
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

          <fieldset className="featured-control">
            <legend>Penempatan Berita</legend>
            <label className="featured-toggle">
              <span className="featured-toggle-copy">
                <span className="featured-toggle-icon" aria-hidden="true">
                  <Star size={18} weight={isFeatured ? "fill" : "regular"} />
                </span>
                <span>
                  <strong>Jadikan Berita Utama</strong>
                  <small>Tampilkan berita ini pada urutan prioritas di halaman depan.</small>
                </span>
              </span>
              <input
                type="checkbox"
                checked={isFeatured}
                disabled={featuredSlotsFull}
                onChange={(event) => setFeaturedOrder(event.target.checked ? (availableFeaturedSlots[0] ?? 0) : 0)}
              />
              <span className="featured-toggle-track" aria-hidden="true">
                <span />
              </span>
            </label>

            {featuredSlotsFull ? (
              <p className="featured-slots-full">Semua urutan sedang terpakai. Ubah berita utama lain terlebih dahulu.</p>
            ) : null}

            {isFeatured ? (
              <div className="featured-slot-section">
                <div className="featured-slot-heading">
                  <strong>Pilih urutan tampil</strong>
                  <small>Maksimal tiga berita utama</small>
                </div>
                <div className="featured-slot-grid" role="radiogroup" aria-label="Urutan berita utama">
                  {[1, 2, 3].map((slotNum) => {
                    const occupantTitle = getOccupantTitle(slotNum);
                    const selected = featuredOrder === slotNum;
                    const occupied = Boolean(occupantTitle);

                    return (
                      <button
                        key={slotNum}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        disabled={occupied}
                        className={`featured-slot ${selected ? "selected" : ""} ${occupied ? "occupied" : ""}`}
                        onClick={() => setFeaturedOrder(slotNum)}
                      >
                        <span className="featured-slot-number">{String(slotNum).padStart(2, "0")}</span>
                        <span className="featured-slot-status">
                          {occupied ? <LockSimple size={13} weight="bold" /> : selected ? <CheckCircle size={13} weight="fill" /> : null}
                          {occupied ? "Terpakai" : selected ? "Dipilih" : "Tersedia"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {getOccupantTitle(1) || getOccupantTitle(2) || getOccupantTitle(3) ? (
                  <div className="featured-occupants">
                    {[1, 2, 3].map((slotNum) => {
                      const occupantTitle = getOccupantTitle(slotNum);
                      return occupantTitle ? (
                        <p key={slotNum}>
                          <span>Urutan {slotNum}</span>
                          <strong title={occupantTitle}>{occupantTitle}</strong>
                        </p>
                      ) : null;
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
          </fieldset>

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
