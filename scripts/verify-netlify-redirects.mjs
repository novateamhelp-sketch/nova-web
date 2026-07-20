import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const redirectsPath = resolve("dist/_redirects");

if (!existsSync(redirectsPath)) {
  console.error(
    "[verify-netlify-redirects] Missing dist/_redirects — Netlify SPA routes will 404 on reload."
  );
  process.exit(1);
}

const contents = readFileSync(redirectsPath, "utf8");
if (!contents.includes("/index.html")) {
  console.error(
    "[verify-netlify-redirects] dist/_redirects does not rewrite to /index.html"
  );
  process.exit(1);
}

console.log("[verify-netlify-redirects] OK — dist/_redirects present for Netlify SPA");
