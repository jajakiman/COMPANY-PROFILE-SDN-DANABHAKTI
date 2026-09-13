"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarBlank, Star, X } from "@phosphor-icons/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatNewsDate } from "@/lib/news";
import Image from "next/image";

export type PublicNewsItem = {
  id?: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  featured?: boolean;
};

type SchoolNewsCarouselProps = {
  items: PublicNewsItem[];
};

export function SchoolNewsCarousel({ items }: SchoolNewsCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [selectedNews, setSelectedNews] = useState<PublicNewsItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const showArrows = items.length > 3;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selectedNews || dialog.open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (showArrows) swiper?.autoplay.stop();
    dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (showArrows) swiper?.autoplay.start();
    };
  }, [selectedNews, showArrows, swiper]);

  function openNews(item: PublicNewsItem, opener: HTMLElement) {
    openerRef.current = opener;
    setSelectedNews(item);
  }

  function closeNews() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    setSelectedNews(null);
    openerRef.current?.focus();
  }

  const newsContentText = selectedNews ? (selectedNews.content || selectedNews.excerpt) : "";

  return (
    <div className="news-carousel-wrapper">
      <Swiper
        className="news-swiper"
        modules={[A11y, Autoplay, Keyboard, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        speed={700}
        grabCursor
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ clickable: true }}
        autoplay={items.length > 3 ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
        }}
        onSwiper={setSwiper}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id || item.title}>
            <article
              className="news-card-public"
              onClick={(event) => openNews(item, event.currentTarget)}
              tabIndex={0}
              role="button"
              aria-label={`Baca detail berita: ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openNews(item, e.currentTarget);
                }
              }}
            >
              <div className="news-card-media-box">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 33vw"
                  className="news-card-image"
                  unoptimized={item.image.startsWith("/uploads/")}
                />
                <span className="news-card-category-badge">{item.category}</span>
                {item.featured && (
                  <span className="news-card-featured-badge">
                    <Star size={12} weight="fill" /> Berita Utama
                  </span>
                )}
              </div>

              <div className="news-card-content">
                <div className="news-card-date">
                  <CalendarBlank size={15} />
                  <span>{formatNewsDate(item.date)}</span>
                </div>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-excerpt">{item.content?.trim() || item.excerpt}</p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrow Navigation Controls (Shown when news count > 3) */}
      {showArrows && (
        <div className="news-carousel-controls">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            className="news-carousel-arrow"
            aria-label="Berita Sebelumnya"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            className="news-carousel-arrow"
            aria-label="Berita Berikutnya"
          >
            <ArrowRight size={20} weight="bold" />
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="news-detail-dialog"
        aria-labelledby="news-modal-title"
        aria-describedby="news-modal-body"
        onClose={handleDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeNews();
        }}
      >
        {selectedNews ? (
          <div className="news-detail-modal-shell">
            <button
              ref={closeButtonRef}
              type="button"
              className="news-detail-modal-close"
              onClick={closeNews}
              aria-label="Tutup detail berita"
            >
              <X aria-hidden="true" size={22} weight="bold" />
            </button>

            <article className="news-detail-modal">
              <div className="news-detail-modal-media">
                <Image
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 680px"
                  className="news-detail-modal-image"
                  unoptimized={selectedNews.image.startsWith("/uploads/")}
                />
                <span className="news-card-category-badge">{selectedNews.category}</span>
                {selectedNews.featured && (
                  <span className="news-card-featured-badge">
                    <Star size={12} weight="fill" /> Berita Utama
                  </span>
                )}
              </div>

              <div className="news-detail-modal-content">
                <div className="news-card-date">
                  <CalendarBlank size={16} />
                  <span>{formatNewsDate(selectedNews.date)}</span>
                </div>

                <h2 id="news-modal-title" className="news-detail-modal-title">
                  {selectedNews.title}
                </h2>

                <div id="news-modal-body" className="news-detail-modal-body">
                  {newsContentText
                    .split(/\r?\n\s*\r?\n/)
                    .filter((paragraph) => paragraph.trim())
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                </div>
              </div>
            </article>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
