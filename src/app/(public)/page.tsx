import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return <HeroSection />;
}
