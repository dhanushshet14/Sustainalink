'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating sustainability recommendations.
 *
 * - generateSustainabilityRecommendations - A function that generates sustainability recommendations.
 * - GenerateSustainabilityRecommendationsInput - The input type for the generateSustainabilityRecommendations function.
 * - GenerateSustainabilityRecommendationsOutput - The return type for the generateSustainabilityRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSustainabilityRecommendationsInputSchema = z.object({
  businessDescription: z.string().describe('A description of the user\u0027s business, including its industry, size, and current sustainability practices.'),
  goals: z.string().describe('The user\u0027s sustainability goals.'),
});
export type GenerateSustainabilityRecommendationsInput = z.infer<typeof GenerateSustainabilityRecommendationsInputSchema>;

const GenerateSustainabilityRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      area: z.string().describe('The area of the business the recommendation applies to (e.g., energy, waste, supply chain).'),
      recommendation: z.string().describe('A specific, actionable recommendation for improving sustainability in the specified area.'),
      impact: z.string().describe('A description of the potential environmental and/or economic impact of implementing the recommendation.'),
    })
  ).describe('A list of sustainability recommendations for the user\u0027s business.'),
});
export type GenerateSustainabilityRecommendationsOutput = z.infer<typeof GenerateSustainabilityRecommendationsOutputSchema>;

export async function generateSustainabilityRecommendations(input: GenerateSustainabilityRecommendationsInput): Promise<GenerateSustainabilityRecommendationsOutput> {
  return generateSustainabilityRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSustainabilityRecommendationsPrompt',
  input: {schema: GenerateSustainabilityRecommendationsInputSchema},
  output: {schema: GenerateSustainabilityRecommendationsOutputSchema},
  prompt: `You are a sustainability consultant providing recommendations to businesses.

  Based on the following information about the business and their goals, provide a list of specific, actionable recommendations for improving sustainability. For each recommendation, also provide a description of the potential environmental and/or economic impact of implementing the recommendation.

  Business Description: {{{businessDescription}}}
  Sustainability Goals: {{{goals}}}

  Format your output as a JSON array of objects, where each object has the keys \"area\", \"recommendation\", and \"impact\".  The \"area\" is the area of the business the recommendation applies to (e.g., energy, waste, supply chain). The \"recommendation\" is a specific, actionable recommendation for improving sustainability in the specified area. The \"impact\" is a description of the potential environmental and/or economic impact of implementing the recommendation.
  `,
});

const generateSustainabilityRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateSustainabilityRecommendationsFlow',
    inputSchema: GenerateSustainabilityRecommendationsInputSchema,
    outputSchema: GenerateSustainabilityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
