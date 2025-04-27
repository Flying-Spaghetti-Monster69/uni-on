/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Insights = async ({
  mood,
  feedback,
  pleasant_score,
}: {
  mood: any;
  feedback: any;
  pleasant_score: any;
}) => {
  const srcImage = () => {
    if (pleasant_score >= 8) {
      return "/deer.svg";
    } else if (pleasant_score >= 5) {
      return "/deer_okay.svg";
    } else if (pleasant_score >= 3) {
      return "/deer_sad.svg";
    } else {
      return "/deer_critical.svg";
    }
  };

  const src = srcImage();

  return (
    <Card className="border-teal-200 shadow-md mb-4 bg-white/90 backdrop-blur-sm">
      <CardHeader className="">
        <CardTitle className="text-teal-700 text-lg">Weekly Insights</CardTitle>
        <CardDescription>Your AI generated report</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-center h-full p-5 gap-4 text-center text-gray-500">
        <div>
          <p className="text-md font-semibold">{feedback}</p>
          <p className="mt-2 text-teal-600 font-bold">
            Mood: <span className="text-gray-500">{mood}</span>
          </p>
        </div>
        <div className="h-full ">
          <Image
            src={src}
            alt={"deer"}
            height={70}
            width={70}
            className="min-h-[70px] min-w-[70px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
