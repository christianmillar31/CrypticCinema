// Attempt to import the generated movie data from OMDB.
import movieDataFile from '../data/omdb_movies.json';

export interface Movie {
  title: string;
  year: number;
  genres: string[];
  popularity: number; // This will be imdbVotes from OMDB
  difficulty: "easy" | "medium" | "hard";
  imdbID?: string; // Optional: store IMDb ID
}

// Type guard for the structure of omdb_movies.json
interface MovieDataFile {
  easy: Movie[];
  medium: Movie[];
  hard: Movie[];
}

function isValidMovieData(data: any): data is MovieDataFile {
  if (!data || typeof data !== 'object') return false;
  const difficulties = ['easy', 'medium', 'hard'];
  for (const diff of difficulties) {
    if (!Array.isArray(data[diff])) return false;
    if (data[diff].length > 0) {
      const sampleMovie = data[diff][0];
      if (
        typeof sampleMovie.title !== 'string' ||
        typeof sampleMovie.year !== 'number' ||
        !Array.isArray(sampleMovie.genres) ||
        typeof sampleMovie.popularity !== 'number' ||
        typeof sampleMovie.difficulty !== 'string'
      ) {
        return false;
      }
    }
  }
  return true;
}

let movieData: MovieDataFile = { easy: [], medium: [], hard: [] };

if (isValidMovieData(movieDataFile)) {
  movieData = movieDataFile;
} else {
  console.warn(
    "WARNING: omdb_movies.json located in src/data/ is missing, malformed, or empty. The application will run with an empty movie list. To populate it, please run the omdb_fetcher.py script located in the project root, and then manually move the generated 'omdb_movies.json' file from the project root into the 'src/data/' directory, overwriting the placeholder if it exists."
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
    // Using IMDb ID for uniqueness if available, otherwise title+year
    const key = movie.imdbID || `${movie.title.toLowerCase()}_${movie.year}`;
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
  const allGenres = movieList.flatMap(movie => movie.genres || []);
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
  excludeTitles?: string[]; // Still useful to exclude titles shown in session
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
  console.log("[getRandomMovie] Called with filters:", JSON.stringify(filters));
  let filteredMovies = allMovies;
  console.log(`[getRandomMovie] Starting with ${allMovies.length} total movies.`);

  if (filters.excludeTitles && filters.excludeTitles.length > 0) {
    const excludeSet = new Set(filters.excludeTitles.map(t => normalizeTitleForComparison(t)));
    const beforeExcludeCount = filteredMovies.length;
    filteredMovies = filteredMovies.filter(movie => !excludeSet.has(normalizeTitleForComparison(movie.title)));
    console.log(`[getRandomMovie] After excluding ${filters.excludeTitles.length} titles, ${filteredMovies.length} movies remain (was ${beforeExcludeCount}).`);
  }

  if (filters.genres && filters.genres.length > 0) {
    const beforeGenreFilterCount = filteredMovies.length;
    filteredMovies = filteredMovies.filter(movie =>
      filters.genres!.some(filterGenre => (movie.genres || []).includes(filterGenre))
    );
    console.log(`[getRandomMovie] After filtering by genres [${filters.genres.join(', ')}], ${filteredMovies.length} movies remain (was ${beforeGenreFilterCount}).`);
  }

  if (filters.decades && filters.decades.length > 0) {
    const beforeDecadeFilterCount = filteredMovies.length;
    filteredMovies = filteredMovies.filter(movie =>
      filters.decades!.includes(getDecadeForMovie(movie.year))
    );
    console.log(`[getRandomMovie] After filtering by decades [${filters.decades.map(d => d + 's').join(', ')}], ${filteredMovies.length} movies remain (was ${beforeDecadeFilterCount}).`);
  }

  if (filters.difficulty) {
    const beforeDifficultyFilterCount = filteredMovies.length;
    const difficultyFiltered = filteredMovies.filter(movie => movie.difficulty === filters.difficulty);
     console.log(`[getRandomMovie] Attempting to filter by difficulty "${filters.difficulty}". Found ${difficultyFiltered.length} movies of this difficulty within the current pool of ${beforeDifficultyFilterCount} movies.`);
    if (difficultyFiltered.length > 0) {
        filteredMovies = difficultyFiltered;
        console.log(`[getRandomMovie] Applied difficulty filter "${filters.difficulty}". ${filteredMovies.length} movies remain.`);
    } else if (allMovies.some(m => m.difficulty === filters.difficulty)) {
        console.warn(`[getRandomMovie] No movies of difficulty "${filters.difficulty}" found with current genre/decade filters. Total movies of this difficulty in dataset: ${allMovies.filter(m => m.difficulty === filters.difficulty).length}. Keeping current filtered set of ${beforeDifficultyFilterCount} movies.`);
        // If movies of this difficulty exist in general, but not with current filters,
        // this means other filters (genre/decade) are too restrictive.
        // We don't relax the difficulty filter here, let the user adjust.
    } else {
      console.warn(`[getRandomMovie] No movies of difficulty "${filters.difficulty}" found AT ALL in the entire dataset. Keeping current filtered set of ${beforeDifficultyFilterCount} movies.`);
    }
  }
  
  if (filteredMovies.length === 0) {
    console.warn("[getRandomMovie] No movies left after all filters. Returning null.");
    return null; 
  }

  const randomIndex = Math.floor(Math.random() * filteredMovies.length);
  const selectedMovie = filteredMovies[randomIndex];
  console.log(`[getRandomMovie] Selected random movie: "${selectedMovie.title}" from ${filteredMovies.length} candidates.`);
  return selectedMovie;
}

// This block will only run in Node.js environments (e.g., during build or server-side rendering if this file is imported there)
// It won't run in the browser console directly unless this file is specifically imported and executed there.
if (typeof process !== 'undefined' && process.versions && process.versions.node) { 
    console.log(`[movies.ts] Total unique movies loaded from OMDB: ${allMovies.length}`);
    const easyCount = allMovies.filter(m => m.difficulty === 'easy').length;
    const mediumCount = allMovies.filter(m => m.difficulty === 'medium').length;
    const hardCount = allMovies.filter(m => m.difficulty === 'hard').length;
    console.log(`[movies.ts] Easy movies (OMDB): ${easyCount}`);
    console.log(`[movies.ts] Medium movies (OMDB): ${mediumCount}`);
    console.log(`[movies.ts] Hard movies (OMDB): ${hardCount}`);
    if (allMovies.length === 0 && (!movieDataFile || !isValidMovieData(movieDataFile) || (movieDataFile.easy.length === 0 && movieDataFile.medium.length === 0 && movieDataFile.hard.length === 0))){
         console.error("[movies.ts] CRITICAL: src/data/omdb_movies.json appears to be empty or not loaded correctly. Please ensure the omdb_fetcher.py script ran successfully and the output was moved to src/data/omdb_movies.json.");
    }
}