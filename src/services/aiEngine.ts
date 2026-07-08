import { OpenAI } from 'openai';
import { ICrowdMetrics, IAIOperationalResponse } from '../interfaces/operations';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateOperationalDecision = async (metrics: ICrowdMetrics): Promise<IAIOperationalResponse> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'You are a FIFA World Cup 2026 Operational Intelligence system. Provide deterministic, structured traffic solutions.' 
        },
        { 
          role: 'user', 
          content: `Analyze these metrics: ${JSON.stringify(metrics)}. Provide a redirect route and multilingual staff alerts.` 
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1
    });

    return JSON.parse(response.choices[0].message.content || '{}') as IAIOperationalResponse;
  } catch (error) {
    return {
      actionRequired: metrics.currentDensity > 4.0,
      optimizedRoute: 'Divert to Alternate Outer Perimeter Gate',
      staffAlertMultilingual: { en: 'Clear gate immediately', es: 'Despejar la puerta de inmediato', fr: 'Vider la porte immédiatement' },
      sustainabilityNote: 'Minimize idling transport vehicles near crowded zone.'
    };
  }
};
