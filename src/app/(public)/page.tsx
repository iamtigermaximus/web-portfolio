"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";

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
  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["public-skills"],
    queryFn: fetchSkills,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["public-projects"],
    queryFn: fetchProjects,
  });

  const { data: certificates = [], isLoading: certsLoading } = useQuery({
    queryKey: ["public-certificates"],
    queryFn: fetchCertificates,
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection skills={skills} isLoading={skillsLoading} />
      <ProjectsSection projects={projects} isLoading={projectsLoading} />
      <CertificatesSection certificates={certificates} isLoading={certsLoading} />
      <ContactSection />
    </>
  );
}
