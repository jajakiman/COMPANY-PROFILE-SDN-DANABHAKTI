"use client";

import { AnimatePresence, m } from "motion/react";
import { FormEvent, useState } from "react";

export function ContactForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Pengiriman belum diaktifkan. Silakan gunakan kontak resmi sekolah setelah tersedia.");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <div className="field-group">
          <label htmlFor="name">Nama</label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Masukkan nama Anda" />
        </div>
        <div className="field-group">
          <label htmlFor="phone">Nomor telepon</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Contoh: 08xxxxxxxxxx" />
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="subject">Keperluan</label>
        <input id="subject" name="subject" type="text" placeholder="Tuliskan keperluan Anda" />
      </div>
      <div className="field-group">
        <label htmlFor="message">Pesan</label>
        <textarea id="message" name="message" rows={5} placeholder="Tulis pesan secara singkat dan jelas" />
        <small>Form ini masih berupa tampilan awal dan belum mengirim data.</small>
      </div>
      <m.button className="button motion-reveal" type="submit" whileTap={{ scale: 0.98 }}>
        Periksa Pengiriman
      </m.button>
      <div className="form-status-slot">
        <AnimatePresence initial={false}>
          {message ? (
            <m.p
              className="form-status motion-reveal"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.24 }}
            >
              {message}
            </m.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
