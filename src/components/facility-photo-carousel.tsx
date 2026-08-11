"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MediaPlaceholder } from "@/components/media-placeholder";

type FacilityPhoto = {
  label: string;
  src: string;
  position?: string;
};

type FacilityPhotoCarouselProps = {
  items: FacilityPhoto[];
};

export function FacilityPhotoCarousel({ items }: FacilityPhotoCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="facility-carousel">
      <Swiper
        className="facility-swiper"
        modules={[A11y, Keyboard, Pagination]}
        rewind={items.length > 1}
        grabCursor
        speed={620}
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ clickable: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: "Tampilkan foto fasilitas sebelumnya",
          nextSlideMessage: "Tampilkan foto fasilitas berikutnya",
          paginationBulletMessage: "Tampilkan foto fasilitas {{index}}",
        }}
        onSwiper={(instance) => {
          setSwiper(instance);
          setActiveIndex(instance.realIndex);
        }}
        onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
      >
        {items.map((item) => (
          <SwiperSlide key={item.label}>
            <div className="facility-carousel-slide">
              <MediaPlaceholder
                label={item.label}
                src={item.src}
                className="facility-carousel-photo"
                sizes="(max-width: 767px) calc(100vw - 56px), (max-width: 900px) 520px, (max-width: 1280px) 46vw, 600px"
                imagePosition={item.position}
                showLabel={false}
              />
              <span className="facility-carousel-caption">{item.label}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="facility-carousel-navigation">
        <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Foto fasilitas sebelumnya">
          <ArrowLeft aria-hidden="true" size={18} weight="bold" />
        </button>
        <button type="button" onClick={() => swiper?.slideNext()} aria-label="Foto fasilitas berikutnya">
          <ArrowRight aria-hidden="true" size={18} weight="bold" />
        </button>
      </div>

      <p className="facility-carousel-status" aria-live="polite" aria-atomic="true">
        <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
        <span>/</span>
        <span>{String(items.length).padStart(2, "0")}</span>
      </p>
    </div>
  );
}
