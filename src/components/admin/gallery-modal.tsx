"use client";

import { useState, useEffect } from "react";
import { X, UploadSimple, CheckCircle, Warning } from "@phosphor-icons/react";

export type GalleryData = {
  id?: string;
  label: string;
  category: string;
  src: string;
};

type GalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: GalleryData | null;
};

export function GalleryModal({ isOpen, onClose, onSuccess, initialData }: GalleryModalProps) {
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("Kegiatan Siswa");
  const [src, setSrc] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label);
      setCategory(initialData.category || "Kegiatan Siswa");
      setSrc(initialData.src);
      setImagePreview(initialData.src);
    } else {
      setLabel("");
      setCategory("Kegiatan Siswa");
      setSrc("");
      setImagePreview("");
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
      let finalSrcUrl = src;

      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || "Gagal mengunggah foto.");
        }
        finalSrcUrl = uploadData.url;
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
          <h3>{initialData ? "Edit Foto Galeri" : "Tambah Foto Galeri Baru"}</h3>
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
          </div>

          <div className="admin-form-group">
            <label>Upload File Foto (Maksimal 5 MB) *</label>
            <div className="admin-file-upload-box">
              {imagePreview ? (
                <div className="admin-file-preview">
                  <img src={imagePreview} alt="Preview" />
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
