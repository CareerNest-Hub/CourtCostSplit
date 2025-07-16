'use server';

import { suggestSharingMethod, SuggestSharingMethodInput } from '@/ai/flows/suggest-sharing-method';
import type { Player } from '@/types';

export async function getSharingSuggestion(
  players: Player[],
  shuttlecocksUsed: number
): Promise<{ suggestedMethod: string; reasoning: string } | { error: string }> {
  try {
    const input: SuggestSharingMethodInput = {
      playerTimestamps: players.map(p => ({
        playerName: p.name,
        arrivalTime: p.arrivalTime,
        departureTime: p.departureTime,
      })),
      shuttlecocksUsed: shuttlecocksUsed,
    };

    const result = await suggestSharingMethod(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get suggestion from AI.' };
  }
}
