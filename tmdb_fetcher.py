
import requests
import json
import os
import time
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
MAX_PAGES_TO_FETCH = 25 # TMDb allows up to 500 pages, but fetching all can take a while and might hit rate limits.
                        # Adjust this value based on how many movies you want. 25 pages * 20 movies/page = 500 movies.
                        # Max practical is 500 pages for ~10,000 movies.

def fetch_movies(sort_by="popularity.desc", page=1, year_gte=None, year_lte=None):
    """Fetches movies from TMDb, sorted by the specified criteria."""
    base_url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "sort_by": sort_by,
        "page": page,
        "include_adult": "false",
        "vote_count.gte": 50, # Filter out movies with very few votes
        "language": "en-US"
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

    response.raise_for_status()  # Raise an exception for other bad status codes
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
    # These thresholds might need adjustment after seeing the data distribution
    if vote_count > 10000: # Very popular, broadly known
        return "easy"
    elif vote_count > 2000: # Well-known, but perhaps not universally
        return "medium"
    else: # Less known, more niche
        return "hard"

def process_movies(movies_results, genre_map):
    """Processes the movie data, assigning difficulty and extracting relevant info."""
    processed_movies = []
    for movie in movies_results:
        if not movie.get("title") or not movie.get("release_date"): # Skip movies without title or release date
            continue

        difficulty = assign_difficulty(movie)
        genre_ids = movie.get("genre_ids", [])
        genre_names = [genre_map.get(gid) for gid in genre_ids if genre_map.get(gid)]

        processed_movie = {
            "title": movie.get("title"),
            "year": int(movie.get("release_date")[:4]),
            "genres": genre_names,
            "popularity": movie.get("vote_count"), # Using vote_count as the popularity metric
            "difficulty": difficulty,
        }
        processed_movies.append(processed_movie)
    return processed_movies

def main():
    if not TMDB_API_KEY:
        print("Error: TMDB_API_KEY not found in .env file or environment variables.")
        print("Please create a .env file with TMDB_API_KEY='your_key_here'")
        return

    print("Fetching genre map...")
    try:
        genre_map = fetch_movie_genres()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching genre map: {e}")
        return
    
    all_movies_processed = []
    fetched_titles = set() # To avoid duplicates if TMDb returns them across pages for some reason

    current_page = 1
    # Fetch up to MAX_PAGES_TO_FETCH or until no more results
    # We'll fetch a mix of popularity and release date to get a broader spectrum
    
    sort_orders = ["popularity.desc"] # Could add "release_date.desc" for more variety if needed
    
    for sort_by in sort_orders:
        print(f"\nFetching movies sorted by {sort_by}...")
        page_for_this_sort = 1
        while page_for_this_sort <= MAX_PAGES_TO_FETCH:
            try:
                print(f"Attempting to fetch page {page_for_this_sort} for sort order {sort_by}")
                data = fetch_movies(sort_by=sort_by, page=page_for_this_sort)
                movies_on_page = data.get("results", [])
                
                if not movies_on_page:
                    print(f"No more movies found for {sort_by} on page {page_for_this_sort}. Moving to next sort or finishing.")
                    break 

                processed_page_movies = process_movies(movies_on_page, genre_map)
                
                new_movies_added_count = 0
                for movie in processed_page_movies:
                    if movie["title"].lower() not in fetched_titles:
                        all_movies_processed.append(movie)
                        fetched_titles.add(movie["title"].lower())
                        new_movies_added_count +=1
                
                print(f"Fetched page {page_for_this_sort}. Added {new_movies_added_count} new movies. Total unique movies: {len(all_movies_processed)}")

                if page_for_this_sort >= data.get("total_pages", page_for_this_sort):
                     print(f"Reached total pages ({data.get('total_pages')}) for sort order {sort_by}.")
                     break
                
                page_for_this_sort += 1
                if page_for_this_sort > MAX_PAGES_TO_FETCH:
                    print(f"Reached MAX_PAGES_TO_FETCH limit ({MAX_PAGES_TO_FETCH}) for sort order {sort_by}.")
                    break
                time.sleep(0.25) # Brief pause to be nice to the API

            except requests.exceptions.RequestException as e:
                print(f"Error fetching page {page_for_this_sort} for {sort_by}: {e}")
                if "rate limit" in str(e).lower(): # More specific check for rate limit error messages
                    print("Likely rate limit. Waiting 30 seconds before retrying or stopping...")
                    time.sleep(30)
                    # Optionally, you could retry or break here. For simplicity, we'll let it try the next page or sort order.
                else:
                    print("Skipping to next page/sort due to error.")
                break # Stop fetching for this sort order on error
            except Exception as e:
                print(f"An unexpected error occurred on page {page_for_this_sort} for {sort_by}: {e}")
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

    output_filename = "tmdb_movies.json"
    try:
        with open(output_filename, "w", encoding='utf-8') as outfile:
            json.dump(output_data, outfile, indent=4, ensure_ascii=False)
        print(f"Movie data successfully exported to {output_filename}")
    except IOError as e:
        print(f"Error writing to file {output_filename}: {e}")

if __name__ == "__main__":
    main()
