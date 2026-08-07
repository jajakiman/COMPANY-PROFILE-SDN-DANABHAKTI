"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MediaPlaceholder } from "@/components/media-placeholder";

type GalleryItem = {
  label: string;
  category: string;
};

type SchoolGalleryCarouselProps = {
  items: GalleryItem[];
};

export function SchoolGalleryCarousel({ items }: SchoolGalleryCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
              <MediaPlaceholder label={item.label} className="gallery-slide-media" />
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
    </div>
  );
}
