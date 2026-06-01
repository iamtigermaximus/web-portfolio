"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import SkillsSection from "@/components/sections/SkillsSection";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: number;
  iconName: string;
  order: number;
}

async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch("/api/public/skills");
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export default function SkillsPage() {
  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["public-skills"],
    queryFn: fetchSkills,
  });

  return <SkillsSection skills={skills} isLoading={isLoading} />;
}
