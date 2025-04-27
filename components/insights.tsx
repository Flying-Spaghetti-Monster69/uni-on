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
  userName,
}: {
  mood: any;
  feedback: any;
  pleasant_score: any;
  userName: string;
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
    <Card className="border-primary-theme shadow-md mb-4 bg-white backdrop-blur-sm">
      <CardHeader className="">
        <CardTitle className="text-primary-theme text-xl">
          Hi {userName.split(" ").slice(0, 2).join(" ")}
        </CardTitle>
        <CardDescription>
          Here is your weekly AI generated report
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full px-5 gap-4 text-center text-gray-500">
        <div className="flex items-center justify-between w-full flex-row gap-3">
          <div className="max-w-[70%]">
            <p className="text-[13px] font-semibold text-left">{feedback}</p>
          </div>
          <div className="h-full ">
            <Image
              src={src}
              alt={"deer"}
              height={90}
              width={90}
              className="min-h-[90px] min-w-[90px]"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="mt-2 text-secundary-theme font-bold">
            Mood: <span className="text-gray-500">{mood}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
