import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// Using gemini-1.5-flash as the stable flash model
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

export interface EnglishData {
    title: string;
    description: string;
    targetCountry: string;
    fieldOfStudy: string[];
    eligibleRegions: string[];
}

export interface TranslatedData {
    uzTitle: string;
    uzDescription: string;
    uzCountry: string;
    uzFields: string[];
    uzRegions: string[];
}

export async function getAutoTranslation(data: EnglishData): Promise<TranslatedData> {
    const prompt = `Translate the following scholarship object into Uzbek. 
  Return a JSON object with keys: uzTitle, uzDescription, uzCountry, uzFields, uzRegions. 
  Keep list lengths for uzFields and uzRegions identical to the input.
  
  Input Data:
  Title: ${data.title}
  Description: ${data.description}
  Country: ${data.targetCountry}
  Fields: ${JSON.stringify(data.fieldOfStudy)}
  Regions: ${JSON.stringify(data.eligibleRegions)}
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return JSON.parse(text) as TranslatedData;
    } catch (error) {
        console.error("Gemini translation error:", error);
        throw new Error("Failed to translate data via Gemini");
    }
}
