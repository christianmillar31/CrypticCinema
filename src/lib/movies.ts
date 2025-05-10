export interface Movie {
  title: string;
  year: number;
  genres: string[];
}

// Expanded movie list with genres
const movies: Movie[] = [
  { title: "Inception", year: 2010, genres: ["Sci-Fi", "Action", "Thriller"] },
  { title: "The Matrix", year: 1999, genres: ["Sci-Fi", "Action"] },
  { title: "Pulp Fiction", year: 1994, genres: ["Crime", "Drama"] },
  { title: "Forrest Gump", year: 1994, genres: ["Drama", "Romance"] },
  { title: "The Shawshank Redemption", year: 1994, genres: ["Drama"] },
  { title: "The Dark Knight", year: 2008, genres: ["Action", "Crime", "Drama"] },
  { title: "Fight Club", year: 1999, genres: ["Drama"] },
  { title: "Interstellar", year: 2014, genres: ["Sci-Fi", "Drama", "Adventure"] },
  { title: "Parasite", year: 2019, genres: ["Thriller", "Comedy", "Drama"] },
  { title: "Spirited Away", year: 2001, genres: ["Animation", "Adventure", "Family"] },
  { title: "La La Land", year: 2016, genres: ["Musical", "Drama", "Romance"] },
  { title: "Oppenheimer", year: 2023, genres: ["Biography", "Drama", "History"] },
  { title: "The Godfather", year: 1972, genres: ["Crime", "Drama"] },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004, genres: ["Sci-Fi", "Drama", "Romance"] },
  { title: "Blade Runner 2049", year: 2017, genres: ["Sci-Fi", "Action", "Drama"] },
  { title: "Mad Max: Fury Road", year: 2015, genres: ["Action", "Adventure", "Sci-Fi"] },
  { title: "Amelie", year: 2001, genres: ["Comedy", "Romance"] },
  { title: "No Country for Old Men", year: 2007, genres: ["Crime", "Drama", "Thriller"] },
  { title: "Whiplash", year: 2014, genres: ["Drama", "Music"] },
  { title: "The Grand Budapest Hotel", year: 2014, genres: ["Adventure", "Comedy", "Drama"] },
  { title: "Back to the Future", year: 1985, genres: ["Adventure", "Comedy", "Sci-Fi"] },
  { title: "Star Wars: A New Hope", year: 1977, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"] },
  { title: "Jurassic Park", year: 1993, genres: ["Adventure", "Sci-Fi", "Thriller"] },
  { title: "The Lion King", year: 1994, genres: ["Animation", "Adventure", "Drama", "Family", "Musical"] },
  { title: "Toy Story", year: 1995, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy"] },
  { title: "Goodfellas", year: 1990, genres: ["Biography", "Crime", "Drama"] },
  { title: "The Silence of the Lambs", year: 1991, genres: ["Crime", "Drama", "Thriller"] },
  { title: "Saving Private Ryan", year: 1998, genres: ["Drama", "War"] },
  { title: "Gladiator", year: 2000, genres: ["Action", "Adventure", "Drama"] },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, genres: ["Action", "Adventure", "Drama", "Fantasy"] },
];

export const getDecadeForMovie = (year: number): number => {
  return Math.floor(year / 10) * 10;
};

export const getUniqueGenres = (movieList: Movie[]): string[] => {
  const allGenres = movieList.flatMap(movie => movie.genres);
  const uniqueSortedGenres = Array.from(new Set(allGenres)).sort();
  return ["All Genres", ...uniqueSortedGenres];
};

export const getUniqueDecades = (movieList: Movie[]): string[] => {
  const allDecades = movieList.map(movie => `${getDecadeForMovie(movie.year)}s`);
  const uniqueSortedDecades = Array.from(new Set(allDecades)).sort((a, b) => {
    // Ensure "YYYYs" format is sorted numerically
    return parseInt(a.substring(0,4)) - parseInt(b.substring(0,4));
  });
  return ["All Decades", ...uniqueSortedDecades];
};

export interface MovieFilters {
  genre?: string; // Specific genre string, not "All Genres"
  decade?: number; // e.g., 1980, not "1980s" or "All Decades"
  excludeTitle?: string;
}

export function getRandomMovie(filters: MovieFilters): Movie | null {
  let selectableMovies = movies.filter(movie => 
    filters.excludeTitle ? movie.title !== filters.excludeTitle : true
  );

  // Fallback if excluding the current movie leaves no options, but there are movies in the master list
  if (selectableMovies.length === 0 && movies.length > 0) {
    selectableMovies = movies.slice(); // Use all movies
    // If excludeTitle was the only filter and removed all, re-filter without it if it means getting a movie
     if (filters.excludeTitle && Object.keys(filters).length === 1) {
        // No, this is wrong. If excludeTitle is there, it should be respected.
        // The issue is if the movies list is tiny.
        // If after excluding, the list is empty, and we have more than 1 movie total, use all other movies.
        const allOtherMovies = movies.filter(m => m.title !== filters.excludeTitle);
        if (allOtherMovies.length > 0) {
            selectableMovies = allOtherMovies;
        } else if (movies.length > 0) { // e.g. only one movie in list, and it's excluded
            selectableMovies = movies.slice(); // show it anyway
        }
    }
     if (selectableMovies.length === 0) return null; // No movies at all.
  }
   if (selectableMovies.length === 0) return null;


  const hasGenreFilter = filters.genre && filters.genre !== "All Genres";
  const hasDecadeFilter = filters.decade !== undefined;

  if (hasGenreFilter) {
    selectableMovies = selectableMovies.filter(m => m.genres.includes(filters.genre!));
  }

  if (hasDecadeFilter) {
    selectableMovies = selectableMovies.filter(m => getDecadeForMovie(m.year) === filters.decade!);
  }

  if (selectableMovies.length === 0) {
    return null; // No movies matched all combined specific filters
  }

  const randomIndex = Math.floor(Math.random() * selectableMovies.length);
  return selectableMovies[randomIndex];
}

// Export the raw movie list if needed by components for populating filters
export const allMovies: Movie[] = movies;
