import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UNI-ON",
    short_name: "uni-on",
    description: "Track your psychological wellbeing and academic progress",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5549a6",
  };
}
