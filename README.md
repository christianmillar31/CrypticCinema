# Cryptic Cinema

Cryptic Cinema is a Next.js movie guessing game where players solve cryptic clues generated from movie plot summaries.

## Run locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:9002`.

## Production environment

Create `.env.local` from this:

```bash
NEXT_PUBLIC_SITE_URL=https://crypticcinema.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_GAME_TOP_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_GAME_BOTTOM_SLOT=0987654321
```

## Game rules

- Choose difficulty, genres, and decades.
- Get one cryptic clue.
- Guess the movie title.
- Keep score while preserving lives.

## Notes

- Main game logic lives in `src/components/game/CrypticCinemaGame.tsx`.
- Movie normalization/filtering lives in `src/lib/movies.ts`.
- Clues are dataset-first (`movie.clues` or `movie.clue`) and require no runtime API calls.
- Progressive hints are built in (word count, initials, genre+decade) with score penalties.

## Dataset pipeline

`src/data/omdb_movies.json` now includes a seeded dataset with handcrafted clues. To regenerate or expand from OMDb:

```bash
pip install requests python-dotenv
echo "OMDB_API_KEY=your_key_here" > .env
python omdb_fetcher.py
```

Then move the generated `omdb_movies.json` into `src/data/omdb_movies.json` and add cryptic clues per movie.

Run dataset QA checks anytime with:

```bash
npm run validate:dataset
```

Optional preloaded clue shape per movie:

```json
{
  "title": "Example Movie",
  "year": 1999,
  "genres": ["Drama"],
  "decade": "1990s",
  "plot": "A sample plot",
  "difficulty": "medium",
  "clues": {
    "easy": "A broad clue",
    "medium": "A trickier clue",
    "hard": "A very cryptic clue"
  }
}
```

## Google AdSense setup

1. Create/approve your AdSense account and add `crypticcinema.com`.
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT` and your ad slot env vars.
3. Replace `public/ads.txt` with your real publisher ID.
4. Deploy and verify:
   - `https://crypticcinema.com/ads.txt`
   - ad slots render on home page
5. First-time visitors must pick ad preference in the consent banner:
   - `Allow personalized ads`
   - `Use non-personalized ads` (privacy-safe fallback)
6. Keep `/privacy` updated for cookie/ad disclosure and consent handling.

## SEO + GEO launch checklist

- Set `NEXT_PUBLIC_SITE_URL` to your production domain.
- Verify metadata routes:
  - `/robots.txt` (generated from `src/app/robots.ts`)
  - `/sitemap.xml` (generated from `src/app/sitemap.ts`)
  - `/og` (Open Graph image route)
- Submit `https://crypticcinema.com/sitemap.xml` in Google Search Console.
- Keep structured data in `src/app/layout.tsx` and `src/app/page.tsx` accurate as gameplay evolves.
- Maintain high-quality visible content on About/Privacy pages and avoid thin placeholder text.
