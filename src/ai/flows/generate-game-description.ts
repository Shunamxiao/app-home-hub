'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a short, engaging description for a game.
 *
 * It includes:
 * - `generateGameDescription`:  A function that takes game details as input and returns a generated description.
 * - `GenerateGameDescriptionInput`: The input type for the `generateGameDescription` function.
 * - `GenerateGameDescriptionOutput`: The output type for the `generateGameDescription` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGameDescriptionInputSchema = z.object({
  gameName: z.string().describe('The name of the game.'),
  gameGenre: z.string().describe('The genre of the game.'),
  gameTags: z.string().describe('Tags associated with the game (e.g., "action", "adventure", "strategy").'),
});

export type GenerateGameDescriptionInput = z.infer<typeof GenerateGameDescriptionInputSchema>;

const GenerateGameDescriptionOutputSchema = z.object({
  description: z.string().describe('A short, engaging description of the game.'),
});

export type GenerateGameDescriptionOutput = z.infer<typeof GenerateGameDescriptionOutputSchema>;

export async function generateGameDescription(input: GenerateGameDescriptionInput): Promise<GenerateGameDescriptionOutput> {
  return generateGameDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGameDescriptionPrompt',
  input: {schema: GenerateGameDescriptionInputSchema},
  output: {schema: GenerateGameDescriptionOutputSchema},
  prompt: `You are a creative marketing expert specializing in writing compelling descriptions for mobile games.
  Generate a short, engaging description for the game based on the following information:

  Game Name: {{{gameName}}}
  Genre: {{{gameGenre}}}
  Tags: {{{gameTags}}}

  Description:`,
});

const generateGameDescriptionFlow = ai.defineFlow(
  {
    name: 'generateGameDescriptionFlow',
    inputSchema: GenerateGameDescriptionInputSchema,
    outputSchema: GenerateGameDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
