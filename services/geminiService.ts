import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are an expert editor specializing in transforming AI-generated text into natural, human-like content.
Your task is to rewrite the provided text, ensuring it retains the original meaning while adopting a more authentic human voice.
Key objectives:
1.  **Vary Sentence Structure:** Mix long, complex sentences with shorter, punchier ones. Avoid monotonous sentence patterns common in AI writing.
2.  **Use Natural Language:** Incorporate common idioms, phrasal verbs, and contractions (e.g., "don't" instead of "do not") where appropriate.
3.  **Inject Personality:** Introduce a subtle tone, whether it's conversational, persuasive, or analytical, depending on the context. Avoid being robotic and overly formal.
4.  **Improve Flow:** Ensure smooth transitions between ideas. Use connecting phrases that a human writer would naturally use.
5.  **Eliminate AI Hallmarks:** Remove repetitive phrases, redundant explanations, and overly generic statements like "In conclusion," or "It is important to note that...".
6.  **Ensure Originality:** The output must be free of any AI watermarking, embedding symbols, or hidden patterns. It should be completely original and pass AI detection tools.
Your output should be ONLY the rewritten text, without any preamble or explanation.`;

export const humanizeText = async (text: string, temperature: number, topP: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: text,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature,
            topP,
        }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to humanize text. The API might be temporarily unavailable.");
  }
};