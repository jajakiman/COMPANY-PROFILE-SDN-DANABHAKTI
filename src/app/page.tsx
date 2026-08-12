import {
  ArrowDown,
  ArrowRight,
  ArrowSquareOut,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  User,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { FacilityPhotoCarousel } from "@/components/facility-photo-carousel";
import { HeroMediaCarousel } from "@/components/hero-media-carousel";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SchoolGalleryCarousel } from "@/components/school-gallery-carousel";
import { SchoolNewsCarousel } from "@/components/school-news-carousel";
import {
  ConnectorLine,
  MediaReveal,
  MaskReveal,
  Reveal,
  RevealArticle,
  RevealListItem,
  Stagger,
  StaggerItem,
} from "@/components/motion/motion-primitives";
import { SiteHeader } from "@/components/site-header";
import { db } from "@/lib/db";
import {
  contact,
  extracurriculars,
  facilityPhotos,
  facilities,
  gallery as initialGallery,
  heroSlides,
  news as initialNews,
  organization,
  schoolHabits,
  schoolProfile,
  visionMission,
} from "@/data/site";

export const revalidate = 0;

export default async function Home() {
  let newsList = initialNews;
  let galleryList = initialGallery;

  try {
    const dbNews = await db.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbNews.length > 0) {
      const sortedDbNews = [...dbNews].sort((a, b) => {
        const orderA = a.featuredOrder || 0;
        const orderB = b.featuredOrder || 0;
        if (orderA > 0 && orderB > 0) return orderA - orderB;
        if (orderA > 0) return -1;
        if (orderB > 0) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      newsList = sortedDbNews.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        date: item.date,
        excerpt: item.excerpt,
        image: item.image,
        featured: Boolean(item.featuredOrder && item.featuredOrder > 0),
        featuredOrder: item.featuredOrder || 0,
      }));
    }

    const dbGallery = await db.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbGallery.length > 0) {
      galleryList = dbGallery.map((item) => ({
        label: item.label,
        category: item.category,
        src: item.src,
        position: "center",
      }));
    }
  } catch (e) {
    console.error("DB fetch fallback to static data:", e);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero" id="beranda" aria-labelledby="hero-title">
          <div className="page-shell hero-grid">
            <Stagger className="hero-copy" delay={0.08} parallax={54} eager>
              <StaggerItem><p className="hero-kicker">Selamat datang di SDN Danabhakti</p></StaggerItem>
              <MaskReveal delay={0.14} eager><h1 id="hero-title">{schoolProfile.heroTitle}</h1></MaskReveal>
              <StaggerItem><p className="hero-lead">{schoolProfile.heroDescription}</p></StaggerItem>
              <StaggerItem className="hero-actions">
                <a className="button" href="#profil">
                  Kenali Sekolah <ArrowDown aria-hidden="true" size={18} weight="bold" />
                </a>
                <a className="text-link" href="#kontak">
                  Lihat Kontak <ArrowRight aria-hidden="true" size={18} weight="bold" />
                </a>
              </StaggerItem>
            </Stagger>

            <MediaReveal
              className="hero-visual"
              direction="left"
              delay={0.18}
              scrollParallax={34}
              eager
            >
              <HeroMediaCarousel
                items={heroSlides}
                noteLabel="Lingkungan belajar"
                noteText="Aman, aktif, dan suportif"
              />
            </MediaReveal>
          </div>
        </section>

        <section className="profile-section section" id="profil" aria-labelledby="profile-title">
          <div className="page-shell">
            <Reveal className="profile-intro" direction="left">
              <div>
                <p className="section-label">Profil sekolah • {schoolProfile.motto}</p>
                <h2 id="profile-title">Mengenal SDN Danabhakti</h2>
              </div>
              <p className="profile-statement">{schoolProfile.introduction}</p>
            </Reveal>

            <div className="profile-content">
              {/* Column 1: Photos */}
              <div className="profile-media-composition">
                <MediaPlaceholder
                  label="Foto Guru dan Tenaga Kependidikan SDN Danabhakti"
                  src="/images/hero/foto guru di kantor.png"
                  className="profile-photo profile-photo-main"
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1180px) 40vw, 520px"
                />
                <MediaPlaceholder
                  label="Foto Kegiatan Kebun Edukasi Sekolah"
                  src="/images/hero/foto dikebun.png"
                  className="profile-photo profile-photo-detail"
                  sizes="(max-width: 767px) 36vw, (max-width: 1180px) 16vw, 190px"
                />
              </div>

              {/* Column 2: History Copy */}
              <div className="profile-story-copy">
                <h3>Perjalanan & Identitas Sekolah</h3>
                <p>{schoolProfile.history}</p>
              </div>

              {/* Column 3: Vertical Identity List */}
              <dl className="identity-list">
                {schoolProfile.identity.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Reveal direction="up" amount={0.3}>
              <div className="principal-message-layout">
                <div className="principal-photo-silhouette">
                  <div className="silhouette-icon-wrapper">
                    <User size={80} weight="light" color="#ffffff" />
                  </div>
                  <span>Foto Kepala Sekolah</span>
                  <small>Materi resmi belum tersedia</small>
                </div>
                <blockquote className="principal-message">
                  <span className="quote-mark" aria-hidden="true">“</span>
                  <p>{schoolProfile.principalMessage}</p>
                  <footer>Kepala SDN Danabhakti — Lis Sutarsih, S.Pd.</footer>
                </blockquote>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="vision-section section" id="visi-misi" aria-labelledby="vision-title">
          <div className="page-shell">
            <Reveal className="vision-heading" direction="left">
              <p className="section-label">Arah pendidikan</p>
              <h2 id="vision-title">Visi dan misi SDN Danabhakti</h2>
              <p>
                Visi menetapkan tujuan bersama, sedangkan delapan misi menjadi langkah sekolah untuk
                mewujudkannya.
              </p>
            </Reveal>

            <div className="vision-grid">
              <Reveal className="vision-card" direction="left" amount={0.25}>
                <span className="vision-card-label">Visi sekolah</span>
                <p className="vision-statement">{visionMission.vision}</p>
                <small>Arah utama penyelenggaraan pendidikan SDN Danabhakti.</small>
              </Reveal>

              <Reveal className="mission-list" direction="right" delay={0.12}>
                <div className="mission-list-heading">
                  <div>
                    <span>Langkah bersama</span>
                    <h3>Misi sekolah</h3>
                  </div>
                  <strong>{visionMission.missions.length} komitmen utama</strong>
                </div>
                <ol>
                  {visionMission.missions.map((mission, index) => (
                    <RevealListItem
                      className="mission-item"
                      key={mission}
                      delay={index * 0.07}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{mission}</p>
                    </RevealListItem>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="facilities-section section" id="fasilitas" aria-labelledby="facilities-title">
          <div className="page-shell facilities-grid">
            <MediaReveal
              className="facilities-visual"
              direction="right"
              scrollParallax={24}
            >
              <FacilityPhotoCarousel items={facilityPhotos} />
              <Reveal className="facility-accent" direction="up" delay={0.38} amount={0.1} spring>
                <Image
                  src="/images/brand/logo-sdn-danabhakti-full.webp"
                  alt=""
                  width={72}
                  height={72}
                  className="facility-accent-logo"
                />
              </Reveal>
            </MediaReveal>
            <Reveal className="facilities-copy" direction="right" delay={0.1}>
              <h2 id="facilities-title">Ruang untuk belajar dan berkembang</h2>
              <div className="facility-list">
                {facilities.map((facility, index) => (
                  <RevealArticle key={facility.title} direction="right" delay={index * 0.08} amount={0.5}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{facility.title}</h3>
                      <p>{facility.description}</p>
                    </div>
                  </RevealArticle>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="news-section section" id="kegiatan" aria-labelledby="news-title">
          <div className="page-shell">
            <Reveal className="section-heading" direction="left">
              <div>
                <p className="section-label">Berita dan kegiatan</p>
                <h2 id="news-title">Kabar dari sekolah</h2>
              </div>
            </Reveal>

            {/* Dynamic News Carousel with Left/Right Arrow Navigation */}
            <Reveal direction="up" delay={0.14}>
              <SchoolNewsCarousel items={newsList} />
            </Reveal>

            <div className="program-block">
              <Reveal direction="left" delay={0.08} className="program-subheading">
                <p className="section-label">Pengembangan siswa</p>
                <h3>Kegiatan Ekstrakurikuler</h3>
              </Reveal>
              <div className="ekskul-grid">
                {extracurriculars.map((ekskul, index) => (
                  <RevealArticle
                    key={ekskul.name}
                    direction="up"
                    delay={0.2 + index * 0.1}
                    className="ekskul-card"
                  >
                    <h4>{ekskul.name}</h4>
                    <p>{ekskul.description}</p>
                  </RevealArticle>
                ))}
              </div>
            </div>

            <div className="program-block">
              <Reveal direction="left" delay={0.08} className="program-subheading">
                <p className="section-label">Pembiasaan sekolah</p>
                <h3>Budaya Harian & Mingguan SDN Danabhakti</h3>
              </Reveal>
              <div className="habits-grid">
                {schoolHabits.map((habit, index) => (
                  <RevealArticle
                    key={habit.title}
                    direction="up"
                    delay={0.2 + index * 0.08}
                    className="habit-card"
                  >
                    <strong>{habit.title}</strong>
                    <span>{habit.detail}</span>
                  </RevealArticle>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-section section" id="galeri" aria-labelledby="gallery-title">
          <div className="page-shell">
            <Reveal className="gallery-heading" direction="left">
              <h2 id="gallery-title">Galeri sekolah</h2>
              <p>Dokumentasi ruang, kegiatan, dan kebersamaan warga SDN Danabhakti.</p>
            </Reveal>
            <Reveal direction="up" delay={0.16} amount={0.12}>
              <SchoolGalleryCarousel items={galleryList} />
            </Reveal>
          </div>
        </section>

        <section className="organization-section section" id="struktur" aria-labelledby="organization-title">
          <div className="page-shell">
            <Reveal className="section-heading compact-heading" direction="left">
              <h2 id="organization-title">Struktur sekolah</h2>
              <p>Mengenal pimpinan, guru, dan tenaga kependidikan SDN Danabhakti.</p>
            </Reveal>

            <div className="organization-tree">
              <ConnectorLine />
              <RevealArticle className="organization-card organization-leader" direction="up">
                <div className="avatar-placeholder" aria-hidden="true">
                  <UsersThree size={28} weight="duotone" />
                </div>
                <div>
                  <p className="organization-role">{organization.leader.role}</p>
                  <h3>{organization.leader.name}</h3>
                </div>
              </RevealArticle>

              <div className="organization-branches">
                {organization.groups.map((group, groupIndex) => (
                  <Reveal
                    className="organization-branch"
                    key={group.title}
                    direction={groupIndex === 0 ? "left" : groupIndex === 2 ? "right" : "up"}
                    delay={0.12 + groupIndex * 0.12}
                  >
                    <div className="organization-branch-heading">
                      <span>{String(groupIndex + 2).padStart(2, "0")}</span>
                      <h3>{group.title}</h3>
                    </div>
                    <div className="organization-member-list">
                      {group.members.map((member, memberIndex) => (
                        <RevealArticle
                          className="organization-card organization-member"
                          key={`${member.role}-${member.name}`}
                          direction="up"
                          delay={memberIndex * 0.08}
                          amount={0.35}
                        >
                          <div>
                            <p className="organization-role">{member.role}</p>
                            <h3>{member.name}</h3>
                          </div>
                        </RevealArticle>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section" id="kontak" aria-labelledby="contact-title">
          <div className="page-shell">
            <Reveal className="contact-heading" direction="left">
              <h2 id="contact-title">Terhubung dengan sekolah</h2>
              <p>Temukan informasi layanan dan lokasi resmi SDN Danabhakti.</p>
            </Reveal>

            <div className="contact-layout">
              <Reveal className="contact-information" direction="left" delay={0.12}>
                <div className="contact-information-heading">
                  <h3>Informasi sekolah</h3>
                  <p>Hubungi sekolah pada jam pelayanan untuk informasi pendaftaran dan layanan lainnya.</p>
                </div>
                <div className="contact-list">
                  <div>
                    <MapPin aria-hidden="true" size={22} weight="duotone" />
                    <span><small>Alamat</small>{contact.address}</span>
                  </div>
                  <div>
                    <Phone aria-hidden="true" size={22} weight="duotone" />
                    <span><small>Telepon</small>{contact.phone}</span>
                  </div>
                  <div>
                    <EnvelopeSimple aria-hidden="true" size={22} weight="duotone" />
                    <span><small>Email</small>{contact.email}</span>
                  </div>
                  <div>
                    <Clock aria-hidden="true" size={22} weight="duotone" />
                    <span><small>Jam pelayanan</small>{contact.hours}</span>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.24}>
                <div className="map-embed">
                  <iframe
                    src={contact.mapsEmbedUrl}
                    title="Peta lokasi SDN Danabhakti"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="map-embed-bar">
                    <span>
                      <MapPin aria-hidden="true" size={20} weight="fill" />
                      <strong>SDN Danabhakti</strong>
                    </span>
                    <a
                      className="map-embed-link"
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Buka lokasi SDN Danabhakti di Google Maps, tab baru"
                    >
                      Buka di Google Maps
                      <ArrowSquareOut aria-hidden="true" size={17} weight="bold" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Reveal className="page-shell footer-grid" direction="up" delay={0.12} amount={0.3}>
          <div>
            <a className="brand footer-brand" href="#beranda">
              <span className="brand-mark" aria-hidden="true">
                <Image
                  className="brand-logo"
                  src="/images/brand/logo-sdn-danabhakti-full.webp"
                  alt=""
                  width={640}
                  height={640}
                />
              </span>
              <span className="brand-copy"><strong>SDN Danabhakti</strong><small>Sekolah Dasar Negeri</small></span>
            </a>
            <p>Website informasi resmi sekolah untuk orang tua, siswa, dan masyarakat.</p>
          </div>
          <div className="footer-contact">
            <strong>Kontak sekolah</strong>
            <span>{contact.address}</span>
            <span>{contact.phone}</span>
            <span>{contact.email}</span>
          </div>
        </Reveal>
        <div className="page-shell footer-bottom">
          <span>© {new Date().getFullYear()} SDN Danabhakti • <a href="/login" className="footer-admin-link">Kelola</a></span>
          <a href="#beranda">Kembali ke atas</a>
        </div>
      </footer>
    </>
  );
}
