import rawMovieData from "../data/omdb_movies.json";

export type MovieDifficulty = "easy" | "medium" | "hard";

export interface MovieClues {
  easy?: string;
  medium?: string;
  hard?: string;
}

export interface Movie {
  title: string;
  year: number;
  genres: string[];
  decade: string;
  plot: string;
  difficulty: MovieDifficulty;
  clues?: MovieClues;
  imdbRating?: string;
  tmdbVoteCount?: number;
  popularity?: number;
  imdbID?: string;
}

export interface MovieDatasetHealth {
  totalMovies: number;
  difficultyCounts: Record<MovieDifficulty, number>;
  genreCount: number;
  decadeCount: number;
  missingPlotCount: number;
  warnings: string[];
  isHealthy: boolean;
}

interface MovieFilters {
  genres?: string[];
  decades?: string[];
  difficulty?: MovieDifficulty;
  excludeMovieKeys?: string[];
}

function parseDifficulty(value: unknown): MovieDifficulty | null {
  if (typeof value !== "string") return null;
  const normalized = value.toLowerCase().trim();
  if (normalized === "easy" || normalized === "medium" || normalized === "hard") {
    return normalized;
  }
  return null;
}

function parseYear(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function parseGenres(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((genre) => genre.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((genre) => genre.trim())
      .filter(Boolean);
  }

  return [];
}

function parseClues(value: unknown): MovieClues | undefined {
  if (typeof value === "string") {
    const clue = value.trim();
    if (!clue) return undefined;
    return { easy: clue, medium: clue, hard: clue };
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const rawClues = value as Record<string, unknown>;
  const clues: MovieClues = {};

  (["easy", "medium", "hard"] as MovieDifficulty[]).forEach((difficulty) => {
    const clueValue = rawClues[difficulty];
    if (typeof clueValue === "string" && clueValue.trim().length > 0) {
      clues[difficulty] = clueValue.trim();
    }
  });

  return Object.keys(clues).length > 0 ? clues : undefined;
}

function normalizeForLookup(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getMovieKey(movie: Movie): string {
  return `${normalizeForLookup(movie.title)}_${movie.year}`;
}

const DEFAULT_PLOT_PLACEHOLDER = "A cryptic tale unfolds. Can you name the movie?";

function getDecadeFromYear(year: number): string {
  return `${Math.floor(year / 10) * 10}s`;
}

function inferDifficulty(raw: Record<string, unknown>, popularity?: number): MovieDifficulty {
  const explicit = parseDifficulty(raw.difficulty);
  if (explicit) return explicit;

  if (typeof popularity === "number") {
    if (popularity >= 1_500_000) return "easy";
    if (popularity >= 300_000) return "medium";
  }
  return "hard";
}

function flattenRawMovieSource(source: unknown): Record<string, unknown>[] {
  if (Array.isArray(source)) {
    return source.filter((entry): entry is Record<string, unknown> => !!entry && typeof entry === "object");
  }

  if (!source || typeof source !== "object") return [];

  const objectSource = source as Record<string, unknown>;
  const difficulties: MovieDifficulty[] = ["easy", "medium", "hard"];
  const flattened: Record<string, unknown>[] = [];

  difficulties.forEach((difficulty) => {
    const value = objectSource[difficulty];
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry && typeof entry === "object") {
          flattened.push({ difficulty, ...(entry as Record<string, unknown>) });
        }
      });
    }
  });

  return flattened;
}

function normalizeMovie(raw: Record<string, unknown>): Movie | null {
  const title = (raw.title ?? raw.Title) as unknown;
  const titleValue = typeof title === "string" ? title.trim() : "";
  if (!titleValue) return null;

  const year = parseYear(raw.year ?? raw.Year);
  if (!year) return null;

  const genres = parseGenres(raw.genres ?? raw.Genre);
  const plotRaw = raw.plot ?? raw.Plot ?? raw.overview ?? "";
  const plot = typeof plotRaw === "string" ? plotRaw.trim() : "";

  const popularityRaw = raw.popularity ?? raw.imdbVotes ?? raw.tmdbVoteCount;
  const popularity =
    typeof popularityRaw === "number"
      ? popularityRaw
      : typeof popularityRaw === "string"
        ? Number.parseInt(popularityRaw.replace(/,/g, ""), 10)
        : undefined;

  const difficulty = inferDifficulty(raw, Number.isFinite(popularity as number) ? (popularity as number) : undefined);
  const decadeRaw = raw.decade;
  const decade =
    typeof decadeRaw === "string" && decadeRaw.trim().length > 0
      ? decadeRaw.trim()
      : getDecadeFromYear(year);
  const clues = parseClues(raw.clues ?? raw.clue);

  return {
    title: titleValue,
    year,
    genres,
    decade,
    plot: plot || DEFAULT_PLOT_PLACEHOLDER,
    difficulty,
    clues,
    imdbRating: typeof raw.imdbRating === "string" ? raw.imdbRating : undefined,
    tmdbVoteCount: typeof raw.tmdbVoteCount === "number" ? raw.tmdbVoteCount : undefined,
    popularity: typeof popularity === "number" && Number.isFinite(popularity) ? popularity : undefined,
    imdbID: typeof raw.imdbID === "string" ? raw.imdbID : undefined,
  };
}

