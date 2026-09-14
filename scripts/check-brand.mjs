import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const logo = "/images/brand/logo-danabhakti-new-removebg.png";
const darkSurfaceLogo = "/images/brand/logo-danabhakti-new.webp";
const referencedFiles = [
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/login/page.tsx",
  "src/components/initial-loader.tsx",
  "src/components/site-header.tsx",
];

await Promise.all([
  access("public/images/brand/logo-danabhakti-new-removebg.png"),
  access("public/images/brand/logo-danabhakti-new.webp"),
]);

for (const file of referencedFiles) {
  const source = await readFile(file, "utf8");
  assert.ok(source.includes(logo), `${file} belum menggunakan logo baru`);
  assert.ok(!source.includes("logo-sdn-danabhakti-full.webp"), `${file} masih menggunakan logo lama`);
}

const home = await readFile("src/app/page.tsx", "utf8");
assert.match(
  home,
  new RegExp(`footer-brand[\\s\\S]*?src="${logo.replaceAll("/", "\\/")}"`),
  "Footer belum menggunakan logo transparan",
);
assert.doesNotMatch(
  home.match(/footer-brand[\s\S]*?<\/a>/)?.[0] ?? "",
  new RegExp(darkSurfaceLogo.replaceAll("/", "\\/")),
  "Footer masih menggunakan bidang putih bawaan aset",
);

for (const [file, expectedCount] of [
  ["src/components/admin/admin-shell.tsx", 1],
  ["src/components/admin/admin-sidebar.tsx", 2],
]) {
  const source = await readFile(file, "utf8");
  assert.equal(
    (source.match(new RegExp(darkSurfaceLogo.replaceAll("/", "\\/"), "g")) ?? []).length,
    expectedCount,
    `${file} belum menggunakan logo berlatar putih pada seluruh konteks admin`,
  );
  assert.ok(!source.includes(logo), `${file} masih menggunakan logo transparan`);
}

const layout = await readFile("src/app/layout.tsx", "utf8");
for (const iconType of ["icon", "shortcut", "apple"]) {
  assert.match(layout, new RegExp(`${iconType}:.*${logo.replaceAll("/", "\\/")}`), `Metadata ${iconType} belum menggunakan logo removebg`);
}

const css = await readFile("src/app/globals.css", "utf8");
const footerLogoPanel = css.match(/\.footer-brand \.brand-mark\s*\{[^}]+\}/)?.[0] ?? "";
for (const style of ["width: 64px", "height: 64px", "padding: 7px", "border-radius: 18px", "background: var(--background)"]) {
  assert.ok(footerLogoPanel.includes(style), `Panel logo footer belum memiliki ${style}`);
}
for (const token of [
  "--primary-dark: #0b2f63",
  "--primary: #155a96",
  "--primary-bright: #2d83c5",
  "--accent: #f4be22",
  "--background: #f7fbff",
  "--surface-muted: #e7f3fb",
  "--foreground: #16283d",
  "--muted-foreground: #40566f",
  "--border: #c8dceb",
]) {
  assert.ok(css.toLowerCase().includes(token), `Token belum diterapkan: ${token}`);
}

const siteData = await readFile("src/data/site.ts", "utf8");
assert.ok(siteData.includes('displayNumber: "+62 811-2111-983"'), "Nomor WhatsApp tampilan belum diperbarui");
assert.ok(siteData.includes("https://wa.me/628112111983"), "Redirect WhatsApp belum menggunakan nomor baru");

console.log("Brand asset dan palette contract: PASS");
