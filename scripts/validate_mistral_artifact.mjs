#!/usr/bin/env node
import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/validate_mistral_artifact.mjs path/to/artifact.html");
  process.exit(2);
}

const html = fs.readFileSync(file, "utf8");
const lower = html.toLowerCase();
const issues = [];

const requiredColors = [
  "#e10500",
  "#fa500f",
  "#ff8205",
  "#ffaf00",
  "#ffd800",
  "#fffaeb",
  "#fff0c3",
  "#e9e2cb",
  "#1e1e1e",
];

for (const color of requiredColors) {
  if (!lower.includes(color)) issues.push(`Missing Mistral palette color ${color}.`);
}

if (!lower.includes("arial")) issues.push("Artifact should use Arial typography.");
const hasSlideRatio = lower.includes("aspect-ratio: 16 / 9") || lower.includes("aspect-ratio:16/9");
const hasFixedCanvas = /\b(width|height):\s*\d+px/i.test(html);
if (!hasSlideRatio && !hasFixedCanvas) {
  issues.push("Artifact should define a stable 16:9 ratio or fixed pixel canvas.");
}
if (!lower.includes("mistral-brand-assets")) {
  issues.push("Artifact should reference bundled official Mistral brand assets.");
}
const hasSlide = lower.includes("class=\"slide") || lower.includes("class='slide");
const hasArtifact = lower.includes("class=\"artifact") || lower.includes("class='artifact");
if (!hasSlide && !hasArtifact) {
  issues.push("Artifact should contain .slide or .artifact canvas elements.");
}
if (/(lorem ipsum|placeholder text|todo)/i.test(html)) {
  issues.push("Remove placeholder text before delivery.");
}
if (/linear-gradient\([^)]*(#[0-9a-f]{6}[^)]*){3,}/i.test(html) && !lower.includes("rainbow-bars")) {
  issues.push("Heavy gradients found. Prefer Mistral bars, grids, and blocks.");
}
if (/border-radius:\s*(1[2-9]|[2-9][0-9])px/i.test(html)) {
  issues.push("Large border radii found. Mistral template favors square geometry.");
}
if (/box-shadow:\s*[^;]+/i.test(html)) {
  issues.push("Box shadows found. Use flat blocks and grid structure instead.");
}

const slideCount = (html.match(/class=(["'])[^"']*\bslide\b[^"']*\1/g) || []).length;
const artifactCount = (html.match(/class=(["'])[^"']*\bartifact\b[^"']*\1/g) || []).length;
if (slideCount + artifactCount < 1) issues.push("No slide or artifact canvases detected.");

if (issues.length) {
  console.error(`Mistral artifact validation failed for ${file}:`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Mistral artifact validation passed for ${file} (${slideCount} slide${slideCount === 1 ? "" : "s"}, ${artifactCount} artifact${artifactCount === 1 ? "" : "s"}).`);
