
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { generateCrypticClue } from "@/ai/flows/generate-cryptic-clue";
import type { GenerateCrypticClueInput, GenerateCrypticClueOutput } from "@/ai/flows/generate-cryptic-clue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clapperboard, Lightbulb, HelpCircle, Star, RotateCw, Heart, HeartOff, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import { allMovies as moviesData, getUniqueGenres, getUniqueDecades, getRandomMovie, type Movie, type MovieFilters } from "@/lib/movies";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type GamePhase = "loading" | "playing" | "correct" | "gave_up" | "game_over" | "error" | "no_movie_found";
type HintLevel = null | "word_count" | "initial_letters";

const DIFFICULTIES = ["easy", "medium", "hard"] as const;
type Difficulty = typeof DIFFICULTIES[number];

const MAX_LIVES = 3;

export default function CrypticCinemaGame() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [clue, setClue] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [gamePhase, setGamePhase] = useState<GamePhase>("loading");
  const [hintLevel, setHintLevel] = useState<HintLevel>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [availableDecades, setAvailableDecades] = useState<string[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<string>("All Genres");
  const [selectedDecade, setSelectedDecade] = useState<string>("All Decades");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("medium");

  const { toast } = useToast();

  const currentMovieRef = useRef<Movie | null>(null);
  const isFetchingClue = useRef(false);
  const gamePhaseRef = useRef(gamePhase); // Ref to track gamePhase for useEffect dependencies

  useEffect(() => {
    currentMovieRef.current = currentMovie;
  }, [currentMovie]);

  useEffect(() => {
    gamePhaseRef.current = gamePhase;
  }, [gamePhase]);


  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  useEffect(() => {
    setAvailableGenres(getUniqueGenres(moviesData));
    setAvailableDecades(getUniqueDecades(moviesData));
  }, []);

  const fetchNewClue = useCallback(async () => {
    if (isFetchingClue.current) {
      console.log("Fetch already in progress, skipping.");
      return;
    }
    isFetchingClue.current = true;
    setGamePhase("loading");
    setClue("");
    setFeedbackMessage(null);
    setUserGuess("");
    setHintLevel(null);
    // Lives and score are reset by handleNextClueOrPlayAgain when gamePhase is game_over

    const movieFilters: MovieFilters = { excludeTitle: currentMovieRef.current?.title };
    if (selectedGenre !== "All Genres") {
      movieFilters.genre = selectedGenre;
    }
    if (selectedDecade !== "All Decades") {
      movieFilters.decade = parseInt(selectedDecade.replace('s', ''));
    }

    const newMovie = getRandomMovie(movieFilters);

    if (!newMovie) {
      let errorMsg = "No movies match your current filter settings."
      if (selectedGenre !== "All Genres" || selectedDecade !== "All Decades") {
        errorMsg += ` Filters: ${selectedDecade !== "All Decades" ? selectedDecade : ""}${selectedGenre !== "All Genres" ? (selectedDecade !== "All Decades" ? ", " : "") + selectedGenre : ""}.`;
      }
      errorMsg += " Please try different options or broaden your search."

      setFeedbackMessage(errorMsg);
      setGamePhase("no_movie_found");
      setClue("");
      setCurrentMovie(null);
      toast({
        title: "No Movies Found",
        description: "Try adjusting your decade or genre filters.",
        variant: "destructive",
      });
      isFetchingClue.current = false;
      return;
    }
    
    setCurrentMovie(newMovie);

    try {
      const clueInput: GenerateCrypticClueInput = {
        movieTitle: newMovie.title,
        crypticLevel: selectedDifficulty,
        language: "English",
      };
      const result: GenerateCrypticClueOutput = await generateCrypticClue(clueInput);
      setClue(result.clue);
      setGamePhase("playing");
    } catch (error) {
      console.error("Error generating clue:", error);
      setFeedbackMessage("Failed to generate a new clue. Please try again.");
      setGamePhase("error");
      toast({
        title: "Clue Generation Error",
        description: "Could not fetch a new clue for the selected movie. Please try again.",
        variant: "destructive",
      });
    } finally {
      isFetchingClue.current = false;
    }
  }, [toast, selectedGenre, selectedDecade, selectedDifficulty]);

  // Effect for initial load
  useEffect(() => {
    if (availableGenres.length > 0 && availableDecades.length > 0 && !currentMovie && gamePhase === 'loading' && !isFetchingClue.current) {
        fetchNewClue();
    }
  }, [availableGenres, availableDecades, currentMovie, gamePhase, fetchNewClue]);

  // Effect for filter changes
  const hasMountedFilters = useRef(false);
  useEffect(() => {
    if (!hasMountedFilters.current) {
      hasMountedFilters.current = true;
      return;
    }

    const canFetchOnFilterChange = 
        gamePhaseRef.current === 'playing' || 
        gamePhaseRef.current === 'error' || 
        gamePhaseRef.current === 'no_movie_found';

    if (canFetchOnFilterChange && availableGenres.length > 0 && availableDecades.length > 0) {
        fetchNewClue();
    }
  }, [selectedGenre, selectedDecade, selectedDifficulty, fetchNewClue, availableGenres, availableDecades]);


  const calculatePoints = () => {
    if (!currentMovie) return 0;
    let points = 100; 

    if (selectedDifficulty === "easy") points = Math.max(10, points - 20);
    if (selectedDifficulty === "hard") points += 20;

    if (hintLevel === "initial_letters") {
      points -= 50; 
    } else if (hintLevel === "word_count") {
      points -= 20; 
    }
    return Math.max(10, points); 
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userGuess.trim() || !currentMovie || gamePhase !== "playing" || lives <= 0) return;

    const normalizedGuess = normalizeAnswer(userGuess);
    const normalizedAnswer = normalizeAnswer(currentMovie.title);

    if (normalizedGuess === normalizedAnswer) {
      const pointsEarned = calculatePoints();
      setScore((prevScore) => prevScore + pointsEarned);
      setFeedbackMessage(`Correct! The movie was "${currentMovie.title}". You earned ${pointsEarned} points.`);
      setGamePhase("correct");
      toast({
        title: "Correct!",
        description: `You guessed "${currentMovie.title}"! +${pointsEarned} points`,
        className: "border-green-500 bg-green-500/10 text-foreground dark:text-green-300",
      });
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setFeedbackMessage(`Game Over! The movie was "${currentMovie.title}". Your score has been reset.`);
        setGamePhase("game_over");
        toast({
          title: "Game Over!",
          description: `The movie was "${currentMovie.title}". Your score is reset.`,
          variant: "destructive",
        });
      } else {
        setFeedbackMessage(`Incorrect. Try again! ${newLives} ${newLives === 1 ? 'life' : 'lives'} left.`);
        toast({
          title: "Incorrect Guess",
          description: `That's not it. ${newLives} ${newLives === 1 ? 'life' : 'lives'} remaining.`,
        });
      }
    }
  };

  const handleGiveUp = () => {
    if (!currentMovie || gamePhase !== "playing" || lives <= 0) return;

    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      setFeedbackMessage(`Game Over! The movie was "${currentMovie.title}". Your score has been reset.`);
      setGamePhase("game_over");
      toast({
        title: "Game Over!",
        description: `You gave up. The movie was "${currentMovie.title}". Score reset.`,
        variant: "destructive",
      });
    } else {
      setFeedbackMessage(`You gave up! The movie was "${currentMovie.title}". ${newLives} ${newLives === 1 ? 'life' : 'lives'} left.`);
      setGamePhase("gave_up");
      toast({
        title: "Gave Up",
        description: `The movie was "${currentMovie.title}". ${newLives} ${newLives === 1 ? 'life' : 'lives'} remaining.`,
        variant: "default", 
      });
    }
  };
  
  const handleNextClueOrPlayAgain = () => {
    if (gamePhase === "game_over") {
      setScore(0);
      setLives(MAX_LIVES);
    }
    fetchNewClue();
  };


  const handleHint = () => {
    if (!currentMovie || gamePhase !== "playing") return;
    if (hintLevel === null) {
      setHintLevel("word_count");
    } else if (hintLevel === "word_count") {
      setHintLevel("initial_letters");
    }
  };

  const getHintText = () => {
    if (!currentMovie || !hintLevel) return null;
    if (hintLevel === "word_count") {
      const words = currentMovie.title.split(" ").length;
      return `The movie title has ${words} word${words > 1 ? "s" : ""}.`;
    }
    if (hintLevel === "initial_letters") {
      const initials = currentMovie.title
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join(". ");
      return `The initials are: ${initials}.`;
    }
    return null;
  };
  
  const getAlertVariant = () => {
    if (gamePhase === "correct") return "default"; // Will be styled with custom class
    if (gamePhase === "game_over" || gamePhase === "error" || gamePhase === "no_movie_found") return "destructive";
    if (gamePhase === "gave_up") return "default"; // Can be styled with custom class for warning/info
    return "default";
  };

  const getAlertTitle = () => {
    if (gamePhase === "correct") return "Bravo!";
    if (gamePhase === "game_over") return "Game Over!";
    if (gamePhase === "gave_up") return "Revealed!";
    if (gamePhase === "error") return "Clue Generation Failed";
    if (gamePhase === "no_movie_found") return "No Movie Found";
    return "Feedback";
  }


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
              Select your challenge and unravel the cryptic clue to name the film.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
              <div className="flex-1 space-y-1">
                <Label htmlFor="difficulty-select">Difficulty</Label>
                <Select value={selectedDifficulty} onValueChange={(value) => setSelectedDifficulty(value as Difficulty)} disabled={gamePhase === 'loading'}>
                  <SelectTrigger id="difficulty-select" className="h-11">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="genre-select">Genre</Label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre} disabled={gamePhase === 'loading' || availableGenres.length === 0}>
                  <SelectTrigger id="genre-select" className="h-11">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableGenres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="decade-select">Decade</Label>
                <Select value={selectedDecade} onValueChange={setSelectedDecade} disabled={gamePhase === 'loading' || availableDecades.length === 0}>
                  <SelectTrigger id="decade-select" className="h-11">
                    <SelectValue placeholder="Select decade" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDecades.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {gamePhase === "loading" && (
              <div className="text-center py-10 space-y-4">
                <RotateCw className="w-16 h-16 mx-auto animate-spin text-primary" aria-hidden="true" />
                <p className="text-xl text-muted-foreground">Crafting a new cinematic enigma...</p>
              </div>
            )}

            {(gamePhase !== "loading" && gamePhase !== "no_movie_found" && gamePhase !== "error") && clue && (
              <div className="p-6 bg-background/50 rounded-lg shadow-inner min-h-[120px] flex items-center justify-center border border-border">
                <p className="text-2xl italic text-center font-serif">"{clue}"</p>
              </div>
            )}
            
            {(gamePhase === "error" || gamePhase === "no_movie_found") && feedbackMessage && (
               <Alert variant="destructive">
                 <HelpCircle className="h-5 w-5" aria-hidden="true" />
                 <AlertTitle className="text-lg">{getAlertTitle()}</AlertTitle>
                 <AlertDescription>{feedbackMessage}</AlertDescription>
               </Alert>
            )}

            {(gamePhase === "playing") && currentMovie && lives > 0 && (
              <form onSubmit={handleGuessSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your guess here..."
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  disabled={gamePhase !== "playing"}
                  className="text-xl p-4 h-14 focus:ring-accent focus:border-accent"
                  aria-label="Movie guess input"
                />
                <Button 
                  type="submit" 
                  className="w-full text-lg py-3 h-14 bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={gamePhase !== "playing" || !userGuess.trim() || lives <= 0}
                >
                  Submit Guess
                </Button>
              </form>
            )}

            {feedbackMessage && (gamePhase === "playing" || gamePhase === "correct" || gamePhase === "gave_up" || gamePhase === "game_over") && (
              <Alert 
                variant={getAlertVariant()}
                className={cn(
                  gamePhase === "correct" && "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 dark:border-green-700",
                  (gamePhase === "gave_up") && "border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 dark:border-yellow-700",
                  gamePhase === "game_over" && "border-destructive bg-destructive/10 text-destructive dark:text-red-400"
                )}
              >
                <AlertTitle className={cn("text-lg",
                  gamePhase === "correct" && "text-green-600 dark:text-green-300",
                  gamePhase === "gave_up" && "text-yellow-600 dark:text-yellow-300",
                  gamePhase === "game_over" && "text-red-600 dark:text-red-300"
                 )}>
                    {getAlertTitle()}
                </AlertTitle>
                <AlertDescription className={cn(
                   gamePhase === "correct" && "dark:text-green-500",
                   gamePhase === "gave_up" && "dark:text-yellow-500",
                   gamePhase === "game_over" && "dark:text-red-500"
                )}>
                    {feedbackMessage}
                </AlertDescription>
              </Alert>
            )}
            {hintLevel && currentMovie && (gamePhase === "playing" || gamePhase === "correct" || gamePhase === "gave_up") && (
              <div className="p-4 mt-2 text-center bg-muted rounded-md border border-border">
                <p className="font-semibold text-accent text-lg">Hint Unlocked:</p>
                <p className="text-muted-foreground text-md">{getHintText()}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-6 border-t">
            <div className="flex items-center space-x-4">
                <div className="flex items-center text-2xl sm:text-3xl font-bold text-secondary">
                <Star className="w-7 h-7 sm:w-8 sm:h-8 mr-2 fill-current" aria-hidden="true" /> Score: {score}
                </div>
                <div className="flex items-center">
                {[...Array(MAX_LIVES)].map((_, i) =>
                    i < lives ? (
                    <Heart key={i} className="w-5 h-5 mr-1 fill-red-500 text-red-600" />
                    ) : (
                    <HeartOff key={i} className="w-5 h-5 mr-1 text-muted-foreground" />
                    )
                )}
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                {gamePhase === "playing" && lives > 0 && (
                <>
                    {currentMovie && hintLevel !== "initial_letters" && (
                    <Button variant="outline" onClick={handleHint} className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto">
                        <Lightbulb className="w-5 h-5 mr-2" aria-hidden="true" /> Get Hint ({hintLevel === null ? 'Level 1' : 'Level 2'})
                    </Button>
                    )}
                    <Button variant="outline" onClick={handleGiveUp} className="border-destructive text-destructive hover:text-destructive hover:bg-destructive/10 w-full sm:w-auto">
                        <Flag className="w-5 h-5 mr-2" aria-hidden="true" /> Give Up
                    </Button>
                </>
                )}

                {(gamePhase === "correct" || gamePhase === "gave_up" || gamePhase === "game_over" || gamePhase === "error" || gamePhase === "no_movie_found") && (
                <Button onClick={handleNextClueOrPlayAgain} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    <RotateCw className="w-5 h-5 mr-2" aria-hidden="true" />
                    {gamePhase === "game_over" ? "Play Again" : "Next Clue"}
                </Button>
                )}
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="w-full max-w-2xl mx-auto mt-12 text-center text-sm text-muted-foreground pb-8">
        <p>&copy; {new Date().getFullYear()} Cryptic Cinema. All rights reserved.</p>
        <p>An AI-powered movie guessing game. Test your film knowledge!</p>
      </footer>
    </div>
  );
}
