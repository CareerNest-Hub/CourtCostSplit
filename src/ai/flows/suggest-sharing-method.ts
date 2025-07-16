'use server';

/**
 * @fileOverview Suggests an appropriate expense sharing method based on player times and shuttlecock usage.
 *
 * - suggestSharingMethod - A function that suggests the sharing method.
 * - SuggestSharingMethodInput - The input type for the suggestSharingMethod function.
 * - SuggestSharingMethodOutput - The return type for the suggestSharingMethod function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSharingMethodInputSchema = z.object({
  playerTimestamps: z.array(
    z.object({
      playerName: z.string().describe('The name of the player.'),
      arrivalTime: z.string().describe('The arrival time of the player (e.g., 19:00).'),
      departureTime: z.string().describe('The departure time of the player (e.g., 21:00).'),
    })
  ).describe('An array of player names with arrival and departure timestamps.'),
  shuttlecocksUsed: z.number().describe('The number of shuttlecocks used during the session.'),
});
export type SuggestSharingMethodInput = z.infer<typeof SuggestSharingMethodInputSchema>;

const SuggestSharingMethodOutputSchema = z.object({
  suggestedMethod: z.string().describe('The suggested method for sharing expenses (e.g., equally, proportionally by time, etc.).'),
  reasoning: z.string().describe('The reasoning behind the suggested sharing method.'),
});
export type SuggestSharingMethodOutput = z.infer<typeof SuggestSharingMethodOutputSchema>;

export async function suggestSharingMethod(input: SuggestSharingMethodInput): Promise<SuggestSharingMethodOutput> {
  return suggestSharingMethodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSharingMethodPrompt',
  input: {schema: SuggestSharingMethodInputSchema},
  output: {schema: SuggestSharingMethodOutputSchema},
  prompt: `Given the following information about a badminton session, suggest an appropriate method for sharing the expenses and explain your reasoning.

Player Timestamps:
{{#each playerTimestamps}}
  - Player: {{playerName}}, Arrival: {{arrivalTime}}, Departure: {{departureTime}}
{{/each}}

Shuttlecocks Used: {{shuttlecocksUsed}}

Consider factors such as the duration each player was present and the consumption of shared resources like shuttlecocks when determining the fairest sharing method.
`,
});

const suggestSharingMethodFlow = ai.defineFlow(
  {
    name: 'suggestSharingMethodFlow',
    inputSchema: SuggestSharingMethodInputSchema,
    outputSchema: SuggestSharingMethodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
