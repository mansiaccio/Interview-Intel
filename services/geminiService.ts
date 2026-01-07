
import { GoogleGenAI, Type } from "@google/genai";
import { ResearchResult, JDData } from "../types";

export const performInterviewResearch = async (data: JDData): Promise<ResearchResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    I need you to perform deep research for the following job:
    Company: ${data.company}
    Role: ${data.role}
    Job Description Snippet: ${data.description}

    YOUR MISSION:
    Find REAL interview questions asked at ${data.company} for the role of ${data.role} (or closely related tech roles).
    Search across platforms like Glassdoor, AmbitionBox, GeeksforGeeks, InterviewBit, PrepInsta, and YouTube.

    CRITICAL CONSTRAINTS:
    1. DO NOT HALLUCINATE. Only provide questions that explicitly exist on the searched platforms.
    2. DO NOT EXTRAPOLATE. If you find only 3 questions, only provide 3. Do not make up "likely" questions.
    3. CITE SOURCES. Every question must be linked to where you found it.
    4. Focus on technical questions, coding challenges, and system design if applicable.

    FORMAT YOUR RESPONSE AS FOLLOWS:
    - Group questions by Category (e.g., Coding, System Design, Behavioral).
    - Provide the exact source URL for each finding.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1, // Low temperature for high precision
      },
    });

    const rawText = response.text || "No specific questions found.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract unique sources from grounding metadata
    const sources = chunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri || ""
      }));

    // Filter out duplicates
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => t.uri === v.uri) === i);

    return {
      role: data.role,
      company: data.company,
      questions: [], // We use rawText for rendering the structured Markdown output from Gemini
      sources: uniqueSources,
      rawText: rawText
    };
  } catch (error) {
    console.error("Gemini Research Error:", error);
    throw new Error("Failed to gather interview intelligence. Please check your connection or API key.");
  }
};
