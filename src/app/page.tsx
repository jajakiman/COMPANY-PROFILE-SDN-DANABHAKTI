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
import { ContactForm } from "@/components/contact-form";
import { MediaPlaceholder } from "@/components/media-placeholder";
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
            <div className="hero-copy">
              <p className="hero-kicker">Selamat datang di SDN Danabhakti</p>
              <h1 id="hero-title">{schoolProfile.heroTitle}</h1>
              <p className="hero-lead">{schoolProfile.heroDescription}</p>
              <div className="hero-actions">
                <a className="button" href="#profil">
                  Kenali Sekolah <ArrowDown aria-hidden="true" size={18} weight="bold" />
                </a>
                <a className="text-link" href="#kontak">
                  Lihat Kontak <ArrowRight aria-hidden="true" size={18} weight="bold" />
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-label="Area foto utama sekolah">
              <MediaPlaceholder label="Foto utama lingkungan sekolah" className="hero-photo" priority />
              <div className="hero-note">
                <span>Lingkungan belajar</span>
                <strong>Aman, aktif, dan suportif</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section section" id="profil" aria-labelledby="profile-title">
          <div className="page-shell">
            <div className="profile-intro">
              <div>
                <p className="section-label">Profil sekolah</p>
                <h2 id="profile-title">Mengenal SDN Danabhakti</h2>
              </div>
              <p className="profile-statement">{schoolProfile.introduction}</p>
            </div>

            <div className="profile-content">
              <div className="profile-story">
                <MediaPlaceholder label="Foto sejarah atau gedung sekolah" className="profile-photo" />
                <div>
                  <h3>Perjalanan sekolah</h3>
                  <p>{schoolProfile.history}</p>
                </div>
              </div>

              <dl className="identity-list">
                {schoolProfile.identity.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <blockquote className="principal-message">
              <span className="quote-mark" aria-hidden="true">“</span>
              <p>{schoolProfile.principalMessage}</p>
              <footer>Kepala SDN Danabhakti</footer>
            </blockquote>
          </div>
        </section>

        <section className="vision-section section" id="visi-misi" aria-labelledby="vision-title">
          <div className="page-shell vision-grid">
            <div className="vision-copy">
              <span className="vision-index" aria-hidden="true">01</span>
              <h2 id="vision-title">Arah pendidikan yang jelas</h2>
              <p>{visionMission.vision}</p>
            </div>
            <div className="mission-list">
              <h3>Misi sekolah</h3>
              <ol>
                {visionMission.missions.map((mission, index) => (
                  <li key={mission}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{mission}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="organization-section section" id="struktur" aria-labelledby="organization-title">
          <div className="page-shell">
            <div className="section-heading compact-heading">
              <h2 id="organization-title">Struktur sekolah</h2>
              <p>Peran dan susunan warga sekolah akan diperbarui berdasarkan data resmi.</p>
            </div>

            <div className="organization-tree">
              {organization.map((member, index) => (
                <article
                  className={`organization-card level-${member.level}`}
                  key={`${member.role}-${index}`}
                >
                  <div className="avatar-placeholder" aria-hidden="true">
                    <UsersThree size={28} weight="duotone" />
                  </div>
                  <div>
                    <p className="organization-role">{member.role}</p>
                    <h3>{member.name}</h3>
                    <p>{member.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="facilities-section section" aria-labelledby="facilities-title">
          <div className="page-shell facilities-grid">
            <div className="facilities-visual">
              <MediaPlaceholder label="Foto fasilitas utama sekolah" className="facility-main-photo" />
              <div className="facility-accent" aria-hidden="true">
                <Buildings size={36} weight="duotone" />
              </div>
            </div>
            <div className="facilities-copy">
              <h2 id="facilities-title">Ruang untuk belajar dan berkembang</h2>
              <div className="facility-list">
                {facilities.map((facility, index) => (
                  <article key={facility.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{facility.title}</h3>
                      <p>{facility.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="news-section section" id="kegiatan" aria-labelledby="news-title">
          <div className="page-shell">
            <div className="section-heading">
              <div>
                <p className="section-label">Berita dan kegiatan</p>
                <h2 id="news-title">Kabar dari sekolah</h2>
              </div>
            </div>

            <div className="news-layout">
              <article className="featured-news">
                <MediaPlaceholder label="Foto berita unggulan" className="news-featured-photo" />
                <div className="featured-news-copy">
                  <div className="news-meta">
                    <span>{featuredNews.category}</span>
                    <time><CalendarBlank aria-hidden="true" size={16} />{featuredNews.date}</time>
                  </div>
                  <h3>{featuredNews.title}</h3>
                  <p>{featuredNews.excerpt}</p>
                </div>
              </article>

              <div className="supporting-news">
                {supportingNews.map((item) => (
                  <article key={item.title}>
                    <MediaPlaceholder label={`Foto ${item.title.toLowerCase()}`} className="news-small-photo" />
                    <div>
                      <p className="news-category">{item.category}</p>
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <time>{item.date}</time>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="gallery-section section" aria-labelledby="gallery-title">
          <div className="page-shell">
            <div className="gallery-heading">
              <h2 id="gallery-title">Galeri sekolah</h2>
              <p>Dokumentasi ruang, kegiatan, dan kebersamaan warga SDN Danabhakti.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <MediaPlaceholder
                  key={`${item.label}-${index}`}
                  label={item.label}
                  className={`gallery-item gallery-${item.size}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section" id="kontak" aria-labelledby="contact-title">
          <div className="page-shell">
            <div className="contact-heading">
              <h2 id="contact-title">Terhubung dengan sekolah</h2>
              <p>Informasi kontak resmi akan diperbarui setelah data sekolah diterima.</p>
            </div>

            <div className="contact-layout">
              <div className="contact-information">
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

                <div className="map-placeholder" role="img" aria-label="Peta lokasi belum tersedia">
                  <MapPin aria-hidden="true" size={34} weight="fill" />
                  <strong>Lokasi sekolah</strong>
                  <span>Tautan Google Maps akan ditempatkan di sini</span>
                </div>
              </div>

              <div className="form-panel">
                <div>
                  <BookOpenText aria-hidden="true" size={30} weight="duotone" />
                  <h3>Kirim pertanyaan</h3>
                  <p>Isi form berikut untuk melihat rancangan alur kontak.</p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-grid">
          <div>
            <a className="brand footer-brand" href="#beranda">
              <span className="brand-mark" aria-hidden="true">SD</span>
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
        </div>
        <div className="page-shell footer-bottom">
          <span>© {new Date().getFullYear()} SDN Danabhakti</span>
          <a href="#beranda">Kembali ke atas</a>
        </div>
      </footer>
    </>
  );
}
