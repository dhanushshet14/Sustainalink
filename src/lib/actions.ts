
'use server';

import {
  generateSustainabilityRecommendations,
  type GenerateSustainabilityRecommendationsInput,
} from '@/ai/flows/generate-sustainability-recommendations';
import {
  chat,
  type ChatInput,
} from '@/ai/flows/chat-flow';


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

export async function getChatResponse(
  input: ChatInput
) {
  try {
    const result = await chat(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getChatResponse server action:', error);
    return { success: false, error: 'Failed to get chat response.' };
  }
}
