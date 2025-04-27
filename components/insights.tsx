/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Insights = async ({ mood, feedback }: { mood: any; feedback: any }) => {
  return (
    <Card className="border-teal-200 shadow-md mb-4 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-teal-700 text-lg">Weekly Insights</CardTitle>
        <CardDescription>Your AI generated report</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
          <p className="text-lg font-semibold">{feedback}</p>
          <p className="mt-2">{mood}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
