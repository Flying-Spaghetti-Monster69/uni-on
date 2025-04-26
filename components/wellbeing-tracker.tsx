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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, LineChart, Save, ChevronRight } from "lucide-react";

type WellbeingEntry = {
  date: Date;
  mood: number;
  energy: number;
  stress: number;
  notes: string;
};

export function WellbeingTracker() {
  const [activeTab, setActiveTab] = useState("today");
  const [moodRating, setMoodRating] = useState(7);
  const [energyRating, setEnergyRating] = useState(6);
  const [stressRating, setStressRating] = useState(4);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<WellbeingEntry[]>([
    {
      date: new Date(Date.now() - 86400000),
      mood: 8,
      energy: 7,
      stress: 3,
      notes: "Completed my assignment early. Feeling good about my progress.",
    },
    {
      date: new Date(Date.now() - 172800000),
      mood: 5,
      energy: 4,
      stress: 7,
      notes: "Exam preparation is stressful. Need to manage my time better.",
    },
    {
      date: new Date(Date.now() - 259200000),
      mood: 6,
      energy: 6,
      stress: 5,
      notes: "Group project meeting went well. Still need to finish my part.",
    },
  ]);

  const saveEntry = () => {
    const newEntry: WellbeingEntry = {
      date: new Date(),
      mood: moodRating,
      energy: energyRating,
      stress: stressRating,
      notes: notes,
    };
    setEntries([newEntry, ...entries]);
    setNotes("");
  };

  const getMoodEmoji = (rating: number) => {
    if (rating <= 3) return "😔";
    if (rating <= 6) return "😐";
    return "😊";
  };

  const getEnergyEmoji = (rating: number) => {
    if (rating <= 3) return "🔋";
    if (rating <= 6) return "🔋🔋";
    return "🔋🔋🔋";
  };

  const getStressEmoji = (rating: number) => {
    if (rating <= 3) return "😌";
    if (rating <= 6) return "😓";
    return "😰";
  };

  return (
    <Card className="border-teal-200 shadow-md bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-teal-700 text-lg">
          Psychological Wellbeing
        </CardTitle>
        <CardDescription>Track how you&apos;re feeling today</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="today"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 mb-4 bg-teal-100/50">
            <TabsTrigger
              value="today"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              Today&apos;s Entry
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-0 space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm text-teal-700">
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

              <div className="flex justify-between mb-1 text-sm text-teal-700">
                <span>Energy</span>
                <span>
                  {getEnergyEmoji(energyRating)} {energyRating}/10
                </span>
              </div>
              <Slider
                value={[energyRating]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setEnergyRating(value[0])}
                className="mb-4"
              />

              <div className="flex justify-between mb-1 text-sm text-teal-700">
                <span>Stress Level</span>
                <span>
                  {getStressEmoji(stressRating)} {stressRating}/10
                </span>
              </div>
              <Slider
                value={[stressRating]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setStressRating(value[0])}
                className="mb-4"
              />
            </div>

            <Textarea
              placeholder="How are you feeling today? Any specific challenges or achievements?"
              className="min-h-[80px] border-teal-200"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <Button
              onClick={saveEntry}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              <Save className="mr-2 h-4 w-4" /> Save Today&apos;s Entry
            </Button>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-teal-50 border border-teal-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm text-teal-700">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      {entry.date.toLocaleDateString()}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-teal-700"
                    >
                      Details <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="text-center p-1 bg-white rounded border border-teal-100">
                      <div className="text-sm font-medium">Mood</div>
                      <div>
                        {getMoodEmoji(entry.mood)} {entry.mood}/10
                      </div>
                    </div>
                    <div className="text-center p-1 bg-white rounded border border-teal-100">
                      <div className="text-sm font-medium">Energy</div>
                      <div>
                        {getEnergyEmoji(entry.energy)} {entry.energy}/10
                      </div>
                    </div>
                    <div className="text-center p-1 bg-white rounded border border-teal-100">
                      <div className="text-sm font-medium">Stress</div>
                      <div>
                        {getStressEmoji(entry.stress)} {entry.stress}/10
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {entry.notes}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <Button
                variant="outline"
                size="sm"
                className="text-teal-700 border-teal-200"
              >
                <LineChart className="mr-1 h-3.5 w-3.5" /> View Trends
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
