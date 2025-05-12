
import requests
import json
import os
import time
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
MAX_PAGES_TO_FETCH = 25 # TMDb allows up to 500 pages. 25 pages * 20 movies/page = 500 movies.
                        # Increase for more movies, e.g., 50 pages for ~1000 movies. Max practical is 500.

def fetch_movies(sort_by="popularity.desc", page=1, year_gte=None, year_lte=None):
    """Fetches movies from TMDb, sorted by the specified criteria."""
    base_url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "sort_by": sort_by,
        "page": page,
        "include_adult": "false",
        "vote_count.gte": 50, # Filter out movies with very few votes
        "language": "en-US" # Focus on English language movies for broader relevance
    }
    if year_gte:
        params["primary_release_date.gte"] = f"{year_gte}-01-01"
    if year_lte:
        params["primary_release_date.lte"] = f"{year_lte}-12-31"

    print(f"Fetching page {page} with params: {params}")
    response = requests.get(base_url, params=params)
    
    if response.status_code == 429: # Rate limit exceeded
        print("Rate limit exceeded. Waiting for 10 seconds...")
        time.sleep(10)
        response = requests.get(base_url, params=params) # Retry once

    response.raise_for_status()
    return response.json()

def fetch_movie_genres():
    """Fetches the official genre list from TMDb."""
    url = f"https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US"
    response = requests.get(url)
    response.raise_for_status()
    genres_data = response.json()
    return {genre['id']: genre['name'] for genre in genres_data['genres']}

def assign_difficulty(movie):
    """Assigns difficulty level based on vote_count."""
    vote_count = movie.get("vote_count", 0)
    # These thresholds are examples and might need adjustment based on the desired distribution.
    if vote_count > 10000: # Very popular, broadly known (e.g., major blockbusters, highly acclaimed classics)
        return "easy"
    elif vote_count > 2000: # Well-known, but perhaps not universally (e.g., successful mainstream films, cult classics)
        return "medium"
    else: # Less known, more niche (e.g., indie films, older or less globally recognized films)
        return "hard"

def process_movies(movies_results, genre_map):
    """Processes the movie data, assigning difficulty and extracting relevant info."""
    processed_movies = []
    for movie in movies_results:
        # Ensure basic data like title and release date exists
        if not movie.get("title") or not movie.get("release_date"):
            continue
        
        # Skip if release year is not parsable or before 1940
        try:
            release_year = int(movie.get("release_date")[:4])
            if release_year < 1940: # Optional: filter out very old movies if desired
                continue
        except ValueError:
            continue # Skip if year is not a valid number

        difficulty = assign_difficulty(movie)
        genre_ids = movie.get("genre_ids", [])
        genre_names = [genre_map.get(gid) for gid in genre_ids if genre_map.get(gid)]

        processed_movie = {
            "title": movie.get("title"),
            "year": release_year,
            "genres": genre_names,
            "popularity": movie.get("vote_count"), # Using vote_count as the popularity metric
            "difficulty": difficulty,
        }
        processed_movies.append(processed_movie)
    return processed_movies

