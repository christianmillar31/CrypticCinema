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
  crypticLevel: z.string().optional().describe('The desired cryptic level of the clue (e.g., easy, medium, hard). Defaults to medium.'),
  language: z.string().optional().describe('The language for the clue. Defaults to English.'),
});
export type GenerateCrypticClueInput = z.infer<typeof GenerateCrypticClueInputSchema>;

const GenerateCrypticClueOutputSchema = z.object({
  clue: z.string().describe('The generated cryptic clue for the movie.'),
});
export type GenerateCrypticClueOutput = z.infer<typeof GenerateCrypticClueOutputSchema>;

export async function generateCrypticClue(input: GenerateCrypticClueInput): Promise<GenerateCrypticClueOutput> {
  return generateCrypticClueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCrypticCluePrompt',
  input: {schema: GenerateCrypticClueInputSchema},
  output: {schema: GenerateCrypticClueOutputSchema},
  prompt: `You are a master of cryptic clues. Generate a cryptic clue for the movie "{{movieTitle}}".

      The cryptic level should be {{crypticLevel}} (easy, medium, or hard). If no cryptic level is specified, use medium. The clue should be in {{language}}. If no language is specified, use English.

      The clue should be creative, engaging, and challenging, but not impossible to solve. Focus on wordplay, metaphors, and indirect references to the movie's plot, characters, or themes. The clue should not directly reveal the movie title.

      Ensure that the clue is appropriate for a general audience and avoids offensive or controversial topics.

      Here are a few examples:

      - Movie: La La Land
        Clue: Two dreamers dance through delusion, chasing stars while missing steps.
      - Movie: Oppenheimer
        Clue: A mind splits the atom and the self, unleashing both gods and ghosts.

      Now generate a cryptic clue for "{{movieTitle}}":`,
});

const generateCrypticClueFlow = ai.defineFlow(
  {
    name: 'generateCrypticClueFlow',
    inputSchema: GenerateCrypticClueInputSchema,
    outputSchema: GenerateCrypticClueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
