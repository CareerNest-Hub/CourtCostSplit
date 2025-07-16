import type { Costs, Player, CalculationResult } from '@/types';

function timeToMinutes(time: string): number {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatMinutes(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    let result = '';
    if (h > 0) result += `${h} hr${h > 1 ? 's' : ''} `;
    if (m > 0) result += `${m} min${m > 1 ? 's' : ''}`;
    return result.trim();
}

export function calculateCosts(costs: Costs, players: Player[]): CalculationResult {
  const courtStartTimeMinutes = timeToMinutes(costs.courtStartTime);
  const courtEndTimeMinutes = timeToMinutes(costs.courtEndTime);
  const courtDurationMinutes = Math.max(0, courtEndTimeMinutes - courtStartTimeMinutes);
  
  const totalCourtCost = (courtDurationMinutes / 60) * costs.hourlyRate;
  const totalShuttlecockCost = costs.shuttlecocksUsed * costs.pricePerShuttlecock;
  const grandTotal = totalCourtCost + totalShuttlecockCost;

  let totalTimePlayed = 0;

  const playerDetails = players.map(player => {
    const arrivalTime = timeToMinutes(player.arrivalTime);
    const departureTime = timeToMinutes(player.departureTime);
    // Ensure player time is within court time
    const effectiveArrival = Math.max(arrivalTime, courtStartTimeMinutes);
    const effectiveDeparture = Math.min(departureTime, courtEndTimeMinutes);
    
    const timePlayed = Math.max(0, effectiveDeparture - effectiveArrival);
    totalTimePlayed += timePlayed;
    return { ...player, timePlayed };
  });

  const playerCosts = playerDetails.map(player => {
    const proportionalCost = totalTimePlayed > 0 ? (player.timePlayed / totalTimePlayed) * grandTotal : 0;
    return {
      name: player.name,
      timePlayed: player.timePlayed,
      cost: proportionalCost,
    };
  });

  return {
    totalCourtCost,
    totalShuttlecockCost,
    grandTotal,
    playerCosts,
    totalTimePlayed,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export { timeToMinutes, formatMinutes };
