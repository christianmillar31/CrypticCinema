'use server';
/**
 * @fileOverview Generates cryptic clues for movies using AI.
 *
 * - generateCrypticClue - A function that generates a cryptic clue for a given movie title.
 * - GenerateCrypticClueInput - The input type for the generateCrypticClue function.
 * - GenerateCrypticClueOutput - The return type for the generateCrypticClue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCrypticClueInputSchema = z.object({
  movieTitle: z.string().describe('The title of the movie for which to generate a cryptic clue.'),
  crypticLevel: z.string().optional().describe('The user-selected difficulty level (e.g., easy, medium, hard). This is used for movie selection strategy, not directly for AI clue style adjustment anymore.'),
  language: z.string().optional().describe('The language for the clue. Defaults to English.'),
});
export type GenerateCrypticClueInput = z.infer<typeof GenerateCrypticClueInputSchema>;

const GenerateCrypticClueOutputSchema = z.object({
  clue: z.string().describe('The generated cryptic clue for the movie.'),
});
export type GenerateCrypticClueOutput = z.infer<typeof GenerateCrypticClueOutputSchema>;

export async function generateCrypticClue(input: GenerateCrypticClueInput): Promise<GenerateCrypticClueOutput> {
  try {
    return await generateCrypticClueFlow(input);
  } catch (error) {
    console.error(`Error in generateCrypticClueFlow for movie "${input.movieTitle}":`, error);
    // Re-throw the error so client-side error handling can catch it.
    // Depending on Next.js/Genkit error masking, client might get a generic error.
    // Logging it here ensures server-side visibility.
    if (error instanceof Error) {
        throw new Error(`Failed to generate clue for "${input.movieTitle}": ${error.message}`);
    }
    throw new Error(`Failed to generate clue for "${input.movieTitle}": An unknown error occurred.`);
  }
}

const prompt = ai.definePrompt({
  name: 'generateCrypticCluePrompt',
  input: {schema: GenerateCrypticClueInputSchema},
  output: {schema: GenerateCrypticClueOutputSchema},
  prompt: `You are a master of cryptic clues. Generate a cryptic clue for the movie "{{movieTitle}}".

      The clue should be in {{language}}. If no language is specified, use English.

      Focus on creativity, engaging language, and intellectual challenge. The clue must NOT directly reveal the movie title or character names.
      The clue does not need to rhyme. Prioritize cleverness and cryptic misdirection over poetic structure.

      Ensure that the clue is appropriate for a general audience and avoids offensive or controversial topics.

      Here are a few examples of good cryptic clues:

      - Movie: La La Land
        Clue: Two dreamers dance through delusion, chasing stars while missing steps.
      - Movie: Oppenheimer
        Clue: A mind splits the atom and the self, unleashing both gods and ghosts.
      - Movie: The Matrix
        Clue: A digital prophet awakens to a shattered reality, choosing pills and purpose.
      - Movie: Pulp Fiction
        Clue: Interwoven tales of hitmen, molls, and a mysterious briefcase, told out of time.


      Now generate a cryptic clue for "{{movieTitle}}":`,
});

const generateCrypticClueFlow = ai.defineFlow(
  {
    name: 'generateCrypticClueFlow',
    inputSchema: GenerateCrypticClueInputSchema,
    outputSchema: GenerateCrypticClueOutputSchema,
  },
  async (input): Promise<GenerateCrypticClueOutput> => {
    // The 'crypticLevel' from input is not directly used in the prompt string for AI style adjustment anymore.
    // It's used in the game component to select movies based on popularity.
    const { output, usage } = await prompt(input);
    
    if (!output) {
      console.error('Genkit prompt did not return an output.', { input, usage });
      throw new Error('AI model did not return the expected output format.');
    }
    // Zod validation is implicitly handled by the prompt's output schema.
    // If output is present but doesn't match GenerateCrypticClueOutputSchema, an error would have been thrown already.
    return output;
  }
);

