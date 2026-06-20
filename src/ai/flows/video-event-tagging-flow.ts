'use server';
/**
 * @fileOverview An AI agent for detecting and tagging key events in soccer match video clips.
 *
 * - tagVideoEvents - A function that handles the video event tagging process.
 * - VideoEventTaggingInput - The input type for the tagVideoEvents function.
 * - VideoEventTaggingOutput - The return type for the tagVideoEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VideoEventTaggingInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A short match video clip, as a data URI that must include a MIME type (e.g., 'video/mp4') and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  contextDescription: z.string().optional().describe("Optional context or specific focus for event detection (e.g., 'looking for pressing actions in the defensive third')."),
});
export type VideoEventTaggingInput = z.infer<typeof VideoEventTaggingInputSchema>;

const VideoEventTaggingOutputSchema = z.object({
  events: z.array(
    z.object({
      eventType: z.enum(['goal', 'shot', 'turnover', 'pressing_action', 'other']).describe('The type of event detected.'),
      timestampSeconds: z.number().describe('The approximate timestamp of the event within the video clip in seconds, starting from 0.'),
      description: z.string().describe('A brief description of the event.'),
    })
  ).describe('A list of detected key events in the video clip.'),
});
export type VideoEventTaggingOutput = z.infer<typeof VideoEventTaggingOutputSchema>;

export async function tagVideoEvents(input: VideoEventTaggingInput): Promise<VideoEventTaggingOutput> {
  return videoEventTaggingFlow(input);
}

const videoEventTaggingPrompt = ai.definePrompt({
  name: 'videoEventTaggingPrompt',
  input: {schema: VideoEventTaggingInputSchema},
  output: {schema: VideoEventTaggingOutputSchema},
  // The 'googleai/gemini-2.5-flash-image' model is a multimodal model
  // and is assumed to be capable of interpreting short video clips for event detection.
  // The 'type' attribute in the media helper is crucial here to specify video content.
  prompt: `You are an expert soccer analyst. Your task is to analyze the provided video clip and identify key events.\nSpecifically, look for the following types of events: "goal", "shot", "turnover", "pressing_action".\nFor each identified event, provide its type, an approximate timestamp in seconds from the start of the clip, and a brief description.\nIf there is any additional context provided, use it to focus your analysis.\n\nContext: {{{contextDescription}}}\n\nVideo Clip: {{media url=videoDataUri type='video/mp4'}}\n\nOutput the events as a JSON array matching the specified schema.`,
});

const videoEventTaggingFlow = ai.defineFlow(
  {
    name: 'videoEventTaggingFlow',
    inputSchema: VideoEventTaggingInputSchema,
    outputSchema: VideoEventTaggingOutputSchema,
  },
  async (input) => {
    // Call the defined prompt with the input and specify the multimodal model
    // that can interpret video content, overriding the default Genkit model if necessary.
    const {output} = await videoEventTaggingPrompt(input, {
      model: 'googleai/gemini-2.5-flash-image', // Specify the multimodal model for video interpretation
      config: {
        responseModalities: ['TEXT'], // We expect JSON text output containing the event tags
      },
    });
    if (!output) {
      throw new Error('Failed to generate event tags from the video clip.');
    }
    return output;
  }
);
