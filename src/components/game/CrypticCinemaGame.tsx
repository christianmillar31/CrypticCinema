"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { generateCrypticClue } from "@/ai/flows/generate-cryptic-clue";
import type {
  GenerateCrypticClueInput,
  GenerateCrypticClueOutput,
} from "@/ai/flows/generate-cryptic-clue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Check as CheckIcon,
  ChevronDown,
  Clapperboard,
  Flag,
  Heart,
  HeartOff,
  RotateCw,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import {
  allMovies as moviesData,
  filterMovies,
  getMovieKey,
  getUniqueDecades,
  getUniqueGenres,
  type Movie,
  type MovieDifficulty,
} from "@/lib/movies";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type GamePhase =
  | "loading"
  | "playing"
  | "correct"
  | "skipped"
  | "game_over"
  | "error"
  | "no_movie_found";

const MAX_LIVES = 3;
const CLUE_TIMEOUT_MS = 12000;
const DIFFICULTIES: MovieDifficulty[] = ["easy", "medium", "hard"];

function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: b.length + 1 }, (_, rowIndex) =>
    Array.from({ length: a.length + 1 }, (_, colIndex) => {
      if (rowIndex === 0) return colIndex;
      if (colIndex === 0) return rowIndex;
      return 0;
    })
  );

  for (let row = 1; row <= b.length; row += 1) {
    for (let col = 1; col <= a.length; col += 1) {
      const substitutionCost = a[col - 1] === b[row - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row][col - 1] + 1,
        matrix[row - 1][col] + 1,
        matrix[row - 1][col - 1] + substitutionCost
      );
    }
  }

  return matrix[b.length][a.length];
}

function isCloseEnoughGuess(guess: string, answer: string): boolean {
  const normalizedGuess = normalizeAnswer(guess);
  const normalizedAnswer = normalizeAnswer(answer);
  if (!normalizedGuess || !normalizedAnswer) return false;
  if (normalizedGuess === normalizedAnswer) return true;

  const allowedDistance = normalizedAnswer.length >= 18 ? 2 : 1;
  return levenshteinDistance(normalizedGuess, normalizedAnswer) <= allowedDistance;
}

function buildFallbackClue(movie: Movie): string {
  const titleTokens = movie.title
    .split(/\s+/)
    .map((token) => token.replace(/[^a-z0-9]/gi, ""))
    .filter((token) => token.length >= 3);

  let sanitizedPlot = movie.plot;
  titleTokens.forEach((token) => {
    const tokenPattern = new RegExp(token, "gi");
    sanitizedPlot = sanitizedPlot.replace(tokenPattern, "____");
  });

  const compactPlot = sanitizedPlot.replace(/\s+/g, " ").trim();
  const plotSnippet = compactPlot.split(" ").slice(0, 24).join(" ");
  const firstGenre = movie.genres[0] || "film";
  return `In this ${movie.decade} ${firstGenre.toLowerCase()} mystery, ${plotSnippet}... What movie is this?`;
}

