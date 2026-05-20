# Cryptic Cinema

Cryptic Cinema is a Next.js movie guessing game where players solve cryptic clues generated from movie plot summaries.

## Run locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:9002`.

## Game rules

- Choose difficulty, genres, and decades.
- Get one cryptic clue.
- Guess the movie title.
- Keep score while preserving lives.

## Notes

- Main game logic lives in `src/components/game/CrypticCinemaGame.tsx`.
- Movie normalization/filtering lives in `src/lib/movies.ts`.
- AI clue flow lives in `src/ai/flows/generate-cryptic-clue.ts`.
