
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
  let filteredMovies = allMovies;

  if (filters.excludeTitles && filters.excludeTitles.length > 0) {
    const excludeSet = new Set(filters.excludeTitles.map(t => normalizeTitleForComparison(t)));
    filteredMovies = filteredMovies.filter(movie => !excludeSet.has(normalizeTitleForComparison(movie.title)));
  }

  if (filters.genres && filters.genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      filters.genres!.some(filterGenre => (movie.genres || []).includes(filterGenre))
    );
  }

  if (filters.decades && filters.decades.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      filters.decades!.includes(getDecadeForMovie(movie.year))
    );
  }

  if (filters.difficulty) {
    const difficultyFiltered = filteredMovies.filter(movie => movie.difficulty === filters.difficulty);
    if (difficultyFiltered.length > 0) {
        filteredMovies = difficultyFiltered;
    } else if (allMovies.some(m => m.difficulty === filters.difficulty)) {
        // If movies of this difficulty exist in general, but not with current filters,
        // this means other filters (genre/decade) are too restrictive.
        // The calling component should handle "no movie found" appropriately.
        // We don't relax the difficulty filter here, let the user adjust.
    }
  }
  
  if (filteredMovies.length === 0) {
    return null; 
  }

  const randomIndex = Math.floor(Math.random() * filteredMovies.length);
  return filteredMovies[randomIndex];
}

// This block will only run in Node.js environments (e.g., during build or server-side rendering if this file is imported there)
// It won't run in the browser console directly unless this file is specifically imported and executed there.
if (typeof process !== 'undefined' && process.versions && process.versions.node) { 
    console.log(`Total unique movies loaded from OMDB: ${allMovies.length}`);
    const easyCount = allMovies.filter(m => m.difficulty === 'easy').length;
    const mediumCount = allMovies.filter(m => m.difficulty === 'medium').length;
    const hardCount = allMovies.filter(m => m.difficulty === 'hard').length;
    console.log(`Easy movies (OMDB): ${easyCount}`);
    console.log(`Medium movies (OMDB): ${mediumCount}`);
    console.log(`Hard movies (OMDB): ${hardCount}`);
    if (allMovies.length === 0 && (!movieDataFile || !isValidMovieData(movieDataFile) || (movieDataFile.easy.length === 0 && movieDataFile.medium.length === 0 && movieDataFile.hard.length === 0))){
         console.error("CRITICAL: src/data/omdb_movies.json appears to be empty or not loaded correctly. Please ensure the omdb_fetcher.py script ran successfully and the output was moved to src/data/omdb_movies.json.");
    }
}
