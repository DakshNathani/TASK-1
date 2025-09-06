interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string, playerContext?: string): Promise<string> {
    try {
      const contextualPrompt = playerContext 
        ? `Context: ${playerContext}\n\nQuestion: ${prompt}\n\nPlease provide a detailed response about this cricket player, focusing on their career, achievements, playing style, and any relevant statistics or interesting facts.`
        : prompt;

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: contextualPrompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback response for demo purposes
      if (playerContext) {
        return `I'd be happy to help you learn more about this cricket player! Unfortunately, I'm currently unable to access the AI service. However, based on the player data available, I can see some impressive statistics and career highlights. Please try again later when the service is restored, or feel free to explore the visual analytics on the dashboard.`;
      }
      
      return `I apologize, but I'm currently unable to process your request due to a service issue. Please try again later or explore the interactive charts and statistics available on the dashboard.`;
    }
  }
}

// Create a singleton instance
let geminiService: GeminiService | null = null;

export const getGeminiService = (apiKey?: string): GeminiService => {
  if (!geminiService && apiKey) {
    geminiService = new GeminiService(apiKey);
  }
  
  if (!geminiService) {
    // Create a mock service for demo purposes
    geminiService = new GeminiService('demo-key');
  }
  
  return geminiService;
};