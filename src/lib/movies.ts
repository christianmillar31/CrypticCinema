
// Attempt to import the generated movie data.
// If it doesn't exist (e.g., script not run yet), use a fallback or error.
import movieDataFile from '../data/tmdb_movies.json';

export interface Movie {
  title: string;
  year: number; // Changed to number
  genres: string[];
  popularity: number; // This will be vote_count from TMDb
  difficulty: "easy" | "medium" | "hard";
}

// Type guard for the structure of tmdb_movies.json
interface MovieDataFile {
  easy: Movie[];
  medium: Movie[];
  hard: Movie[];
}

function isValidMovieData(data: any): data is MovieDataFile {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.easy) &&
    Array.isArray(data.medium) &&
    Array.isArray(data.hard) &&
    // Optionally, add checks for movie properties if needed
    (data.easy.every((m: any) => typeof m.title === 'string' && typeof m.year === 'number' && Array.isArray(m.genres) && typeof m.popularity === 'number' && typeof m.difficulty === 'string') || data.easy.length === 0) &&
    (data.medium.every((m: any) => typeof m.title === 'string' && typeof m.year === 'number' && Array.isArray(m.genres) && typeof m.popularity === 'number' && typeof m.difficulty === 'string') || data.medium.length === 0) &&
    (data.hard.every((m: any) => typeof m.title === 'string' && typeof m.year === 'number' && Array.isArray(m.genres) && typeof m.popularity === 'number' && typeof m.difficulty === 'string') || data.hard.length === 0)
  );
}

let movieData: MovieDataFile = { easy: [], medium: [], hard: [] };

if (isValidMovieData(movieDataFile)) {
  movieData = movieDataFile;
} else {
  console.warn(
    "tmdb_movies.json is missing, malformed, or empty. Using empty movie list. Please run the tmdb_fetcher.py script and place tmdb_movies.json in src/data/"
  );
}

// Combine all movies from the different difficulty categories
const allFetchedMovies: Movie[] = [
  ...(movieData.easy || []),
  ...(movieData.medium || []),
  ...(movieData.hard || [])
];

// Deduplicate movies based on title and year to be safe
const uniqueMoviesMap = new Map<string, Movie>();
allFetchedMovies.forEach(movie => {
  if (movie && typeof movie.title === 'string' && typeof movie.year === 'number') {
    const key = `${movie.title.toLowerCase()}_${movie.year}`;
    if (!uniqueMoviesMap.has(key)) {
      uniqueMoviesMap.set(key, movie);
    }
  }
});

export const allMovies: Movie[] = Array.from(uniqueMoviesMap.values());

export type MovieDifficulty = "easy" | "medium" | "hard";

export const getDecadeForMovie = (year: number): number => {
  return Math.floor(year / 10) * 10;
};

export const getUniqueGenres = (movieList: Movie[]): string[] => {
  const allGenres = movieList.flatMap(movie => movie.genres || []); // Handle undefined genres
  return Array.from(new Set(allGenres)).sort();
};

export const getUniqueDecades = (movieList: Movie[]): string[] => {
  const allDecades = movieList.map(movie => `${getDecadeForMovie(movie.year)}s`);
  return Array.from(new Set(allDecades)).sort((a, b) => {
    // Ensure correct numeric sort for decades like "1980s"
    return parseInt(a.substring(0,4)) - parseInt(b.substring(0,4));
  });
};

export interface MovieFilters {
  genres?: string[];
  decades?: number[]; // Store decades as numbers (e.g., 1980, 1990)
  excludeTitles?: string[];
  difficulty?: MovieDifficulty;
}

// Normalize title for consistent comparison (e.g., ignore case, punctuation)
const normalizeTitleForComparison = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
    .replace(/\s+/g, " ") // Normalize multiple spaces to single space
    .trim();
};

export function getRandomMovie(filters: MovieFilters): Movie | null {
  let filteredMovies = allMovies;

  // 1. Filter by excluded titles (movies already shown in this session)
  if (filters.excludeTitles && filters.excludeTitles.length > 0) {
    const excludeSet = new Set(filters.excludeTitles.map(t => normalizeTitleForComparison(t)));
    filteredMovies = filteredMovies.filter(movie => !excludeSet.has(normalizeTitleForComparison(movie.title)));
  }

  // 2. Filter by selected genres (if any)
  if (filters.genres && filters.genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      filters.genres!.some(filterGenre => (movie.genres || []).includes(filterGenre))
    );
  }

  // 3. Filter by selected decades (if any)
  if (filters.decades && filters.decades.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      filters.decades!.includes(getDecadeForMovie(movie.year))
    );
  }

  // 4. Filter by selected difficulty
  // This assumes the Python script has correctly assigned 'difficulty' to each movie.
  // The difficulty filter is applied *after* other filters to narrow down the selection.
  if (filters.difficulty) {
    const difficultyFiltered = filteredMovies.filter(movie => movie.difficulty === filters.difficulty);
    // If specific difficulty yields results, use that. Otherwise, stick with the broader set
    // (already filtered by genre/decade) to avoid "no movie found" if the combination is too narrow.
    if (difficultyFiltered.length > 0) {
        filteredMovies = difficultyFiltered;
    } else {
        // Optional: log if no movies match the specific difficulty with other filters.
        // console.warn(`No movies found for difficulty '${filters.difficulty}' with current genre/decade filters. Using broader selection if available.`);
    }
  }
  
  if (filteredMovies.length === 0) {
    return null; // No movies match all specified criteria
  }

  // Select a random movie from the finally filtered list
  const randomIndex = Math.floor(Math.random() * filteredMovies.length);
  return filteredMovies[randomIndex];
}

// Log counts on server start for diagnostics if run in a Node environment (e.g. Next.js server-side)
if (typeof process !== 'undefined') { // Basic check for Node.js environment
    console.log(`Total unique movies loaded: ${allMovies.length}`);
    const easyCount = allMovies.filter(m => m.difficulty === 'easy').length;
    const mediumCount = allMovies.filter(m => m.difficulty === 'medium').length;
    const hardCount = allMovies.filter(m => m.difficulty === 'hard').length;
    console.log(`Easy movies: ${easyCount}`);
    console.log(`Medium movies: ${mediumCount}`);
    console.log(`Hard movies: ${hardCount}`);
    if (allMovies.length === 0 && (!movieData || !movieData.easy || !movieData.medium || !movieData.hard)){
         console.error("CRITICAL: tmdb_movies.json might be empty or not loaded correctly. Please check the file in src/data/ and ensure the tmdb_fetcher.py script ran successfully.");
    }
}
