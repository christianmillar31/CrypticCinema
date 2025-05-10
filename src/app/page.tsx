"use client";

import { useState, useEffect, useCallback } from "react";
import { generateCrypticClue } from "@/ai/flows/generate-cryptic-clue";
import type { GenerateCrypticClueInput, GenerateCrypticClueOutput } from "@/ai/flows/generate-cryptic-clue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clapperboard, Lightbulb, HelpCircle, Star, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import { getRandomMovie, type Movie } from "@/lib/movies";

type GamePhase = "loading" | "playing" | "correct" | "revealed" | "error";
type HintLevel = null | "word_count" | "initial_letters";

export default function CrypticCinemaPage() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [clue, setClue] = useState<string>("");
  const [userGuess, setUserGuess] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [failedAttempts, setFailedAttempts] = useState<number>(0); // Number of failed attempts for current clue
  const [gamePhase, setGamePhase] = useState<GamePhase>("loading");
  const [hintLevel, setHintLevel] = useState<HintLevel>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const { toast } = useToast();
  const MAX_FAILED_ATTEMPTS = 3;

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const fetchNewClue = useCallback(async () => {
    setGamePhase("loading");
    setClue("");
    setFeedbackMessage(null);
    setUserGuess("");
    setHintLevel(null);
    setFailedAttempts(0);

    const newMovie = getRandomMovie(currentMovie?.title);
    setCurrentMovie(newMovie);

    if (newMovie) {
      try {
        const clueInput: GenerateCrypticClueInput = {
          movieTitle: newMovie.title,
          crypticLevel: "medium",
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
          title: "Error",
          description: "Could not fetch a new clue. Please refresh or try again later.",
          variant: "destructive",
        });
      }
    }
  }, [currentMovie?.title, toast]);

  useEffect(() => {
    fetchNewClue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const calculatePoints = () => {
    if (!currentMovie) return 0;
    let points = 100; // Max points

    if (hintLevel === "initial_letters") {
      points -= 50; // Penalty for using both hints
    } else if (hintLevel === "word_count") {
      points -= 20; // Penalty for using first hint
    }

    points -= failedAttempts * 15; // Penalty for failed attempts

    return Math.max(10, points); // Minimum 10 points
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userGuess.trim() || !currentMovie) return;

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
      setFailedAttempts((prevAttempts) => prevAttempts + 1);
      if (failedAttempts + 1 >= MAX_FAILED_ATTEMPTS) {
        setFeedbackMessage(`Too many attempts! The correct answer was "${currentMovie.title}".`);
        setGamePhase("revealed");
        toast({
          title: "Revealed",
          description: `The movie was "${currentMovie.title}". Better luck next time!`,
          variant: "destructive",
        });
      } else {
        setFeedbackMessage("Incorrect. Try again!");
        toast({
          title: "Incorrect Guess",
          description: "That's not it. Try again or use a hint.",
        });
      }
    }
  };

  const handleHint = () => {
    if (!currentMovie) return;
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

  return (
    <div className="flex flex-col items-center min-h-screen p-4 selection:bg-accent selection:text-accent-foreground">
      <Header />
      <main className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mt-8 space-y-8">
        <Card className="w-full shadow-2xl bg-card text-card-foreground">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clapperboard className="w-12 h-12 text-primary mr-3" />
              <CardTitle className="text-4xl font-bold">Guess the Movie!</CardTitle>
            </div>
            <CardDescription className="text-lg text-muted-foreground">
              Unravel the cryptic clue and name the film.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {gamePhase === "loading" && (
              <div className="text-center py-10 space-y-4">
                <RotateCw className="w-16 h-16 mx-auto animate-spin text-primary" />
                <p className="text-xl text-muted-foreground">Crafting a new cinematic enigma...</p>
              </div>
            )}

            {gamePhase !== "loading" && clue && (
              <div className="p-6 bg-background/50 rounded-lg shadow-inner min-h-[120px] flex items-center justify-center border border-border">
                <p className="text-2xl italic text-center font-serif">"{clue}"</p>
              </div>
            )}
            
            {gamePhase === "error" && feedbackMessage && (
               <Alert variant="destructive">
                 <HelpCircle className="h-5 w-5" />
                 <AlertTitle className="text-lg">Clue Generation Failed</AlertTitle>
                 <AlertDescription>{feedbackMessage}</AlertDescription>
               </Alert>
            )}

            {(gamePhase === "playing" || gamePhase === "correct" || gamePhase === "revealed") && currentMovie && (
              <form onSubmit={handleGuessSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your guess here..."
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  disabled={gamePhase === "correct" || gamePhase === "revealed"}
                  className="text-xl p-4 h-14 focus:ring-accent focus:border-accent"
                  aria-label="Movie guess input"
                />
                <Button 
                  type="submit" 
                  className="w-full text-lg py-3 h-14 bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={gamePhase === "correct" || gamePhase === "revealed" || !userGuess.trim() || gamePhase === 'loading'}
                >
                  Submit Guess
                </Button>
              </form>
            )}

            {feedbackMessage && (gamePhase === "playing" || gamePhase === "correct" || gamePhase === "revealed") && (
              <Alert 
                variant={gamePhase === "correct" ? "default" : gamePhase === "revealed" ? "destructive" : "default"} 
                className={`${gamePhase === "correct" ? "border-green-500 bg-green-500/10 text-green-300 dark:text-green-400" : ""} 
                           ${gamePhase === "revealed" ? "border-destructive bg-destructive/10 text-destructive-foreground dark:text-red-400" : ""}`}
              >
                <AlertTitle className={`text-lg ${gamePhase === "correct" ? "text-green-400 dark:text-green-300" : gamePhase === "revealed" ? "text-red-400 dark:text-red-300" : ""}`}>
                    {gamePhase === "correct" ? "Bravo!" : gamePhase === "revealed" ? "Curtains Closed!" : "Feedback"}
                </AlertTitle>
                <AlertDescription className={gamePhase === "correct" ? "dark:text-green-500" : gamePhase === "revealed" ? "dark:text-red-500" : ""}>
                    {feedbackMessage}
                </AlertDescription>
              </Alert>
            )}
             {hintLevel && currentMovie && (gamePhase === "playing" || gamePhase === "correct" || gamePhase === "revealed") && (
              <div className="p-4 mt-2 text-center bg-muted rounded-md border border-border">
                <p className="font-semibold text-accent text-lg">Hint Unlocked:</p>
                <p className="text-muted-foreground text-md">{getHintText()}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-6 border-t">
            <div className="flex items-center text-3xl font-bold text-secondary">
              <Star className="w-8 h-8 mr-2 fill-current" /> Score: {score}
            </div>
            
            {gamePhase === "playing" && (
                 <p className="text-md text-muted-foreground">Attempts: {failedAttempts} / {MAX_FAILED_ATTEMPTS}</p>
            )}

            {gamePhase === "playing" && currentMovie && hintLevel !== "initial_letters" && (
              <Button variant="outline" onClick={handleHint} className="border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground">
                <Lightbulb className="w-5 h-5 mr-2" /> Get Hint ({hintLevel === null ? 'Level 1' : 'Level 2'})
              </Button>
            )}

            {(gamePhase === "correct" || gamePhase === "revealed" || gamePhase === "error") && (
              <Button onClick={fetchNewClue} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <RotateCw className="w-5 h-5 mr-2" /> Next Clue
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
      <footer className="w-full max-w-2xl mx-auto mt-12 text-center text-sm text-muted-foreground pb-8">
        <p>&copy; {new Date().getFullYear()} Cryptic Cinema. All rights reserved.</p>
        <p>An AI-powered movie guessing game.</p>
      </footer>
    </div>
  );
}
