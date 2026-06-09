"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/GlassCard";
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
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBorder};

  ${({ $url }) =>
    $url
      ? css`
          background: url(${$url}) center/cover no-repeat;
        `
      : css`
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          border: 1px solid ${({ theme }) => theme.colors.cardBorder};
        `}
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
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ProjectDescription = styled.p<{ $expanded: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;

  ${({ $expanded }) =>
    !$expanded &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

const ExpandToggle = styled.button`
  display: inline-block;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-family: inherit;
  cursor: pointer;
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }
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
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.textMuted};
  grid-column: 1 / -1;
`;

const ViewAllRow = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xxxl};
`;

const ShowMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xxl}`};
  border: 1px solid ${({ theme }) => theme.colors.textPrimary};
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: all 0.15s ease;
  font-family: inherit;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.textPrimary};
    color: ${({ theme }) => theme.colors.bg};
  }
`;

interface ProjectsSectionProps {
  projects: Project[];
  isLoading: boolean;
  sectionNumber?: string;
  initialItems?: number;
  viewAllHref?: string;
}

export default function ProjectsSection({ projects, isLoading, sectionNumber, initialItems, viewAllHref }: ProjectsSectionProps) {
  const { ref, isInView } = useScrollReveal();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const number = sectionNumber ?? "03 // projects";
  const displayed = initialItems ? projects.slice(0, initialItems) : projects;
  const hasMore = initialItems && projects.length > initialItems;

  const toggleDescription = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
          <>
            <Grid>
              {displayed.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card hover>
                    <ProjectImage $url={normalizeImageUrl(project.imageUrl)}>
                      {!project.imageUrl && "🚀"}
                    </ProjectImage>
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription $expanded={expandedIds.has(project.id)}>
                        {project.description}
                      </ProjectDescription>
                      {project.description && project.description.length > 150 && (
                        <ExpandToggle onClick={() => toggleDescription(project.id)}>
                          {expandedIds.has(project.id) ? "Show less" : "Show more"}
                        </ExpandToggle>
                      )}
                      <Tags>
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="muted">
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
                  </Card>
                </motion.div>
              ))}
            </Grid>
            {hasMore && (
              <ViewAllRow>
                <ShowMoreButton href={viewAllHref ?? "/projects"}>
                  See More →
                </ShowMoreButton>
              </ViewAllRow>
            )}
          </>
        )}
      </motion.div>
    </Wrapper>
  );
}
