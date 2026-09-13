import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const logo = "/images/brand/logo-danabhakti-new-removebg.png";
const referencedFiles = [
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/login/page.tsx",
  "src/components/initial-loader.tsx",
  "src/components/site-header.tsx",
  "src/components/admin/admin-shell.tsx",
  "src/components/admin/admin-sidebar.tsx",
];

await access("public/images/brand/logo-danabhakti-new-removebg.png");

for (const file of referencedFiles) {
  const source = await readFile(file, "utf8");
  assert.ok(source.includes(logo), `${file} belum menggunakan logo baru`);
  assert.ok(!source.includes("logo-danabhakti-new.webp"), `${file} masih menggunakan logo berlatar putih`);
  assert.ok(!source.includes("logo-sdn-danabhakti-full.webp"), `${file} masih menggunakan logo lama`);
}

const layout = await readFile("src/app/layout.tsx", "utf8");
for (const iconType of ["icon", "shortcut", "apple"]) {
  assert.match(layout, new RegExp(`${iconType}:.*${logo.replaceAll("/", "\\/")}`), `Metadata ${iconType} belum menggunakan logo removebg`);
}

const css = await readFile("src/app/globals.css", "utf8");
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
