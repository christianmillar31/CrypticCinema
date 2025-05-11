
export interface Movie {
  title: string;
  year: number;
  genres: string[];
  popularity?: number; // 1 (very obscure) to 5 (very popular)
}

// Expanded movie list with genres and simulated popularity
const movies: Movie[] = [
  // Classics & Highly Acclaimed (Existing + More)
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
  { title: "Spirited Away", year: 2001, genres: ["Animation", "Adventure", "Family", "Fantasy"], popularity: 4 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004, genres: ["Sci-Fi", "Drama", "Romance"], popularity: 4 },
  { title: "Amelie", year: 2001, genres: ["Comedy", "Romance"], popularity: 4 },
  { title: "No Country for Old Men", year: 2007, genres: ["Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Whiplash", year: 2014, genres: ["Drama", "Music"], popularity: 4 },
  { title: "The Grand Budapest Hotel", year: 2014, genres: ["Adventure", "Comedy", "Drama"], popularity: 4 },
  { title: "Blade Runner 2049", year: 2017, genres: ["Sci-Fi", "Action", "Drama", "Mystery"], popularity: 4 },
  { title: "Mad Max: Fury Road", year: 2015, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "La La Land", year: 2016, genres: ["Musical", "Drama", "Romance"], popularity: 5 },
  { title: "Oppenheimer", year: 2023, genres: ["Biography", "Drama", "History"], popularity: 5 },
  { title: "Schindler's List", year: 1993, genres: ["Biography", "Drama", "History"], popularity: 5 },
  { title: "12 Angry Men", year: 1957, genres: ["Drama"], popularity: 4 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003, genres: ["Action", "Adventure", "Drama", "Fantasy"], popularity: 5 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002, genres: ["Action", "Adventure", "Drama", "Fantasy"], popularity: 5 },
  { title: "Seven Samurai", year: 1954, genres: ["Action", "Drama"], popularity: 3 }, // Japan
  { title: "Se7en", year: 1995, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 5 },
  { title: "The Usual Suspects", year: 1995, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 5 },
  { title: "Léon: The Professional", year: 1994, genres: ["Action", "Crime", "Drama"], popularity: 4 },
  { title: "Once Upon a Time in the West", year: 1968, genres: ["Western"], popularity: 4 },
  { title: "The Good, the Bad and the Ugly", year: 1966, genres: ["Western", "Adventure"], popularity: 5 },
  { title: "Cinema Paradiso", year: 1988, genres: ["Drama", "Romance"], popularity: 4 }, // Italy

  // More Recent Popular Films (Existing + More)
  { title: "Dune", year: 2021, genres: ["Sci-Fi", "Adventure", "Drama"], popularity: 5 },
  { title: "Everything Everywhere All at Once", year: 2022, genres: ["Action", "Adventure", "Comedy", "Sci-Fi", "Fantasy"], popularity: 4 },
  { title: "Spider-Man: No Way Home", year: 2021, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 5 },
  { title: "Barbie", year: 2023, genres: ["Comedy", "Adventure", "Fantasy"], popularity: 5 },
  { title: "Top Gun: Maverick", year: 2022, genres: ["Action", "Drama"], popularity: 5 },
  { title: "Avatar: The Way of Water", year: 2022, genres: ["Sci-Fi", "Action", "Adventure"], popularity: 5 },
  { title: "Joker", year: 2019, genres: ["Crime", "Drama", "Thriller"], popularity: 5 },
  { title: "Avengers: Endgame", year: 2019, genres: ["Action", "Adventure", "Drama", "Sci-Fi"], popularity: 5 },
  { title: "Knives Out", year: 2019, genres: ["Comedy", "Crime", "Drama", "Mystery"], popularity: 4 },
  { title: "Once Upon a Time in Hollywood", year: 2019, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Tenet", year: 2020, genres: ["Action", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Soul", year: 2020, genres: ["Animation", "Adventure", "Comedy", "Drama", "Family", "Fantasy", "Music"], popularity: 4 },

  // Cult Classics & Independent (Existing + More)
  { title: "Donnie Darko", year: 2001, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Moonlight", year: 2016, genres: ["Drama"], popularity: 4 },
  { title: "Her", year: 2013, genres: ["Drama", "Romance", "Sci-Fi"], popularity: 4 },
  { title: "Drive", year: 2011, genres: ["Crime", "Drama"], popularity: 4 },
  { title: "Oldboy", year: 2003, genres: ["Action", "Drama", "Mystery", "Thriller"], popularity: 3 }, // Korean original
  { title: "Primer", year: 2004, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "A Ghost Story", year: 2017, genres: ["Drama", "Fantasy", "Romance"], popularity: 3 },
  { title: "The Lighthouse", year: 2019, genres: ["Drama", "Fantasy", "Horror", "Mystery"], popularity: 3 },
  { title: "The Big Lebowski", year: 1998, genres: ["Comedy", "Crime"], popularity: 4 },
  { title: "Trainspotting", year: 1996, genres: ["Drama"], popularity: 4 },
  { title: "Eraserhead", year: 1977, genres: ["Fantasy", "Horror"], popularity: 3 },
  { title: "Requiem for a Dream", year: 2000, genres: ["Drama"], popularity: 4 },
  { title: "Mulholland Drive", year: 2001, genres: ["Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "Lost in Translation", year: 2003, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Little Miss Sunshine", year: 2006, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Juno", year: 2007, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Frances Ha", year: 2012, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Lady Bird", year: 2017, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Uncut Gems", year: 2019, genres: ["Crime", "Drama", "Thriller"], popularity: 3 },
  { title: "Midsommar", year: 2019, genres: ["Drama", "Horror", "Mystery"], popularity: 3 },
  { title: "The Florida Project", year: 2017, genres: ["Drama"], popularity: 3 },

  // International Cinema (Existing + More)
  { title: "City of God", year: 2002, genres: ["Crime", "Drama"], popularity: 4 }, // Brazil
  { title: "Pan's Labyrinth", year: 2006, genres: ["Drama", "Fantasy", "War"], popularity: 4 }, // Spain/Mexico
  { title: "The Intouchables", year: 2011, genres: ["Biography", "Comedy", "Drama"], popularity: 4 }, // France
  { title: "A Separation", year: 2011, genres: ["Drama"], popularity: 3 }, // Iran
  { title: "Portrait of a Lady on Fire", year: 2019, genres: ["Drama", "Romance"], popularity: 3 }, // France
  { title: "Life Is Beautiful", year: 1997, genres: ["Comedy", "Drama", "Romance", "War"], popularity: 4 }, // Italy
  { title: "Crouching Tiger, Hidden Dragon", year: 2000, genres: ["Action", "Adventure", "Drama", "Fantasy", "Romance"], popularity: 4 }, // Taiwan/China
  { title: "Downfall", year: 2004, genres: ["Biography", "Drama", "History", "War"], popularity: 3 }, // Germany
  { title: "The Lives of Others", year: 2006, genres: ["Drama", "Mystery", "Thriller"], popularity: 4 }, // Germany
  { title: "The Secret in Their Eyes", year: 2009, genres: ["Drama", "Mystery", "Thriller"], popularity: 3 }, // Argentina
  { title: "Incendies", year: 2010, genres: ["Drama", "Mystery", "War"], popularity: 3 }, // Canada/France
  { title: "The Hunt", year: 2012, genres: ["Drama"], popularity: 3 }, // Denmark
  { title: "Ida", year: 2013, genres: ["Drama"], popularity: 3 }, // Poland
  { title: "The Handmaiden", year: 2016, genres: ["Drama", "Romance", "Thriller"], popularity: 3 }, // South Korea
  { title: "Roma", year: 2018, genres: ["Drama"], popularity: 4 }, // Mexico
  { title: "Shoplifters", year: 2018, genres: ["Crime", "Drama"], popularity: 3 }, // Japan
  { title: "Capernaum", year: 2018, genres: ["Drama"], popularity: 3 }, // Lebanon
  { title: "Another Round", year: 2020, genres: ["Comedy", "Drama"], popularity: 3 }, // Denmark
  { title: "Drive My Car", year: 2021, genres: ["Drama"], popularity: 3 }, // Japan
  { title: "RRR", year: 2022, genres: ["Action", "Drama"], popularity: 4 }, // India
  { title: "Close", year: 2022, genres: ["Drama"], popularity: 3 }, // Belgium
  { title: "The Worst Person in the World", year: 2021, genres: ["Comedy", "Drama", "Romance"], popularity: 3 }, // Norway
  { title: "Amour", year: 2012, genres: ["Drama", "Romance"], popularity: 3 }, // France/Austria
  { title: "Bicycle Thieves", year: 1948, genres: ["Drama"], popularity: 4 }, // Italy
  { title: "Rashomon", year: 1950, genres: ["Crime", "Drama", "Mystery"], popularity: 3 }, // Japan
  { title: "The Seventh Seal", year: 1957, genres: ["Drama", "Fantasy"], popularity: 3 }, // Sweden
  { title: "8½", year: 1963, genres: ["Drama"], popularity: 3 }, // Italy
  { title: "Stalker", year: 1979, genres: ["Drama", "Sci-Fi"], popularity: 3 }, // Soviet Union
  { title: "Wings of Desire", year: 1987, genres: ["Drama", "Fantasy", "Romance"], popularity: 3 }, // Germany
  { title: "Raise the Red Lantern", year: 1991, genres: ["Drama", "History", "Romance"], popularity: 3 }, // China
  { title: "Chungking Express", year: 1994, genres: ["Comedy", "Drama", "Romance"], popularity: 3 }, // Hong Kong
  { title: "In the Mood for Love", year: 2000, genres: ["Drama", "Romance"], popularity: 4 }, // Hong Kong
  { title: "Y Tu Mamá También", year: 2001, genres: ["Drama"], popularity: 3 }, // Mexico

  // Older Classics (Existing + More)
  { title: "Casablanca", year: 1942, genres: ["Drama", "Romance", "War"], popularity: 5 },
  { title: "Citizen Kane", year: 1941, genres: ["Drama", "Mystery"], popularity: 4 },
  { title: "Psycho", year: 1960, genres: ["Horror", "Mystery", "Thriller"], popularity: 5 },
  { title: "2001: A Space Odyssey", year: 1968, genres: ["Sci-Fi", "Adventure"], popularity: 4 },
  { title: "Taxi Driver", year: 1976, genres: ["Crime", "Drama"], popularity: 4 },
  { title: "Apocalypse Now", year: 1979, genres: ["Drama", "War"], popularity: 4 },
  { title: "Blade Runner", year: 1982, genres: ["Action", "Drama", "Sci-Fi", "Thriller"], popularity: 5 },
  { title: "Gone with the Wind", year: 1939, genres: ["Drama", "History", "Romance", "War"], popularity: 5 },
  { title: "The Wizard of Oz", year: 1939, genres: ["Adventure", "Family", "Fantasy", "Musical"], popularity: 5 },
  { title: "It's a Wonderful Life", year: 1946, genres: ["Drama", "Family", "Fantasy"], popularity: 5 },
  { title: "Singin' in the Rain", year: 1952, genres: ["Comedy", "Musical", "Romance"], popularity: 4 },
  { title: "Rear Window", year: 1954, genres: ["Mystery", "Thriller"], popularity: 4 },
  { title: "Vertigo", year: 1958, genres: ["Mystery", "Romance", "Thriller"], popularity: 4 },
  { title: "North by Northwest", year: 1959, genres: ["Action", "Adventure", "Mystery", "Thriller"], popularity: 4 },
  { title: "Lawrence of Arabia", year: 1962, genres: ["Adventure", "Biography", "Drama", "History", "War"], popularity: 4 },
  { title: "Dr. Strangelove", year: 1964, genres: ["Comedy", "War"], popularity: 4 },
  { title: "A Clockwork Orange", year: 1971, genres: ["Crime", "Drama", "Sci-Fi"], popularity: 4 },
  { title: "Chinatown", year: 1974, genres: ["Drama", "Mystery", "Thriller"], popularity: 4 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975, genres: ["Drama"], popularity: 5 },
  { title: "Network", year: 1976, genres: ["Drama"], popularity: 4 },
  { title: "Annie Hall", year: 1977, genres: ["Comedy", "Romance"], popularity: 4 },
  { title: "The Deer Hunter", year: 1978, genres: ["Drama", "War"], popularity: 4 },
  { title: "Raging Bull", year: 1980, genres: ["Biography", "Drama", "Sport"], popularity: 4 },
  { title: "E.T. the Extra-Terrestrial", year: 1982, genres: ["Adventure", "Family", "Sci-Fi"], popularity: 5 },
  { title: "Scarface", year: 1983, genres: ["Crime", "Drama"], popularity: 5 },
  { title: "Amadeus", year: 1984, genres: ["Biography", "Drama", "Music"], popularity: 4 },
  { title: "Brazil", year: 1985, genres: ["Drama", "Sci-Fi"], popularity: 3 },
  { title: "Platoon", year: 1986, genres: ["Drama", "War"], popularity: 4 },
  { title: "Full Metal Jacket", year: 1987, genres: ["Drama", "War"], popularity: 4 },
  { title: "Die Hard", year: 1988, genres: ["Action", "Thriller"], popularity: 5 },
  { title: "Dead Poets Society", year: 1989, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Do the Right Thing", year: 1989, genres: ["Comedy", "Drama"], popularity: 4 },

  // 1940s Additions
  { title: "The Maltese Falcon", year: 1941, genres: ["Film-Noir", "Mystery"], popularity: 4 },
  { title: "Rebecca", year: 1940, genres: ["Drama", "Film-Noir", "Mystery", "Romance"], popularity: 4 },
  { title: "The Philadelphia Story", year: 1940, genres: ["Comedy", "Romance"], popularity: 4 },
  { title: "His Girl Friday", year: 1940, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "The Grapes of Wrath", year: 1940, genres: ["Drama", "History"], popularity: 4 },
  { title: "Fantasia", year: 1940, genres: ["Animation", "Family", "Fantasy", "Music"], popularity: 4 },
  { title: "Suspicion", year: 1941, genres: ["Film-Noir", "Thriller"], popularity: 3 },
  { title: "Dumbo", year: 1941, genres: ["Animation", "Drama", "Family", "Musical"], popularity: 4 },
  { title: "Yankee Doodle Dandy", year: 1942, genres: ["Biography", "Drama", "Musical"], popularity: 3 },
  { title: "Now, Voyager", year: 1942, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "To Be or Not to Be", year: 1942, genres: ["Comedy", "War"], popularity: 3 },
  { title: "Shadow of a Doubt", year: 1943, genres: ["Film-Noir", "Thriller"], popularity: 4 },
  { title: "The Ox-Bow Incident", year: 1943, genres: ["Drama", "Western"], popularity: 3 },
  { title: "Double Indemnity", year: 1944, genres: ["Crime", "Drama", "Film-Noir", "Thriller"], popularity: 4 },
  { title: "Laura", year: 1944, genres: ["Drama", "Film-Noir", "Mystery"], popularity: 4 },
  { title: "Meet Me in St. Louis", year: 1944, genres: ["Comedy", "Drama", "Family", "Musical", "Romance"], popularity: 4 },
  { title: "The Lost Weekend", year: 1945, genres: ["Drama", "Film-Noir"], popularity: 3 },
  { title: "Mildred Pierce", year: 1945, genres: ["Drama", "Film-Noir", "Mystery"], popularity: 4 },
  { title: "Brief Encounter", year: 1945, genres: ["Drama", "Romance"], popularity: 3 }, 
  { title: "The Best Years of Our Lives", year: 1946, genres: ["Drama", "Romance", "War"], popularity: 4 },
  { title: "Notorious", year: 1946, genres: ["Drama", "Film-Noir", "Romance", "Thriller"], popularity: 4 },
  { title: "The Big Sleep", year: 1946, genres: ["Crime", "Film-Noir", "Mystery", "Thriller"], popularity: 4 },
  { title: "Out of the Past", year: 1947, genres: ["Crime", "Drama", "Film-Noir", "Thriller"], popularity: 4 },
  { title: "Miracle on 34th Street", year: 1947, genres: ["Comedy", "Drama", "Family"], popularity: 5 },
  { title: "Gentleman's Agreement", year: 1947, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "The Treasure of the Sierra Madre", year: 1948, genres: ["Adventure", "Drama", "Western"], popularity: 4 },
  { title: "Rope", year: 1948, genres: ["Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "The Red Shoes", year: 1948, genres: ["Drama", "Music", "Romance"], popularity: 3 },
  { title: "Key Largo", year: 1948, genres: ["Action", "Crime", "Drama", "Film-Noir", "Thriller"], popularity: 4 },
  { title: "White Heat", year: 1949, genres: ["Action", "Crime", "Drama", "Film-Noir", "Thriller"], popularity: 4 },
  { title: "The Third Man", year: 1949, genres: ["Film-Noir", "Mystery", "Thriller"], popularity: 4 }, 
  { title: "Adam's Rib", year: 1949, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Kind Hearts and Coronets", year: 1949, genres: ["Comedy", "Crime"], popularity: 3 }, // UK

  // 1950s Additions
  { title: "Sunset Boulevard", year: 1950, genres: ["Drama", "Film-Noir"], popularity: 5 },
  { title: "All About Eve", year: 1950, genres: ["Drama"], popularity: 4 }, 
  { title: "The Asphalt Jungle", year: 1950, genres: ["Crime", "Drama", "Film-Noir", "Thriller"], popularity: 3 },
  { title: "Harvey", year: 1950, genres: ["Comedy", "Drama", "Fantasy"], popularity: 4 },
  { title: "A Streetcar Named Desire", year: 1951, genres: ["Drama"], popularity: 4 }, 
  { title: "The African Queen", year: 1951, genres: ["Adventure", "Drama", "Romance", "War"], popularity: 4 },
  { title: "An American in Paris", year: 1951, genres: ["Drama", "Musical", "Romance"], popularity: 4 },
  { title: "Strangers on a Train", year: 1951, genres: ["Crime", "Film-Noir", "Thriller"], popularity: 4 },
  { title: "The Day the Earth Stood Still", year: 1951, genres: ["Drama", "Sci-Fi"], popularity: 4 },
  { title: "High Noon", year: 1952, genres: ["Drama", "Thriller", "Western"], popularity: 4 }, 
  { title: "The Quiet Man", year: 1952, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Ikiru", year: 1952, genres: ["Drama"], popularity: 3 }, // Japan
  { title: "Roman Holiday", year: 1953, genres: ["Comedy", "Romance"], popularity: 4 }, 
  { title: "From Here to Eternity", year: 1953, genres: ["Drama", "Romance", "War"], popularity: 4 },
  { title: "Shane", year: 1953, genres: ["Drama", "Western"], popularity: 4 },
  { title: "The Wages of Fear", year: 1953, genres: ["Adventure", "Drama", "Thriller"], popularity: 3 }, // France
  { title: "Tokyo Story", year: 1953, genres: ["Drama"], popularity: 3 }, // Japan
  { title: "On the Waterfront", year: 1954, genres: ["Crime", "Drama", "Thriller"], popularity: 4 }, 
  { title: "Dial M for Murder", year: 1954, genres: ["Crime", "Thriller"], popularity: 4 }, 
  { title: "A Star Is Born", year: 1954, genres: ["Drama", "Musical", "Romance"], popularity: 4 }, // Judy Garland version
  { title: "La Strada", year: 1954, genres: ["Drama"], popularity: 3 }, // Italy
  { title: "Rebel Without a Cause", year: 1955, genres: ["Drama"], popularity: 4 }, 
  { title: "The Night of the Hunter", year: 1955, genres: ["Crime", "Drama", "Film-Noir", "Thriller"], popularity: 4 },
  { title: "Marty", year: 1955, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "The Ladykillers", year: 1955, genres: ["Comedy", "Crime"], popularity: 3 }, // UK
  { title: "The Searchers", year: 1956, genres: ["Adventure", "Drama", "Western"], popularity: 4 }, 
  { title: "Giant", year: 1956, genres: ["Drama", "Western"], popularity: 3 }, 
  { title: "The Ten Commandments", year: 1956, genres: ["Adventure", "Drama", "History"], popularity: 5 },
  { title: "Forbidden Planet", year: 1956, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 3 }, 
  { title: "The Bridge on the River Kwai", year: 1957, genres: ["Adventure", "Drama", "War"], popularity: 4 },
  { title: "Paths of Glory", year: 1957, genres: ["Drama", "War"], popularity: 3 }, 
  { title: "An Affair to Remember", year: 1957, genres: ["Drama", "Romance"], popularity: 4 }, 
  { title: "Sweet Smell of Success", year: 1957, genres: ["Drama", "Film-Noir"], popularity: 3 },
  { title: "Touch of Evil", year: 1958, genres: ["Crime", "Film-Noir", "Thriller"], popularity: 4 },
  { title: "Gigi", year: 1958, genres: ["Comedy", "Musical", "Romance"], popularity: 3 },
  { title: "The Defiant Ones", year: 1958, genres: ["Adventure", "Crime", "Drama"], popularity: 3 },
  { title: "Some Like It Hot", year: 1959, genres: ["Comedy", "Music", "Romance"], popularity: 5 },
  { title: "Anatomy of a Murder", year: 1959, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 4 },
  { title: "The 400 Blows", year: 1959, genres: ["Crime", "Drama"], popularity: 3 }, // France
  { title: "Rio Bravo", year: 1959, genres: ["Drama", "Western"], popularity: 4 },

  // 1960s Additions
  { title: "La Dolce Vita", year: 1960, genres: ["Comedy", "Drama"], popularity: 3 }, // Italy
  { title: "Breathless", year: 1960, genres: ["Crime", "Drama"], popularity: 3 }, // France
  { title: "The Magnificent Seven", year: 1960, genres: ["Action", "Adventure", "Western"], popularity: 4 }, 
  { title: "Inherit the Wind", year: 1960, genres: ["Biography", "Drama", "History"], popularity: 3 },
  { title: "Yojimbo", year: 1961, genres: ["Action", "Drama", "Thriller"], popularity: 3 }, // Japan
  { title: "The Hustler", year: 1961, genres: ["Drama", "Sport"], popularity: 3 }, 
  { title: "Judgment at Nuremberg", year: 1961, genres: ["Drama", "History", "War"], popularity: 3 },
  { title: "Dr. No", year: 1962, genres: ["Action", "Adventure", "Thriller"], popularity: 4 },
  { title: "The Manchurian Candidate", year: 1962, genres: ["Drama", "Thriller"], popularity: 3 }, 
  { title: "What Ever Happened to Baby Jane?", year: 1962, genres: ["Drama", "Horror", "Thriller"], popularity: 3 },
  { title: "The Longest Day", year: 1962, genres: ["Action", "Drama", "History", "War"], popularity: 3 },
  { title: "Cleopatra", year: 1963, genres: ["Biography", "Drama", "History", "Romance"], popularity: 3 },
  { title: "The Birds", year: 1963, genres: ["Drama", "Horror", "Mystery", "Romance", "Thriller"], popularity: 4 },
  { title: "Hud", year: 1963, genres: ["Drama", "Western"], popularity: 3 },
  { title: "Goldfinger", year: 1964, genres: ["Action", "Adventure", "Thriller"], popularity: 5 },
  { title: "Mary Poppins", year: 1964, genres: ["Comedy", "Family", "Fantasy", "Musical"], popularity: 5 },
  { title: "A Hard Day's Night", year: 1964, genres: ["Comedy", "Music", "Musical"], popularity: 4 },
  { title: "Zorba the Greek", year: 1964, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "The Umbrellas of Cherbourg", year: 1964, genres: ["Drama", "Musical", "Romance"], popularity: 3 }, // France
  { title: "Blow-Up", year: 1966, genres: ["Drama", "Mystery", "Thriller"], popularity: 3 }, // UK/Italy
  { title: "Who's Afraid of Virginia Woolf?", year: 1966, genres: ["Drama"], popularity: 4 },
  { title: "A Man for All Seasons", year: 1966, genres: ["Biography", "Drama", "History"], popularity: 3 },
  { title: "Persona", year: 1966, genres: ["Drama", "Thriller"], popularity: 2 }, // Sweden
  { title: "Bonnie and Clyde", year: 1967, genres: ["Action", "Biography", "Crime", "Drama"], popularity: 4 },
  { title: "In the Heat of the Night", year: 1967, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 4 },
  { title: "Guess Who's Coming to Dinner", year: 1967, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "The Dirty Dozen", year: 1967, genres: ["Action", "Adventure", "Drama", "War"], popularity: 4 },
  { title: "Bullitt", year: 1968, genres: ["Action", "Crime", "Mystery", "Thriller"], popularity: 4 },
  { title: "Oliver!", year: 1968, genres: ["Drama", "Family", "Musical"], popularity: 4 },
  { title: "The Lion in Winter", year: 1968, genres: ["Biography", "Drama", "History"], popularity: 3 },
  { title: "The Wild Bunch", year: 1969, genres: ["Action", "Adventure", "Drama", "Western"], popularity: 4 },
  { title: "Z", year: 1969, genres: ["Crime", "Drama", "History", "Thriller"], popularity: 3 }, // France/Algeria
  { title: "They Shoot Horses, Don't They?", year: 1969, genres: ["Drama", "Music"], popularity: 2 },
  { title: "True Grit", year: 1969, genres: ["Adventure", "Drama", "Western"], popularity: 4 }, // John Wayne version

  // Animation Variety (Existing + More)
  { title: "Princess Mononoke", year: 1997, genres: ["Animation", "Action", "Adventure", "Fantasy"], popularity: 4 },
  { title: "WALL-E", year: 2008, genres: ["Animation", "Adventure", "Family", "Sci-Fi"], popularity: 5 },
  { title: "Up", year: 2009, genres: ["Animation", "Adventure", "Comedy", "Drama", "Family"], popularity: 5 },
  { title: "Spider-Man: Into the Spider-Verse", year: 2018, genres: ["Animation", "Action", "Adventure", "Family", "Sci-Fi"], popularity: 5 },
  { title: "Klaus", year: 2019, genres: ["Animation", "Adventure", "Comedy", "Drama", "Family"], popularity: 4 },
  { title: "My Neighbor Totoro", year: 1988, genres: ["Animation", "Family", "Fantasy"], popularity: 4 },
  { title: "Grave of the Fireflies", year: 1988, genres: ["Animation", "Drama", "War"], popularity: 3 },
  { title: "Akira", year: 1988, genres: ["Animation", "Action", "Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Beauty and the Beast", year: 1991, genres: ["Animation", "Family", "Fantasy", "Musical", "Romance"], popularity: 5 },
  { title: "Aladdin", year: 1992, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy", "Musical", "Romance"], popularity: 5 },
  { title: "The Nightmare Before Christmas", year: 1993, genres: ["Animation", "Family", "Fantasy", "Musical"], popularity: 5 },
  { title: "Ghost in the Shell", year: 1995, genres: ["Animation", "Action", "Crime", "Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Howl's Moving Castle", year: 2004, genres: ["Animation", "Adventure", "Family", "Fantasy"], popularity: 4 },
  { title: "Persepolis", year: 2007, genres: ["Animation", "Biography", "Drama", "War"], popularity: 3 },
  { title: "Ratatouille", year: 2007, genres: ["Animation", "Adventure", "Comedy", "Drama", "Family", "Fantasy"], popularity: 5 },
  { title: "Fantastic Mr. Fox", year: 2009, genres: ["Animation", "Adventure", "Comedy", "Crime", "Family"], popularity: 4 },
  { title: "How to Train Your Dragon", year: 2010, genres: ["Animation", "Action", "Adventure", "Family", "Fantasy"], popularity: 5 },
  { title: "Toy Story 3", year: 2010, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy"], popularity: 5 },
  { title: "The Wind Rises", year: 2013, genres: ["Animation", "Biography", "Drama", "History", "Romance", "War"], popularity: 3 },
  { title: "Inside Out", year: 2015, genres: ["Animation", "Adventure", "Comedy", "Drama", "Family", "Fantasy"], popularity: 5 },
  { title: "Zootopia", year: 2016, genres: ["Animation", "Action", "Adventure", "Comedy", "Crime", "Family", "Mystery"], popularity: 5 },
  { title: "Your Name.", year: 2016, genres: ["Animation", "Drama", "Fantasy", "Romance"], popularity: 4 },
  { title: "Coco", year: 2017, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy", "Music", "Mystery"], popularity: 5 },
  { title: "Isle of Dogs", year: 2018, genres: ["Animation", "Adventure", "Comedy", "Drama", "Fantasy", "Sci-Fi"], popularity: 3 },
  { title: "Spider-Man: Across the Spider-Verse", year: 2023, genres: ["Animation", "Action", "Adventure", "Sci-Fi"], popularity: 5 },
  { title: "The Boy and the Heron", year: 2023, genres: ["Animation", "Adventure", "Drama", "Fantasy"], popularity: 4 },
  { title: "Wolfwalkers", year: 2020, genres: ["Animation", "Adventure", "Family", "Fantasy"], popularity: 3 },
  { title: "Encanto", year: 2021, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy", "Musical"], popularity: 4 },
  { title: "Marcel the Shell with Shoes On", year: 2021, genres: ["Animation", "Comedy", "Drama", "Family"], popularity: 3 },

  // Comedy (Existing + More)
  { title: "This Is Spinal Tap", year: 1984, genres: ["Comedy", "Music"], popularity: 4 },
  { title: "Groundhog Day", year: 1993, genres: ["Comedy", "Drama", "Fantasy", "Romance"], popularity: 5 },
  { title: "Office Space", year: 1999, genres: ["Comedy"], popularity: 4 },
  { title: "Shaun of the Dead", year: 2004, genres: ["Comedy", "Horror"], popularity: 4 },
  { title: "Superbad", year: 2007, genres: ["Comedy"], popularity: 4 },
  { title: "Booksmart", year: 2019, genres: ["Comedy"], popularity: 3 },
  { title: "Airplane!", year: 1980, genres: ["Comedy"], popularity: 5 },
  { title: "The Blues Brothers", year: 1980, genres: ["Action", "Adventure", "Comedy", "Crime", "Music", "Musical"], popularity: 4 },
  { title: "Ghostbusters", year: 1984, genres: ["Action", "Comedy", "Fantasy"], popularity: 5 },
  { title: "Ferris Bueller's Day Off", year: 1986, genres: ["Comedy"], popularity: 5 },
  { title: "When Harry Met Sally...", year: 1989, genres: ["Comedy", "Drama", "Romance"], popularity: 5 },
  { title: "Home Alone", year: 1990, genres: ["Comedy", "Family"], popularity: 5 },
  { title: "Dumb and Dumber", year: 1994, genres: ["Comedy"], popularity: 4 },
  { title: "Clerks", year: 1994, genres: ["Comedy"], popularity: 3 },
  { title: "Friday", year: 1995, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Austin Powers: International Man of Mystery", year: 1997, genres: ["Adventure", "Comedy"], popularity: 4 },
  { title: "American Pie", year: 1999, genres: ["Comedy"], popularity: 4 },
  { title: "Galaxy Quest", year: 1999, genres: ["Adventure", "Comedy", "Sci-Fi"], popularity: 4 },
  { title: "Best in Show", year: 2000, genres: ["Comedy"], popularity: 3 },
  { title: "Zoolander", year: 2001, genres: ["Comedy"], popularity: 4 },
  { title: "Anchorman: The Legend of Ron Burgundy", year: 2004, genres: ["Comedy"], popularity: 4 },
  { title: "Napoleon Dynamite", year: 2004, genres: ["Comedy"], popularity: 4 },
  { title: "Mean Girls", year: 2004, genres: ["Comedy"], popularity: 5 },
  { title: "Borat", year: 2006, genres: ["Comedy"], popularity: 4 },
  { title: "Hot Fuzz", year: 2007, genres: ["Action", "Comedy", "Mystery"], popularity: 4 },
  { title: "Step Brothers", year: 2008, genres: ["Comedy"], popularity: 4 },
  { title: "The Hangover", year: 2009, genres: ["Comedy"], popularity: 5 },
  { title: "Scott Pilgrim vs. the World", year: 2010, genres: ["Action", "Comedy", "Fantasy", "Romance"], popularity: 4 },
  { title: "Bridesmaids", year: 2011, genres: ["Comedy", "Romance"], popularity: 4 },
  { title: "21 Jump Street", year: 2012, genres: ["Action", "Comedy", "Crime"], popularity: 4 },
  { title: "This Is the End", year: 2013, genres: ["Action", "Comedy", "Fantasy"], popularity: 3 },
  { title: "What We Do in the Shadows", year: 2014, genres: ["Comedy", "Fantasy", "Horror"], popularity: 4 },
  { title: "Popstar: Never Stop Never Stopping", year: 2016, genres: ["Comedy", "Music"], popularity: 3 },
  { title: "The Nice Guys", year: 2016, genres: ["Action", "Comedy", "Crime", "Mystery", "Thriller"], popularity: 4 },
  { title: "Game Night", year: 2018, genres: ["Action", "Comedy", "Crime", "Mystery", "Thriller"], popularity: 4 },
  { title: "Palm Springs", year: 2020, genres: ["Comedy", "Fantasy", "Mystery", "Romance", "Sci-Fi"], popularity: 3 },
  { title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", year: 1964, genres: ["Comedy", "War"], popularity: 4 },
  { title: "Monty Python and the Holy Grail", year: 1975, genres: ["Adventure", "Comedy", "Fantasy"], popularity: 5 },

  // Horror (Existing + More)
  { title: "The Exorcist", year: 1973, genres: ["Horror"], popularity: 5 },
  { title: "Alien", year: 1979, genres: ["Horror", "Sci-Fi"], popularity: 5 },
  { title: "The Shining", year: 1980, genres: ["Drama", "Horror"], popularity: 5 },
  { title: "Hereditary", year: 2018, genres: ["Drama", "Horror", "Mystery"], popularity: 4 },
  { title: "Get Out", year: 2017, genres: ["Horror", "Mystery", "Thriller"], popularity: 5 },
  { title: "Nosferatu", year: 1922, genres: ["Fantasy", "Horror"], popularity: 3 },
  { title: "Frankenstein", year: 1931, genres: ["Drama", "Horror", "Sci-Fi"], popularity: 4 },
  { title: "Dracula", year: 1931, genres: ["Drama", "Fantasy", "Horror"], popularity: 4 },
  { title: "The Cabinet of Dr. Caligari", year: 1920, genres: ["Horror", "Mystery", "Thriller"], popularity: 3 },
  { title: "Rosemary's Baby", year: 1968, genres: ["Drama", "Horror"], popularity: 4 },
  { title: "The Texas Chain Saw Massacre", year: 1974, genres: ["Horror"], popularity: 4 },
  { title: "Jaws", year: 1975, genres: ["Adventure", "Thriller"], popularity: 5 },
  { title: "Carrie", year: 1976, genres: ["Horror"], popularity: 4 },
  { title: "Halloween", year: 1978, genres: ["Horror", "Thriller"], popularity: 5 },
  { title: "The Thing", year: 1982, genres: ["Horror", "Mystery", "Sci-Fi"], popularity: 4 },
  { title: "A Nightmare on Elm Street", year: 1984, genres: ["Horror"], popularity: 5 },
  { title: "Evil Dead II", year: 1987, genres: ["Comedy", "Horror"], popularity: 4 },
  { title: "Misery", year: 1990, genres: ["Drama", "Thriller"], popularity: 4 },
  { title: "Scream", year: 1996, genres: ["Horror", "Mystery"], popularity: 5 },
  { title: "The Blair Witch Project", year: 1999, genres: ["Horror", "Mystery"], popularity: 4 },
  { title: "The Sixth Sense", year: 1999, genres: ["Drama", "Mystery", "Thriller"], popularity: 5 },
  { title: "28 Days Later", year: 2002, genres: ["Drama", "Horror", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Saw", year: 2004, genres: ["Horror", "Mystery", "Thriller"], popularity: 4 },
  { title: "The Descent", year: 2005, genres: ["Adventure", "Horror", "Thriller"], popularity: 3 },
  { title: "Let the Right One In", year: 2008, genres: ["Drama", "Fantasy", "Horror", "Romance"], popularity: 3 }, // Sweden
  { title: "The Cabin in the Woods", year: 2011, genres: ["Horror", "Mystery", "Thriller"], popularity: 4 },
  { title: "The Conjuring", year: 2013, genres: ["Horror", "Mystery", "Thriller"], popularity: 5 },
  { title: "It Follows", year: 2014, genres: ["Horror", "Mystery"], popularity: 3 },
  { title: "The Babadook", year: 2014, genres: ["Drama", "Horror", "Mystery"], popularity: 3 },
  { title: "Train to Busan", year: 2016, genres: ["Action", "Horror", "Thriller"], popularity: 4 }, // South Korea
  { title: "The Witch", year: 2015, genres: ["Drama", "Fantasy", "Horror", "Mystery"], popularity: 3 },
  { title: "A Quiet Place", year: 2018, genres: ["Drama", "Horror", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Us", year: 2019, genres: ["Horror", "Mystery", "Thriller"], popularity: 4 },
  { title: "The Invisible Man", year: 2020, genres: ["Horror", "Mystery", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Host", year: 2020, genres: ["Horror", "Mystery"], popularity: 2 },
  { title: "Barbarian", year: 2022, genres: ["Horror", "Mystery", "Thriller"], popularity: 3 },
  { title: "Talk to Me", year: 2022, genres: ["Horror", "Thriller"], popularity: 3 },

  // More Sci-Fi (Existing + More)
  { title: "Arrival", year: 2016, genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Children of Men", year: 2006, genres: ["Adventure", "Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Ex Machina", year: 2014, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Metropolis", year: 1927, genres: ["Drama", "Sci-Fi"], popularity: 4 },
  { title: "Planet of the Apes", year: 1968, genres: ["Adventure", "Sci-Fi"], popularity: 4 },
  { title: "Close Encounters of the Third Kind", year: 1977, genres: ["Drama", "Sci-Fi"], popularity: 4 },
  { title: "Star Trek II: The Wrath of Khan", year: 1982, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "The Terminator", year: 1984, genres: ["Action", "Sci-Fi"], popularity: 5 },
  { title: "Aliens", year: 1986, genres: ["Action", "Adventure", "Sci-Fi", "Thriller"], popularity: 5 },
  { title: "RoboCop", year: 1987, genres: ["Action", "Crime", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Total Recall", year: 1990, genres: ["Action", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Terminator 2: Judgment Day", year: 1991, genres: ["Action", "Sci-Fi"], popularity: 5 },
  { title: "Gattaca", year: 1997, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Starship Troopers", year: 1997, genres: ["Action", "Adventure", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "Dark City", year: 1998, genres: ["Mystery", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "A.I. Artificial Intelligence", year: 2001, genres: ["Drama", "Sci-Fi"], popularity: 3 },
  { title: "Minority Report", year: 2002, genres: ["Action", "Crime", "Mystery", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Serenity", year: 2005, genres: ["Action", "Adventure", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "V for Vendetta", year: 2005, genres: ["Action", "Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Sunshine", year: 2007, genres: ["Adventure", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "District 9", year: 2009, genres: ["Action", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Moon", year: 2009, genres: ["Drama", "Mystery", "Sci-Fi"], popularity: 4 },
  { title: "Source Code", year: 2011, genres: ["Action", "Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Looper", year: 2012, genres: ["Action", "Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Edge of Tomorrow", year: 2014, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "The Martian", year: 2015, genres: ["Adventure", "Drama", "Sci-Fi"], popularity: 5 },
  { title: "Annihilation", year: 2018, genres: ["Adventure", "Drama", "Horror", "Mystery", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "Ad Astra", year: 2019, genres: ["Adventure", "Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "War of the Worlds", year: 2005, genres: ["Adventure", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Avatar", year: 2009, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 5 },
  { title: "Gravity", year: 2013, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 4 },

  // More Musicals (Existing + More)
  { title: "Chicago", year: 2002, genres: ["Comedy", "Crime", "Drama", "Musical"], popularity: 4 },
  { title: "The Sound of Music", year: 1965, genres: ["Biography", "Drama", "Family", "Musical", "Romance"], popularity: 5 },
  { title: "West Side Story", year: 1961, genres: ["Crime", "Drama", "Musical", "Romance"], popularity: 4 },
  { title: "My Fair Lady", year: 1964, genres: ["Drama", "Family", "Musical", "Romance"], popularity: 4 },
  { title: "Grease", year: 1978, genres: ["Musical", "Romance"], popularity: 5 },
  { title: "Cabaret", year: 1972, genres: ["Drama", "Music", "Musical"], popularity: 4 },
  { title: "Moulin Rouge!", year: 2001, genres: ["Drama", "Musical", "Romance"], popularity: 4 },
  { title: "Hairspray", year: 2007, genres: ["Comedy", "Drama", "Family", "Musical", "Romance"], popularity: 4 },
  { title: "Les Misérables", year: 2012, genres: ["Drama", "Musical", "Romance", "War"], popularity: 4 },
  { title: "The Greatest Showman", year: 2017, genres: ["Biography", "Drama", "Musical"], popularity: 5 },
  { title: "Hamilton", year: 2020, genres: ["Biography", "Drama", "History", "Music", "Musical"], popularity: 4 },
  { title: "Tick, Tick... Boom!", year: 2021, genres: ["Biography", "Drama", "Musical"], popularity: 3 },
  // { title: "West Side Story", year: 2021, genres: ["Crime", "Drama", "Musical", "Romance"], popularity: 3 }, // Already listed with year 1961
  { title: "Annette", year: 2021, genres: ["Drama", "Musical", "Romance"], popularity: 2 },

  // War Films
  { title: "The Great Escape", year: 1963, genres: ["Adventure", "Drama", "History", "War"], popularity: 4 },
  { title: "Das Boot", year: 1981, genres: ["Adventure", "Drama", "War"], popularity: 4 }, // Germany
  { title: "Come and See", year: 1985, genres: ["Drama", "Thriller", "War"], popularity: 3 }, // Soviet Union
  { title: "Braveheart", year: 1995, genres: ["Biography", "Drama", "History", "War"], popularity: 5 },
  { title: "Black Hawk Down", year: 2001, genres: ["Action", "Drama", "History", "War"], popularity: 4 },
  { title: "Letters from Iwo Jima", year: 2006, genres: ["Drama", "History", "War"], popularity: 3 },
  { title: "The Hurt Locker", year: 2008, genres: ["Drama", "Thriller", "War"], popularity: 4 },
  { title: "Inglourious Basterds", year: 2009, genres: ["Adventure", "Drama", "War"], popularity: 5 },
  { title: "Zero Dark Thirty", year: 2012, genres: ["Drama", "History", "Thriller", "War"], popularity: 4 },
  { title: "American Sniper", year: 2014, genres: ["Action", "Biography", "Drama", "War"], popularity: 4 },
  { title: "Hacksaw Ridge", year: 2016, genres: ["Biography", "Drama", "History", "War"], popularity: 4 },
  { title: "Dunkirk", year: 2017, genres: ["Action", "Drama", "History", "Thriller", "War"], popularity: 4 },
  { title: "1917", year: 2019, genres: ["Drama", "War"], popularity: 4 },
  { title: "All Quiet on the Western Front", year: 2022, genres: ["Action", "Drama", "War"], popularity: 4 }, // Germany

  // Westerns
  { title: "A Fistful of Dollars", year: 1964, genres: ["Action", "Drama", "Western"], popularity: 4 },
  { title: "For a Few Dollars More", year: 1965, genres: ["Drama", "Western"], popularity: 4 },
  { title: "Butch Cassidy and the Sundance Kid", year: 1969, genres: ["Biography", "Crime", "Drama", "Western"], popularity: 4 },
  { title: "Unforgiven", year: 1992, genres: ["Drama", "Western"], popularity: 4 },
  { title: "Tombstone", year: 1993, genres: ["Action", "Biography", "Drama", "History", "Western"], popularity: 4 },
  { title: "Django Unchained", year: 2012, genres: ["Drama", "Western"], popularity: 5 },
  { title: "The Hateful Eight", year: 2015, genres: ["Crime", "Drama", "Mystery", "Thriller", "Western"], popularity: 4 },
  { title: "Hell or High Water", year: 2016, genres: ["Action", "Crime", "Drama", "Thriller", "Western"], popularity: 4 },
  { title: "The Power of the Dog", year: 2021, genres: ["Drama", "Romance", "Western"], popularity: 3 },

  // Romance
  { title: "Breakfast at Tiffany's", year: 1961, genres: ["Comedy", "Drama", "Romance"], popularity: 5 },
  { title: "Doctor Zhivago", year: 1965, genres: ["Drama", "Romance", "War"], popularity: 4 },
  { title: "Love Story", year: 1970, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "Harold and Maude", year: 1971, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "The Princess Bride", year: 1987, genres: ["Adventure", "Comedy", "Family", "Fantasy", "Romance"], popularity: 5 },
  { title: "Dirty Dancing", year: 1987, genres: ["Drama", "Music", "Romance"], popularity: 5 },
  { title: "Ghost", year: 1990, genres: ["Drama", "Fantasy", "Romance", "Thriller"], popularity: 5 },
  { title: "Pretty Woman", year: 1990, genres: ["Comedy", "Romance"], popularity: 5 },
  { title: "Sleepless in Seattle", year: 1993, genres: ["Comedy", "Drama", "Romance"], popularity: 5 },
  { title: "Before Sunrise", year: 1995, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "The Bridges of Madison County", year: 1995, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "Sense and Sensibility", year: 1995, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "Titanic", year: 1997, genres: ["Drama", "Romance"], popularity: 5 },
  { title: "Shakespeare in Love", year: 1998, genres: ["Comedy", "Drama", "History", "Romance"], popularity: 4 },
  { title: "You've Got Mail", year: 1998, genres: ["Comedy", "Drama", "Romance"], popularity: 5 },
  { title: "Notting Hill", year: 1999, genres: ["Comedy", "Drama", "Romance"], popularity: 5 },
  { title: "American Beauty", year: 1999, genres: ["Drama"], popularity: 5 },
  { title: "Bridget Jones's Diary", year: 2001, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "Love Actually", year: 2003, genres: ["Comedy", "Drama", "Romance"], popularity: 5 },
  { title: "The Notebook", year: 2004, genres: ["Drama", "Romance"], popularity: 5 },
  { title: "Before Sunset", year: 2004, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "Brokeback Mountain", year: 2005, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "Pride & Prejudice", year: 2005, genres: ["Drama", "Romance"], popularity: 5 },
  { title: "Atonement", year: 2007, genres: ["Drama", "Mystery", "Romance", "War"], popularity: 4 },
  { title: "(500) Days of Summer", year: 2009, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "The Vow", year: 2012, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "Silver Linings Playbook", year: 2012, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "About Time", year: 2013, genres: ["Comedy", "Drama", "Fantasy", "Romance"], popularity: 4 },
  { title: "Before Midnight", year: 2013, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "The Fault in Our Stars", year: 2014, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "Carol", year: 2015, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "Brooklyn", year: 2015, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "Call Me by Your Name", year: 2017, genres: ["Drama", "Romance"], popularity: 4 },
  { title: "The Shape of Water", year: 2017, genres: ["Adventure", "Drama", "Fantasy", "Romance", "Thriller"], popularity: 4 },
  { title: "If Beale Street Could Talk", year: 2018, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "Crazy Rich Asians", year: 2018, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "Past Lives", year: 2023, genres: ["Drama", "Romance"], popularity: 3 },

  // Thrillers
  { title: "Wait Until Dark", year: 1967, genres: ["Horror", "Thriller"], popularity: 3 },
  { title: "The French Connection", year: 1971, genres: ["Action", "Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Marathon Man", year: 1976, genres: ["Crime", "Drama", "Thriller"], popularity: 3 },
  { title: "Body Heat", year: 1981, genres: ["Crime", "Drama", "Romance", "Thriller"], popularity: 3 },
  { title: "Blood Simple", year: 1984, genres: ["Crime", "Drama", "Thriller"], popularity: 3 },
  { title: "Fatal Attraction", year: 1987, genres: ["Drama", "Thriller"], popularity: 4 },
  { title: "Basic Instinct", year: 1992, genres: ["Drama", "Mystery", "Thriller"], popularity: 4 },
  { title: "The Fugitive", year: 1993, genres: ["Action", "Adventure", "Crime", "Drama", "Mystery", "Thriller"], popularity: 5 },
  { title: "True Romance", year: 1993, genres: ["Crime", "Drama", "Romance", "Thriller"], popularity: 4 },
  { title: "Heat", year: 1995, genres: ["Action", "Crime", "Drama", "Thriller"], popularity: 5 },
  { title: "Fargo", year: 1996, genres: ["Crime", "Drama", "Thriller"], popularity: 5 },
  { title: "L.A. Confidential", year: 1997, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 4 },
  { title: "A Simple Plan", year: 1998, genres: ["Crime", "Drama", "Thriller"], popularity: 3 },
  { title: "Memento", year: 2000, genres: ["Mystery", "Thriller"], popularity: 5 },
  { title: "Training Day", year: 2001, genres: ["Action", "Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Insomnia", year: 2002, genres: ["Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "Mystic River", year: 2003, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 4 },
  { title: "Collateral", year: 2004, genres: ["Action", "Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "A History of Violence", year: 2005, genres: ["Action", "Drama", "Thriller", "Western"], popularity: 3 },
  { title: "The Departed", year: 2006, genres: ["Crime", "Drama", "Thriller"], popularity: 5 },
  { title: "Zodiac", year: 2007, genres: ["Crime", "Drama", "History", "Mystery", "Thriller"], popularity: 4 },
  { title: "Michael Clayton", year: 2007, genres: ["Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "Eastern Promises", year: 2007, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "Gone Baby Gone", year: 2007, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "The Town", year: 2010, genres: ["Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Prisoners", year: 2013, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 4 },
  { title: "Nightcrawler", year: 2014, genres: ["Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Gone Girl", year: 2014, genres: ["Drama", "Mystery", "Thriller"], popularity: 5 },
  { title: "Sicario", year: 2015, genres: ["Action", "Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "The Gift", year: 2015, genres: ["Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "Green Room", year: 2015, genres: ["Crime", "Horror", "Music", "Thriller"], popularity: 3 },
  { title: "Nocturnal Animals", year: 2016, genres: ["Drama", "Thriller"], popularity: 3 },
  { title: "Wind River", year: 2017, genres: ["Crime", "Drama", "Mystery", "Thriller"], popularity: 4 },
  { title: "Good Time", year: 2017, genres: ["Crime", "Drama", "Thriller"], popularity: 3 },
  { title: "Searching", year: 2018, genres: ["Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "A Simple Favor", year: 2018, genres: ["Comedy", "Crime", "Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "The Guilty", year: 2018, genres: ["Crime", "Drama", "Thriller"], popularity: 3 }, // Denmark
  { title: "Promising Young Woman", year: 2020, genres: ["Comedy", "Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Nobody", year: 2021, genres: ["Action", "Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Pig", year: 2021, genres: ["Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "The Menu", year: 2022, genres: ["Comedy", "Horror", "Thriller"], popularity: 4 },
  { title: "Decision to Leave", year: 2022, genres: ["Crime", "Drama", "Mystery", "Romance", "Thriller"], popularity: 3 }, // South Korea
  { title: "Anatomy of a Fall", year: 2023, genres: ["Crime", "Drama", "Thriller"], popularity: 3 }, // France

  // Family & Adventure (Excluding most animation already covered)
  { title: "The Goonies", year: 1985, genres: ["Adventure", "Comedy", "Family"], popularity: 5 },
  { title: "Stand by Me", year: 1986, genres: ["Adventure", "Drama"], popularity: 4 },
  { title: "Honey, I Shrunk the Kids", year: 1989, genres: ["Adventure", "Comedy", "Family", "Sci-Fi"], popularity: 4 },
  { title: "The Parent Trap", year: 1998, genres: ["Adventure", "Comedy", "Drama", "Family", "Romance"], popularity: 4 },
  { title: "The Princess Diaries", year: 2001, genres: ["Comedy", "Family", "Romance"], popularity: 4 },
  { title: "Harry Potter and the Sorcerer's Stone", year: 2001, genres: ["Adventure", "Family", "Fantasy"], popularity: 5 },
  { title: "Spy Kids", year: 2001, genres: ["Action", "Adventure", "Comedy", "Family", "Sci-Fi"], popularity: 3 },
  { title: "Pirates of the Caribbean: The Curse of the Black Pearl", year: 2003, genres: ["Action", "Adventure", "Fantasy"], popularity: 5 },
  { title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", year: 2005, genres: ["Adventure", "Family", "Fantasy"], popularity: 4 },
  { title: "Bridge to Terabithia", year: 2007, genres: ["Drama", "Family", "Fantasy"], popularity: 3 },
  { title: "Hugo", year: 2011, genres: ["Adventure", "Drama", "Family", "Mystery"], popularity: 3 },
  { title: "The Hunger Games", year: 2012, genres: ["Action", "Adventure", "Sci-Fi", "Thriller"], popularity: 5 },
  { title: "Paddington", year: 2014, genres: ["Adventure", "Comedy", "Family"], popularity: 4 },
  { title: "Paddington 2", year: 2017, genres: ["Adventure", "Comedy", "Family"], popularity: 4 },
  { title: "Wonder", year: 2017, genres: ["Drama", "Family"], popularity: 4 },
  { title: "A Wrinkle in Time", year: 2018, genres: ["Adventure", "Family", "Fantasy", "Sci-Fi"], popularity: 2 },
  { title: "Jumanji: Welcome to the Jungle", year: 2017, genres: ["Action", "Adventure", "Comedy", "Fantasy"], popularity: 4 },
  { title: "The Kid Who Would Be King", year: 2019, genres: ["Action", "Adventure", "Family", "Fantasy"], popularity: 2 },
  { title: "Dora and the Lost City of Gold", year: 2019, genres: ["Adventure", "Comedy", "Family"], popularity: 3 },
  { title: "The Mitchells vs. the Machines", year: 2021, genres: ["Animation", "Adventure", "Comedy", "Family", "Sci-Fi"], popularity: 4 }, 
  { title: "The Adam Project", year: 2022, genres: ["Action", "Adventure", "Comedy", "Sci-Fi"], popularity: 3 },

  // Documentaries (Carefully selected for potential cryptic clues)
  { title: "Man on Wire", year: 2008, genres: ["Documentary", "Biography", "Crime", "History"], popularity: 3 },
  { title: "Exit Through the Gift Shop", year: 2010, genres: ["Documentary", "Comedy", "Crime"], popularity: 3 },
  { title: "Searching for Sugar Man", year: 2012, genres: ["Documentary", "Biography", "Music"], popularity: 3 },
  { title: "Blackfish", year: 2013, genres: ["Documentary", "Drama"], popularity: 3 },
  { title: "Amy", year: 2015, genres: ["Documentary", "Biography", "Music"], popularity: 3 },
  { title: "Icarus", year: 2017, genres: ["Documentary", "Sport", "Thriller"], popularity: 3 },
  { title: "Won't You Be My Neighbor?", year: 2018, genres: ["Documentary", "Biography"], popularity: 3 },
  { title: "Free Solo", year: 2018, genres: ["Documentary", "Adventure", "Sport"], popularity: 4 },
  { title: "Apollo 11", year: 2019, genres: ["Documentary", "History"], popularity: 3 },
  { title: "Honeyland", year: 2019, genres: ["Documentary", "Drama"], popularity: 2 },
  { title: "American Factory", year: 2019, genres: ["Documentary"], popularity: 2 },
  { title: "My Octopus Teacher", year: 2020, genres: ["Documentary"], popularity: 4 },
  { title: "Crip Camp", year: 2020, genres: ["Documentary", "History"], popularity: 2 },
  { title: "Summer of Soul", year: 2021, genres: ["Documentary", "Music"], popularity: 3 },
  { title: "Flee", year: 2021, genres: ["Animation", "Documentary", "Biography", "Drama", "History", "War"], popularity: 3 },
  { title: "Navalny", year: 2022, genres: ["Documentary", "Biography", "Crime", "Thriller"], popularity: 3 },
  { title: "All the Beauty and the Bloodshed", year: 2022, genres: ["Documentary", "Biography"], popularity: 2 },
  
  // More diverse selections (various genres and decades)
  { title: "M*A*S*H", year: 1970, genres: ["Comedy", "Drama", "War"], popularity: 4 },
  { title: "Deliverance", year: 1972, genres: ["Adventure", "Drama", "Thriller"], popularity: 3 },
  { title: "The Sting", year: 1973, genres: ["Comedy", "Crime", "Drama"], popularity: 4 },
  { title: "Dog Day Afternoon", year: 1975, genres: ["Biography", "Crime", "Drama"], popularity: 4 },
  { title: "Kramer vs. Kramer", year: 1979, genres: ["Drama"], popularity: 4 },
  { title: "Ordinary People", year: 1980, genres: ["Drama"], popularity: 3 },
  { title: "Chariots of Fire", year: 1981, genres: ["Biography", "Drama", "Sport"], popularity: 3 },
  { title: "Gandhi", year: 1982, genres: ["Biography", "Drama", "History"], popularity: 4 },
  { title: "Terms of Endearment", year: 1983, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "The Killing Fields", year: 1984, genres: ["Biography", "Drama", "History", "War"], popularity: 3 },
  { title: "Out of Africa", year: 1985, genres: ["Biography", "Drama", "Romance"], popularity: 4 },
  { title: "The Last Emperor", year: 1987, genres: ["Biography", "Drama", "History"], popularity: 3 },
  { title: "Rain Man", year: 1988, genres: ["Drama"], popularity: 5 },
  { title: "Driving Miss Daisy", year: 1989, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Dances with Wolves", year: 1990, genres: ["Adventure", "Drama", "Western"], popularity: 4 },
  { title: "JFK", year: 1991, genres: ["Drama", "History", "Thriller"], popularity: 4 },
  { title: "A Few Good Men", year: 1992, genres: ["Drama", "Thriller"], popularity: 4 },
  { title: "The Piano", year: 1993, genres: ["Drama", "Music", "Romance"], popularity: 3 },
  { title: "Quiz Show", year: 1994, genres: ["Drama", "History"], popularity: 3 },
  { title: "Apollo 13", year: 1995, genres: ["Adventure", "Drama", "History"], popularity: 5 },
  { title: "The English Patient", year: 1996, genres: ["Drama", "Romance", "War"], popularity: 4 },
  { title: "Good Will Hunting", year: 1997, genres: ["Drama", "Romance"], popularity: 5 },
  { title: "Almost Famous", year: 2000, genres: ["Adventure", "Comedy", "Drama", "Music"], popularity: 4 },
  { title: "Traffic", year: 2000, genres: ["Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "A Beautiful Mind", year: 2001, genres: ["Biography", "Drama"], popularity: 4 },
  { title: "The Pianist", year: 2002, genres: ["Biography", "Drama", "Music", "War"], popularity: 4 },
  { title: "Adaptation.", year: 2002, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "Master and Commander: The Far Side of the World", year: 2003, genres: ["Action", "Adventure", "Drama", "History", "War"], popularity: 3 },
  { title: "Million Dollar Baby", year: 2004, genres: ["Drama", "Sport"], popularity: 4 },
  { title: "Sideways", year: 2004, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Crash", year: 2004, genres: ["Crime", "Drama", "Thriller"], popularity: 4 }, // The one that won Best Picture
  { title: "Capote", year: 2005, genres: ["Biography", "Crime", "Drama"], popularity: 3 },
  { title: "Little Children", year: 2006, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "There Will Be Blood", year: 2007, genres: ["Drama"], popularity: 4 },
  { title: "Slumdog Millionaire", year: 2008, genres: ["Crime", "Drama", "Romance"], popularity: 4 },
  { title: "Milk", year: 2008, genres: ["Biography", "Drama"], popularity: 3 },
  { title: "An Education", year: 2009, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "The King's Speech", year: 2010, genres: ["Biography", "Drama", "History"], popularity: 4 },
  { title: "Black Swan", year: 2010, genres: ["Drama", "Thriller"], popularity: 4 },
  { title: "The Social Network", year: 2010, genres: ["Biography", "Drama"], popularity: 5 },
  { title: "Winter's Bone", year: 2010, genres: ["Drama", "Mystery"], popularity: 3 },
  // { title: "True Grit", year: 2010, genres: ["Adventure", "Drama", "Western"], popularity: 4 }, // Coen Brothers remake - already listed with 1969
  { title: "The Artist", year: 2011, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "The Help", year: 2011, genres: ["Drama"], popularity: 4 },
  { title: "Moneyball", year: 2011, genres: ["Biography", "Drama", "Sport"], popularity: 4 },
  { title: "War Horse", year: 2011, genres: ["Adventure", "Drama", "History", "War"], popularity: 3 },
  { title: "Argo", year: 2012, genres: ["Biography", "Drama", "Thriller"], popularity: 4 },
  { title: "Life of Pi", year: 2012, genres: ["Adventure", "Drama", "Fantasy"], popularity: 4 },
  { title: "Lincoln", year: 2012, genres: ["Biography", "Drama", "History", "War"], popularity: 3 },
  { title: "Beasts of the Southern Wild", year: 2012, genres: ["Adventure", "Drama", "Fantasy"], popularity: 3 },
  { title: "12 Years a Slave", year: 2013, genres: ["Biography", "Drama", "History"], popularity: 4 },
  { title: "Captain Phillips", year: 2013, genres: ["Adventure", "Biography", "Crime", "Drama", "Thriller"], popularity: 4 },
  { title: "Dallas Buyers Club", year: 2013, genres: ["Biography", "Drama"], popularity: 4 },
  { title: "Nebraska", year: 2013, genres: ["Adventure", "Comedy", "Drama"], popularity: 3 },
  { title: "Philomena", year: 2013, genres: ["Biography", "Comedy", "Drama"], popularity: 3 },
  { title: "The Wolf of Wall Street", year: 2013, genres: ["Biography", "Comedy", "Crime", "Drama"], popularity: 5 },
  { title: "Boyhood", year: 2014, genres: ["Drama"], popularity: 4 },
  { title: "Birdman or (The Unexpected Virtue of Ignorance)", year: 2014, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "The Imitation Game", year: 2014, genres: ["Biography", "Drama", "Thriller", "War"], popularity: 4 },
  { title: "Selma", year: 2014, genres: ["Biography", "Drama", "History"], popularity: 3 },
  { title: "The Theory of Everything", year: 2014, genres: ["Biography", "Drama", "Romance"], popularity: 4 },
  { title: "Spotlight", year: 2015, genres: ["Biography", "Crime", "Drama"], popularity: 4 },
  { title: "The Revenant", year: 2015, genres: ["Action", "Adventure", "Biography", "Drama", "Western"], popularity: 4 },
  { title: "Room", year: 2015, genres: ["Drama", "Thriller"], popularity: 4 },
  { title: "The Big Short", year: 2015, genres: ["Biography", "Comedy", "Drama", "History"], popularity: 4 },
  { title: "Manchester by the Sea", year: 2016, genres: ["Drama"], popularity: 4 },
  { title: "Fences", year: 2016, genres: ["Drama"], popularity: 3 },
  { title: "Hidden Figures", year: 2016, genres: ["Biography", "Drama", "History"], popularity: 4 },
  { title: "Lion", year: 2016, genres: ["Biography", "Drama"], popularity: 3 },
  { title: "Darkest Hour", year: 2017, genres: ["Biography", "Drama", "History", "War"], popularity: 3 },
  { title: "Phantom Thread", year: 2017, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "Three Billboards Outside Ebbing, Missouri", year: 2017, genres: ["Comedy", "Crime", "Drama"], popularity: 4 },
  { title: "Green Book", year: 2018, genres: ["Biography", "Comedy", "Drama", "Music"], popularity: 4 },
  { title: "Bohemian Rhapsody", year: 2018, genres: ["Biography", "Drama", "Music"], popularity: 5 },
  // { title: "A Star Is Born", year: 2018, genres: ["Drama", "Music", "Romance"], popularity: 5 }, // Remake - already listed with 1954
  { title: "Vice", year: 2018, genres: ["Biography", "Comedy", "Drama", "History"], popularity: 3 },
  { title: "BlacKkKlansman", year: 2018, genres: ["Biography", "Comedy", "Crime", "Drama", "History"], popularity: 4 },
  { title: "The Irishman", year: 2019, genres: ["Biography", "Crime", "Drama"], popularity: 4 },
  { title: "Jojo Rabbit", year: 2019, genres: ["Comedy", "Drama", "War"], popularity: 4 },
  { title: "Little Women", year: 2019, genres: ["Drama", "Romance"], popularity: 4 }, // Greta Gerwig version
  { title: "Marriage Story", year: 2019, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "Ford v Ferrari", year: 2019, genres: ["Action", "Biography", "Drama", "Sport"], popularity: 4 },
  { title: "Nomadland", year: 2020, genres: ["Drama"], popularity: 3 },
  { title: "Minari", year: 2020, genres: ["Drama"], popularity: 3 },
  { title: "The Father", year: 2020, genres: ["Drama", "Mystery"], popularity: 3 },
  { title: "Sound of Metal", year: 2019, genres: ["Drama", "Music"], popularity: 3 }, // Released wider 2020
  { title: "Judas and the Black Messiah", year: 2021, genres: ["Biography", "Drama", "History"], popularity: 3 },
  { title: "The Trial of the Chicago 7", year: 2020, genres: ["Drama", "History", "Thriller"], popularity: 3 },
  { title: "CODA", year: 2021, genres: ["Comedy", "Drama", "Music"], popularity: 4 },
  { title: "Belfast", year: 2021, genres: ["Biography", "Drama", "History"], popularity: 3 },
  { title: "King Richard", year: 2021, genres: ["Biography", "Drama", "Sport"], popularity: 3 },
  { title: "Licorice Pizza", year: 2021, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Nightmare Alley", year: 2021, genres: ["Crime", "Drama", "Thriller"], popularity: 3 },
  { title: "The Tragedy of Macbeth", year: 2021, genres: ["Drama", "History", "Thriller", "War"], popularity: 2 },
  { title: "Being the Ricardos", year: 2021, genres: ["Biography", "Drama"], popularity: 2 },
  { title: "The Banshees of Inisherin", year: 2022, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Elvis", year: 2022, genres: ["Biography", "Drama", "Music"], popularity: 4 },
  { title: "Tár", year: 2022, genres: ["Drama", "Music"], popularity: 3 },
  { title: "The Fabelmans", year: 2022, genres: ["Drama"], popularity: 3 },
  { title: "Triangle of Sadness", year: 2022, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "Women Talking", year: 2022, genres: ["Drama"], popularity: 2 },
  { title: "Killers of the Flower Moon", year: 2023, genres: ["Crime", "Drama", "History", "Mystery", "Thriller", "Western"], popularity: 4 },
  { title: "Poor Things", year: 2023, genres: ["Comedy", "Drama", "Romance", "Sci-Fi"], popularity: 4 },
  { title: "The Holdovers", year: 2023, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Maestro", year: 2023, genres: ["Biography", "Drama", "Music", "Romance"], popularity: 3 },
  { title: "American Fiction", year: 2023, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "The Zone of Interest", year: 2023, genres: ["Drama", "History", "War"], popularity: 3 },

  // Adding a few more less mainstream but critically acclaimed from various years
  { title: "Being There", year: 1979, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "My Dinner with Andre", year: 1981, genres: ["Biography", "Comedy", "Drama"], popularity: 2 },
  { title: "sex, lies, and videotape", year: 1989, genres: ["Drama"], popularity: 3 },
  { title: "Barton Fink", year: 1991, genres: ["Comedy", "Drama", "Mystery", "Thriller"], popularity: 3 },
  { title: "The Player", year: 1992, genres: ["Comedy", "Crime", "Drama"], popularity: 3 },
  { title: "Short Cuts", year: 1993, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "Leaving Las Vegas", year: 1995, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "Secrets & Lies", year: 1996, genres: ["Comedy", "Drama"], popularity: 2 },
  { title: "Boogie Nights", year: 1997, genres: ["Drama"], popularity: 4 },
  { title: "Happiness", year: 1998, genres: ["Comedy", "Drama"], popularity: 2 },
  { title: "Being John Malkovich", year: 1999, genres: ["Comedy", "Drama", "Fantasy"], popularity: 4 },
  { title: "Magnolia", year: 1999, genres: ["Drama"], popularity: 3 },
  { title: "Yi Yi", year: 2000, genres: ["Drama", "Romance"], popularity: 2 }, // Taiwan
  { title: "The Royal Tenenbaums", year: 2001, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Punch-Drunk Love", year: 2002, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Dogville", year: 2003, genres: ["Crime", "Drama", "Thriller"], popularity: 2 },
  { title: "Grizzly Man", year: 2005, genres: ["Documentary", "Adventure", "Biography"], popularity: 3 },
  { title: "The Squid and the Whale", year: 2005, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "The Diving Bell and the Butterfly", year: 2007, genres: ["Biography", "Drama"], popularity: 3 }, // France
  { title: "Synecdoche, New York", year: 2008, genres: ["Comedy", "Drama"], popularity: 2 },
  { title: "A Serious Man", year: 2009, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "Certified Copy", year: 2010, genres: ["Drama", "Romance"], popularity: 2 }, // France/Italy
  { title: "The Tree of Life", year: 2011, genres: ["Drama", "Fantasy"], popularity: 3 },
  { title: "Melancholia", year: 2011, genres: ["Drama", "Sci-Fi"], popularity: 2 },
  { title: "The Master", year: 2012, genres: ["Drama"], popularity: 3 },
  { title: "Holy Motors", year: 2012, genres: ["Drama", "Fantasy", "Mystery"], popularity: 2 }, // France
  { title: "Under the Skin", year: 2013, genres: ["Drama", "Horror", "Sci-Fi"], popularity: 3 },
  { title: "Leviathan", year: 2014, genres: ["Drama"], popularity: 2 }, // Russia
  { title: "Son of Saul", year: 2015, genres: ["Drama", "Thriller", "War"], popularity: 2 }, // Hungary
  { title: "Toni Erdmann", year: 2016, genres: ["Comedy", "Drama"], popularity: 2 }, // Germany
  { title: "Paterson", year: 2016, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Columbus", year: 2017, genres: ["Drama"], popularity: 2 },
  { title: "Burning", year: 2018, genres: ["Drama", "Mystery"], popularity: 3 }, // South Korea
  { title: "First Cow", year: 2019, genres: ["Drama", "Western"], popularity: 2 },
  { title: "Never Rarely Sometimes Always", year: 2020, genres: ["Drama"], popularity: 2 },
  { title: "Quo Vadis, Aida?", year: 2020, genres: ["Drama", "History", "War"], popularity: 2 }, // Bosnia
  { title: "The Green Knight", year: 2021, genres: ["Adventure", "Drama", "Fantasy"], popularity: 3 },
  { title: "Aftersun", year: 2022, genres: ["Drama"], popularity: 3 },
  { title: "EO", year: 2022, genres: ["Drama"], popularity: 2 }, // Poland

  // Some well-known action films
  { title: "Raiders of the Lost Ark", year: 1981, genres: ["Action", "Adventure"], popularity: 5 },
  { title: "Lethal Weapon", year: 1987, genres: ["Action", "Crime", "Thriller"], popularity: 4 },
  { title: "Point Break", year: 1991, genres: ["Action", "Crime", "Thriller"], popularity: 4 },
  { title: "Speed", year: 1994, genres: ["Action", "Adventure", "Thriller"], popularity: 4 },
  { title: "Bad Boys", year: 1995, genres: ["Action", "Comedy", "Crime", "Thriller"], popularity: 4 },
  { title: "The Rock", year: 1996, genres: ["Action", "Adventure", "Thriller"], popularity: 4 },
  { title: "Con Air", year: 1997, genres: ["Action", "Crime", "Thriller"], popularity: 4 },
  { title: "Face/Off", year: 1997, genres: ["Action", "Crime", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Mission: Impossible", year: 1996, genres: ["Action", "Adventure", "Thriller"], popularity: 5 },
  { title: "The Bourne Identity", year: 2002, genres: ["Action", "Mystery", "Thriller"], popularity: 5 },
  { title: "Casino Royale", year: 2006, genres: ["Action", "Adventure", "Thriller"], popularity: 5 }, // Daniel Craig James Bond
  { title: "Iron Man", year: 2008, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 5 },
  { title: "Taken", year: 2008, genres: ["Action", "Crime", "Thriller"], popularity: 4 },
  { title: "The Avengers", year: 2012, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 5 },
  { title: "Skyfall", year: 2012, genres: ["Action", "Adventure", "Thriller"], popularity: 5 },
  { title: "Guardians of the Galaxy", year: 2014, genres: ["Action", "Adventure", "Comedy", "Sci-Fi"], popularity: 5 },
  { title: "John Wick", year: 2014, genres: ["Action", "Crime", "Thriller"], popularity: 5 },
  { title: "Kingsman: The Secret Service", year: 2014, genres: ["Action", "Adventure", "Comedy", "Thriller"], popularity: 4 },
  { title: "Captain America: Civil War", year: 2016, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 5 },
  { title: "Deadpool", year: 2016, genres: ["Action", "Adventure", "Comedy", "Sci-Fi"], popularity: 5 },
  { title: "Doctor Strange", year: 2016, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 5 },
  { title: "Logan", year: 2017, genres: ["Action", "Drama", "Sci-Fi"], popularity: 5 },
  { title: "Wonder Woman", year: 2017, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi", "War"], popularity: 5 },
  { title: "Thor: Ragnarok", year: 2017, genres: ["Action", "Adventure", "Comedy", "Fantasy", "Sci-Fi"], popularity: 5 },
  { title: "Black Panther", year: 2018, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 5 },
  { title: "Avengers: Infinity War", year: 2018, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 5 },
  { title: "Mission: Impossible - Fallout", year: 2018, genres: ["Action", "Adventure", "Thriller"], popularity: 5 },
  { title: "Captain Marvel", year: 2019, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "Shazam!", year: 2019, genres: ["Action", "Adventure", "Comedy", "Fantasy"], popularity: 4 },
  { title: "Birds of Prey", year: 2020, genres: ["Action", "Adventure", "Comedy", "Crime"], popularity: 3 },
  { title: "Wonder Woman 1984", year: 2020, genres: ["Action", "Adventure", "Fantasy"], popularity: 3 },
  { title: "Zack Snyder's Justice League", year: 2021, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 4 },
  { title: "Black Widow", year: 2021, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "Shang-Chi and the Legend of the Ten Rings", year: 2021, genres: ["Action", "Adventure", "Fantasy"], popularity: 4 },
  { title: "Eternals", year: 2021, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 3 },
  { title: "The Suicide Squad", year: 2021, genres: ["Action", "Adventure", "Comedy", "Sci-Fi"], popularity: 4 },
  { title: "No Time to Die", year: 2021, genres: ["Action", "Adventure", "Thriller"], popularity: 4 },
  { title: "The Batman", year: 2022, genres: ["Action", "Crime", "Drama", "Mystery"], popularity: 5 },
  { title: "Doctor Strange in the Multiverse of Madness", year: 2022, genres: ["Action", "Adventure", "Fantasy", "Horror", "Sci-Fi"], popularity: 4 },
  { title: "Thor: Love and Thunder", year: 2022, genres: ["Action", "Adventure", "Comedy", "Fantasy", "Romance", "Sci-Fi"], popularity: 3 },
  { title: "Black Panther: Wakanda Forever", year: 2022, genres: ["Action", "Adventure", "Drama", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Ant-Man and the Wasp: Quantumania", year: 2023, genres: ["Action", "Adventure", "Comedy", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "Guardians of the Galaxy Vol. 3", year: 2023, genres: ["Action", "Adventure", "Comedy", "Drama", "Sci-Fi"], popularity: 4 },
  { title: "The Flash", year: 2023, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 3 },
  { title: "Blue Beetle", year: 2023, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 2 },
  { title: "The Marvels", year: 2023, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 2 },
  { title: "Aquaman and the Lost Kingdom", year: 2023, genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], popularity: 3 },
  { title: "Dune: Part Two", year: 2024, genres: ["Action", "Adventure", "Drama", "Sci-Fi"], popularity: 5 },

  // Sports Films
  { title: "Rocky", year: 1976, genres: ["Drama", "Sport"], popularity: 5 },
  { title: "Hoosiers", year: 1986, genres: ["Drama", "Sport"], popularity: 3 },
  { title: "Bull Durham", year: 1988, genres: ["Comedy", "Romance", "Sport"], popularity: 3 },
  { title: "Field of Dreams", year: 1989, genres: ["Drama", "Family", "Fantasy", "Sport"], popularity: 4 },
  { title: "A League of Their Own", year: 1992, genres: ["Comedy", "Drama", "Family", "Sport"], popularity: 4 },
  { title: "Rudy", year: 1993, genres: ["Biography", "Drama", "Sport"], popularity: 4 },
  { title: "Hoop Dreams", year: 1994, genres: ["Documentary", "Drama", "Sport"], popularity: 3 },
  { title: "Jerry Maguire", year: 1996, genres: ["Comedy", "Drama", "Romance", "Sport"], popularity: 4 },
  { title: "Remember the Titans", year: 2000, genres: ["Biography", "Drama", "Sport"], popularity: 4 },
  { title: "Miracle", year: 2004, genres: ["Biography", "Drama", "History", "Sport"], popularity: 3 },
  { title: "Cinderella Man", year: 2005, genres: ["Biography", "Drama", "History", "Romance", "Sport"], popularity: 3 },
  { title: "The Blind Side", year: 2009, genres: ["Biography", "Drama", "Sport"], popularity: 4 },
  { title: "Warrior", year: 2011, genres: ["Action", "Drama", "Sport"], popularity: 4 },
  { title: "Rush", year: 2013, genres: ["Action", "Biography", "Drama", "Sport"], popularity: 4 },
  { title: "Creed", year: 2015, genres: ["Drama", "Sport"], popularity: 4 },
  { title: "I, Tonya", year: 2017, genres: ["Biography", "Comedy", "Drama", "Sport"], popularity: 3 },
  { title: "The Way Back", year: 2020, genres: ["Drama", "Sport"], popularity: 3 },
  { title: "Hustle", year: 2022, genres: ["Comedy", "Drama", "Sport"], popularity: 3 },
  { title: "Air", year: 2023, genres: ["Drama", "Sport"], popularity: 3 },

  // Fantasy (non-animated, non-superhero where possible)
  { title: "The NeverEnding Story", year: 1984, genres: ["Adventure", "Drama", "Family", "Fantasy"], popularity: 4 },
  { title: "Legend", year: 1985, genres: ["Adventure", "Fantasy", "Romance"], popularity: 3 },
  { title: "Labyrinth", year: 1986, genres: ["Adventure", "Family", "Fantasy", "Musical"], popularity: 4 },
  { title: "Willow", year: 1988, genres: ["Action", "Adventure", "Drama", "Fantasy", "Romance"], popularity: 3 },
  { title: "Edward Scissorhands", year: 1990, genres: ["Drama", "Fantasy", "Romance"], popularity: 5 },
  { title: "Hook", year: 1991, genres: ["Adventure", "Comedy", "Family", "Fantasy"], popularity: 4 },
  { title: "Dragonheart", year: 1996, genres: ["Action", "Adventure", "Drama", "Fantasy"], popularity: 3 },
  { title: "Stardust", year: 2007, genres: ["Adventure", "Family", "Fantasy", "Romance"], popularity: 4 },
  { title: "The Golden Compass", year: 2007, genres: ["Adventure", "Family", "Fantasy"], popularity: 3 },
  { title: "Where the Wild Things Are", year: 2009, genres: ["Adventure", "Drama", "Family", "Fantasy"], popularity: 3 },
  { title: "Alice in Wonderland", year: 2010, genres: ["Adventure", "Family", "Fantasy"], popularity: 4 }, // Tim Burton
  { title: "The Hobbit: An Unexpected Journey", year: 2012, genres: ["Adventure", "Fantasy"], popularity: 4 },
  { title: "Maleficent", year: 2014, genres: ["Action", "Adventure", "Family", "Fantasy", "Romance"], popularity: 4 },
  // { title: "Cinderella", year: 2015, genres: ["Drama", "Family", "Fantasy", "Romance"], popularity: 4 }, // Live-action - already listed
  { title: "Fantastic Beasts and Where to Find Them", year: 2016, genres: ["Adventure", "Family", "Fantasy"], popularity: 4 },
  { title: "A Monster Calls", year: 2016, genres: ["Drama", "Fantasy"], popularity: 3 },
  { title: "Dungeons & Dragons: Honor Among Thieves", year: 2023, genres: ["Action", "Adventure", "Comedy", "Fantasy"], popularity: 4 },
  { title: "Wonka", year: 2023, genres: ["Adventure", "Comedy", "Family", "Fantasy", "Musical"], popularity: 4 },

  // Adding ~50 more obscure or niche films (popularity 1-2)
  { title: "Man Bites Dog", year: 1992, genres: ["Comedy", "Crime", "Drama"], popularity: 2 }, // Belgium
  { title: "Dead Man's Shoes", year: 2004, genres: ["Crime", "Drama", "Thriller"], popularity: 2 }, // UK
  { title: "Kontroll", year: 2003, genres: ["Comedy", "Crime", "Drama", "Mystery", "Thriller"], popularity: 1 }, // Hungary
  { title: "The Bothersome Man", year: 2006, genres: ["Comedy", "Drama", "Fantasy", "Mystery"], popularity: 1 }, // Norway
  { title: "Adam's Apples", year: 2005, genres: ["Comedy", "Crime", "Drama"], popularity: 1 }, // Denmark
  { title: "Headhunters", year: 2011, genres: ["Action", "Crime", "Drama", "Thriller"], popularity: 2 }, // Norway
  { title: "Dogtooth", year: 2009, genres: ["Drama", "Thriller"], popularity: 2 }, // Greece
  { title: "Trollhunter", year: 2010, genres: ["Action", "Adventure", "Drama", "Fantasy", "Horror", "Mystery", "Thriller"], popularity: 2 }, // Norway
  { title: "Sound of My Voice", year: 2011, genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "Another Earth", year: 2011, genres: ["Drama", "Romance", "Sci-Fi"], popularity: 2 },
  { title: "Compliance", year: 2012, genres: ["Crime", "Drama", "Thriller"], popularity: 1 },
  { title: "Upstream Color", year: 2013, genres: ["Drama", "Romance", "Sci-Fi"], popularity: 1 },
  { title: "Coherence", year: 2013, genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "Blue Ruin", year: 2013, genres: ["Crime", "Drama", "Thriller"], popularity: 2 },
  { title: "The One I Love", year: 2014, genres: ["Comedy", "Drama", "Romance", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "A Girl Walks Home Alone at Night", year: 2014, genres: ["Drama", "Horror", "Romance"], popularity: 2 }, // Iran/US
  { title: "The Invitation", year: 2015, genres: ["Horror", "Thriller"], popularity: 2 },
  { title: "Krisha", year: 2015, genres: ["Drama"], popularity: 1 },
  { title: "Swiss Army Man", year: 2016, genres: ["Adventure", "Comedy", "Drama", "Fantasy", "Romance"], popularity: 2 },
  { title: "Raw", year: 2016, genres: ["Drama", "Horror"], popularity: 2 }, // France/Belgium
  { title: "The Killing of a Sacred Deer", year: 2017, genres: ["Drama", "Horror", "Mystery", "Thriller"], popularity: 2 },
  { title: "Thoroughbreds", year: 2017, genres: ["Comedy", "Drama", "Thriller"], popularity: 2 },
  { title: "Sorry to Bother You", year: 2018, genres: ["Comedy", "Drama", "Fantasy", "Sci-Fi"], popularity: 2 },
  { title: "Border", year: 2018, genres: ["Drama", "Fantasy", "Mystery", "Romance", "Thriller"], popularity: 1 }, // Sweden
  { title: "Climax", year: 2018, genres: ["Drama", "Horror", "Music", "Thriller"], popularity: 1 }, // France
  { title: "The Vast of Night", year: 2019, genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "Bacurau", year: 2019, genres: ["Action", "Adventure", "Drama", "Mystery", "Sci-Fi", "Thriller", "Western"], popularity: 1 }, // Brazil
  { title: "She Dies Tomorrow", year: 2020, genres: ["Comedy", "Drama", "Horror", "Mystery", "Thriller"], popularity: 1 },
  { title: "Possessor", year: 2020, genres: ["Crime", "Horror", "Mystery", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "Titane", year: 2021, genres: ["Drama", "Horror", "Sci-Fi", "Thriller"], popularity: 2 }, // France/Belgium
  { title: "Lamb", year: 2021, genres: ["Drama", "Fantasy", "Horror", "Mystery"], popularity: 2 }, // Iceland
  { title: "We're All Going to the World's Fair", year: 2021, genres: ["Drama", "Horror"], popularity: 1 },
  { title: "X", year: 2022, genres: ["Horror", "Mystery", "Thriller"], popularity: 2 },
  { title: "Pearl", year: 2022, genres: ["Drama", "Horror", "Thriller"], popularity: 2 },
  { title: "Infinity Pool", year: 2023, genres: ["Crime", "Horror", "Mystery", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "Beau Is Afraid", year: 2023, genres: ["Adventure", "Comedy", "Drama", "Horror", "Mystery"], popularity: 2 },
  { title: "The Reflecting Skin", year: 1990, genres: ["Drama", "Fantasy", "Horror", "Mystery", "Thriller"], popularity: 1 },
  { title: "Tetsuo: The Iron Man", year: 1989, genres: ["Horror", "Sci-Fi"], popularity: 1 }, // Japan
  { title: "Taxidermia", year: 2006, genres: ["Comedy", "Drama", "Horror"], popularity: 1 }, // Hungary
  { title: "Holy Mountain", year: 1973, genres: ["Adventure", "Drama", "Fantasy"], popularity: 2 }, // Mexico
  { title: "Valerie and Her Week of Wonders", year: 1970, genres: ["Drama", "Fantasy", "Horror", "Mystery", "Romance"], popularity: 1 }, // Czechoslovakia
  { title: "Hausu (House)", year: 1977, genres: ["Comedy", "Fantasy", "Horror", "Mystery"], popularity: 2 }, // Japan
  { title: "Repo Man", year: 1984, genres: ["Action", "Comedy", "Crime", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "Withnail & I", year: 1987, genres: ["Comedy", "Drama"], popularity: 2 }, // UK
  { title: "Naked Lunch", year: 1991, genres: ["Drama", "Fantasy"], popularity: 2 },
  { title: "Clean, Shaven", year: 1993, genres: ["Drama", "Thriller"], popularity: 1 },
  { title: "Gummo", year: 1997, genres: ["Drama"], popularity: 1 },
  { title: "Pi", year: 1998, genres: ["Drama", "Horror", "Mystery", "Sci-Fi", "Thriller"], popularity: 2 },
  { title: "Antichrist", year: 2009, genres: ["Drama", "Horror"], popularity: 2 }, // Denmark
  { title: "Enter the Void", year: 2009, genres: ["Drama", "Fantasy"], popularity: 1 }, // France

  // Adding ~100 more films, aiming for mix of popular and some variety
  { title: "Gremlins", year: 1984, genres: ["Comedy", "Fantasy", "Horror"], popularity: 4 },
  { title: "Beetlejuice", year: 1988, genres: ["Comedy", "Fantasy"], popularity: 4 },
  { title: "Who Framed Roger Rabbit", year: 1988, genres: ["Animation", "Adventure", "Comedy", "Crime", "Family", "Fantasy", "Mystery"], popularity: 4 },
  { title: "Twister", year: 1996, genres: ["Action", "Adventure", "Drama", "Thriller"], popularity: 4 },
  { title: "Independence Day", year: 1996, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 5 },
  { title: "Men in Black", year: 1997, genres: ["Action", "Adventure", "Comedy", "Sci-Fi"], popularity: 5 },
  { title: "The Fifth Element", year: 1997, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "Armageddon", year: 1998, genres: ["Action", "Adventure", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "The Mummy", year: 1999, genres: ["Action", "Adventure", "Fantasy", "Horror"], popularity: 4 },
  { title: "X-Men", year: 2000, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 5 },
  { title: "Ocean's Eleven", year: 2001, genres: ["Crime", "Thriller"], popularity: 5 },
  { title: "Signs", year: 2002, genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Catch Me If You Can", year: 2002, genres: ["Biography", "Crime", "Drama"], popularity: 5 },
  { title: "Bruce Almighty", year: 2003, genres: ["Comedy", "Drama", "Fantasy"], popularity: 4 },
  { title: "Elf", year: 2003, genres: ["Adventure", "Comedy", "Family", "Fantasy", "Romance"], popularity: 5 },
  { title: "National Treasure", year: 2004, genres: ["Action", "Adventure", "Family", "Mystery", "Thriller"], popularity: 4 },
  { title: "The Incredibles", year: 2004, genres: ["Animation", "Action", "Adventure", "Family", "Sci-Fi"], popularity: 5 },
  { title: "Batman Begins", year: 2005, genres: ["Action", "Crime", "Drama", "Thriller"], popularity: 5 },
  { title: "Mr. & Mrs. Smith", year: 2005, genres: ["Action", "Comedy", "Crime", "Romance", "Thriller"], popularity: 4 },
  { title: "Cars", year: 2006, genres: ["Animation", "Adventure", "Comedy", "Family", "Sport"], popularity: 5 },
  { title: "The Prestige", year: 2006, genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"], popularity: 5 },
  { title: "300", year: 2006, genres: ["Action", "Drama", "Fantasy", "War"], popularity: 4 },
  { title: "I Am Legend", year: 2007, genres: ["Action", "Drama", "Horror", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Enchanted", year: 2007, genres: ["Animation", "Comedy", "Family", "Fantasy", "Musical", "Romance"], popularity: 4 },
  { title: "Knocked Up", year: 2007, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "Forgetting Sarah Marshall", year: 2008, genres: ["Comedy", "Drama", "Music", "Romance"], popularity: 4 },
  { title: "Pineapple Express", year: 2008, genres: ["Action", "Comedy", "Crime"], popularity: 4 },
  { title: "Tropic Thunder", year: 2008, genres: ["Action", "Comedy", "War"], popularity: 4 },
  { title: "Star Trek", year: 2009, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 5 }, // JJ Abrams reboot
  { title: "Zombieland", year: 2009, genres: ["Adventure", "Comedy", "Horror", "Sci-Fi"], popularity: 4 },
  { title: "Sherlock Holmes", year: 2009, genres: ["Action", "Adventure", "Crime", "Mystery", "Thriller"], popularity: 4 }, // RDJ version
  { title: "Despicable Me", year: 2010, genres: ["Animation", "Adventure", "Comedy", "Family", "Sci-Fi"], popularity: 5 },
  { title: "Kick-Ass", year: 2010, genres: ["Action", "Comedy", "Crime"], popularity: 4 },
  { title: "Easy A", year: 2010, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "X-Men: First Class", year: 2011, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "The Muppets", year: 2011, genres: ["Adventure", "Comedy", "Family", "Musical"], popularity: 3 },
  { title: "Crazy, Stupid, Love.", year: 2011, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "Ted", year: 2012, genres: ["Comedy", "Fantasy"], popularity: 4 },
  { title: "Pitch Perfect", year: 2012, genres: ["Comedy", "Music", "Romance"], popularity: 4 },
  { title: "Man of Steel", year: 2013, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "World War Z", year: 2013, genres: ["Action", "Adventure", "Horror", "Sci-Fi"], popularity: 4 },
  { title: "Frozen", year: 2013, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy", "Musical"], popularity: 5 },
  { title: "The Lego Movie", year: 2014, genres: ["Animation", "Action", "Adventure", "Comedy", "Family", "Fantasy"], popularity: 5 },
  { title: "Big Hero 6", year: 2014, genres: ["Animation", "Action", "Adventure", "Comedy", "Family", "Sci-Fi"], popularity: 5 },
  { title: "Fury", year: 2014, genres: ["Action", "Drama", "War"], popularity: 4 },
  { title: "Ant-Man", year: 2015, genres: ["Action", "Adventure", "Comedy", "Sci-Fi"], popularity: 4 },
  { title: "Straight Outta Compton", year: 2015, genres: ["Biography", "Drama", "History", "Music"], popularity: 4 },
  { title: "The Jungle Book", year: 2016, genres: ["Adventure", "Drama", "Family", "Fantasy"], popularity: 4 }, // Live-action/CGI
  { title: "Moana", year: 2016, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy", "Musical"], popularity: 5 },
  { title: "Baby Driver", year: 2017, genres: ["Action", "Crime", "Drama", "Music", "Thriller"], popularity: 4 },
  { title: "It", year: 2017, genres: ["Horror"], popularity: 5 },
  { title: "Murder on the Orient Express", year: 2017, genres: ["Crime", "Drama", "Mystery"], popularity: 4 }, // Branagh version
  { title: "Ready Player One", year: 2018, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "Ocean's Eight", year: 2018, genres: ["Action", "Comedy", "Crime", "Thriller"], popularity: 3 },
  { title: "Alita: Battle Angel", year: 2019, genres: ["Action", "Adventure", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "Glass", year: 2019, genres: ["Drama", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "The Gentlemen", year: 2019, genres: ["Action", "Comedy", "Crime"], popularity: 4 },
  { title: "Onward", year: 2020, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy"], popularity: 4 },
  { title: "Free Guy", year: 2021, genres: ["Action", "Adventure", "Comedy", "Fantasy", "Sci-Fi"], popularity: 4 },
  { title: "Luca", year: 2021, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy"], popularity: 4 },
  { title: "Ghostbusters: Afterlife", year: 2021, genres: ["Adventure", "Comedy", "Fantasy", "Sci-Fi"], popularity: 4 },
  { title: "Uncharted", year: 2022, genres: ["Action", "Adventure"], popularity: 4 },
  { title: "Bullet Train", year: 2022, genres: ["Action", "Comedy", "Thriller"], popularity: 4 },
  { title: "The Super Mario Bros. Movie", year: 2023, genres: ["Animation", "Adventure", "Comedy", "Family", "Fantasy"], popularity: 5 },
  { title: "Creed III", year: 2023, genres: ["Drama", "Sport"], popularity: 4 },
  { title: "John Wick: Chapter 4", year: 2023, genres: ["Action", "Crime", "Thriller"], popularity: 5 },
  { title: "The Creator", year: 2023, genres: ["Action", "Adventure", "Drama", "Sci-Fi", "Thriller"], popularity: 3 },
  { title: "Rebel Moon - Part One: A Child of Fire", year: 2023, genres: ["Action", "Adventure", "Drama", "Fantasy", "Sci-Fi"], popularity: 2 },
  { title: "The Killer", year: 2023, genres: ["Action", "Adventure", "Crime", "Drama", "Mystery", "Thriller"], popularity: 3 }, // Fincher
  { title: "Saltburn", year: 2023, genres: ["Comedy", "Drama", "Thriller"], popularity: 3 },
  { title: "May December", year: 2023, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "Ferrari", year: 2023, genres: ["Biography", "Drama", "Sport"], popularity: 2 },
  { title: "Anyone but You", year: 2023, genres: ["Comedy", "Romance"], popularity: 3 },
  // { title: "Mean Girls", year: 2024, genres: ["Comedy", "Musical"], popularity: 3 }, // New musical version - already listed with 2004
  { title: "The Beekeeper", year: 2024, genres: ["Action", "Thriller"], popularity: 3 },
  { title: "Bob Marley: One Love", year: 2024, genres: ["Biography", "Drama", "Music"], popularity: 3 },
  { title: "Madame Web", year: 2024, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 1 },
  { title: "Ghostbusters: Frozen Empire", year: 2024, genres: ["Adventure", "Comedy", "Fantasy", "Sci-Fi"], popularity: 3 },
  { title: "Kung Fu Panda 4", year: 2024, genres: ["Animation", "Action", "Adventure", "Comedy", "Family"], popularity: 4 },
  { title: "Godzilla x Kong: The New Empire", year: 2024, genres: ["Action", "Adventure", "Sci-Fi", "Thriller"], popularity: 4 },
  { title: "Civil War", year: 2024, genres: ["Action", "Drama", "Thriller"], popularity: 4 },
  { title: "The Fall Guy", year: 2024, genres: ["Action", "Comedy", "Drama", "Thriller"], popularity: 4 },
  { title: "Kingdom of the Planet of the Apes", year: 2024, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "IF", year: 2024, genres: ["Animation", "Comedy", "Drama", "Family", "Fantasy"], popularity: 3 },
  { title: "Furiosa: A Mad Max Saga", year: 2024, genres: ["Action", "Adventure", "Sci-Fi"], popularity: 4 },
  { title: "Bad Boys: Ride or Die", year: 2024, genres: ["Action", "Adventure", "Comedy", "Crime", "Thriller"], popularity: 4 },
  { title: "Inside Out 2", year: 2024, genres: ["Animation", "Adventure", "Comedy", "Drama", "Family", "Fantasy"], popularity: 5 },

  // Rounding out with some more classics and variety
  { title: "Ben-Hur", year: 1959, genres: ["Adventure", "Drama", "History"], popularity: 4 },
  { title: "Spartacus", year: 1960, genres: ["Adventure", "Biography", "Drama", "History", "War"], popularity: 4 },
  { title: "To Kill a Mockingbird", year: 1962, genres: ["Crime", "Drama"], popularity: 5 },
  { title: "The Graduate", year: 1967, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "Midnight Cowboy", year: 1969, genres: ["Drama"], popularity: 3 },
  { title: "Patton", year: 1970, genres: ["Biography", "Drama", "War"], popularity: 3 },
  { title: "American Graffiti", year: 1973, genres: ["Comedy", "Drama"], popularity: 4 },
  { title: "Sophie's Choice", year: 1982, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "The Right Stuff", year: 1983, genres: ["Adventure", "Biography", "Drama", "History"], popularity: 3 },
  { title: "Beverly Hills Cop", year: 1984, genres: ["Action", "Comedy", "Crime"], popularity: 4 },
  { title: "Top Gun", year: 1986, genres: ["Action", "Drama", "Romance"], popularity: 5 },
  { title: "Broadcast News", year: 1987, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Wall Street", year: 1987, genres: ["Crime", "Drama"], popularity: 4 },
  { title: "Working Girl", year: 1988, genres: ["Comedy", "Drama", "Romance"], popularity: 3 },
  { title: "Glory", year: 1989, genres: ["Biography", "Drama", "History", "War"], popularity: 4 },
  { title: "Thelma & Louise", year: 1991, genres: ["Adventure", "Crime", "Drama"], popularity: 4 },
  { title: "Boyz n the Hood", year: 1991, genres: ["Crime", "Drama"], popularity: 4 },
  { title: "Malcolm X", year: 1992, genres: ["Biography", "Drama", "History"], popularity: 4 },
  { title: "What's Eating Gilbert Grape", year: 1993, genres: ["Drama"], popularity: 4 },
  { title: "Legends of the Fall", year: 1994, genres: ["Drama", "Romance", "War", "Western"], popularity: 4 },
  { title: "Sling Blade", year: 1996, genres: ["Drama"], popularity: 3 },
  { title: "As Good as It Gets", year: 1997, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "The Truman Show", year: 1998, genres: ["Comedy", "Drama", "Sci-Fi"], popularity: 5 },
  { title: "Erin Brockovich", year: 2000, genres: ["Biography", "Drama"], popularity: 4 },
  { title: "Snatch", year: 2000, genres: ["Comedy", "Crime"], popularity: 4 },
  { title: "Donnie Brasco", year: 1997, genres: ["Biography", "Crime", "Drama"], popularity: 4 },
  { title: "Lock, Stock and Two Smoking Barrels", year: 1998, genres: ["Action", "Comedy", "Crime"], popularity: 4 },
  { title: "Gangs of New York", year: 2002, genres: ["Crime", "Drama"], popularity: 4 },
  { title: "Road to Perdition", year: 2002, genres: ["Crime", "Drama", "Thriller"], popularity: 3 },
  { title: "Big Fish", year: 2003, genres: ["Adventure", "Drama", "Fantasy", "Romance"], popularity: 4 },
  { title: "Hotel Rwanda", year: 2004, genres: ["Biography", "Drama", "History", "War"], popularity: 3 },
  { title: "Walk the Line", year: 2005, genres: ["Biography", "Drama", "Music", "Romance"], popularity: 4 },
  { title: "Babel", year: 2006, genres: ["Drama"], popularity: 3 },
  { title: "Into the Wild", year: 2007, genres: ["Adventure", "Biography", "Drama"], popularity: 4 },
  { title: "The Reader", year: 2008, genres: ["Drama", "Romance"], popularity: 3 },
  { title: "Up in the Air", year: 2009, genres: ["Comedy", "Drama", "Romance"], popularity: 4 },
  { title: "127 Hours", year: 2010, genres: ["Adventure", "Biography", "Drama", "Thriller"], popularity: 4 },
  { title: "The Descendants", year: 2011, genres: ["Comedy", "Drama"], popularity: 3 },
  { title: "Mud", year: 2012, genres: ["Adventure", "Crime", "Drama", "Romance"], popularity: 3 },
  { title: "Foxcatcher", year: 2014, genres: ["Biography", "Drama", "Sport", "Thriller"], popularity: 3 },
  { title: "The Post", year: 2017, genres: ["Biography", "Drama", "History", "Thriller"], popularity: 3 },
  { title: "Can You Ever Forgive Me?", year: 2018, genres: ["Biography", "Comedy", "Crime", "Drama"], popularity: 3 },
  // { title: "tick, tick...BOOM!", year: 2021, genres: ["Biography", "Drama", "Musical"], popularity: 3 }, // Alt spelling already present
  { title: "The Whale", year: 2022, genres: ["Drama"], popularity: 3 },

];

export type MovieDifficulty = "easy" | "medium" | "hard";

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
    return parseInt(a.substring(0,4)) - parseInt(b.substring(0,4));
  });
  return ["All Decades", ...uniqueSortedDecades];
};

export interface MovieFilters {
  genre?: string; 
  decade?: number; 
  excludeTitles?: string[]; // Changed from excludeTitle to excludeTitles
  difficulty?: MovieDifficulty; 
}

// Helper for consistent title comparison
const normalizeTitleForComparison = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric except spaces
    .replace(/\s+/g, " ")       // Normalize multiple spaces to one
    .trim();
};


export function getRandomMovie(filters: MovieFilters): Movie | null {
  let baseMovies = allMovies;

  // Apply exclusion filter first
  if (filters.excludeTitles && filters.excludeTitles.length > 0) {
    const excludeSet = new Set(filters.excludeTitles.map(t => normalizeTitleForComparison(t)));
    baseMovies = baseMovies.filter(movie => !excludeSet.has(normalizeTitleForComparison(movie.title)));
  }

  if (baseMovies.length === 0) {
    return null; // All potential movies were excluded or no movies to begin with
  }

  let selectableMovies = baseMovies;

  const hasGenreFilter = filters.genre && filters.genre !== "All Genres";
  const hasDecadeFilter = filters.decade !== undefined;
  const hasDifficultyFilter = filters.difficulty !== undefined;

  if (hasGenreFilter) {
    selectableMovies = selectableMovies.filter(m => m.genres.includes(filters.genre!));
  }

  if (hasDecadeFilter) {
    selectableMovies = selectableMovies.filter(m => getDecadeForMovie(m.year) === filters.decade!);
  }
  
  // Store movies matching genre/decade (these already respect exclusions via baseMovies)
  const moviesMatchingPrimaryFilters = selectableMovies.slice();

  if (hasDifficultyFilter) {
    let difficultyFilteredMovies: Movie[] = [];
    switch (filters.difficulty) {
      case "easy":
        difficultyFilteredMovies = selectableMovies.filter(m => m.popularity === 5);
        break;
      case "medium":
        difficultyFilteredMovies = selectableMovies.filter(m => m.popularity === 3 || m.popularity === 4);
        break;
      case "hard":
        difficultyFilteredMovies = selectableMovies.filter(m => m.popularity === 1 || m.popularity === 2);
        break;
    }

    if (difficultyFilteredMovies.length > 0) {
      selectableMovies = difficultyFilteredMovies;
    } else if (moviesMatchingPrimaryFilters.length > 0) {
      // Fallback: If current filters + difficulty yield no results,
      // use movies that matched primary filters (genre/decade) from the already excluded list.
      // This effectively ignores/broadens the difficulty if specific difficulty yields no results.
      selectableMovies = moviesMatchingPrimaryFilters;
    } else {
      // No movies matched even primary filters (genre/decade) after initial exclusions.
      return null; 
    }
  } else {
      // No difficulty filter applied, selectableMovies are those matching genre/decade (and exclusions)
      if (selectableMovies.length === 0) return null;
  }
  
  if (selectableMovies.length === 0) {
    return null; 
  }

  const randomIndex = Math.floor(Math.random() * selectableMovies.length);
  return selectableMovies[randomIndex];
}


// Ensure all movies have a default popularity if undefined & de-duplicate
movies.forEach(movie => {
  if (movie.popularity === undefined) {
    movie.popularity = 3; // Default popularity
  }
});

const titles = new Set<string>();
const uniqueMovies: Movie[] = [];
movies.forEach(movie => {
  const normalizedTitle = normalizeTitleForComparison(movie.title);
  if (!titles.has(normalizedTitle)) {
    titles.add(normalizedTitle);
    uniqueMovies.push(movie);
  } else {
    // Optional: Log duplicate titles if needed during development
    // console.log(`Duplicate movie title removed: ${movie.title}`);
  }
});

export const allMovies: Movie[] = uniqueMovies;
