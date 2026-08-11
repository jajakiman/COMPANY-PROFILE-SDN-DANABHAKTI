"use client";

import { ArrowLeft, ArrowRight, ArrowsOutSimple, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MediaPlaceholder } from "@/components/media-placeholder";

type GalleryItem = {
  label: string;
  category: string;
  src: string;
  dummy?: boolean;
  position?: string;
};

type SchoolGalleryCarouselProps = {
  items: GalleryItem[];
};

export function SchoolGalleryCarousel({ items }: SchoolGalleryCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const previewItem = previewIndex === null ? null : items[previewIndex];
  const isPreviewOpen = previewIndex !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isPreviewOpen || dialog.open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isPreviewOpen]);

  function openPreview(index: number, opener: HTMLButtonElement) {
    openerRef.current = opener;
    setPreviewIndex(index);
  }

  function closePreview() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    setPreviewIndex(null);
    openerRef.current?.focus();
  }

  function showPreview(index: number) {
    const nextIndex = (index + items.length) % items.length;
    setPreviewIndex(nextIndex);
    swiper?.slideTo(nextIndex);
  }

  return (
    <div className="gallery-carousel">
      <Swiper
        className="gallery-swiper"
        modules={[A11y, Keyboard, Pagination]}
        slidesPerView="auto"
        centeredSlides
        rewind
        grabCursor
        watchSlidesProgress
        speed={760}
        spaceBetween={16}
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ clickable: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: "Tampilkan foto sebelumnya",
          nextSlideMessage: "Tampilkan foto berikutnya",
          firstSlideMessage: "Ini foto pertama",
          lastSlideMessage: "Ini foto terakhir",
          paginationBulletMessage: "Tampilkan foto {{index}}",
        }}
        breakpoints={{
          768: { spaceBetween: 22 },
          1200: { spaceBetween: 28 },
        }}
        onSwiper={(instance) => {
          setSwiper(instance);
          setActiveIndex(instance.realIndex);
        }}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.label}>
            <figure className="gallery-slide-card">
              <button
                type="button"
                className="gallery-image-trigger"
                aria-label={`Buka preview: ${item.label}`}
                onClick={(event) => openPreview(index, event.currentTarget)}
              >
                <MediaPlaceholder
                  label={item.label}
                  src={item.src}
                  className="gallery-slide-media"
                  sizes="(max-width: 767px) 82vw, (max-width: 1199px) 70vw, 860px"
                  dummy={item.dummy ?? false}
                  imagePosition={item.position}
                  showLabel={false}
                />
                <span className="gallery-preview-cue" aria-hidden="true">
                  <ArrowsOutSimple size={18} weight="bold" />
                  Lihat gambar
                </span>
              </button>
              <figcaption className="gallery-slide-caption">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{item.category}</small>
                  <strong>{item.label}</strong>
                </div>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="gallery-controls">
        <p className="gallery-counter" aria-live="polite" aria-atomic="true">
          <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
          <span>/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </p>
        <div className="gallery-navigation">
          <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Foto sebelumnya">
            <ArrowLeft aria-hidden="true" size={21} weight="bold" />
          </button>
          <button type="button" onClick={() => swiper?.slideNext()} aria-label="Foto berikutnya">
            <ArrowRight aria-hidden="true" size={21} weight="bold" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="gallery-dialog"
        aria-labelledby="gallery-dialog-title"
        aria-describedby="gallery-dialog-category"
        onClose={handleDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePreview();
        }}
        onKeyDown={(event) => {
          if (previewIndex === null) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPreview(previewIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            showPreview(previewIndex + 1);
          }
        }}
      >
        {previewItem && previewIndex !== null ? (
          <div className="gallery-dialog-panel">
            <header className="gallery-dialog-header">
              <div>
                <span id="gallery-dialog-category">{previewItem.category}</span>
                <h3 id="gallery-dialog-title">{previewItem.label}</h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="gallery-dialog-close"
                onClick={closePreview}
                aria-label="Tutup preview gambar"
              >
                <X aria-hidden="true" size={22} weight="bold" />
              </button>
            </header>

            <div className="gallery-dialog-media">
              <Image
                src={previewItem.src}
                alt={previewItem.label}
                fill
                sizes="(max-width: 767px) calc(100vw - 48px), 82vw"
                style={{ objectPosition: previewItem.position ?? "center" }}
              />
            </div>

            <footer className="gallery-dialog-footer">
              <p aria-live="polite" aria-atomic="true">
                <strong>{String(previewIndex + 1).padStart(2, "0")}</strong>
                <span>/</span>
                <span>{String(items.length).padStart(2, "0")}</span>
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => showPreview(previewIndex - 1)}
                  aria-label="Tampilkan gambar sebelumnya"
                >
                  <ArrowLeft aria-hidden="true" size={20} weight="bold" />
                  Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() => showPreview(previewIndex + 1)}
                  aria-label="Tampilkan gambar berikutnya"
                >
                  Berikutnya
                  <ArrowRight aria-hidden="true" size={20} weight="bold" />
                </button>
              </div>
            </footer>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
