import rawMovieData from "../data/omdb_movies.json";

export type MovieDifficulty = "easy" | "medium" | "hard";

export interface Movie {
  title: string;
  year: number;
  genres: string[];
  decade: string;
  plot: string;
  difficulty: MovieDifficulty;
  imdbRating?: string;
  tmdbVoteCount?: number;
  popularity?: number;
  imdbID?: string;
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

  return {
    title: titleValue,
    year,
    genres,
    decade,
    plot: plot || "A cryptic tale unfolds. Can you name the movie?",
    difficulty,
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
