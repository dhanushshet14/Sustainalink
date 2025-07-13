'use server';
/**
 * @fileOverview A conversational AI agent for sustainability questions.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The chat history between the user and the model.'),
  message: z.string().describe('The user\'s latest message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user\'s message.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are SustainaBot, a helpful and friendly AI assistant for the SustainaLink platform. Your goal is to answer questions about sustainability, ESG metrics, and how to use the platform.

  Keep your answers concise and easy to understand.

  Here is the conversation history:
  {{#each history}}
  {{#if (eq this.role 'user')}}
  User: {{{this.content}}}
  {{else}}
  SustainaBot: {{{this.content}}}
  {{/if}}
  {{/each}}

  User: {{{message}}}
  SustainaBot:
  `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