const allParsedMovies = flattenRawMovieSource(rawMovieData)
  .map((rawMovie) => normalizeMovie(rawMovie))
  .filter((movie): movie is Movie => movie !== null);

const uniqueByKey = new Map<string, Movie>();
allParsedMovies.forEach((movie) => {
  const key = movie.imdbID || getMovieKey(movie);
  if (!uniqueByKey.has(key)) uniqueByKey.set(key, movie);
});

export const allMovies: Movie[] = Array.from(uniqueByKey.values());

export function getDatasetHealth(movieList: Movie[] = allMovies): MovieDatasetHealth {
  const difficultyCounts: Record<MovieDifficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
  };
  const genres = new Set<string>();
  const decades = new Set<string>();

  movieList.forEach((movie) => {
    difficultyCounts[movie.difficulty] += 1;
    movie.genres.forEach((genre) => genres.add(genre));
    decades.add(movie.decade);
  });

  const missingPlotCount = movieList.filter(
    (movie) => !movie.plot || movie.plot.trim() === DEFAULT_PLOT_PLACEHOLDER
  ).length;

  const warnings: string[] = [];
  if (movieList.length === 0) {
    warnings.push("Movie dataset is empty. Run the fetch pipeline before launch.");
  } else if (movieList.length < 100) {
    warnings.push("Movie dataset is small (<100). Replay variety will feel limited.");
  }

  (["easy", "medium", "hard"] as MovieDifficulty[]).forEach((difficulty) => {
    if (difficultyCounts[difficulty] === 0) {
      warnings.push(`No ${difficulty} movies available. Difficulty selector is imbalanced.`);
    }
  });

  if (genres.size < 6 && movieList.length > 0) {
    warnings.push("Genre coverage is low. Add more genres to improve filter usefulness.");
  }

  if (decades.size < 4 && movieList.length > 0) {
    warnings.push("Decade coverage is low. Add more year diversity.");
  }

  if (movieList.length > 0 && missingPlotCount / movieList.length > 0.25) {
    warnings.push("Many movies have missing plot summaries. Clue quality may be weak.");
  }

  return {
    totalMovies: movieList.length,
    difficultyCounts,
    genreCount: genres.size,
    decadeCount: decades.size,
    missingPlotCount,
    warnings,
    isHealthy: warnings.length === 0,
  };
}

export const movieDatasetHealth = getDatasetHealth(allMovies);

export function getUniqueGenres(movieList: Movie[]): string[] {
  return Array.from(new Set(movieList.flatMap((movie) => movie.genres))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getUniqueDecades(movieList: Movie[]): string[] {
  return Array.from(new Set(movieList.map((movie) => movie.decade))).sort((a, b) =>
    Number.parseInt(a, 10) - Number.parseInt(b, 10)
  );
}

export function filterMovies(filters: MovieFilters = {}): Movie[] {
  let filtered = allMovies;

  if (filters.difficulty) {
    filtered = filtered.filter((movie) => movie.difficulty === filters.difficulty);
  }

  if (filters.genres && filters.genres.length > 0) {
    filtered = filtered.filter((movie) =>
      filters.genres!.some((selectedGenre) => movie.genres.includes(selectedGenre))
    );
  }

  if (filters.decades && filters.decades.length > 0) {
    filtered = filtered.filter((movie) => filters.decades!.includes(movie.decade));
  }

  if (filters.excludeMovieKeys && filters.excludeMovieKeys.length > 0) {
    const excluded = new Set(filters.excludeMovieKeys);
    filtered = filtered.filter((movie) => !excluded.has(getMovieKey(movie)));
  }

  return filtered;
}

export function getRandomMovie(filters: MovieFilters = {}): Movie | null {
  const candidates = filterMovies(filters);
  if (candidates.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}
