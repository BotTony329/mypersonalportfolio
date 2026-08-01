import type { Metadata } from "next";
import HomeExperience from "@/components/home/HomeExperience";
import { IDENTITY } from "@/lib/content";

export const metadata: Metadata = {
  title: `${IDENTITY.name} — Business Analyst · AI Product Designer · Digital Transformation`,
  description:
    "Tony Zhao builds intelligent systems that connect business strategy, user needs and AI. Business analysis, AI product design and enterprise digital transformation, presented as a mission control experience.",
  openGraph: {
    title: `${IDENTITY.name} — Building intelligent systems`,
    description: "Business Analyst · AI Product Designer · Digital Transformation",
    type: "website",
  },
};

export default function Page() {
  return <HomeExperience />;
}
