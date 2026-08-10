"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, EffectCards, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MediaPlaceholder } from "@/components/media-placeholder";

type HeroSlide = {
  label: string;
  src: string;
  dummy?: boolean;
};

type HeroMediaCarouselProps = {
  items: HeroSlide[];
  noteLabel: string;
  noteText: string;
};

export function HeroMediaCarousel({ items, noteLabel, noteText }: HeroMediaCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  return (
    <div
      className="hero-carousel"
      onFocusCapture={() => swiper?.autoplay.pause()}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) swiper?.autoplay.resume();
      }}
    >
      <Swiper
        className="hero-swiper"
        modules={[A11y, Autoplay, EffectCards, Keyboard, Pagination]}
        effect="cards"
        cardsEffect={{ perSlideOffset: 6, perSlideRotate: 2, rotate: true, slideShadows: false }}
        rewind={items.length > 1}
        grabCursor
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ clickable: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: "Tampilkan foto hero sebelumnya",
          nextSlideMessage: "Tampilkan foto hero berikutnya",
          paginationBulletMessage: "Tampilkan foto hero {{index}}",
        }}
        onSwiper={setSwiper}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.label}>
            <MediaPlaceholder
              label={item.label}
              src={item.src}
              className="hero-carousel-media"
              priority={index === 0}
              sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1180px) 42vw, 520px"
              dummy={item.dummy ?? false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-hover-navigation">
        <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Foto hero sebelumnya">
          <ArrowLeft aria-hidden="true" size={18} weight="bold" />
        </button>
        <button type="button" onClick={() => swiper?.slideNext()} aria-label="Foto hero berikutnya">
          <ArrowRight aria-hidden="true" size={18} weight="bold" />
        </button>
      </div>

      <div className="hero-carousel-footer">
        <div className="hero-carousel-note">
          <span>{noteLabel}</span>
          <strong>{noteText}</strong>
        </div>
      </div>
    </div>
  );
}
