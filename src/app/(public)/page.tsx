"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";

async function fetchSkills() {
  const res = await fetch("/api/public/skills");
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

async function fetchProjects() {
  const res = await fetch("/api/public/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

async function fetchCertificates() {
  const res = await fetch("/api/public/certificates");
  if (!res.ok) throw new Error("Failed to fetch certificates");
  return res.json();
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["public-skills"],
    queryFn: fetchSkills,
    enabled: mounted,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["public-projects"],
    queryFn: fetchProjects,
    enabled: mounted,
  });

  const { data: certificates = [], isLoading: certsLoading } = useQuery({
    queryKey: ["public-certificates"],
    queryFn: fetchCertificates,
    enabled: mounted,
  });

  return (
    <>
      <HeroSection />
      <ProjectsSection projects={projects} isLoading={projectsLoading || !mounted} />
      <SkillsSection skills={skills} isLoading={skillsLoading || !mounted} />
      <CertificatesSection certificates={certificates} isLoading={certsLoading || !mounted} />
    </>
  );
}
