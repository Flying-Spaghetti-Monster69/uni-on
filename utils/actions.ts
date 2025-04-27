"use server";

import { PrismaClient } from "@prisma/client";
import { GoogleGenAI } from "@google/genai";
import { AI_INSIGHTS } from "./const";

const AI_ROLE =
  "You are a deer mascot for an app that helps students in college to avoid and help them with stress and burnout. You are friendly and helpful. You also help with academic questions.";

const prisma = new PrismaClient();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });

export async function getInsights(userId: string) {
  try {
    const fiveLastDailies = await prisma.dailyMood.findMany({
      orderBy: {
        created_At: "desc",
      },
      where: { userId: userId },
      take: 5,
    });
    const entries = JSON.stringify(fiveLastDailies);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${AI_INSIGHTS}
      entries: ${entries}
      `,
      config: {
        systemInstruction: AI_ROLE,
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

    return JSON.parse(responseText);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error getting ai`, error);
    return { error: "Failed to fetch data from the table." };
  }
}

export async function getMoodData(userId: string) {
  try {
    const moods = await prisma.dailyMood.findMany({
      where: { userId: userId },
    });
    return moods;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error fetching data from table`, error);
    return { error: "Failed to fetch data from the table." };
  }
}

export async function addMoodData(
  userId: string,
  { description, mood }: { description: string; mood: number }
) {
  try {
    const moods = await prisma.dailyMood.create({
      data: { userId: userId, description, mood },
    });
    return moods;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error posting data from table`, error);
    return { error: "Failed to fetch data from the table." };
  }
}
