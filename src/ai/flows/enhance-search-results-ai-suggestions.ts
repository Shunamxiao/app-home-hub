'use server';
/**
 * @fileOverview Enhances search results with AI-powered suggestions based on partial matches or related terms.
 *
 * - enhanceSearchResultsWithAISuggestions - A function that enhances search results with AI suggestions.
 * - EnhanceSearchResultsWithAISuggestionsInput - The input type for the enhanceSearchResultsWithAISuggestions function.
 * - EnhanceSearchResultsWithAISuggestionsOutput - The return type for the enhanceSearchResultsWithAISuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceSearchResultsWithAISuggestionsInputSchema = z.object({
  searchTerm: z.string().describe('The search term entered by the user.'),
  initialResults: z.array(z.string()).describe('The initial list of search results.'),
});
export type EnhanceSearchResultsWithAISuggestionsInput = z.infer<typeof EnhanceSearchResultsWithAISuggestionsInputSchema>;

const EnhanceSearchResultsWithAISuggestionsOutputSchema = z.object({
  suggestedTerms: z.array(z.string()).describe('AI-powered suggestions based on the search term and initial results.'),
});
export type EnhanceSearchResultsWithAISuggestionsOutput = z.infer<typeof EnhanceSearchResultsWithAISuggestionsOutputSchema>;

export async function enhanceSearchResultsWithAISuggestions(
  input: EnhanceSearchResultsWithAISuggestionsInput
): Promise<EnhanceSearchResultsWithAISuggestionsOutput> {
  return enhanceSearchResultsWithAISuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceSearchResultsWithAISuggestionsPrompt',
  input: {schema: EnhanceSearchResultsWithAISuggestionsInputSchema},
  output: {schema: EnhanceSearchResultsWithAISuggestionsOutputSchema},
  prompt: `Based on the user's search term "{{searchTerm}}" and the initial search results "{{initialResults}}", suggest related search terms that the user might be interested in.
Provide at least 3 suggestions.
Do not repeat any of the terms in initialResults in the suggestedTerms.
Do not suggest terms unrelated to games, game genres, or game platforms.
Return the results as an array of strings.
`,
});

const enhanceSearchResultsWithAISuggestionsFlow = ai.defineFlow(
  {
    name: 'enhanceSearchResultsWithAISuggestionsFlow',
    inputSchema: EnhanceSearchResultsWithAISuggestionsInputSchema,
    outputSchema: EnhanceSearchResultsWithAISuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
