
// Attempt to import the generated movie data.
// If it doesn't exist (e.g., script not run yet), use a fallback or error.
let movieData: { easy: Movie[]; medium: Movie[]; hard: Movie[] } = { easy: [], medium: [], hard: [] };
try {
  // Important: The path to tmdb_movies.json must be correct relative to this file's location after build,
  // or ensure it's copied to a location accessible at runtime if not bundled.
  // For Next.js, placing it in `public` and fetching, or directly importing if your bundler handles JSON, are options.
  // For simplicity in this step, we're assuming it's directly importable or will be handled by a build step.
  // If you place tmdb_movies.json in src/data/, the path would be '../data/tmdb_movies.json'
  // For this example, let's assume you've placed it in `src/data/tmdb_movies.json`
  const rawMovieData = require('../data/tmdb_movies.json'); // Using require for broader compatibility if not using ES modules for JSON
  if (rawMovieData && rawMovieData.easy && rawMovieData.medium && rawMovieData.hard) {
    movieData = rawMovieData;
  } else {
    console.warn("tmdb_movies.json is missing or malformed. Using empty movie list.");
  }
} catch (error) {
  console.warn("Could not load tmdb_movies.json. Ensure the file exists in src/data/ and the Python script has been run. Using empty movie list.", error);
}

export interface Movie {
  title: string;
  year: number; // Changed to number
  genres: string[];
  popularity: number; // This will be vote_count from TMDb
  difficulty: "easy" | "medium" | "hard";
}

// Combine all movies from the different difficulty categories
const allFetchedMovies: Movie[] = [
  ...(movieData.easy || []),
  ...(movieData.medium || []),
  ...(movieData.hard || [])
];

// Deduplicate movies based on title and year to be safe, as TMDb might return slight variations
const uniqueMoviesMap = new Map<string, Movie>();
allFetchedMovies.forEach(movie => {
  const key = `${movie.title.toLowerCase()}_${movie.year}`;
  if (!uniqueMoviesMap.has(key)) {
    uniqueMoviesMap.set(key, movie);
  }
});

export const allMovies: Movie[] = Array.from(uniqueMoviesMap.values());

export type MovieDifficulty = "easy" | "medium" | "hard";

export const getDecadeForMovie = (year: number): number => {
  return Math.floor(year / 10) * 10;
};

export const getUniqueGenres = (movieList: Movie[]): string[] => {
  const allGenres = movieList.flatMap(movie => movie.genres);
  return Array.from(new Set(allGenres)).sort();
};

export const getUniqueDecades = (movieList: Movie[]): string[] => {
  const allDecades = movieList.map(movie => `${getDecadeForMovie(movie.year)}s`);
  return Array.from(new Set(allDecades)).sort((a, b) => {
    return parseInt(a.substring(0,4)) - parseInt(b.substring(0,4));
  });
};

export interface MovieFilters {
  genres?: string[];
  decades?: number[];
  excludeTitles?: string[];
  difficulty?: MovieDifficulty;
}

const normalizeTitleForComparison = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export function getRandomMovie(filters: MovieFilters): Movie | null {
  let filteredMovies = allMovies;

  if (filters.excludeTitles && filters.excludeTitles.length > 0) {
    const excludeSet = new Set(filters.excludeTitles.map(t => normalizeTitleForComparison(t)));
    filteredMovies = filteredMovies.filter(movie => !excludeSet.has(normalizeTitleForComparison(movie.title)));
  }

  if (filters.genres && filters.genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      filters.genres!.some(filterGenre => movie.genres.includes(filterGenre))
    );
  }

  if (filters.decades && filters.decades.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      filters.decades!.includes(getDecadeForMovie(movie.year))
    );
  }

  // Apply difficulty filter *after* other filters to ensure relevance
  if (filters.difficulty) {
    const difficultyFiltered = filteredMovies.filter(movie => movie.difficulty === filters.difficulty);
    if (difficultyFiltered.length > 0) {
      filteredMovies = difficultyFiltered;
    } else {
      // If no movies match the difficulty AND other filters, broaden the search
      // by ignoring difficulty for this round, but keeping other filters.
      // This prevents "no movie found" if, e.g., "Easy Action 1950s" has no entries.
      // The original 'filteredMovies' (before difficulty) is already set.
      // We log this case for potential data review.
      console.warn(`No movies found for difficulty '${filters.difficulty}' with current filters. Broadening search by ignoring difficulty for this selection.`);
    }
  }
  
  if (filteredMovies.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filteredMovies.length);
  return filteredMovies[randomIndex];
}

// Log counts on server start for diagnostics
console.log(`Total unique movies loaded: ${allMovies.length}`);
console.log(`Easy movies: ${allMovies.filter(m => m.difficulty === 'easy').length}`);
console.log(`Medium movies: ${allMovies.filter(m => m.difficulty === 'medium').length}`);
console.log(`Hard movies: ${allMovies.filter(m => m.difficulty === 'hard').length}`);
