"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Hourglass } from "lucide-react";
import { ShuttlecockIcon } from "../icons/shuttlecock-icon";

const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;

export const CostsSchema = z.object({
  courtStartTime: z.string().regex(timeRegex, "Invalid time format (HH:MM)"),
  courtEndTime: z.string().regex(timeRegex, "Invalid time format (HH:MM)"),
  hourlyRate: z.coerce.number().min(0, "Rate must be positive"),
  shuttlecocksUsed: z.coerce.number().int().min(0, "Must be a whole number"),
  pricePerShuttlecock: z.coerce.number().min(0, "Price must be positive"),
}).refine(data => data.courtEndTime > data.courtStartTime, {
  message: "End time must be after start time",
  path: ["courtEndTime"],
});

type CostsFormValues = z.infer<typeof CostsSchema>;

interface Step1CostsProps {
  onSubmit: (data: CostsFormValues) => void;
  defaultValues?: CostsFormValues | null;
}

export function Step1Costs({ onSubmit, defaultValues }: Step1CostsProps) {
  const form = useForm<CostsFormValues>({
    resolver: zodResolver(CostsSchema),
    defaultValues: defaultValues || {
      courtStartTime: "19:00",
      courtEndTime: "21:00",
      hourlyRate: 0,
      shuttlecocksUsed: 0,
      pricePerShuttlecock: 0,
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Session Costs</CardTitle>
        <CardDescription>Enter the details about court rental and shuttlecocks used.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6 pb-6">
          
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold font-headline text-primary"><Hourglass className="h-5 w-5"/>Court Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="courtStartTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Court Start Time</FormLabel>
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
                name="courtEndTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Court End Time</FormLabel>
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
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate</FormLabel>
                     <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₭</span>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 20000" className="pl-9" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator />

          <div className="space-y-4">
             <h3 className="flex items-center gap-2 text-lg font-semibold font-headline text-primary"><ShuttlecockIcon className="h-5 w-5"/>Shuttlecock Costs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="shuttlecocksUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shuttlecocks Used</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricePerShuttlecock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per Shuttlecock</FormLabel>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₭</span>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 15000" className="pl-9" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Next: Add Players</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
