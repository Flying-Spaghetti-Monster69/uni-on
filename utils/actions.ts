// app/actions/getTableData.ts
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
