"use client";

import { useState } from "react";
import { CaretDown, X, UploadSimple, CheckCircle, Warning } from "@phosphor-icons/react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

export type GalleryData = {
  id?: string;
  label: string;
  category: string;
  src: string;
};

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
  initialData?: GalleryData | null;
};

export function GalleryModal({ isOpen, onClose, onSuccess, initialData }: GalleryModalProps) {
  const [label, setLabel] = useState(initialData?.label ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "Kegiatan Siswa");
  const [src] = useState(initialData?.src ?? "");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.src ?? "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      let finalSrcUrl = src;

      if (selectedFile) {
        const safeName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const blob = await upload(`school-media/${Date.now()}-${safeName}`, selectedFile, {
          access: "public",
          handleUploadUrl: "/api/upload",
          contentType: selectedFile.type,
        });
        finalSrcUrl = blob.url;
        uploadedBlobUrl = blob.url;
      }

      if (!finalSrcUrl) {
        throw new Error("File foto galeri wajib diunggah.");
      }

      const payload = {
        label,
        category,
        src: finalSrcUrl,
      };

      const isEdit = Boolean(initialData?.id);
      const url = isEdit ? `/api/gallery/${initialData?.id}` : "/api/gallery";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal menyimpan foto galeri.");
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
      <div className="admin-modal-container" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title">
        <div className="admin-modal-header">
          <h3 id="gallery-modal-title">{initialData ? "Edit Foto Galeri" : "Tambah Foto Galeri Baru"}</h3>
          <button type="button" onClick={onClose} className="admin-modal-close" aria-label="Tutup form galeri">
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
            <label htmlFor="gallery-label">Judul / Keterangan Foto *</label>
            <input
              id="gallery-label"
              type="text"
              required
              placeholder="Contoh: Juara Lomba LBB Tingkat Kabupaten Bandung"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="gallery-category">Kategori Galeri</label>
            <div className="admin-select-wrapper">
              <select
                id="gallery-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Kegiatan Siswa">Kegiatan Siswa</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Pembelajaran">Pembelajaran</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Warga Sekolah">Warga Sekolah</option>
                <option value="Lingkungan Sekolah">Lingkungan Sekolah</option>
              </select>
              <span className="admin-select-icon" aria-hidden="true">
                <CaretDown size={18} weight="bold" />
              </span>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Upload File Foto (Maksimal 5 MB) *</label>
            <div className="admin-file-upload-box">
              {imagePreview ? (
                <div className="admin-file-preview">
                  <Image src={imagePreview} alt="Preview foto galeri" width={640} height={360} unoptimized />
                  <label htmlFor="gallery-file-change" className="admin-file-change-btn">
                    Ubah Foto
                  </label>
                  <input
                    id="gallery-file-change"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              ) : (
                <label htmlFor="gallery-file-input" className="admin-file-dropzone">
                  <UploadSimple size={32} weight="duotone" />
                  <span>Pilih foto dari komputer Anda</span>
                  <small>Format: JPG, PNG, WEBP (Maksimal 5 MB)</small>
                  <input
                    id="gallery-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="admin-modal-actions">
            <button type="button" onClick={onClose} className="admin-btn-secondary">
              Batal
            </button>
            <button type="submit" disabled={loading} className="admin-btn-primary">
              {loading ? "Menyimpan..." : (
                <>
                  <CheckCircle size={18} weight="bold" />
                  <span>Simpan Foto</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
