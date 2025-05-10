export interface Movie {
  title: string;
  year: number;
}

const movies: Movie[] = [
  { title: "Inception", year: 2010 },
  { title: "The Matrix", year: 1999 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "Forrest Gump", year: 1994 },
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Dark Knight", year: 2008 },
  { title: "Fight Club", year: 1999 },
  { title: "Interstellar", year: 2014 },
  { title: "Parasite", year: 2019 },
  { title: "Spirited Away", year: 2001 },
  { title: "La La Land", year: 2016 },
  { title: "Oppenheimer", year: 2023 },
  { title: "The Godfather", year: 1972 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
  { title: "Blade Runner 2049", year: 2017 },
  { title: "Mad Max: Fury Road", year: 2015 },
  { title: "Amelie", year: 2001 },
  { title: "No Country for Old Men", year: 2007 },
  { title: "Whiplash", year: 2014 },
  { title: "The Grand Budapest Hotel", year: 2014 },
];

export function getRandomMovie(excludeTitle?: string): Movie {
  let availableMovies = movies;
  if (excludeTitle) {
    availableMovies = movies.filter(movie => movie.title !== excludeTitle);
    if (availableMovies.length === 0) { // Fallback if list is too small or all were excluded
        availableMovies = movies;
    }
  }
  const randomIndex = Math.floor(Math.random() * availableMovies.length);
  return availableMovies[randomIndex];
}
