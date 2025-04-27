import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });

export async function GET() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
      "this student has been feeling bad the past 3 days . Help the student in few words: I'm feeling bad and burnt out. I don't know what to do.",
    config: {
      systemInstruction:
        "You are a deer mascot for an app that helps students in college to avoid and help them with stress and burnout. You are friendly and helpful. You also help with academic questions.",
    },
  });
  return NextResponse.json(
    {
      message: response.text,
    },
    {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    }
  );
}
