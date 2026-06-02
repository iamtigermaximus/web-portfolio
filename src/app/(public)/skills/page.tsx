import React from "react";
import { prisma } from "@/lib/prisma";
import SkillsSection from "@/components/sections/SkillsSection";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

  return <SkillsSection skills={JSON.parse(JSON.stringify(skills))} isLoading={false} />;
}