export default function CrypticCinemaGame() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [clue, setClue] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [gamePhase, setGamePhase] = useState<GamePhase>("loading");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<MovieDifficulty>("medium");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDecades, setSelectedDecades] = useState<string[]>([]);

  const { toast } = useToast();

  const activeRequestIdRef = useRef(0);
  const seenMovieKeysByFilterRef = useRef<Record<string, Set<string>>>({});
  const retryMovieRef = useRef<Movie | null>(null);

  const availableGenres = useMemo(() => getUniqueGenres(moviesData), []);
  const availableDecades = useMemo(() => getUniqueDecades(moviesData), []);

  const filterSignature = useMemo(() => {
    return JSON.stringify({
      difficulty: selectedDifficulty,
      genres: [...selectedGenres].sort(),
      decades: [...selectedDecades].sort(),
    });
  }, [selectedDifficulty, selectedGenres, selectedDecades]);

  const generateClueText = useCallback(async (movie: Movie): Promise<string> => {
    console.log("[CrypticCinema] clue generation start", {
      title: movie.title,
      difficulty: selectedDifficulty,
    });

    const clueInput: GenerateCrypticClueInput = {
      movieTitle: movie.title,
      plotSummary: movie.plot,
      crypticLevel: selectedDifficulty,
      language: "English",
    };

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Clue generation timed out.")), CLUE_TIMEOUT_MS);
    });

    try {
      const result = (await Promise.race([
        generateCrypticClue(clueInput),
        timeoutPromise,
      ])) as GenerateCrypticClueOutput;

      if (!result?.clue || result.clue.trim().length === 0) {
        throw new Error("Clue response was empty.");
      }

      console.log("[CrypticCinema] clue generation success", { title: movie.title });
      return result.clue.trim();
    } catch (error) {
      console.log("[CrypticCinema] clue generation failure", {
        title: movie.title,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }, [selectedDifficulty]);

  const loadRound = useCallback(
    async (options?: { forcedMovie?: Movie | null }) => {
      const requestId = activeRequestIdRef.current + 1;
      activeRequestIdRef.current = requestId;

      setGamePhase("loading");
      setFeedbackMessage(null);
      setUserGuess("");
      setClue("");

      const selectedFiltersLog = {
        difficulty: selectedDifficulty,
        genres: selectedGenres.length > 0 ? selectedGenres : "all",
        decades: selectedDecades.length > 0 ? selectedDecades : "all",
      };
      console.log("[CrypticCinema] selected filters", selectedFiltersLog);

      let chosenMovie: Movie | null = options?.forcedMovie ?? null;
      let chosenMovieKey = "";

      if (!chosenMovie) {
        const matchingMovies = filterMovies({
          difficulty: selectedDifficulty,
          genres: selectedGenres.length > 0 ? selectedGenres : undefined,
          decades: selectedDecades.length > 0 ? selectedDecades : undefined,
        });

        console.log("[CrypticCinema] number of matching movies", matchingMovies.length);

        if (matchingMovies.length === 0) {
          if (requestId !== activeRequestIdRef.current) return;
          setCurrentMovie(null);
          setGamePhase("no_movie_found");
          setFeedbackMessage(
            "No movies matched those filters. Try changing difficulty, genres, or decades."
          );
          return;
        }

        if (!seenMovieKeysByFilterRef.current[filterSignature]) {
          seenMovieKeysByFilterRef.current[filterSignature] = new Set();
        }
        const seenForFilter = seenMovieKeysByFilterRef.current[filterSignature];

        const unseenPool = matchingMovies.filter((movie) => !seenForFilter.has(getMovieKey(movie)));
        const candidatePool = unseenPool.length > 0 ? unseenPool : matchingMovies;
        if (unseenPool.length === 0) {
          seenForFilter.clear();
        }

        const randomIndex = Math.floor(Math.random() * candidatePool.length);
        chosenMovie = candidatePool[randomIndex];
        chosenMovieKey = getMovieKey(chosenMovie);
      } else {
        chosenMovieKey = getMovieKey(chosenMovie);
      }

      if (!chosenMovie) {
        if (requestId !== activeRequestIdRef.current) return;
        setCurrentMovie(null);
        setGamePhase("error");
        setFeedbackMessage("Could not select a movie. Please try again.");
        return;
      }

      console.log("[CrypticCinema] selected movie", {
        title: chosenMovie.title,
        year: chosenMovie.year,
        difficulty: chosenMovie.difficulty,
      });

      setCurrentMovie(chosenMovie);

      try {
        const generatedClue = await generateClueText(chosenMovie);
        if (requestId !== activeRequestIdRef.current) return;

        if (!seenMovieKeysByFilterRef.current[filterSignature]) {
          seenMovieKeysByFilterRef.current[filterSignature] = new Set();
        }
        seenMovieKeysByFilterRef.current[filterSignature].add(chosenMovieKey);

        retryMovieRef.current = null;
        setClue(generatedClue);
        setGamePhase("playing");
      } catch {
        if (requestId !== activeRequestIdRef.current) return;

        retryMovieRef.current = chosenMovie;
        setGamePhase("error");
        setFeedbackMessage(
          `Could not generate a clue for "${chosenMovie.title}". Retry or skip to another movie.`
        );
      }
    },
    [
      filterSignature,
      generateClueText,
      selectedDecades,
      selectedDifficulty,
      selectedGenres,
    ]
  );

  useEffect(() => {
    void loadRound();
  }, [loadRound]);

  const calculatePoints = useCallback(() => {
    let basePoints = 100;
    if (selectedDifficulty === "easy") basePoints -= 20;
    if (selectedDifficulty === "hard") basePoints += 20;
    return Math.max(10, basePoints);
  }, [selectedDifficulty]);

  const handleGuessSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentMovie || gamePhase !== "playing" || lives <= 0) return;

    const guessIsCorrect = isCloseEnoughGuess(userGuess, currentMovie.title);

    if (guessIsCorrect) {
      const pointsEarned = calculatePoints();
      setScore((prev) => prev + pointsEarned);
      setGamePhase("correct");
      setFeedbackMessage(`Correct. The answer was "${currentMovie.title}".`);
      toast({
        title: "Correct",
        description: `+${pointsEarned} points`,
        className: "border-green-500 bg-green-500/10 text-foreground dark:text-green-300",
      });
      return;
    }

    const nextLives = lives - 1;
    setLives(nextLives);

    if (nextLives <= 0) {
      setGamePhase("game_over");
      setFeedbackMessage(`Incorrect. The answer was "${currentMovie.title}".`);
      toast({
        title: "Game Over",
        description: `The answer was "${currentMovie.title}".`,
        variant: "destructive",
      });
      return;
    }

    setFeedbackMessage(
      `Incorrect. Try again. ${nextLives} ${nextLives === 1 ? "life" : "lives"} left.`
    );
    toast({
      title: "Incorrect",
      description: `${nextLives} ${nextLives === 1 ? "life" : "lives"} left.`,
    });
  };

  const handleSkip = () => {
    if (!currentMovie || gamePhase !== "playing" || lives <= 0) return;

    const nextLives = lives - 1;
    setLives(nextLives);

    if (nextLives <= 0) {
      setGamePhase("game_over");
      setFeedbackMessage(`Skipped. The answer was "${currentMovie.title}".`);
      return;
    }

    setGamePhase("skipped");
    setFeedbackMessage(
      `Skipped. The answer was "${currentMovie.title}". ${nextLives} ${
        nextLives === 1 ? "life" : "lives"
      } left.`
    );
  };

  const handleNext = () => {
    if (gamePhase === "game_over") {
      setScore(0);
      setLives(MAX_LIVES);
      seenMovieKeysByFilterRef.current = {};
    }
    retryMovieRef.current = null;
    void loadRound();
  };

  const handleRetry = () => {
    void loadRound({ forcedMovie: retryMovieRef.current });
  };

  const handleGenreChange = (genre: string, checked: boolean | "indeterminate") => {
    if (typeof checked !== "boolean") return;
    setSelectedGenres((prev) =>
      checked ? [...prev, genre] : prev.filter((selectedGenre) => selectedGenre !== genre)
    );
  };

  const handleDecadeChange = (decade: string, checked: boolean | "indeterminate") => {
    if (typeof checked !== "boolean") return;
    setSelectedDecades((prev) =>
      checked ? [...prev, decade] : prev.filter((selectedDecade) => selectedDecade !== decade)
    );
  };

  const selectedItemsText = (items: string[], singular: string, allLabel: string) => {
    if (items.length === 0) return allLabel;
    if (items.length === 1) return items[0];
    if (items.length > 2) return `${items.length} ${singular} selected`;
    return items.join(", ");
  };

  const currentFallbackClue = currentMovie ? buildFallbackClue(currentMovie) : "";
  const hasRenderableClue = clue.length > 0 || (gamePhase === "playing" && currentFallbackClue.length > 0);
  const displayedClue = clue || currentFallbackClue;

  return (
    <div className="flex flex-col items-center min-h-screen p-4 selection:bg-accent selection:text-accent-foreground">
      <Header />
      <main className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mt-8 space-y-8">
        <Card className="w-full shadow-2xl bg-card text-card-foreground">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clapperboard className="w-12 h-12 text-primary mr-3" aria-hidden="true" />
              <CardTitle className="text-4xl font-bold">Guess the Movie!</CardTitle>
            </div>
            <CardDescription className="text-lg text-muted-foreground">
              Pick filters, decode the clue, and guess the title.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-full">
              <div className="space-y-1">
                <Label htmlFor="difficulty-select">Difficulty</Label>
                <Select
                  value={selectedDifficulty}
                  onValueChange={(value) => setSelectedDifficulty(value as MovieDifficulty)}
                  disabled={gamePhase === "loading"}
                >
                  <SelectTrigger id="difficulty-select" className="h-11">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="genre-popover-trigger">Genres</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="genre-popover-trigger"
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between h-11 font-normal"
                      disabled={gamePhase === "loading" || availableGenres.length === 0}
                    >
                      <span className="truncate">
                        {selectedItemsText(selectedGenres, "genres", "All Genres")}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <ScrollArea className="h-72">
                      <div className="p-4 space-y-2">
                        {availableGenres.map((genre) => (
                          <div key={genre} className="flex items-center space-x-2">
                            <Checkbox
                              id={`genre-${genre}`}
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={(checked) => handleGenreChange(genre, checked)}
                            />
                            <Label
                              htmlFor={`genre-${genre}`}
                              className="font-normal flex-1 cursor-pointer"
                            >
                              {genre}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-1">
                <Label htmlFor="decade-popover-trigger">Decades</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="decade-popover-trigger"
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between h-11 font-normal"
                      disabled={gamePhase === "loading" || availableDecades.length === 0}
                    >
                      <span className="truncate">
                        {selectedItemsText(selectedDecades, "decades", "All Decades")}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <ScrollArea className="h-72">
                      <div className="p-4 space-y-2">
                        {availableDecades.map((decade) => (
                          <div key={decade} className="flex items-center space-x-2">
                            <Checkbox
                              id={`decade-${decade}`}
                              checked={selectedDecades.includes(decade)}
                              onCheckedChange={(checked) => handleDecadeChange(decade, checked)}
                            />
                            <Label
                              htmlFor={`decade-${decade}`}
                              className="font-normal flex-1 cursor-pointer"
                            >
                              {decade}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {gamePhase === "loading" && (
              <div className="text-center py-10 space-y-4">
                <RotateCw className="w-16 h-16 mx-auto animate-spin text-primary" aria-hidden="true" />
                <p className="text-xl text-muted-foreground">Crafting a new cinematic enigma...</p>
              </div>
            )}

            {gamePhase !== "loading" && hasRenderableClue && (
              <div className="p-6 bg-background/50 rounded-lg shadow-inner min-h-[120px] flex items-center justify-center border border-border">
                <p className="text-2xl italic text-center font-serif">"{displayedClue}"</p>
              </div>
            )}

            {(gamePhase === "error" || gamePhase === "no_movie_found") && feedbackMessage && (
              <Alert variant="destructive">
                <AlertTitle className="text-lg">
                  {gamePhase === "error" ? "Clue Generation Failed" : "No Movies Found"}
                </AlertTitle>
                <AlertDescription>{feedbackMessage}</AlertDescription>
              </Alert>
            )}

            {gamePhase === "playing" && currentMovie && lives > 0 && (
              <form onSubmit={handleGuessSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your guess here..."
                  value={userGuess}
                  onChange={(event) => setUserGuess(event.target.value)}
                  className="text-xl p-4 h-14 focus:ring-accent focus:border-accent"
                  aria-label="Movie guess input"
                />
                <Button
                  type="submit"
                  className="w-full text-lg py-3 h-14 bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={!userGuess.trim()}
                >
                  Submit Guess
                </Button>
              </form>
            )}

            {feedbackMessage &&
              (gamePhase === "playing" ||
                gamePhase === "correct" ||
                gamePhase === "skipped" ||
                gamePhase === "game_over") && (
                <Alert
                  className={cn(
                    gamePhase === "correct" &&
                      "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 dark:border-green-700",
                    gamePhase === "skipped" &&
                      "border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 dark:border-yellow-700",
                    gamePhase === "game_over" &&
                      "border-destructive bg-destructive/10 text-destructive dark:text-red-400"
                  )}
                >
                  <AlertTitle className="text-lg">
                    {gamePhase === "correct"
                      ? "Correct"
                      : gamePhase === "skipped"
                        ? "Skipped"
                        : gamePhase === "game_over"
                          ? "Game Over"
                          : "Incorrect"}
                  </AlertTitle>
                  <AlertDescription>{feedbackMessage}</AlertDescription>
                </Alert>
              )}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-6 border-t">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-2xl sm:text-3xl font-bold text-secondary">
                <Star className="w-7 h-7 sm:w-8 sm:h-8 mr-2 fill-current" aria-hidden="true" />
                Score: {score}
              </div>
              <div className="flex items-center">
                {[...Array(MAX_LIVES)].map((_, index) =>
                  index < lives ? (
                    <Heart key={index} className="w-5 h-5 mr-1 fill-red-500 text-red-600" />
                  ) : (
                    <HeartOff key={index} className="w-5 h-5 mr-1 text-muted-foreground" />
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              {gamePhase === "playing" && lives > 0 && (
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="border-destructive text-destructive hover:text-destructive hover:bg-destructive/10 w-full sm:w-auto"
                >
                  <Flag className="w-5 h-5 mr-2" aria-hidden="true" />
                  Skip
                </Button>
              )}

              {(gamePhase === "correct" || gamePhase === "skipped" || gamePhase === "game_over") && (
                <Button
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <CheckIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  {gamePhase === "game_over" ? "Play Again" : "New Movie"}
                </Button>
              )}

              {gamePhase === "error" && (
                <>
                  <Button
                    onClick={handleRetry}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <RotateCw className="w-5 h-5 mr-2" aria-hidden="true" />
                    Retry Clue
                  </Button>
                  <Button variant="outline" onClick={handleNext} className="w-full sm:w-auto">
                    New Movie
                  </Button>
                </>
              )}

              {gamePhase === "no_movie_found" && (
                <Button variant="outline" onClick={handleNext} className="w-full sm:w-auto">
                  Retry
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="w-full max-w-2xl mx-auto mt-12 text-center text-sm text-muted-foreground pb-8">
        <p>&copy; {new Date().getFullYear()} Cryptic Cinema. All rights reserved.</p>
        <p>An AI-powered movie guessing game. Test your film knowledge!</p>
        <nav className="mt-4 space-x-4">
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
}
