import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const surveyResults = await req.json();
    console.log("Received survey results:", surveyResults);

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json({ error: "Gemini API key not configured." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
          responseMimeType: "application/json",
          // responseSchema: { ... } (선택 사항)
      }
    });

    const prompt = `Based on the following travel preferences, recommend a travel destination and itinerary in JSON format. Ensure the JSON is valid and directly parsable. Do not include any markdown or extra text outside the JSON object. Travel preferences: ${JSON.stringify(surveyResults)}`;
    
    const result = await model.generateContent(prompt);
    
    const geminiResponseText = result.response.text().trim(); // Corrected to .text()

    // Attempt to parse the text as JSON
    let recommendation;
    try {
      // Extract JSON string if wrapped in markdown
      const jsonMatch = geminiResponseText.match(/```json\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : geminiResponseText;
      
      recommendation = JSON.parse(jsonString); // Corrected assignment
    } catch (parseError) {
      console.error("Failed to parse Gemini API response as JSON:", geminiResponseText, parseError); // Corrected variable name
      return NextResponse.json({ error: "Invalid JSON response from Gemini API." }, { status: 500 });
    }

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("Error in recommendation API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
