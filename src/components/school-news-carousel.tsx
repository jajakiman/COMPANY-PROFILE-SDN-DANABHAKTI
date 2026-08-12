"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarBlank, Star } from "@phosphor-icons/react";
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
  image: string;
  featured?: boolean;
};

type SchoolNewsCarouselProps = {
  items: PublicNewsItem[];
};

export function SchoolNewsCarousel({ items }: SchoolNewsCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const showArrows = items.length > 3;

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
            <article className="news-card-public">
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
                <p className="news-card-excerpt">{item.excerpt}</p>
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
    </div>
  );
}
