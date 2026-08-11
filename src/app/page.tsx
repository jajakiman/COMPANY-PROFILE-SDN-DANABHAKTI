import {
  ArrowDown,
  ArrowRight,
  ArrowSquareOut,
  CalendarBlank,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { FacilityPhotoCarousel } from "@/components/facility-photo-carousel";
import { HeroMediaCarousel } from "@/components/hero-media-carousel";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SchoolGalleryCarousel } from "@/components/school-gallery-carousel";
import {
  ConnectorLine,
  MediaReveal,
  MaskReveal,
  Reveal,
  RevealArticle,
  RevealListItem,
  ScrollParallax,
  Stagger,
  StaggerItem,
} from "@/components/motion/motion-primitives";
import { SiteHeader } from "@/components/site-header";
import {
  contact,
  extracurriculars,
  facilityPhotos,
  facilities,
  gallery,
  heroSlides,
  news,
  organization,
  schoolHabits,
  schoolProfile,
  visionMission,
} from "@/data/site";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero" id="beranda" aria-labelledby="hero-title">
          <div className="page-shell hero-grid">
            <Stagger className="hero-copy" delay={0.1} parallax={-72} eager replay={false}>
              <StaggerItem><p className="hero-kicker">Selamat datang di SDN Danabhakti</p></StaggerItem>
              <MaskReveal delay={0.18} eager><h1 id="hero-title">{schoolProfile.heroTitle}</h1></MaskReveal>
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
              delay={0.3}
              scrollParallax={48}
              eager
              replay={false}
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
              <MediaReveal className="profile-story" direction="right" delay={0.12}>
                <ScrollParallax className="profile-media-motion" distance={28}>
                  <div className="profile-media-composition">
                    <MediaPlaceholder
                      label="Foto Guru dan Tenaga Kependidikan SDN Danabhakti"
                      src="/images/hero/guru-tenaga-kependidikan.webp"
                      className="profile-photo profile-photo-main"
                      sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 900px) 58vw, (max-width: 1180px) 36vw, 480px"
                      imagePosition="center 42%"
                    />
                    <MediaPlaceholder
                      label="Foto Kegiatan Kebun Edukasi Sekolah"
                      src="/images/hero/sekolah-kebun-edukasi.webp"
                      className="profile-photo profile-photo-detail"
                      sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 900px) 58vw, (max-width: 1180px) 36vw, 480px"
                      imagePosition="center 45%"
                    />
                  </div>
                </ScrollParallax>
                <div className="profile-story-copy">
                  <h3>Perjalanan & Identitas Sekolah</h3>
                  <p>{schoolProfile.history}</p>
                </div>
              </MediaReveal>

              <Reveal direction="right" delay={0.24}>
                <dl className="identity-list">
                  {schoolProfile.identity.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal className="principal-message-layout" direction="up" delay={0.12} amount={0.4}>
              <MediaPlaceholder
                label="Foto Kepala Sekolah"
                className="principal-photo-placeholder"
              />
              <blockquote className="principal-message">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p>{schoolProfile.principalMessage}</p>
                <footer>Kepala SDN Danabhakti — Lis Sutarsih, S.Pd.</footer>
              </blockquote>
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
              <Reveal className="vision-card" direction="left" delay={0.12} amount={0.25}>
                <span className="vision-card-label">Visi sekolah</span>
                <p className="vision-statement">{visionMission.vision}</p>
                <small>Arah utama penyelenggaraan pendidikan SDN Danabhakti.</small>
              </Reveal>

              <div className="mission-list">
                <Reveal className="mission-list-heading" direction="right" delay={0.24}>
                  <div>
                    <span>Langkah bersama</span>
                    <h3>Misi sekolah</h3>
                  </div>
                  <strong>{visionMission.missions.length} komitmen utama</strong>
                </Reveal>
                <ol>
                  {visionMission.missions.map((mission, index) => (
                    <RevealListItem
                      className="mission-item"
                      key={mission}
                      delay={0.34 + index * 0.1}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{mission}</p>
                    </RevealListItem>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="facilities-section section" id="fasilitas" aria-labelledby="facilities-title">
          <div className="page-shell facilities-grid">
            <MediaReveal
              className="facilities-visual"
              direction="right"
              delay={0.08}
              scrollParallax={-36}
            >
              <FacilityPhotoCarousel items={facilityPhotos} />
              <div className="facility-accent">
                <Image
                  src="/images/brand/logo-sdn-danabhakti-full.webp"
                  alt=""
                  width={72}
                  height={72}
                  className="facility-accent-logo"
                />
              </div>
            </MediaReveal>
            <div className="facilities-copy">
              <Reveal direction="right" delay={0.18}>
                <h2 id="facilities-title">Ruang untuk belajar dan berkembang</h2>
              </Reveal>
              <div className="facility-list">
                {facilities.map((facility, index) => (
                  <RevealArticle
                    key={facility.title}
                    direction="right"
                    delay={0.3 + index * 0.1}
                    amount={0.5}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{facility.title}</h3>
                      <p>{facility.description}</p>
                    </div>
                  </RevealArticle>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="news-section section" id="kegiatan" aria-labelledby="news-title">
          <div className="page-shell">
            <Reveal className="section-heading" direction="left">
              <div>
                <p className="section-label">Kegiatan</p>
                <h2 id="news-title">Kabar dari sekolah</h2>
              </div>
            </Reveal>

            <div className="news-grid">
              {news.map((item, index) => (
                <RevealArticle
                  className="news-card"
                  key={item.title}
                  direction="up"
                  delay={0.14 + index * 0.12}
                  amount={0.2}
                >
                  <MediaPlaceholder
                    label={`Foto ${item.title.toLowerCase()}`}
                    src={item.image || undefined}
                    className="news-card-media"
                    sizes="(max-width: 900px) calc(100vw - 32px), (max-width: 1280px) 30vw, 390px"
                    showLabel={false}
                  />
                  <div className="news-card-copy">
                    <div className="news-meta">
                      <span>{item.category}</span>
                      <time><CalendarBlank aria-hidden="true" size={16} />{item.date}</time>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                  </div>
                </RevealArticle>
              ))}
            </div>

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
              <SchoolGalleryCarousel items={gallery} />
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
              <RevealArticle className="organization-card organization-leader" direction="up" delay={0.12}>
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
                  <div
                    className="organization-branch"
                    key={group.title}
                  >
                    <Reveal
                      className="organization-branch-heading"
                      direction={groupIndex === 0 ? "left" : groupIndex === 2 ? "right" : "up"}
                      delay={0.28 + groupIndex * 0.12}
                    >
                      <span>{String(groupIndex + 2).padStart(2, "0")}</span>
                      <h3>{group.title}</h3>
                    </Reveal>
                    <div className="organization-member-list">
                      {group.members.map((member, memberIndex) => (
                        <RevealArticle
                          className="organization-card organization-member"
                          key={`${member.role}-${member.name}`}
                          direction="up"
                          delay={0.42 + groupIndex * 0.12 + Math.min(memberIndex, 4) * 0.1}
                          amount={0.35}
                        >
                          <div>
                            <p className="organization-role">{member.role}</p>
                            <h3>{member.name}</h3>
                          </div>
                        </RevealArticle>
                      ))}
                    </div>
                  </div>
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
          <span>© {new Date().getFullYear()} SDN Danabhakti</span>
          <a href="#beranda">Kembali ke atas</a>
        </div>
      </footer>
    </>
  );
}
