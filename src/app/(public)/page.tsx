import React from "react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";

export default async function HomePage() {
  const [projects, skills, certificates] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.certificate.findMany({ orderBy: { issueDate: "desc" } }),
  ]);

  return (
    <>
      <HeroSection />
      <ProjectsSection projects={JSON.parse(JSON.stringify(projects))} isLoading={false} sectionNumber="01 // projects" />
      <SkillsSection skills={JSON.parse(JSON.stringify(skills))} isLoading={false} sectionNumber="02 // skills" />
      <CertificatesSection certificates={JSON.parse(JSON.stringify(certificates))} isLoading={false} sectionNumber="03 // certs" initialItems={3} viewAllHref="/certificates" />
    </>
  );
}
