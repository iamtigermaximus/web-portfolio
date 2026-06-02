"use client";

import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { normalizeImageUrl } from "@/lib/utils";

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

const Wrapper = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ProjectImage = styled.div<{ $url: string | null }>`
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;

  ${({ $url }) =>
    $url
      ? css`
          background: url(${$url}) center/cover no-repeat;
        `
      : css`
          background: linear-gradient(
            135deg,
            rgba(167, 139, 250, 0.15),
            rgba(45, 212, 191, 0.08)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.04);
        `}

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(6, 11, 20, 0.4) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Links = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: rgba(167, 139, 250, 0.3);
    background: rgba(167, 139, 250, 0.08);
    box-shadow: 0 0 15px rgba(167, 139, 250, 0.08);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.textMuted};
  grid-column: 1 / -1;
`;

interface ProjectsSectionProps {
  projects: Project[];
  isLoading: boolean;
  sectionNumber?: string;
}

export default function ProjectsSection({ projects, isLoading, sectionNumber }: ProjectsSectionProps) {
  const { ref, isInView } = useScrollReveal();
  const number = sectionNumber ?? "03 // projects";

  if (isLoading) {
    return (
      <Wrapper>
        <SectionHeading title="Projects" subtitle="Things I've built" number={number} />
        <EmptyState>
          <Spinner size={32} />
        </EmptyState>
      </Wrapper>
    );
  }

  return (
    <Wrapper id="projects">
      <SectionHeading title="Projects" subtitle="Things I've built" number={number} />
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {projects.length === 0 ? (
          <EmptyState>No projects to show yet.</EmptyState>
        ) : (
          <Grid>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <GlassCard hover>
                  <ProjectImage $url={normalizeImageUrl(project.imageUrl)}>
                    {!project.imageUrl && "🚀"}
                  </ProjectImage>
                  <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <Tags>
                      {project.techStack.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="accent">
                          {tech}
                        </Badge>
                      ))}
                    </Tags>
                    {(project.liveUrl || project.githubUrl) && (
                      <Links>
                        {project.liveUrl && (
                          <ProjectLink
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowSquareOut size={16} weight="bold" />
                            Live
                          </ProjectLink>
                        )}
                        {project.githubUrl && (
                          <ProjectLink
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GithubLogo size={16} weight="bold" />
                            Code
                          </ProjectLink>
                        )}
                      </Links>
                    )}
                  </ProjectContent>
                </GlassCard>
              </motion.div>
            ))}
          </Grid>
        )}
      </motion.div>
    </Wrapper>
  );
}
