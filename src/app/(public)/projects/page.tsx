"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProjectsSection from "@/components/sections/ProjectsSection";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/public/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export default function ProjectsPage() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["public-projects"],
    queryFn: fetchProjects,
  });

  return <ProjectsSection projects={projects} isLoading={isLoading} />;
}
