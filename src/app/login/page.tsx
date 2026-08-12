"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LockKey, User, ArrowLeft, Warning, Eye, EyeSlash } from "@phosphor-icons/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) {
          router.replace("/admin");
        }
      })
      .catch(() => {});
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login gagal. Periksa kembali username dan password.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <a href="/" className="login-back-link">
          <ArrowLeft size={16} weight="bold" />
          <span>Kembali ke Halaman Utama</span>
        </a>

        <div className="login-header">
          <Image
            src="/images/brand/logo-sdn-danabhakti-full.webp"
            alt="Logo SDN Danabhakti"
            width={72}
            height={72}
            className="login-logo"
          />
          <h2>Login Admin Sekolah</h2>
          <p>SDN Danabhakti Bojongsoang</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {errorMsg && (
            <div className="admin-alert admin-alert-error">
              <Warning size={18} weight="fill" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="admin-form-group">
            <label htmlFor="username">Username Admin</label>
            <div className="login-input-wrapper">
              <User size={20} className="input-icon" weight="duotone" />
              <input
                id="username"
                type="text"
                required
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <div className="login-input-wrapper">
              <LockKey size={20} className="input-icon" weight="duotone" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? (
                  <EyeSlash size={20} weight="bold" />
                ) : (
                  <Eye size={20} weight="bold" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="login-submit-button">
            {loading ? "Memverifikasi..." : "Login"}
          </button>
        </form>

        <div className="login-footer-text">
          <small>© {new Date().getFullYear()} SDN Danabhakti. Hak Cipta Dilindungi.</small>
        </div>
      </div>
    </div>
  );
}
