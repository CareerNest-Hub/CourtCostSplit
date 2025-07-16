"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2, Users, Clock } from "lucide-react";

const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;

export const PlayersSchema = z.object({
  players: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      arrivalTime: z.string().regex(timeRegex, "Invalid time (HH:MM)"),
      departureTime: z.string().regex(timeRegex, "Invalid time (HH:MM)"),
    }).refine(data => data.departureTime > data.arrivalTime, {
      message: "Departure must be after arrival",
      path: ["departureTime"],
    })
  ).min(1, "At least one player is required."),
});

type PlayersFormValues = z.infer<typeof PlayersSchema>;

interface Step2PlayersProps {
  onSubmit: (data: PlayersFormValues) => void;
  onBack: () => void;
  defaultValues?: PlayersFormValues | null;
  courtStartTime?: string;
  courtEndTime?: string;
}

export function Step2Players({ onSubmit, onBack, defaultValues, courtStartTime = "19:00", courtEndTime = "21:00" }: Step2PlayersProps) {
  const form = useForm<PlayersFormValues>({
    resolver: zodResolver(PlayersSchema),
    defaultValues: defaultValues || {
      players: [{ name: "Player 1", arrivalTime: courtStartTime, departureTime: courtEndTime }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "players",
  });

  const handleAddPlayer = () => {
    const newPlayer = {
      name: `Player ${fields.length + 1}`,
      arrivalTime: courtStartTime,
      departureTime: courtEndTime,
    };
    append(newPlayer);
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Step 2: Player Details</CardTitle>
        <CardDescription>Add each player and their time on court.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6 pb-6">
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg relative bg-accent/30 shadow-sm">
                 <h3 className="flex items-center gap-2 mb-4 text-md font-semibold font-headline text-primary"><Users className="h-5 w-5"/>Player {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`players.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Player's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`players.${index}.arrivalTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Arrival Time</FormLabel>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input type="time" className="pl-9" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`players.${index}.departureTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Time</FormLabel>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                                <Input type="time" className="pl-9" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {fields.length > 1 && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => remove(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddPlayer}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Player
          </Button>

          <Separator />
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Calculate Expenses</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
