import { 
  GoogleGenerativeAI, 
  GoogleGenerativeAIFetchError, 
  GoogleGenerativeAIResponseError 
} from '@google/generative-ai';

const MODELS = [
  "gemini-flash-latest",
  "gemini-3.1-flash-lite-preview",
  "gemini-3-flash-preview",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
];

export interface GeminiResponse {
  poeticDescription: string;
  moodAnalysis: string;
  colorPalette: string[];
  markdownResponse: string;
}

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing VITE_GEMINI_API_KEY in .env.local");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async analyzeImage(base64Image: string, mimeType: string): Promise<GeminiResponse> {
    // Using the latest flash model as requested in the prioritized list
    const model = this.genAI.getGenerativeModel({ model: MODELS[0] });
    
    const prompt = `Analyze this image and provide a response in the following JSON format:
{
  "poeticDescription": "A poetic description of the scene.",
  "moodAnalysis": "The overall mood or vibe.",
  "colorPalette": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"]
}
Only return the JSON.`;

    const imageParts = [
      {
        inlineData: {
          data: base64Image.split(',')[1],
          mimeType
        },
      },
    ];

    try {
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const responseText = response.text();
      
      // Extract JSON block if model wraps it in markdown
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : responseText;
      
      const parsed = JSON.parse(jsonStr);
      return {
        ...parsed,
        markdownResponse: `### Poetic Description\n${parsed.poeticDescription}\n\n### Mood\n${parsed.moodAnalysis}`
      };
    } catch (e: any) {
      console.error("Gemini Analysis Error:", e);
      
      if (e instanceof GoogleGenerativeAIFetchError) {
        throw new Error(`Gemini API Error (${e.status}): ${e.message}`);
      }
      
      if (e instanceof GoogleGenerativeAIResponseError) {
        throw new Error(`Gemini Response Error: ${e.message}`);
      }

      if (e instanceof Error) {
        throw new Error(e.message);
      }
      
      throw new Error("An unexpected error occurred during image analysis.");
    }
  }
}
