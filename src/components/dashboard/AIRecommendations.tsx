'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition } from 'react';
import { getAIRecommendations } from '@/lib/actions';
import type { GenerateSustainabilityRecommendationsOutput } from '@/ai/flows/generate-sustainability-recommendations';
import { Loader2, Sparkles, Target, Trees, Zap } from 'lucide-react';

const formSchema = z.object({
  businessDescription: z.string().min(20, {
    message: 'Please provide a more detailed description (min 20 characters).',
  }),
  goals: z
    .string()
    .min(10, { message: 'Please describe your goals (min 10 characters).' }),
});

export function AIRecommendations() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [recommendations, setRecommendations] =
    useState<GenerateSustainabilityRecommendationsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessDescription: '',
      goals: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setRecommendations(null);
    startTransition(async () => {
      const result = await getAIRecommendations(values);
      if (result.success && result.data) {
        setRecommendations(result.data);
        toast({
          title: 'Recommendations Generated!',
          description: 'Your personalized sustainability plan is ready.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no! Something went wrong.',
          description: result.error,
        });
      }
    });
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">AI Recommendations</CardTitle>
        </div>
        <CardDescription>
          Describe your business and goals to get personalized sustainability advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., A medium-sized coffee shop chain focusing on locally sourced beans."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sustainability Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Reduce packaging waste by 50% and switch to renewable energy."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Advice
            </Button>
          </form>
        </Form>
      </CardContent>
      {isPending && (
         <CardFooter className="flex flex-col items-center justify-center p-8 text-center">
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
            <p className="font-semibold">Generating Recommendations...</p>
            <p className="text-sm text-muted-foreground">Our AI is crafting your plan. This may take a moment.</p>
        </CardFooter>
      )}
      {recommendations && (
        <CardFooter>
          <Accordion type="single" collapsible className="w-full">
            {recommendations.recommendations.map((rec, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        {rec.area.toLowerCase().includes('energy') ? <Zap className="h-5 w-5 text-accent" /> : <Trees className="h-5 w-5 text-accent" />}
                        {rec.area}: {rec.recommendation.substring(0, 50)}...
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 px-2">
                    <div>
                        <h4 className="font-semibold text-foreground">Recommendation:</h4>
                        <p className="text-muted-foreground">{rec.recommendation}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground flex items-center gap-2"><Target className="h-5 w-5"/>Impact:</h4>
                        <p className="text-muted-foreground">{rec.impact}</p>
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardFooter>
      )}
    </Card>
  );
}
