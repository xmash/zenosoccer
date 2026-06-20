'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating AI-driven player selection recommendations.
 *
 * - playerSelectionRecommendations - A function that handles the AI player selection recommendations process.
 * - PlayerSelectionRecommendationsInput - The input type for the playerSelectionRecommendations function.
 * - PlayerSelectionRecommendationsOutput - The return type for the playerSelectionRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlayerInputSchema = z.object({
  id: z.string().describe('Unique identifier for the player.'),
  name: z.string().describe('Full name of the player.'),
  age: z.number().describe('Age of the player.'),
  currentTeam: z.string().describe('The name of the player\'s current team.'),
  position: z.string().describe('Primary playing position (e.g., "CM", "ST", "CB").'),
  preferredFoot: z.string().describe('Preferred foot of the player (e.g., "Right", "Left", "Both").'),
  developmentScore: z.number().describe('A score indicating overall player development (0-100).'),
  performanceRating: z.number().describe('Average performance rating from recent matches/sessions (0-10).'),
  availabilityStatus: z.string().describe('Current availability status (e.g., "Available", "Injured", "Suspended").'),
  potential: z.string().describe('Potential rating for the player (e.g., "High", "Medium", "Low").'),
  notes: z.string().optional().describe('Any additional coach notes or observations.')
});

const TeamInputSchema = z.object({
  id: z.string().describe('Unique identifier for the team.'),
  name: z.string().describe('Name of the team (e.g., "U14 Elite", "U16 MLS Next").'),
  ageGroup: z.string().describe('Age group of the team (e.g., "U14", "U16").'),
  rosterPlayerIds: z.array(z.string()).describe('List of player IDs currently on this team\'s roster.'),
  leagueDivision: z.string().describe('League or division the team competes in.'),
  coachAssignments: z.array(z.string()).describe('Names of coaches assigned to this team.'),
  tacticalNeeds: z.array(z.string()).optional().describe('Specific tactical needs or gaps for this team (e.g., "needs a creative midfielder", "lacks defensive depth").')
});

const PlayerSelectionRecommendationsInputSchema = z.object({
  players: z.array(PlayerInputSchema).describe('A comprehensive list of all players in the club with their details.'),
  teams: z.array(TeamInputSchema).describe('A comprehensive list of all teams in the club with their details.'),
  context: z.string().describe('Specific context or focus for the recommendations, e.g., "Identify players ready for U16 MLS Next" or "Suggest roster changes for U14 Elite team".')
});
export type PlayerSelectionRecommendationsInput = z.infer<typeof PlayerSelectionRecommendationsInputSchema>;

const PlayerRecommendationSchema = z.object({
  playerId: z.string().describe('The unique identifier of the player involved in the recommendation.'),
  playerName: z.string().describe('The full name of the player.'),
  currentTeam: z.string().describe('The player\'s current team.'),
  recommendedTeam: z.string().optional().describe('The team being recommended for the player (if applicable).'),
  type: z.enum(['Promotion', 'Roster Change', 'Academy Progression', 'Development Focus']).describe('The type of recommendation (e.g., "Promotion", "Roster Change", "Academy Progression", "Development Focus").'),
  suggestedAction: z.string().describe('A clear, actionable suggestion (e.g., "Promote to U16 MLS Next", "Move to U14 Elite", "Focus on ball control drills").'),
  reasoning: z.string().describe('A detailed explanation and justification for the recommendation, citing player attributes and team needs.')
});

const PlayerSelectionRecommendationsOutputSchema = z.object({
  recommendations: z.array(PlayerRecommendationSchema).describe('A list of AI-driven player selection and development recommendations.')
});
export type PlayerSelectionRecommendationsOutput = z.infer<typeof PlayerSelectionRecommendationsOutputSchema>;

export async function playerSelectionRecommendations(input: PlayerSelectionRecommendationsInput): Promise<PlayerSelectionRecommendationsOutput> {
  return playerSelectionRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'playerSelectionRecommendationsPrompt',
  input: {schema: PlayerSelectionRecommendationsInputSchema},
  output: {schema: PlayerSelectionRecommendationsOutputSchema},
  prompt: `You are an expert Soccer Technical Director AI Assistant. Your task is to analyze player and team data to provide actionable recommendations for player movements, academy progression, and roster optimization.\n\nHere is the comprehensive player data:\n{{{JSON.stringify players}}}\n\nHere is the comprehensive team data:\n{{{JSON.stringify teams}}}\n\nBased on the provided data and the following specific context, generate a list of player recommendations:\n\nContext: {{{context}}}\n\nProvide recommendations that include the player's ID, name, current team, the type of recommendation (e.g., 'Promotion', 'Roster Change', 'Academy Progression', 'Development Focus'), a clear suggested action, and a detailed reasoning for each recommendation. Consider player age, development score, performance rating, potential, and team needs.`
});

const playerSelectionRecommendationsFlow = ai.defineFlow(
  {
    name: 'playerSelectionRecommendationsFlow',
    inputSchema: PlayerSelectionRecommendationsInputSchema,
    outputSchema: PlayerSelectionRecommendationsOutputSchema
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
