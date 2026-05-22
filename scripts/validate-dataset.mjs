#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TIERS = ["easy", "medium", "hard"];
const strictWarnings = process.argv.includes("--strict-warnings");
const expectedPerTier = Number.parseInt(
  process.env.CRYPTIC_CINEMA_EXPECTED_PER_TIER ?? "100",
  10
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const datasetPath = path.resolve(__dirname, "../src/data/omdb_movies.json");

const errors = [];
const warnings = [];

function pushError(message) {
  errors.push(message);
}

function pushWarning(message) {
  warnings.push(message);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeKey(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveClue(movie, tier) {
  if (isNonEmptyString(movie.clue)) {
    return movie.clue.trim();
  }

  if (movie.clues && typeof movie.clues === "object" && !Array.isArray(movie.clues)) {
    const direct = movie.clues[tier];
    if (isNonEmptyString(direct)) return direct.trim();
    for (const fallbackTier of TIERS) {
      const fallback = movie.clues[fallbackTier];
      if (isNonEmptyString(fallback)) return fallback.trim();
    }
  }

  return "";
}

function validateMovie(movie, tier, index, seenKeys) {
  const location = `${tier}[${index}]`;
  const hasTitle = isNonEmptyString(movie.title);
  const title = hasTitle ? movie.title.trim() : "";

  if (!hasTitle) {
    pushError(`${location}: missing title`);
  }

  const year = movie.year;
  if (!Number.isInteger(year)) {
    pushError(`${location}: year must be an integer`);
  } else if (year < 1888 || year > 2100) {
    pushWarning(`${location}: year looks unusual (${year})`);
  }

  if (!Array.isArray(movie.genres) || movie.genres.length === 0) {
    pushError(`${location}: genres must be a non-empty array`);
  } else if (movie.genres.some((genre) => !isNonEmptyString(genre))) {
    pushError(`${location}: genres must contain only non-empty strings`);
  }

  if (!isNonEmptyString(movie.decade)) {
    pushError(`${location}: decade is required`);
  } else if (!/^\d{4}s$/.test(movie.decade.trim())) {
    pushWarning(`${location}: decade format should be like 1990s (got "${movie.decade}")`);
  }

  if (!isNonEmptyString(movie.plot)) {
    pushError(`${location}: plot is required`);
  }

  if (!isNonEmptyString(movie.difficulty)) {
    pushError(`${location}: difficulty is required`);
  } else if (!TIERS.includes(movie.difficulty)) {
    pushError(`${location}: difficulty must be one of ${TIERS.join(", ")}`);
  } else if (movie.difficulty !== tier) {
    pushError(`${location}: difficulty (${movie.difficulty}) does not match section (${tier})`);
  }

  const clue = resolveClue(movie, tier);
  if (!clue) {
    pushError(`${location}: missing clue (expected "clue" or "clues")`);
  } else {
    const wordCount = clue.split(/\s+/).filter(Boolean).length;
    if (wordCount < 6) {
      pushWarning(`${location}: clue is very short (${wordCount} words)`);
    } else if (wordCount > 28) {
      pushWarning(`${location}: clue is long (${wordCount} words)`);
    }

    if (title) {
      const normalizedTitle = normalizeKey(title);
      const normalizedClue = normalizeKey(clue);
      const paddedTitle = ` ${normalizedTitle} `;
      const paddedClue = ` ${normalizedClue} `;
      if (normalizedTitle && paddedClue.includes(paddedTitle)) {
        pushWarning(`${location}: clue appears to include full title`);
      }
    }
  }

  if (title && Number.isInteger(year)) {
    const key = `${normalizeKey(title)}__${year}`;
    if (seenKeys.has(key)) {
      pushError(`${location}: duplicate title+year (${title} / ${year})`);
    } else {
      seenKeys.add(key);
    }
  }
}

function main() {
  let raw;
  try {
    raw = readFileSync(datasetPath, "utf8");
  } catch (error) {
    pushError(`failed to read dataset at ${datasetPath}: ${error instanceof Error ? error.message : "unknown error"}`);
    renderAndExit();
    return;
  }

  let dataset;
  try {
    dataset = JSON.parse(raw);
  } catch (error) {
    pushError(`invalid JSON in ${datasetPath}: ${error instanceof Error ? error.message : "unknown error"}`);
    renderAndExit();
    return;
  }

  if (!dataset || typeof dataset !== "object" || Array.isArray(dataset)) {
    pushError("dataset root must be an object with easy/medium/hard arrays");
    renderAndExit();
    return;
  }

  for (const topLevelKey of Object.keys(dataset)) {
    if (!TIERS.includes(topLevelKey)) {
      pushWarning(`unexpected top-level key "${topLevelKey}"`);
    }
  }

  const seenKeys = new Set();
  const counts = {};

  for (const tier of TIERS) {
    const movies = dataset[tier];
    if (!Array.isArray(movies)) {
      pushError(`${tier}: expected an array`);
      counts[tier] = 0;
      continue;
    }

    counts[tier] = movies.length;

    if (Number.isFinite(expectedPerTier) && expectedPerTier > 0 && movies.length !== expectedPerTier) {
      pushError(`${tier}: expected ${expectedPerTier} entries, found ${movies.length}`);
    }

    movies.forEach((movie, index) => {
      if (!movie || typeof movie !== "object" || Array.isArray(movie)) {
        pushError(`${tier}[${index}]: movie entry must be an object`);
        return;
      }
      validateMovie(movie, tier, index, seenKeys);
    });
  }

  renderAndExit(counts);
}

function renderAndExit(counts = { easy: 0, medium: 0, hard: 0 }) {
  const total = (counts.easy ?? 0) + (counts.medium ?? 0) + (counts.hard ?? 0);
  console.log("Dataset validation summary");
  console.log(`- easy: ${counts.easy ?? 0}`);
  console.log(`- medium: ${counts.medium ?? 0}`);
  console.log(`- hard: ${counts.hard ?? 0}`);
  console.log(`- total: ${total}`);
  console.log(`- warnings: ${warnings.length}`);
  console.log(`- errors: ${errors.length}`);

  if (warnings.length > 0) {
    console.log("\nWarnings:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }

  if (errors.length > 0) {
    console.log("\nErrors:");
    errors.forEach((error) => console.log(`- ${error}`));
  }

  const shouldFail = errors.length > 0 || (strictWarnings && warnings.length > 0);
  process.exit(shouldFail ? 1 : 0);
}

main();
