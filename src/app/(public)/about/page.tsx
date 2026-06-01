import { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <AboutSection />;
}
