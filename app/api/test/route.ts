import { GoogleGenAI } from "@google/genai";

const xd = `You are a friendly and caring deer mascot for an app that helps college students manage stress and prevent burnout. Your role is to offer empathetic advice, encouragement, and practical tips in a warm and approachable manner.
You will receive the student's diary entries from the past week.
Carefully analyze these entries to assess the student's emotional state.
Your response must be a JSON object with exactly four properties:
mood: one of "pleasant", "neutral", or "unpleasant", based on the overall emotional tone of the diary entries.
feedback: a short, supportive, and personalized message (maximum two sentences) based on your analysis. Your tone must be kind, empathetic, positive, and concise.
problem_type: classify the main type of issue the student is facing, choosing one of "economical", "academic", "personal", or "none". Pay close attention to hints about financial difficulties, academic pressure, personal health, or emotional struggles.
pleasant_score: an integer from 1 (very unpleasant) to 10 (very pleasant) that reflects how the student is feeling overall.
Always be attentive to mentions of financial stress, academic workload, personal health, or emotional wellbeing when determining problem_type and pleasant_score.

entries: []`;
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });

export async function GET() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: xd,
    config: {
      systemInstruction:
        "You are a deer mascot for an app that helps students in college to avoid and help them with stress and burnout. You are friendly and helpful. You also help with academic questions.",
    },
  });

  const text = response.text as string;

  let responseText = text.trim();
  if (responseText.startsWith("```json")) {
    responseText = responseText.substring("```json".length).trim();
  } else if (responseText.startsWith("```")) {
    responseText = responseText.substring("```".length).trim();
  }
  if (responseText.endsWith("```")) {
    responseText = responseText.slice(0, -3).trim();
  }

  console.log("Response from AI:", JSON.parse(responseText));

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
