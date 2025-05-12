
import requests
import json
import os
import time
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
# Max pages to fetch per segment. TMDb has 20 movies/page.
# 25 pages * 20 movies/page = 500 movies per segment.
# Adjust this if you need more/less movies overall. Max practical is 500 pages for any single query.
MAX_PAGES_PER_SEGMENT = 25 
# Total movies goal, script might stop earlier if all segments are exhausted.
# Aim for a few thousand movies. 6 segments * 500 movies/segment = 3000 movies.
# This is a soft target; actual count can vary.
TOTAL_MOVIE_GOAL = 3000


def fetch_movie_genres():
    """Fetches the official genre list from TMDb."""
    url = f"https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US"
    try:
        response = requests.get(url)
        response.raise_for_status()
        genres_data = response.json()
        return {genre['id']: genre['name'] for genre in genres_data['genres']}
    except requests.exceptions.RequestException as e:
        print(f"Error fetching genre map: {e}")
        return {} # Return empty dict on error to allow script to continue if needed

def fetch_movies_page(sort_by="popularity.desc", page=1, year_gte=None, year_lte=None, language="en-US", vote_count_gte=50):
    """Fetches a single page of movies from TMDb."""
    base_url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "sort_by": sort_by,
        "page": page,
        "include_adult": "false",
        "language": language,
        "vote_count.gte": vote_count_gte, # Filter out movies with very few votes for better quality
    }
    if year_gte:
        params["primary_release_date.gte"] = f"{year_gte}-01-01"
    if year_lte:
        params["primary_release_date.lte"] = f"{year_lte}-12-31"

    print(f"Fetching page {page} with params: {params}")
    try:
        response = requests.get(base_url, params=params)
        
        if response.status_code == 429: # Rate limit exceeded
            print("Rate limit suspected (429). Waiting for 10 seconds...")
            time.sleep(10)
            response = requests.get(base_url, params=params) # Retry once

        response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
        return response.json()
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 422: # Unprocessable Entity - often means page number too high
            print(f"HTTP 422 error for page {page} (likely page out of bounds). Params: {params}. Error: {e}")
            return {"results": [], "total_pages": page -1 } # Assume this page is invalid
        else:
            print(f"HTTP Error fetching page {page}: {e}")
            raise # Re-raise other HTTP errors
    except requests.exceptions.RequestException as e:
        print(f"Request Exception fetching page {page}: {e}")
        raise # Re-raise other request errors


def assign_difficulty(movie):
    """Assigns difficulty level based on vote_count (popularity)."""
    vote_count = movie.get("vote_count", 0)
    # These thresholds are examples. Adjust based on the desired distribution and data.
    # Higher vote_count generally means more popular/well-known.
    if vote_count > 7500:  # Very popular, broadly known (e.g., major blockbusters)
        return "easy"
    elif vote_count > 1500: # Well-known, but perhaps not universally
        return "medium"
    else: # Less known, more niche
        return "hard"

def process_movie_entry(movie_raw, genre_map):
    """Processes a single raw movie entry from TMDb."""
    # Ensure basic data like title and release date exists
    if not movie_raw.get("title") or not movie_raw.get("release_date"):
        return None
    
    # Skip if release year is not parsable or before 1940
    try:
        release_year = int(movie_raw.get("release_date")[:4])
        if release_year < 1940: # Optional: filter out very old movies if desired
            return None
    except (ValueError, TypeError):
        return None # Skip if year is not a valid number or release_date is None

    difficulty = assign_difficulty(movie_raw)
    genre_ids = movie_raw.get("genre_ids", [])
    genre_names = [genre_map.get(gid) for gid in genre_ids if genre_map.get(gid)]

    # Ensure there's at least one genre, otherwise, it might be too obscure or data incomplete
    if not genre_names:
        return None

    return {
        "title": movie_raw.get("title"),
        "year": release_year,
        "genres": genre_names,
        "popularity": movie_raw.get("vote_count"), # Using vote_count as the popularity metric
        "difficulty": difficulty,
    }