def main():
    if not TMDB_API_KEY:
        print("Error: TMDB_API_KEY not found in .env file or environment variables.")
        print("Please create a .env file in the project root with TMDB_API_KEY='your_key_here'")
        return

    print("Fetching genre map...")
    try:
        genre_map = fetch_movie_genres()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching genre map: {e}")
        return
    
    all_movies_processed = []
    fetched_titles_years = set() # To avoid duplicates based on title and year

    # Define year ranges to ensure coverage, can be adjusted
    year_segments = [
        (1940, 1969),
        (1970, 1989),
        (1990, 1999),
        (2000, 2009),
        (2010, 2019),
        (2020, None) # None for lte means up to current date
    ]
    
    # Fetching mostly by popularity, but ensuring some date coverage
    # For a more diverse set by date, you might use "primary_release_date.desc" or iterate through year_segments
    sort_by_options = ["popularity.desc"] 

    for sort_by in sort_by_options:
        for year_gte, year_lte in year_segments:
            print(f"\nFetching movies sorted by {sort_by}, years {year_gte}-{year_lte or 'current'}...")
            page_for_this_segment = 1
            # Limit pages per segment to avoid over-fetching from one segment due to MAX_PAGES_TO_FETCH overall
            max_pages_per_segment = MAX_PAGES_TO_FETCH // len(year_segments) if len(year_segments) > 0 else MAX_PAGES_TO_FETCH
            max_pages_per_segment = max(1, max_pages_per_segment) # Ensure at least 1 page fetch attempt

            while page_for_this_segment <= max_pages_per_segment:
                try:
                    print(f"Attempting to fetch page {page_for_this_segment} for sort {sort_by}, years {year_gte}-{year_lte or 'current'}")
                    data = fetch_movies(sort_by=sort_by, page=page_for_this_segment, year_gte=year_gte, year_lte=year_lte)
                    movies_on_page = data.get("results", [])
                    
                    if not movies_on_page:
                        print(f"No more movies found for this segment/page. Moving to next segment or finishing.")
                        break 

                    processed_page_movies = process_movies(movies_on_page, genre_map)
                    
                    new_movies_added_count = 0
                    for movie in processed_page_movies:
                        movie_key = (movie["title"].lower(), movie["year"])
                        if movie_key not in fetched_titles_years:
                            all_movies_processed.append(movie)
                            fetched_titles_years.add(movie_key)
                            new_movies_added_count +=1
                    
                    print(f"Fetched page {page_for_this_segment}. Added {new_movies_added_count} new unique movies. Total unique movies: {len(all_movies_processed)}")

                    # Check if we've reached the total_pages for this specific query
                    if page_for_this_segment >= data.get("total_pages", page_for_this_segment):
                         print(f"Reached total pages ({data.get('total_pages')}) for this segment.")
                         break
                    
                    page_for_this_segment += 1
                    time.sleep(0.25) # Brief pause to be nice to the API

                except requests.exceptions.RequestException as e:
                    response_obj = e.response # Store response object if available
                    print(f"Error fetching page {page_for_this_segment} for segment: {e}")
                    if response_obj is not None and response_obj.status_code == 429:
                        print("Rate limit likely hit. Waiting 30 seconds...")
                        time.sleep(30)
                    else:
                        print("Skipping to next page/segment due to non-rate-limit error.")
                    break 
                except Exception as e:
                    print(f"An unexpected error occurred on page {page_for_this_segment} for segment: {e}")
                    break
            
            if len(all_movies_processed) >= MAX_PAGES_TO_FETCH * 20: # Rough estimate, stop if we have enough movies
                print(f"Reached a good number of movies ({len(all_movies_processed)}). Stopping fetch.")
                break
        if len(all_movies_processed) >= MAX_PAGES_TO_FETCH * 20:
            break


    # Sort movies into difficulty categories
    easy_movies = [movie for movie in all_movies_processed if movie["difficulty"] == "easy"]
    medium_movies = [movie for movie in all_movies_processed if movie["difficulty"] == "medium"]
    hard_movies = [movie for movie in all_movies_processed if movie["difficulty"] == "hard"]

    # Print counts
    print(f"\n--- Final Counts ---")
    print(f"Total unique movies fetched: {len(all_movies_processed)}")
    print(f"Easy movies count: {len(easy_movies)}")
    print(f"Medium movies count: {len(medium_movies)}")
    print(f"Hard movies count: {len(hard_movies)}")

    # Export to JSON
    output_data = {
        "easy": easy_movies,
        "medium": medium_movies,
        "hard": hard_movies,
    }

    # Output to root directory, user will move it to src/data/
    output_filename = "tmdb_movies.json" 
    
    try:
        with open(output_filename, "w", encoding='utf-8') as outfile:
            json.dump(output_data, outfile, indent=4, ensure_ascii=False)
        print(f"Movie data successfully exported to {output_filename}")
    except IOError as e:
        print(f"Error writing to file {output_filename}: {e}")

if __name__ == "__main__":
    main()
