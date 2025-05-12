
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from 'next/link';
import { generateCrypticClue } from "@/ai/flows/generate-cryptic-clue";
import type { GenerateCrypticClueInput, GenerateCrypticClueOutput } from "@/ai/flows/generate-cryptic-clue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clapperboard, Lightbulb, HelpCircle, Star, RotateCw, Heart, HeartOff, Flag, Check as CheckIcon, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import { allMovies as moviesData, getUniqueGenres, getUniqueDecades, getRandomMovie, type Movie, type MovieFilters, type MovieDifficulty } from "@/lib/movies";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

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
  const [shownMovieTitlesThisSession, setShownMovieTitlesThisSession] = useState<string[]>([]);

  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [availableDecades, setAvailableDecades] = useState<string[]>([]);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDecades, setSelectedDecades] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("medium");

  const { toast } = useToast();

  const isFetchingClue = useRef(false);
  const gamePhaseRef = useRef(gamePhase); 

  useEffect(() => {
    gamePhaseRef.current = gamePhase;
    console.log("[CrypticCinemaGame] gamePhase updated to:", gamePhase);
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
    console.log("[CrypticCinemaGame] Available genres and decades set.");
  }, []);

  const fetchNewClue = useCallback(async () => {
    console.log("[CrypticCinemaGame] fetchNewClue called.");
    if (isFetchingClue.current) {
      console.log("[CrypticCinemaGame] Fetch already in progress, skipping.");
      return;
    }
    isFetchingClue.current = true;
    console.log("[CrypticCinemaGame] isFetchingClue.current set to true.");
    
    setGamePhase("loading");
    console.log("[CrypticCinemaGame] gamePhase set to 'loading'.");
    setClue("");
    setFeedbackMessage(null);
    setUserGuess("");
    setHintLevel(null);
    
    const movieFilters: MovieFilters = { 
      difficulty: selectedDifficulty as MovieDifficulty,
      excludeTitles: shownMovieTitlesThisSession, 
    };
    if (selectedGenres.length > 0) {
      movieFilters.genres = selectedGenres;
    }
    if (selectedDecades.length > 0) {
      movieFilters.decades = selectedDecades.map(d => parseInt(d.replace('s', '')));
    }
    console.log("[CrypticCinemaGame] Movie filters for getRandomMovie:", movieFilters);

    const newMovie = getRandomMovie(movieFilters);
    console.log("[CrypticCinemaGame] Selected movie by getRandomMovie:", newMovie);


    if (!newMovie) {
      let errorMsg = "No new movies match your current filter settings."
      if (shownMovieTitlesThisSession.length > 0) {
        errorMsg += " You might have seen all available movies for these filters in this session."
      }
      
      let filterDetails = [];
      if (selectedDifficulty) filterDetails.push(`Difficulty: ${selectedDifficulty}`);
      if (selectedDecades.length > 0) filterDetails.push(`Decades: ${selectedDecades.join('/')}`);
      if (selectedGenres.length > 0) filterDetails.push(`Genres: ${selectedGenres.join('/')}`);

      if (filterDetails.length > 0) {
        errorMsg += ` Filters: ${filterDetails.join(', ')}.`;
      }
      errorMsg += " Please try different options or broaden your search."
      
      console.warn("[CrypticCinemaGame] No movie found with current filters. Message:", errorMsg);
      setFeedbackMessage(errorMsg);
      setGamePhase("no_movie_found");
      console.log("[CrypticCinemaGame] gamePhase set to 'no_movie_found'.");
      setClue("");
      setCurrentMovie(null); 
      toast({
        title: "No New Movies Found",
        description: "Try adjusting your filters or you may have seen all available movies for the current selection this session.",
        variant: "destructive",
      });
      isFetchingClue.current = false;
      console.log("[CrypticCinemaGame] isFetchingClue.current set to false (no movie found).");
      return;
    }
    
    setCurrentMovie(newMovie);
    setShownMovieTitlesThisSession(prev => [...prev, newMovie.title]);

    console.log(`[CrypticCinemaGame] Attempting to generate clue for: "${newMovie.title}" with difficulty: ${selectedDifficulty}`);
    try {
      const clueInput: GenerateCrypticClueInput = {
        movieTitle: newMovie.title,
        crypticLevel: selectedDifficulty, 
        language: "English",
      };
      console.log("[CrypticCinemaGame] Input for generateCrypticClue:", clueInput);
      const result: GenerateCrypticClueOutput = await generateCrypticClue(clueInput);
      console.log("[CrypticCinemaGame] Result from generateCrypticClue:", result);
      if (result && result.clue) {
        setClue(result.clue);
        setGamePhase("playing");
        console.log("[CrypticCinemaGame] gamePhase set to 'playing'.");
      } else {
        console.error("[CrypticCinemaGame] Received invalid result from generateCrypticClue:", result);
        throw new Error("Invalid clue data received from AI.");
      }
    } catch (error) {
      console.error("[CrypticCinemaGame] Error generating clue in component:", error);
      setFeedbackMessage(`Failed to generate a new clue for "${newMovie.title}". Please try again.`);
      setGamePhase("error");
      console.log("[CrypticCinemaGame] gamePhase set to 'error'.");
      setCurrentMovie(null); 
      toast({
        title: "Clue Generation Error",
        description: `Could not fetch a new clue for "${newMovie.title}". Check console for details.`,
        variant: "destructive",
      });
    } finally {
      isFetchingClue.current = false;
      console.log("[CrypticCinemaGame] fetchNewClue finished. isFetchingClue.current set to false.");
    }
  }, [toast, selectedGenres, selectedDecades, selectedDifficulty, shownMovieTitlesThisSession]);

  
  useEffect(() => {
    if (availableGenres.length > 0 && availableDecades.length > 0 && gamePhaseRef.current === 'loading' && !isFetchingClue.current && !currentMovie) {
        console.log("[CrypticCinemaGame] Initial fetchNewClue on mount/data load.");
        fetchNewClue();
    }
  }, [availableGenres, availableDecades, fetchNewClue, currentMovie]);

  
  const hasMountedFilters = useRef(false);
  useEffect(() => {
    if (!hasMountedFilters.current) {
      console.log("[CrypticCinemaGame] Filter useEffect: Skipping initial mount.");
      hasMountedFilters.current = true;
      return; 
    }

    const canFetchOnFilterChange = 
        gamePhaseRef.current === 'playing' || 
        gamePhaseRef.current === 'error' || 
        gamePhaseRef.current === 'no_movie_found' ||
        gamePhaseRef.current === 'correct' || 
        gamePhaseRef.current === 'gave_up';
    
    console.log(`[CrypticCinemaGame] Filter useEffect: canFetchOnFilterChange=${canFetchOnFilterChange}, availableData=${availableGenres.length > 0 && availableDecades.length > 0}, !isFetching=${!isFetchingClue.current}`);
    console.log(`[CrypticCinemaGame] Filter useEffect: Current filters - Genres: ${JSON.stringify(selectedGenres)}, Decades: ${JSON.stringify(selectedDecades)}, Difficulty: ${selectedDifficulty}`);


    if (canFetchOnFilterChange && availableGenres.length > 0 && availableDecades.length > 0 && !isFetchingClue.current) {
        console.log("[CrypticCinemaGame] Fetching new clue due to filter change.");
        fetchNewClue();
    }
  }, [JSON.stringify(selectedGenres), JSON.stringify(selectedDecades), selectedDifficulty, fetchNewClue, availableGenres, availableDecades]);


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
        setFeedbackMessage(`Game Over! The movie was "${currentMovie.title}". Your final score was ${score}.`);
        setGamePhase("game_over");
        toast({
          title: "Game Over!",
          description: `The movie was "${currentMovie.title}". Your final score: ${score}.`,
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
      setFeedbackMessage(`Game Over! The movie was "${currentMovie.title}". Your final score was ${score}.`);
      setGamePhase("game_over");
      toast({
        title: "Game Over!",
        description: `You gave up. The movie was "${currentMovie.title}". Final score: ${score}.`,
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
    console.log("[CrypticCinemaGame] handleNextClueOrPlayAgain called. Current gamePhase:", gamePhaseRef.current);
    if (gamePhaseRef.current === "game_over") {
      console.log("[CrypticCinemaGame] Resetting score, lives, and shown movies for new game.");
      setScore(0);
      setLives(MAX_LIVES);
      setShownMovieTitlesThisSession([]); 
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
    if (gamePhase === "correct") return "default"; 
    if (gamePhase === "game_over" || gamePhase === "error" || gamePhase === "no_movie_found") return "destructive";
    if (gamePhase === "gave_up") return "default"; 
    return "default";
  };

  const getAlertTitle = () => {
    if (gamePhase === "correct") return "Bravo!";
    if (gamePhase === "game_over") return "Game Over!";
    if (gamePhase === "gave_up") return "Revealed!";
    if (gamePhase === "error") return "Clue Generation Failed";
    if (gamePhase === "no_movie_found") return "No New Movie Found";
    return "Feedback";
  }

  const handleGenreChange = (genre: string, checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      setSelectedGenres(prev =>
        checked ? [...prev, genre] : prev.filter(g => g !== genre)
      );
    }
  };

  const handleDecadeChange = (decade: string, checked: boolean | 'indeterminate') => {
     if (typeof checked === 'boolean') {
      setSelectedDecades(prev =>
        checked ? [...prev, decade] : prev.filter(d => d !== decade)
      );
    }
  };

  const getSelectedItemsText = (selectedItems: string[], itemType: string, allText: string) => {
    if (selectedItems.length === 0) return allText;
    if (selectedItems.length === 1) return selectedItems[0];
    if (selectedItems.length > 2) return `${selectedItems.length} ${itemType} selected`;
    return selectedItems.join(', ');
  };

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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-full">
              <div className="space-y-1">
                <Label htmlFor="difficulty-select">Difficulty</Label>
                <Select value={selectedDifficulty} onValueChange={(value) => setSelectedDifficulty(value as Difficulty)} disabled={gamePhase === 'loading' || isFetchingClue.current}>
                  <SelectTrigger id="difficulty-select" className="h-11">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>)}
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
                      disabled={gamePhase === 'loading' || availableGenres.length === 0 || isFetchingClue.current}
                    >
                      <span className="truncate">{getSelectedItemsText(selectedGenres, "genres", "All Genres")}</span>
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
                            <Label htmlFor={`genre-${genre}`} className="font-normal flex-1 cursor-pointer">{genre}</Label>
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
                      disabled={gamePhase === 'loading' || availableDecades.length === 0 || isFetchingClue.current}
                    >
                       <span className="truncate">{getSelectedItemsText(selectedDecades, "decades", "All Decades")}</span>
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
                            <Label htmlFor={`decade-${decade}`} className="font-normal flex-1 cursor-pointer">{decade}</Label>
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
                  disabled={gamePhase !== "playing" || !userGuess.trim() || lives <= 0 || isFetchingClue.current}
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
                {gamePhase === "playing" && lives > 0 && !isFetchingClue.current && (
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
                <Button onClick={handleNextClueOrPlayAgain} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isFetchingClue.current}>
                    <RotateCw className="w-5 h-5 mr-2" aria-hidden="true" />
                    {gamePhaseRef.current === "game_over" ? "Play Again" : (isFetchingClue.current ? "Loading..." : "Next Clue")}
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

