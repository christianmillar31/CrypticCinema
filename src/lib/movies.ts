
export interface Movie {
  title: string;
  year: number;
  genres: string[];
  popularity?: number; // 1 (very obscure) to 5 (very popular)
}

// Expanded movie list with genres and simulated popularity
const movies: Movie[] = [
  // Classics & Highly Acclaimed
  { title: "The Shawshank Redemption", year: 1994, genres: ["Drama"], popularity: 5 },
  { title: "The Godfather", year: 1972, genres: ["Crime", "Drama"], popularity: 5 },
  { title: "The Dark Knight", year: 2008, genres: ["Action", "Crime", "Drama"], popularity: 5 },
  { title: "Pulp Fiction", year: 1994, genres: ["Crime", "Drama"], popularity: 5 },
  { title: "Forrest Gump", year: 1994, genres: ["Drama", "Romance"], popularity: 5 },
  { title: "Fight Club", year: 1999, genres: ["Drama"], popularity: 5 },
  { title: "Inception", year: 2010, genres: ["Sci-Fi", "Action", "Thriller"], popularity: 5 },
  { title: "The Matrix", year: 1999, genres: ["Sci-Fi", "Action"], popularity: 5 },
  { title: "Interstellar", year: 2014, genres: ["Sci-Fi", "Drama", "Adventure"], popularity: 5 },
  { title: "Saving Private Ryan", year: 1998, genres: ["Drama", "War"], popularity: 5 },
  { title: "The Green Mile", year: 1999, genres: ["Crime", "Drama", "Fantasy"], popularity: 5 },
  { title: "Parasite", year: 2019, genres: ["Thriller", "Comedy", "Drama"], popularity: 4 },
  { title: "Gladiator", year: 2000, genres: ["Action", "Adventure", "Drama"], popularity: 5 },
  { title: "The Lion King", year: 1994, genres: ["Animation", "Adventure", "Drama", "Family", "Musical"], popularity: 5 },
  { title: "Back to the Future", year: 1985, genres: ["Adventure", "Comedy", "Sci-Fi"], popularity: 5 },
  { title: "Star Wars: A New Hope", year: 1977, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 5 },
  { title: "Jurassic Park", year: 1993, genres: ["Adventure", "Sci-Fi", "Thriller"], popularity: 5 },
  { title: "Toy Story", year: 1995, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy"], popularity: 5 },
  { title: "Goodfellas", year: 1990, genres: ["Biography", "Crime", "Drama"], popularity: 5 },
  { title: "The Silence of the Lambs", year: 1991, genres: ["Crime", "Drama", "Thriller"], popularity: 5 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, genres: ["Action", "Adventure", "Drama", "Fantasy"], popularity: 5 },
  { title: "Spirited Away", year: 2001, genres: ["Animation", "Adventure", "Family"], popularity: 4 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004, genres: ["Sci-Fi", "Drama", "Romance"], popularity: 4 },
  { title: "Amelie", year: 2001, genres: ["Comedy", "Romance"], popularity: 4 },
  { title: "No Country for Old Men", year: 2007, genres: ["Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Whiplash", year: 2014, genres: ["Drama", "Music"], popularity: 4 },
  { title: "The Grand Budapest Hotel", year: 2014, genres: ["Adventure", "Comedy", "Drama"], popularity: 4 },
  { title: "Blade Runner 2049", year: 2017, genres: ["Sci-Fi", "Action", "Drama"], popularity: 4 },
  { title: "Mad Max: Fury Road", year: 2015, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "La La Land", year: 2016, genres: ["Musical", "Drama", "Romance"], popularity: 5 },
  { title: "Oppenheimer", year: 2023, genres: ["Biography", "Drama", "History"], popularity: 5 },

  // More Recent Popular Films
  { title: "Dune", year: 2021, genres: ["Sci-Fi", "Adventure", "Drama"], popularity: 5 },
  { title: "Everything Everywhere All at Once", year: 2022, genres: ["Action", "Adventure", "Comedy", "Sci-Fi"], popularity: 4 },
  { title: "Spider-Man: No Way Home", year: 2021, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 5 },
  { title: "Barbie", year: 2023, genres: ["Comedy", "Adventure", "Fantasy"], popularity: 5 },
  
  // Cult Classics & Independent
  { title: "Donnie Darko", year: 2001, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Moonlight", year: 2016, genres: ["Drama"], popularity: 4 },
  { title: "Her", year: 2013, genres: ["Drama", "Romance", "Sci-Fi"], popularity: 4 },
  { title: "Drive", year: 2011, genres: ["Crime", "Drama"], popularity: 4 },
  { title: "Oldboy", year: 2003, genres: ["Action", "Drama", "Mystery", "Thriller"], popularity: 3 }, // Korean original
  { title: "Primer", year: 2004, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "A Ghost Story", year: 2017, genres: ["Drama", "Fantasy", "Romance"], popularity: 3 },
  { title: "The Lighthouse", year: 2019, genres: ["Drama", "Fantasy", "Horror", "Mystery"], popularity: 3 },

  // International Cinema
  { title: "City of God", year: 2002, genres: ["Crime", "Drama"], popularity: 4 }, // Brazil
  { title: "Pan's Labyrinth", year: 2006, genres: ["Drama", "Fantasy", "War"], popularity: 4 }, // Spain/Mexico
  { title: "The Intouchables", year: 2011, genres: ["Biography", "Comedy", "Drama"], popularity: 4 }, // France
  { title: "A Separation", year: 2011, genres: ["Drama"], popularity: 3 }, // Iran
  { title: "Portrait of a Lady on Fire", year: 2019, genres: ["Drama", "Romance"], popularity: 3 }, // France

  // Older Classics
  { title: "Casablanca", year: 1942, genres: ["Drama", "Romance", "War"], popularity: 5 },
  { title: "Citizen Kane", year: 1941, genres: ["Drama", "Mystery"], popularity: 4 },
  { title: "Psycho", year: 1960, genres: ["Horror", "Mystery", "Thriller"], popularity: 5 },
  { title: "2001: A Space Odyssey", year: 1968, genres: ["Sci-Fi", "Adventure"], popularity: 4 },
  { title: "Taxi Driver", year: 1976, genres: ["Crime", "Drama"], popularity: 4 },
  { title: "Apocalypse Now", year: 1979, genres: ["Drama", "War"], popularity: 4 },
  { title: "Blade Runner", year: 1982, genres: ["Action", "Drama", "Sci-Fi", "Thriller"], popularity: 5 },

  // Animation Variety
  { title: "Princess Mononoke", year: 1997, genres: ["Animation", "Action", "Adventure", "Fantasy"], popularity: 4 },
  { title: "WALL-E", year: 2008, genres: ["Animation", "Adventure", "Family", "Sci-Fi"], popularity: 5 },
  { title: "Up", year: 2009, genres: ["Animation", "Adventure", "Comedy", "Drama", "Family"], popularity: 5 },
  { title: "Spider-Man: Into the Spider-Verse", year: 2018, genres: ["Animation", "Action", "Adventure", "Family", "Sci-Fi"], popularity: 5 },
  { title: "Klaus", year: 2019, genres: ["Animation", "Adventure", "Comedy", "Drama", "Family"], popularity: 4 },

  // Comedy
  { title: "This Is Spinal Tap", year: 1984, genres: ["Comedy", "Music"], popularity: 4 },
  { title: "Groundhog Day", year: 1993, genres: ["Comedy", "Drama", "Fantasy", "Romance"], popularity: 5 },
  { title: "Office Space", year: 1999, genres: ["Comedy"], popularity: 4 },
  { title: "Shaun of the Dead", year: 2004, genres: ["Comedy", "Horror"], popularity: 4 },
  { title: "Superbad", year: 2007, genres: ["Comedy"], popularity: 4 },
  { title: "Booksmart", year: 2019, genres: ["Comedy"], popularity: 3 },

  // Horror
  { title: "The Exorcist", year: 1973, genres: ["Horror"], popularity: 5 },
  { title: "Alien", year: 1979, genres: ["Horror", "Sci-Fi"], popularity: 5 },
  { title: "The Shining", year: 1980, genres: ["Drama", "Horror"], popularity: 5 },
  { title: "Hereditary", year: 2018, genres: ["Drama", "Horror", "Mystery", "Thriller"], popularity: 4 },
  { title: "Get Out", year: 2017, genres: ["Horror", "Mystery", "Thriller"], popularity: 5 },
  
  // More Sci-Fi
  { title: "Arrival", year: 2016, genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Children of Men", year: 2006, genres: ["Adventure", "Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Ex Machina", year: 2014, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 4 },

  // More Musicals
  { title: "Singin' in the Rain", year: 1952, genres: ["Comedy", "Musical", "Romance"], popularity: 4 },
  { title: "Chicago", year: 2002, genres: ["Comedy", "Crime", "Drama", "Musical"], popularity: 4 },

  // Documentary (less likely for cryptic clues, but for completeness)
  // { title: "Man on Wire", year: 2008, genres: ["Documentary", "Biography", "Crime", "History", "Thriller"], popularity: 3 },
  // { title: "Won't You Be My Neighbor?", year: 2018, genres: ["Documentary", "Biography"], popularity: 3 },
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
  // popularityThreshold?: number; // e.g. only movies with popularity >= threshold
}

export function getRandomMovie(filters: MovieFilters): Movie | null {
  let selectableMovies = movies.filter(movie => 
    filters.excludeTitle ? movie.title !== filters.excludeTitle : true
  );

  // Fallback if excluding the current movie leaves no options, but there are movies in the master list
  if (selectableMovies.length === 0 && movies.length > 0) {
    selectableMovies = movies.filter(m => filters.excludeTitle ? m.title !== filters.excludeTitle : true);
     if (selectableMovies.length === 0 && movies.length > 0) { 
        // This case means the excluded title was the *only* movie, or all movies were excluded.
        // If only one movie exists and it's excluded, we might need to show it or handle this state.
        // For now, if excludeTitle causes an empty list, and there are *other* movies, pick from them.
        // If excludeTitle is the *only* movie, and it's being excluded, this logic is tricky.
        // The current approach will return null if all movies are filtered out.
        // Let's try to pick any movie if exclusion leads to zero results from a non-empty initial list.
        const allOtherMovies = movies.filter(m => m.title !== filters.excludeTitle);
        if (allOtherMovies.length > 0) {
            selectableMovies = allOtherMovies;
        } else if (movies.length > 0) { // e.g. only one movie in list, and it's excluded
            selectableMovies = movies.slice(); // show it anyway, effectively ignoring exclude for this single case
        }
    }
     if (selectableMovies.length === 0) return null; // No movies at all or impossible filter combination.
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
  
  // Example for future use if popularity is integrated into filtering:
  // if (filters.popularityThreshold !== undefined) {
  //   selectableMovies = selectableMovies.filter(m => (m.popularity || 3) >= filters.popularityThreshold!); // Default to 3 if undefined
  // }


  if (selectableMovies.length === 0) {
    return null; // No movies matched all combined specific filters
  }

  const randomIndex = Math.floor(Math.random() * selectableMovies.length);
  return selectableMovies[randomIndex];
}

// Export the raw movie list if needed by components for populating filters
export const allMovies: Movie[] = movies;

