"use client";

import { useState } from "react";
import type { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { CostsSchema, Step1Costs } from "./steps/step-1-costs";
import { PlayersSchema, Step2Players } from "./steps/step-2-players";
import { Step3Results } from "./steps/step-3-results";
import type { Player, CalculationResult } from "@/types";
import { getSharingSuggestion } from "@/app/actions";
import { calculateCosts } from "@/lib/calculator";

type CostsData = z.infer<typeof CostsSchema>;
type PlayersData = z.infer<typeof PlayersSchema>;

type AISuggestion = {
  suggestedMethod: string;
  reasoning: string;
};

export default function CourtCostSplitter() {
  const [step, setStep] = useState(1);
  const [costsData, setCostsData] = useState<CostsData | null>(null);
  const [playersData, setPlayersData] = useState<PlayersData | null>(null);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStep1Submit = (data: CostsData) => {
    setCostsData(data);
    setStep(2);
  };

  const handleStep2Submit = async (data: PlayersData) => {
    setPlayersData(data);
    setIsLoading(true);
    setStep(3);

    if (costsData) {
      const calculated = calculateCosts(costsData, data.players);
      setResults(calculated);

      const suggestion = await getSharingSuggestion(data.players, costsData.shuttlecocksUsed);
      if ("suggestedMethod" in suggestion) {
        setAiSuggestion(suggestion);
      } else {
        // Handle error case if needed
        console.error(suggestion.error);
         setAiSuggestion({
            suggestedMethod: "Error",
            reasoning: "Could not fetch AI suggestion. Please check your connection or try again later.",
        });
      }
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleStartOver = () => {
    setStep(1);
    setCostsData(null);
    setPlayersData(null);
    setResults(null);
    setAiSuggestion(null);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
            <Step1Costs onSubmit={handleStep1Submit} defaultValues={costsData} />
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
            <Step2Players onSubmit={handleStep2Submit} onBack={handleBack} defaultValues={playersData} />
          </motion.div>
        );
      case 3:
        if (isLoading) {
          return (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center p-10 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-headline font-semibold">Calculating...</h2>
              <p className="text-muted-foreground">Running the numbers and asking the AI for advice!</p>
            </motion.div>
          );
        }
        return (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {results && <Step3Results results={results} aiSuggestion={aiSuggestion} onStartOver={handleStartOver} />}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl shadow-lg border-border/50 transition-all duration-300">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
