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

      The clue should be in {{language}}. If no language is specified, use English.

      Adjust the clue's nature based on the cryptic level:
      - Easy: The clue should use more direct (though still cryptic) references to plot, characters, or prominent themes. Wordplay should be relatively straightforward.
      - Medium (default if not specified): A standard cryptic clue involving clever wordplay, metaphors, and indirect references. It should be challenging but fair.
      - Hard: The clue should be highly abstract, employ sophisticated wordplay, or reference more subtle, less obvious aspects of the movie (e.g., minor characters, deeper thematic elements, or unique directorial choices). The connection to the movie should be more obscure.

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


      Now generate a cryptic clue for "{{movieTitle}}" with a cryptic level of "{{crypticLevel}}":`,
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

