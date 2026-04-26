'use server';
/**
 * @fileOverview An AI agent that provides a summary, advantages, and disadvantages for candidate neighborhoods
 * for dual-income couples, considering commute balance and local amenities.
 *
 * - summarizeNeighborhoodAnalysis - A function that handles the neighborhood analysis summary process.
 * - SummarizeNeighborhoodAnalysisInput - The input type for the summarizeNeighborhoodAnalysis function.
 * - SummarizeNeighborhoodAnalysisOutput - The return type for the summarizeNeighborhoodAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CommuteDetailSchema = z.object({
  durationMinutes: z.number().describe('Commute duration in minutes.'),
  mode: z
    .string()
    .describe(
      'Transportation mode (e.g., "public_transport", "car", "walking", "cycling").'
    ),
  transfers:
    z.number().optional().describe('Number of transfers for public transportation.'),
});

const NeighborhoodInputSchema = z.object({
  name: z.string().describe('Name of the neighborhood.'),
  partner1Commute: CommuteDetailSchema.describe('Commute details for partner 1.'),
  partner2Commute: CommuteDetailSchema.describe('Commute details for partner 2.'),
  amenities:
    z
      .array(z.string())
      .describe(
        'List of key amenities and features in the neighborhood (e.g., "근처 어린이집", "공원 많음", "야간 치안 A등급", "신축 아파트").'
      ),
});

export const SummarizeNeighborhoodAnalysisInputSchema = z.object({
  neighborhoods:
    z
      .array(NeighborhoodInputSchema)
      .describe('List of candidate neighborhoods with their details.'),
  workplace1:
    z.string().describe('Address or general location of partner 1\'s workplace for context.'),
  workplace2:
    z.string().describe('Address or general location of partner 2\'s workplace for context.'),
});
export type SummarizeNeighborhoodAnalysisInput = z.infer<
  typeof SummarizeNeighborhoodAnalysisInputSchema
>;

const NeighborhoodSummaryOutputSchema = z.object({
  neighborhoodName: z.string().describe('Name of the neighborhood.'),
  summary:
    z
      .string()
      .describe(
        'A comprehensive summary highlighting the overall compatibility and characteristics of the neighborhood for a dual-income couple.'
      ),
  advantages:
    z
      .array(z.string())
      .describe(
        'Key advantages of the neighborhood for a dual-income couple, considering commute and amenities.'
      ),
  disadvantages:
    z
      .array(z.string())
      .describe(
        'Key disadvantages or potential drawbacks of the neighborhood for a dual-income couple.'
      ),
});

export const SummarizeNeighborhoodAnalysisOutputSchema = z
  .array(NeighborhoodSummaryOutputSchema)
  .describe('An array of AI-generated summaries for each candidate neighborhood.');
export type SummarizeNeighborhoodAnalysisOutput = z.infer<
  typeof SummarizeNeighborhoodAnalysisOutputSchema
>;

const summarizeNeighborhoodPrompt = ai.definePrompt({
  name: 'summarizeNeighborhoodPrompt',
  input: { schema: SummarizeNeighborhoodAnalysisInputSchema },
  output: { schema: SummarizeNeighborhoodAnalysisOutputSchema },
  prompt: `
당신은 한국 30대-40대 맞벌이 부부를 위한 동네 궁합 전문 컨설턴트입니다.
두 직장 주소(${'{{{workplace1}}}'}, ${'{{{workplace2}}'})를 고려하여 제시된 각 동네에 대해 출퇴근 균형, 편의시설, 안전 등 생활 인프라를 바탕으로 심층 분석하여 동네별 핵심 장점, 단점 및 종합 요약을 한국어로 제공하세요.
객관적이고 유용한 정보를 제공하여 맞벌이 부부의 거주지 결정에 도움이 되도록 하세요.

각 동네 정보는 다음과 같습니다:

{{#each neighborhoods}}
## 동네 이름: ${'{{{name}}}'}

**배우자 1 (${'{{{workplace1}}}'}) 출퇴근 정보:**
  - 소요 시간: ${'{{{partner1Commute.durationMinutes}}}'}분
  - 교통 수단: ${'{{{partner1Commute.mode}}}'}
  {{#if partner1Commute.transfers}}
  - 환승 횟수: ${'{{{partner1Commute.transfers}}}'}회
  {{/if}}

**배우자 2 (${'{{{workplace2}}}'}) 출퇴근 정보:**
  - 소요 시간: ${'{{{partner2Commute.durationMinutes}}}'}분
  - 교통 수단: ${'{{{partner2Commute.mode}}}'}
  {{#if partner2Commute.transfers}}
  - 환승 횟수: ${'{{{partner2Commute.transfers}}}'}회
  {{/if}}

**주요 편의 시설 및 특징:** ${'{{{amenities}}}'}

---
{{/each}}
`,
});

const summarizeNeighborhoodAnalysisFlow = ai.defineFlow(
  {
    name: 'summarizeNeighborhoodAnalysisFlow',
    inputSchema: SummarizeNeighborhoodAnalysisInputSchema,
    outputSchema: SummarizeNeighborhoodAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await summarizeNeighborhoodPrompt(input);
    return output!;
  }
);

export async function summarizeNeighborhoodAnalysis(
  input: SummarizeNeighborhoodAnalysisInput
): Promise<SummarizeNeighborhoodAnalysisOutput> {
  return summarizeNeighborhoodAnalysisFlow(input);
}
