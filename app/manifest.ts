import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "StudyWell",
    short_name: "StudyWell",
    description: "Track your psychological wellbeing and academic progress",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d9488",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
