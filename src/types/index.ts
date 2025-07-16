export type Player = {
  id: string;
  name: string;
  arrivalTime: string;
  departureTime: string;
};

export type Costs = {
  courtStartTime: string;
  courtEndTime: string;
  hourlyRate: number;
  shuttlecocksUsed: number;
  pricePerShuttlecock: number;
};

export type PlayerCost = {
  name: string;
  timePlayed: number; // in minutes
  cost: number;
};

export type CalculationResult = {
  totalCourtCost: number;
  totalShuttlecockCost: number;
  grandTotal: number;
  playerCosts: PlayerCost[];
  totalTimePlayed: number;
};
