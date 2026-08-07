import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  Buildings,
  CalendarBlank,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SchoolGalleryCarousel } from "@/components/school-gallery-carousel";
import {
  ConnectorLine,
  MediaReveal,
  MaskReveal,
  Parallax,
  Reveal,
  RevealArticle,
  RevealListItem,
  Stagger,
  StaggerItem,
} from "@/components/motion/motion-primitives";
import { SiteHeader } from "@/components/site-header";
import {
  contact,
  facilities,
  gallery,
  news,
  organization,
  schoolProfile,
  visionMission,
} from "@/data/site";

export default function Home() {
  const featuredNews = news.find((item) => item.featured) ?? news[0];
  const supportingNews = news.filter((item) => !item.featured);

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
              parallax={34}
              scaleTo={1.045}
              eager
            >
              <MediaPlaceholder label="Foto utama lingkungan sekolah" className="hero-photo" priority />
              <Reveal className="hero-note" direction="up" delay={0.5} amount={0.1} spring eager>
                <span>Lingkungan belajar</span>
                <strong>Aman, aktif, dan suportif</strong>
              </Reveal>
            </MediaReveal>
          </div>
        </section>

        <section className="profile-section section" id="profil" aria-labelledby="profile-title">
          <div className="page-shell">
            <Reveal className="profile-intro" direction="left">
              <div>
                <p className="section-label">Profil sekolah</p>
                <h2 id="profile-title">Mengenal SDN Danabhakti</h2>
              </div>
              <p className="profile-statement">{schoolProfile.introduction}</p>
            </Reveal>

            <div className="profile-content">
              <MediaReveal className="profile-story" direction="right" parallax={20} scaleTo={1.018}>
                <MediaPlaceholder label="Foto sejarah atau gedung sekolah" className="profile-photo" />
                <div>
                  <h3>Perjalanan sekolah</h3>
                  <p>{schoolProfile.history}</p>
                </div>
              </MediaReveal>

              <Reveal direction="right" delay={0.12}>
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

            <Reveal direction="up" amount={0.4}>
              <blockquote className="principal-message">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p>{schoolProfile.principalMessage}</p>
                <footer>Kepala SDN Danabhakti</footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section className="vision-section section" id="visi-misi" aria-labelledby="vision-title">
          <div className="page-shell vision-grid">
            <Reveal className="vision-copy" direction="left">
              <Parallax className="vision-index" distance={52}>01</Parallax>
              <h2 id="vision-title">Arah pendidikan yang jelas</h2>
              <p>{visionMission.vision}</p>
            </Reveal>
            <Reveal className="mission-list" direction="right" delay={0.12}>
              <h3>Misi sekolah</h3>
              <ol>
                {visionMission.missions.map((mission, index) => (
                  <RevealListItem key={mission} delay={index * 0.07}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{mission}</p>
                  </RevealListItem>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section className="organization-section section" id="struktur" aria-labelledby="organization-title">
          <div className="page-shell">
            <Reveal className="section-heading compact-heading" direction="left">
              <h2 id="organization-title">Struktur sekolah</h2>
              <p>Mengenal pimpinan, guru, dan tenaga kependidikan SDN Danabhakti.</p>
            </Reveal>

            <Reveal className="organization-tree" direction="none" amount={0.14}>
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
                    delay={0.08 + groupIndex * 0.08}
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
                          delay={memberIndex * 0.055}
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
            </Reveal>
          </div>
        </section>

        <section className="facilities-section section" aria-labelledby="facilities-title">
          <div className="page-shell facilities-grid">
            <MediaReveal
              className="facilities-visual"
              direction="right"
              parallax={24}
              scaleTo={1.025}
            >
              <MediaPlaceholder label="Foto fasilitas utama sekolah" className="facility-main-photo" />
              <Reveal className="facility-accent" direction="up" delay={0.38} amount={0.1} spring>
                <Buildings aria-hidden="true" size={36} weight="duotone" />
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

            <div className="news-layout">
              <RevealArticle className="featured-news" direction="left">
                <MediaReveal direction="bottom" parallax={18} scaleTo={1.035}>
                  <MediaPlaceholder label="Foto berita unggulan" className="news-featured-photo" />
                </MediaReveal>
                <div className="featured-news-copy">
                  <div className="news-meta">
                    <span>{featuredNews.category}</span>
                    <time><CalendarBlank aria-hidden="true" size={16} />{featuredNews.date}</time>
                  </div>
                  <h3>{featuredNews.title}</h3>
                  <p>{featuredNews.excerpt}</p>
                </div>
              </RevealArticle>

              <div className="supporting-news">
                {supportingNews.map((item, index) => (
                  <RevealArticle key={item.title} direction="right" delay={0.1 + index * 0.1}>
                    <MediaPlaceholder label={`Foto ${item.title.toLowerCase()}`} className="news-small-photo" />
                    <div>
                      <p className="news-category">{item.category}</p>
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <time>{item.date}</time>
                    </div>
                  </RevealArticle>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-section section" aria-labelledby="gallery-title">
          <div className="page-shell">
            <Reveal className="gallery-heading" direction="left">
              <h2 id="gallery-title">Galeri sekolah</h2>
              <p>Dokumentasi ruang, kegiatan, dan kebersamaan warga SDN Danabhakti.</p>
            </Reveal>
            <Reveal direction="up" amount={0.12}>
              <SchoolGalleryCarousel items={gallery} />
            </Reveal>
          </div>
        </section>

        <section className="contact-section section" id="kontak" aria-labelledby="contact-title">
          <div className="page-shell">
            <Reveal className="contact-heading" direction="left">
              <h2 id="contact-title">Terhubung dengan sekolah</h2>
              <p>Informasi kontak resmi akan diperbarui setelah data sekolah diterima.</p>
            </Reveal>

            <div className="contact-layout">
              <Reveal className="contact-information" direction="left">
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

                <a
                  className="map-placeholder"
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buka lokasi SDN Danabhakti di Google Maps, tab baru"
                >
                  <MapPin aria-hidden="true" size={34} weight="fill" />
                  <strong>Lokasi SDN Danabhakti</strong>
                  <span>Buka alamat sekolah di Google Maps</span>
                </a>
              </Reveal>

              <Reveal className="form-panel" direction="right" delay={0.12}>
                <div>
                  <BookOpenText aria-hidden="true" size={30} weight="duotone" />
                  <h3>Kirim pertanyaan</h3>
                  <p>Isi form berikut untuk melihat rancangan alur kontak.</p>
                </div>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Reveal className="page-shell footer-grid" direction="up" amount={0.3}>
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
