"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Save } from "lucide-react";
import { addMoodData, getMoodData } from "@/utils/actions";

type DailyMood = {
  id: number;
  description: string;
  mood: number;
  created_At: Date;
  updated_At: Date;
  userId: string;
};

enum state {
  ready = "save entry",
  loading = "loading",
  done = "daily entry saved",
}

export function WellbeingTracker({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState("today");
  const [moodRating, setMoodRating] = useState(5);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<DailyMood[]>([]);
  const [moodState, setMoodState] = useState<state>(state.ready);
  const [loading, setIsLoading] = useState(false);

  const getEntries = useCallback(async () => {
    try {
      const moods = await getMoodData(userId);
      setEntries(moods as DailyMood[]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    if (activeTab === "history") {
      setIsLoading(true);
      getEntries();
    }
  }, [activeTab, getEntries, userId]);

  const getMoodEmoji = (rating: number) => {
    if (rating <= 3) return "😔";
    if (rating <= 6) return "😐";
    return "😊";
  };

  const handleEntry = () => {
    addMoodData(userId, {
      description: notes,
      mood: moodRating,
    }).then(async () => {
      await getEntries();
      setMoodState(state.done);
    });
  };

  function getCurrentDateString(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <Card className="border-primary-theme shadow-md bg-white backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary-theme text-xl">
          Daily Wellbeing Check
        </CardTitle>
        <CardDescription>Track how you&apos;re feeling today</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="today"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 mb-4 bg-tertiary-theme/50">
            <TabsTrigger
              value="today"
              className="data-[state=active]:bg-secundary-theme data-[state=active]:text-white"
            >
              Today&apos;s Entry
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-secundary-theme data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-0 space-y-4">
            <div className="flex justify-between mb-1 text-sm text-secundary-theme">
              <span>Mood</span>
              <span>
                {getMoodEmoji(moodRating)} {moodRating}/10
              </span>
            </div>
            <Slider
              value={[moodRating]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setMoodRating(value[0])}
              className="mb-4"
            />

            <Textarea
              placeholder="How are you feeling today? Any specific challenges or achievements?"
              className="min-h-[80px] border-secundary-theme"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <Button
              disabled={moodState !== state.ready}
              onClick={() => {
                setMoodState(state.loading);
                handleEntry();
                setNotes("");
                setMoodRating(5);
              }}
              className="w-full bg-secundary-theme hover:bg-secundary-theme/80 cursor-pointer
              "
            >
              <Save className="mr-2 h-4 w-4" /> {moodState}
            </Button>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {loading ? (
                <p>loading...</p>
              ) : (
                entries.map((entry, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-violet-50 border border-primary-theme"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-sm text-primary-theme">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        {getCurrentDateString(entry.created_At)}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-center p-1 bg-white rounded border border-primary-theme">
                        <div className="text-sm font-medium">Mood</div>
                        <div>
                          {getMoodEmoji(entry.mood)} {entry.mood}/10
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {entry.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
