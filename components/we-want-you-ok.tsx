import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

type problematics = "economical" | "academic" | "personal";

interface WeWantYouOkProps {
  problematics: problematics;
}

const problematicsData = {
  economical: {
    description:
      "We understand that financial stress can impact your academic and personal life. Let's work together to find solutions.",
    college_image: "/un.png",
    external_image: "/soluciones_express.png",
  },
  academic: {
    description:
      "Struggling with classes or coursework? We’re here to offer academic support and resources to help you succeed.",
    college_image: "/un.png",
    external_image: "/soluciones_express.png",
  },
  personal: {
    description:
      "Personal challenges can be overwhelming. Reach out for personalized assistance and emotional support.",
    college_image: "/un.png",
    external_image: "/soluciones_express.png",
  },
};

const WeWantYouOk: React.FC<WeWantYouOkProps> = ({ problematics }) => {
    const { description, college_image, external_image } = problematicsData[problematics];

  return (
    <Card className="border-teal-200 shadow-md bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-teal-700 text-lg">
          We want you to be fine
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-[16px]">
        <div className="flex flex-col items-center justify-center">
          <Image
            width={200}
            height={200}
            src={college_image}
            alt={`${problematics} support`}
          />
          <p className="max-w-[228px] text-center text-[13px]">
            Communicate with your university&apos;s wellness service by clicking{" "}
            <a href="#" className="underline text-blue-600">
              here
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            width={200}
            height={200}
            src={external_image}
            alt={`${problematics} external support`}
          />
          <p className="max-w-[228px] text-center text-[13px]">
            Explore external services for more personalized attention by
            clicking{" "}
            <a href="#" className="underline text-blue-600">
              here
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeWantYouOk;
