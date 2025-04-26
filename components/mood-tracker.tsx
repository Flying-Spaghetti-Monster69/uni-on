"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, LineChart, Save } from "lucide-react";

type Mood = {
  date: Date;
  rating: number;
  notes: string;
};

export function MoodTracker() {
  const [moodRating, setMoodRating] = useState(5);
  const [moodNotes, setMoodNotes] = useState("");
  const [moodHistory, setMoodHistory] = useState<Mood[]>([
    {
      date: new Date(Date.now() - 86400000),
      rating: 7,
      notes: "Felt good after completing my assignment",
    },
    {
      date: new Date(Date.now() - 172800000),
      rating: 4,
      notes: "Stressed about upcoming exams",
    },
    {
      date: new Date(Date.now() - 259200000),
      rating: 6,
      notes: "Relaxed day, caught up with friends",
    },
  ]);

  const saveMood = () => {
    const newMood = {
      date: new Date(),
      rating: moodRating,
      notes: moodNotes,
    };
    setMoodHistory([newMood, ...moodHistory]);
    setMoodNotes("");
  };

  return (
    <div className="space-y-6">
      <Card className="border-teal-200 shadow-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-teal-700">
            How are you feeling today?
          </CardTitle>
          <CardDescription>Track your mood and emotional state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-sm text-blue-700">
              <span>Stressed</span>
              <span>Neutral</span>
              <span>Great</span>
            </div>
            <Slider
              value={[moodRating]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setMoodRating(value[0])}
              className="mb-4"
            />
            <div className="text-center text-lg font-medium text-teal-700">
              {moodRating < 4 ? "😔" : moodRating < 7 ? "😐" : "😊"}{" "}
              {moodRating}/10
            </div>
          </div>

          <Textarea
            placeholder="Add notes about how you're feeling today..."
            className="mb-4 border-teal-200"
            value={moodNotes}
            onChange={(e) => setMoodNotes(e.target.value)}
          />

          <Button
            onClick={saveMood}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            <Save className="mr-2 h-4 w-4" /> Save Today&apos;s Entry
          </Button>
        </CardContent>
      </Card>

      <Card className="border-blue-200 shadow-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-blue-700">Mood History</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200"
            >
              <LineChart className="h-4 w-4 mr-2" /> View Trends
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodHistory.map((mood, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-blue-50 border border-blue-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-blue-700">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {mood.date.toLocaleDateString()}
                  </div>
                  <div className="text-teal-700 font-medium">
                    {mood.rating < 4 ? "😔" : mood.rating < 7 ? "😐" : "😊"}{" "}
                    {mood.rating}/10
                  </div>
                </div>
                <p className="text-sm text-gray-600">{mood.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
