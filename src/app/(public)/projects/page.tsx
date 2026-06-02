import React from "react";
import { prisma } from "@/lib/prisma";
import ProjectsSection from "@/components/sections/ProjectsSection";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return <ProjectsSection projects={JSON.parse(JSON.stringify(projects))} isLoading={false} />;
}
