
import requests
import json
import os
import time
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

OMDB_API_KEY = os.getenv("OMDB_API_KEY")
# List of common search terms to find a variety of movies.
# OMDB search is limited, so specific terms are more effective.
SEARCH_TERMS = [
    "love", "war", "life", "dream", "star", "space", "future", "magic", "monster", 
    "king", "queen", "world", "crime", "money", "power", "city", "road", "journey",
    "family", "friend", "school", "hero", "dark", "light", "secret", "island", "lost"
]
# Years to search within.
YEARS_TO_SEARCH = range(1940, datetime.now().year + 1) 
MAX_RESULTS_PER_TERM_YEAR = 20 # Max 2 pages (10 results per page for OMDB search)
MAX_TOTAL_MOVIES_GOAL = 500 # Adjust as needed, but be mindful of API limits (1000/day for free tier)

def fetch_movie_details(imdb_id):
    """Fetches detailed information for a single movie by its IMDb ID."""
    if not OMDB_API_KEY:
        print("OMDB_API_KEY is not configured. Please check your .env file.")
        return None
    params = {
        "apikey": OMDB_API_KEY,
        "i": imdb_id,
        "plot": "short", # or 'full'
        "type": "movie"
    }
    try:
        response = requests.get("http://www.omdbapi.com/", params=params)
        response.raise_for_status()
        movie_data = response.json()
        if movie_data.get("Response") == "True":
            return movie_data
        else:
            print(f"OMDB API error for ID {imdb_id}: {movie_data.get('Error')}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Request error fetching details for {imdb_id}: {e}")
        return None

def search_movies_page(search_term, year, page=1):
    """Searches for movies on OMDB for a given term, year, and page."""
    if not OMDB_API_KEY:
        print("OMDB_API_KEY is not configured. Please check your .env file.")
        return [], "0"
    params = {
        "apikey": OMDB_API_KEY,
        "s": search_term,
        "y": year,
        "type": "movie",
        "page": page
    }
    try:
        response = requests.get("http://www.omdbapi.com/", params=params)
        response.raise_for_status()
        search_data = response.json()
        if search_data.get("Response") == "True":
            return search_data.get("Search", []), search_data.get("totalResults", "0")
        else:
            # It's common for searches to yield no results, not necessarily an error.
            if search_data.get("Error") != "Movie not found!":
                 print(f"OMDB API search error for '{search_term}' year {year} page {page}: {search_data.get('Error')}")
            return [], "0"
    except requests.exceptions.RequestException as e:
        print(f"Request error searching for '{search_term}' year {year} page {page}: {e}")
        return [], "0"

def assign_difficulty(imdb_votes_str):
    """Assigns difficulty based on IMDb votes string."""
    if not imdb_votes_str or imdb_votes_str == "N/A":
        return "hard" # Default to hard if no vote info
    try:
        # Remove commas and convert to int
        imdb_votes = int(imdb_votes_str.replace(",", ""))
        if imdb_votes > 100000:  # Very popular
            return "easy"
        elif imdb_votes > 20000: # Well-known
            return "medium"
        else: # Less known
            return "hard"
    except ValueError:
        print(f"Could not parse imdbVotes: {imdb_votes_str}")
        return "hard"

def process_movie_entry(movie_details):
    """Processes a single detailed movie entry from OMDB."""
    if not movie_details or movie_details.get("Type") != "movie":
        return None

    title = movie_details.get("Title")
    year_str = movie_details.get("Year") 
    # OMDB 'Year' can sometimes have a range (e.g., "2000-2001"). Take the first year.
    if year_str and isinstance(year_str, str) and len(year_str) >= 4:
        try:
            year = int(year_str[:4])
        except ValueError:
            print(f"Could not parse year from {year_str} for movie {title}")
            return None
    else:
        print(f"Missing or invalid year for movie {title}")
        return None

    if year < 1940: # Optional: filter out very old movies
        return None

    imdb_votes_str = movie_details.get("imdbVotes", "0")
    difficulty = assign_difficulty(imdb_votes_str)
    
    genre_str = movie_details.get("Genre", "")
    genres = [g.strip() for g in genre_str.split(",") if g.strip()] if genre_str else []

    if not title or not genres: # Require title and at least one genre
        return None

    return {
        "title": title,
        "year": year,
        "genres": genres,
        "popularity": int(imdb_votes_str.replace(",", "")) if imdb_votes_str and imdb_votes_str != "N/A" else 0,
        "difficulty": difficulty,
        "imdbID": movie_details.get("imdbID") # Keep IMDb ID for reference
    }

