"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatMinutes } from "@/lib/calculator";
import type { CalculationResult } from "@/types";
import { DollarSign, Hourglass, Lightbulb, Users, Info } from "lucide-react";
import { ShuttlecockIcon } from "../icons/shuttlecock-icon";

interface Step3ResultsProps {
  results: CalculationResult;
  aiSuggestion: { suggestedMethod: string; reasoning: string } | null;
  onStartOver: () => void;
}

export function Step3Results({ results, aiSuggestion, onStartOver }: Step3ResultsProps) {
  const { totalCourtCost, totalShuttlecockCost, grandTotal, playerCosts } = results;

  return (
    <div className="space-y-8">
      <CardHeader className="text-center px-0">
        <CardTitle className="font-headline text-3xl">Expense Report</CardTitle>
        <CardDescription>Here's the breakdown of all costs for your session.</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl"><DollarSign className="h-5 w-5 text-primary"/>Total Costs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2"><Hourglass className="h-4 w-4"/>Court Fee</span>
              <span className="font-semibold">{formatCurrency(totalCourtCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2"><ShuttlecockIcon className="h-4 w-4"/>Shuttlecock Cost</span>
              <span className="font-semibold">{formatCurrency(totalShuttlecockCost)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold text-primary">Grand Total</span>
              <span className="font-bold text-primary">{formatCurrency(grandTotal)}</span>
            </div>
          </CardContent>
        </Card>

        {aiSuggestion && (
          <Card className="bg-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl"><Lightbulb className="h-5 w-5 text-primary"/>AI Sharing Suggestion</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg">{aiSuggestion.suggestedMethod}</h3>
              <p className="text-sm text-muted-foreground mt-1">{aiSuggestion.reasoning}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-xl"><Users className="h-5 w-5 text-primary"/>Player Breakdown</CardTitle>
          <CardDescription>
            Costs are distributed proportionally based on each player's time on court.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Time Played</TableHead>
                <TableHead className="text-right">Amount to Pay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playerCosts.map((player) => (
                <TableRow key={player.name}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell className="text-right">{formatMinutes(player.timePlayed)}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">{formatCurrency(player.cost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="bg-accent/20 p-4 rounded-b-lg">
             <Info className="h-4 w-4 mr-2 text-muted-foreground" />
             <p className="text-xs text-muted-foreground">
                Total time played by all players: {formatMinutes(results.totalTimePlayed)}. 
                Individual costs are calculated as (Individual Time / Total Time) &times; Grand Total.
             </p>
        </CardFooter>
      </Card>
      
      <div className="text-center mt-8">
        <Button onClick={onStartOver}>Start New Calculation</Button>
      </div>
    </div>
  );
}
