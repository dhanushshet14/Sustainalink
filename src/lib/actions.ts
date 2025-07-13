
'use server';

import {
  generateSustainabilityRecommendations,
  type GenerateSustainabilityRecommendationsInput,
} from '@/ai/flows/generate-sustainability-recommendations';

export async function getAIRecommendations(
  input: GenerateSustainabilityRecommendationsInput
) {
  try {
    const result = await generateSustainabilityRecommendations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getAIRecommendations server action:', error);
    return { success: false, error: 'Failed to generate recommendations.' };
  }
}