def main():
    """
    Main function to fetch movies, process them, and save to JSON.
    
    Instructions:
    1. Ensure you have a .env file in the project root with your TMDB_API_KEY_V3:
       TMDB_API_KEY=your_actual_tmdb_api_key_v3
    2. Install necessary libraries: pip install requests python-dotenv
    3. Run this script from your project root: python tmdb_fetcher.py
    4. After the script finishes, it will create a 'tmdb_movies.json' file 
       in the project root.
    5. Manually MOVE this 'tmdb_movies.json' file into the 'src/data/' directory 
       of your Next.js project. Create 'src/data/' if it doesn't exist.
    """
    if not TMDB_API_KEY:
        print("Error: TMDB_API_KEY not found in .env file or environment variables.")
        print("Please create a .env file in the project root with TMDB_API_KEY='your_key_here'")
        return

    print("Fetching genre map...")
    genre_map = fetch_movie_genres()
    if not genre_map:
        print("Could not fetch genre map. Aborting.")
        return
    
    all_movies_processed = []
    # Using a set to track (title.lower, year) to avoid duplicates
    fetched_titles_years = set() 

    # Define year segments to ensure coverage and diversity
    # Earlier decades might have fewer movies matching high vote_count_gte, adjust if needed
    year_segments = [
        (1940, 1969),
        (1970, 1979),
        (1980, 1989),
        (1990, 1999),
        (2000, 2009),
        (2010, 2019),
        (2020, None) # None for lte means up to current date
    ]
    
    # Prioritize fetching popular movies, but also iterate through segments
    # For simplicity, we'll use "popularity.desc" for all segments.
    # More advanced strategies could vary sort_by or vote_count_gte per segment.
    
    total_movies_fetched_across_all_segments = 0

    for year_gte, year_lte in year_segments:
        print(f"\nFetching movies for years: {year_gte}-{year_lte or 'current'}...")
        current_page_for_segment = 1
        movies_added_this_segment = 0
        
        while current_page_for_segment <= MAX_PAGES_PER_SEGMENT:
            if total_movies_fetched_across_all_segments >= TOTAL_MOVIE_GOAL:
                print(f"Reached overall movie goal of {TOTAL_MOVIE_GOAL}. Stopping fetch for this segment.")
                break
            try:
                data = fetch_movies_page(
                    sort_by="popularity.desc", 
                    page=current_page_for_segment, 
                    year_gte=year_gte, 
                    year_lte=year_lte,
                    vote_count_gte=50 # Base filter, can be adjusted
                )
                movies_on_page = data.get("results", [])
                
                if not movies_on_page:
                    print(f"No more movies found for this segment on page {current_page_for_segment}. Moving to next segment.")
                    break 

                newly_processed_this_page_count = 0
                for movie_raw in movies_on_page:
                    processed_movie = process_movie_entry(movie_raw, genre_map)
                    if processed_movie:
                        movie_key = (processed_movie["title"].lower(), processed_movie["year"])
                        if movie_key not in fetched_titles_years:
                            all_movies_processed.append(processed_movie)
                            fetched_titles_years.add(movie_key)
                            newly_processed_this_page_count += 1
                            movies_added_this_segment +=1
                            total_movies_fetched_across_all_segments +=1
                
                print(f"Page {current_page_for_segment}: Added {newly_processed_this_page_count} new unique movies. Segment total: {movies_added_this_segment}. Overall total: {total_movies_fetched_across_all_segments}")

                total_api_pages = data.get("total_pages", current_page_for_segment)
                if current_page_for_segment >= total_api_pages:
                     print(f"Reached reported total pages ({total_api_pages}) for this segment query.")
                     break
                
                current_page_for_segment += 1
                time.sleep(0.25) # Brief pause to be nice to the API (approx 4 requests/sec max)

            except requests.exceptions.RequestException as e:
                print(f"Stopping fetch for segment {year_gte}-{year_lte or 'current'} due to request error: {e}")
                # Potentially add retry logic here or wait longer for rate limits
                time.sleep(5) # Wait a bit longer before trying next segment
                break 
            except Exception as e:
                print(f"An unexpected error occurred for segment {year_gte}-{year_lte or 'current'} on page {current_page_for_segment}: {e}")
                break # Stop this segment on unexpected error
        
        if total_movies_fetched_across_all_segments >= TOTAL_MOVIE_GOAL:
            print(f"Reached overall movie goal of {TOTAL_MOVIE_GOAL}. Finishing all segment fetches.")
            break
            
    # Final categorization by difficulty
    categorized_movies = {"easy": [], "medium": [], "hard": []}
    for movie in all_movies_processed:
        difficulty_key = movie["difficulty"]
        if difficulty_key in categorized_movies:
            categorized_movies[difficulty_key].append(movie)
        else:
            # Should not happen if assign_difficulty is correct
            print(f"Warning: Movie {movie['title']} has unknown difficulty '{difficulty_key}'")


    print(f"\n--- Fetching Complete ---")
    print(f"Total unique movies processed: {len(all_movies_processed)}")
    print(f"Easy movies count: {len(categorized_movies['easy'])}")
    print(f"Medium movies count: {len(categorized_movies['medium'])}")
    print(f"Hard movies count: {len(categorized_movies['hard'])}")

    output_filename = "tmdb_movies.json" # Will be created in the project root
    try:
        with open(output_filename, "w", encoding='utf-8') as outfile:
            json.dump(categorized_movies, outfile, indent=2, ensure_ascii=False) # Using indent=2 for smaller file size
        print(f"\nMovie data successfully exported to '{output_filename}' in the project root.")
        print(f"IMPORTANT: Manually MOVE this file to 'src/data/{output_filename}' in your Next.js project.")
    except IOError as e:
        print(f"Error writing to file {output_filename}: {e}")

if __name__ == "__main__":
    main()
