
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
  plotSummary: z.string().optional().describe('A short movie plot summary used to produce a clue without revealing the title.'),
  crypticLevel: z.string().optional().describe('The user-selected difficulty level (easy, medium, hard).'),
  language: z.string().optional().describe('The language for the clue. Defaults to English.'),
});
export type GenerateCrypticClueInput = z.infer<typeof GenerateCrypticClueInputSchema>;

const GenerateCrypticClueOutputSchema = z.object({
  clue: z.string().describe('The generated cryptic clue for the movie.'),
});
export type GenerateCrypticClueOutput = z.infer<typeof GenerateCrypticClueOutputSchema>;

export async function generateCrypticClue(input: GenerateCrypticClueInput): Promise<GenerateCrypticClueOutput> {
  console.log('[Genkit Flow] generateCrypticClue called with input:', JSON.stringify(input));
  try {
    const result = await generateCrypticClueFlow(input);
    console.log('[Genkit Flow] generateCrypticClueFlow returned:', JSON.stringify(result));
    if (!result || typeof result.clue !== 'string') {
      console.error('[Genkit Flow] Invalid result structure from generateCrypticClueFlow:', result);
      throw new Error('AI model returned an invalid or empty clue.');
    }
    return result;
  } catch (error) {
    console.error(`[Genkit Flow] Error in generateCrypticClue for movie "${input.movieTitle}":`, error);
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
  prompt: `You are a master of cryptic clues for movie guessing games.

      Generate exactly one clue in {{language}}. If no language is specified, use English.
      Difficulty setting: {{crypticLevel}}.

      Use the plot summary below as your source:
      "{{plotSummary}}"

      Rules:
      - Do not reveal the movie title.
      - Do not reveal character names.
      - Keep it under 35 words.
      - Keep it appropriate for a general audience.
      - Output only the clue text.`,
});

const generateCrypticClueFlow = ai.defineFlow(
  {
    name: 'generateCrypticClueFlow',
    inputSchema: GenerateCrypticClueInputSchema,
    outputSchema: GenerateCrypticClueOutputSchema,
  },
  async (input): Promise<GenerateCrypticClueOutput> => {
    console.log('[Genkit Flow] generateCrypticClueFlow (inner) called with input:', JSON.stringify(input));
    
    const { output, usage } = await prompt(input);
    console.log('[Genkit Flow] Prompt execution result - output:', JSON.stringify(output), 'usage:', JSON.stringify(usage));
    
    if (!output || typeof output.clue !== 'string' || output.clue.trim() === "") {
      console.error('[Genkit Flow] Genkit prompt did not return a valid output or clue was empty.', { input, output, usage });
      // Attempt to return a fallback or throw a more specific error
      // For now, throwing error as per original logic.
      throw new Error('AI model did not return the expected output format or clue was empty.');
    }
    return output;
  }
);
