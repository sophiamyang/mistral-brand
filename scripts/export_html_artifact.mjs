#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const input = args[0];

if (!input) {
  console.error("Usage: node scripts/export_html_artifact.mjs file.html --out exports [--pdf] [--png] [--selector .slide]");
  process.exit(2);
}

const outIndex = args.indexOf("--out");
const selectorIndex = args.indexOf("--selector");
const outDir = outIndex >= 0 ? args[outIndex + 1] : "exports";
const selector = selectorIndex >= 0 ? args[selectorIndex + 1] : ".artifact, .slide";
const wantsPdf = args.includes("--pdf");
const wantsPng = args.includes("--png");

if (!wantsPdf && !wantsPng) {
  console.error("Choose at least one export format: --pdf or --png.");
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is required for PDF/PNG export but is not installed in this runtime.");
  console.error("Install Playwright or use a browser-enabled runtime that provides it, then rerun this command.");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.resolve(input)).href, { waitUntil: "networkidle" });

const base = path.basename(input, path.extname(input));

if (wantsPdf) {
  await page.pdf({
    path: path.join(outDir, `${base}.pdf`),
    printBackground: true,
    width: "1600px",
    height: "900px",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
}

if (wantsPng) {
  const elements = await page.locator(selector).all();
  if (!elements.length) {
    await page.screenshot({ path: path.join(outDir, `${base}.png`), fullPage: true });
  } else {
    for (let i = 0; i < elements.length; i += 1) {
      await elements[i].screenshot({ path: path.join(outDir, `${base}-${String(i + 1).padStart(2, "0")}.png` });
    }
  }
}

await browser.close();
console.log(`Exported ${input} to ${outDir}.`);