def main():
    """
    Main function to fetch movies from OMDB, process them, and save to JSON.
    Instructions:
    1. Ensure you have a .env file in the project root. It should contain your OMDb API key.
       Example .env file content:
       OMDB_API_KEY=d42a0580 
       (Replace d42a0580 with your actual key if different)

    2. Install necessary libraries: pip install requests python-dotenv
       (Run this in your terminal in the project directory if you haven't already)

    3. Run this script from your project root: python omdb_fetcher.py
       (This will create 'omdb_movies.json' in the project root)

    4. Manually MOVE the generated 'omdb_movies.json' file into the 'src/data/' 
       directory of your Next.js project. Create 'src/data/' if it doesn't exist.
       You will need to overwrite the existing placeholder file if it's there.
    """
    if not OMDB_API_KEY:
        print("Error: OMDB_API_KEY not found in environment variables.")
        print("Please create a .env file in the project root with the following line:")
        print("OMDB_API_KEY=d42a0580")
        print("(Replace d42a0580 with your actual OMDb API key if it's different or you have a personal one.)")
        print("The script will not run without an API key.")
        return

    all_movies_processed = []
    # Using a set to track IMDb IDs to avoid duplicate processing
    processed_imdb_ids = set() 
    movies_fetched_count = 0

    for year in YEARS_TO_SEARCH:
        if movies_fetched_count >= MAX_TOTAL_MOVIES_GOAL:
            break
        for term in SEARCH_TERMS:
            if movies_fetched_count >= MAX_TOTAL_MOVIES_GOAL:
                break
            print(f"\nSearching for '{term}' in year {year}...")
            
            # OMDB search results are 10 per page.
            # Fetching 2 pages max per term/year to get up to 20 potential movies.
            for page_num in [1, 2]: 
                if movies_fetched_count >= MAX_TOTAL_MOVIES_GOAL:
                    break

                search_results, total_results_str = search_movies_page(term, year, page=page_num)
                
                if not search_results:
                    if page_num == 1 : # Only print "no results" if first page for this term/year also empty
                        print(f"No movies found for '{term}' in {year} on page {page_num}.")
                    break # No more results for this term/year

                for movie_summary in search_results:
                    if movies_fetched_count >= MAX_TOTAL_MOVIES_GOAL:
                        break
                    
                    imdb_id = movie_summary.get("imdbID")
                    if imdb_id and imdb_id not in processed_imdb_ids:
                        print(f"Fetching details for: {movie_summary.get('Title')} ({imdb_id})")
                        movie_details = fetch_movie_details(imdb_id)
                        time.sleep(0.2) # Be respectful to the API

                        if movie_details:
                            processed_movie = process_movie_entry(movie_details)
                            if processed_movie:
                                all_movies_processed.append(processed_movie)
                                processed_imdb_ids.add(imdb_id)
                                movies_fetched_count += 1
                                print(f"Added: {processed_movie['title']} ({processed_movie['year']}). Total: {movies_fetched_count}/{MAX_TOTAL_MOVIES_GOAL}")
                
                if len(search_results) < 10 or int(total_results_str) <= page_num * 10:
                    # No more pages for this search term and year
                    break
    
    # Categorize by difficulty
    categorized_movies = {"easy": [], "medium": [], "hard": []}
    for movie in all_movies_processed:
        difficulty_key = movie["difficulty"]
        categorized_movies[difficulty_key].append(movie)

    print(f"\n--- Fetching Complete ---")
    print(f"Total unique movies processed: {len(all_movies_processed)}")
    print(f"Easy movies: {len(categorized_movies['easy'])}")
    print(f"Medium movies: {len(categorized_movies['medium'])}")
    print(f"Hard movies: {len(categorized_movies['hard'])}")

    output_filename = "omdb_movies.json" # Will be created in the project root
    try:
        with open(output_filename, "w", encoding='utf-8') as outfile:
            json.dump(categorized_movies, outfile, indent=2)
        print(f"\nMovie data successfully exported to '{output_filename}' in the project root.")
        print(f"IMPORTANT: Manually MOVE this file to 'src/data/{output_filename}' in your Next.js project.")
        print(f"Make sure to overwrite any existing 'omdb_movies.json' in 'src/data/'.")
    except IOError as e:
        print(f"Error writing to file {output_filename}: {e}")

if __name__ == "__main__":
    main()

