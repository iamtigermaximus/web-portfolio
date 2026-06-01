"use client";

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Globe,
  Database,
  Wrench,
  Cloud,
  Palette,
} from "@phosphor-icons/react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ProficiencyBar from "@/components/ui/ProficiencyBar";
import Spinner from "@/components/ui/Spinner";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: number;
  iconName: string;
}

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  globe: Globe,
  database: Database,
  wrench: Wrench,
  cloud: Cloud,
  palette: Palette,
};

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "rgba(255, 255, 255, 0.05)"};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.textSecondary};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.cardBorder};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SkillCard = styled(GlassCard)`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SkillIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(129, 140, 248, 0.15);
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkillName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const SkillLevel = styled.span`
  margin-left: auto;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface SkillsSectionProps {
  skills: Skill[];
  isLoading: boolean;
}

export default function SkillsSection({ skills, isLoading }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, isInView } = useScrollReveal();

  const categories = useMemo(() => {
    const cats = Array.from(new Set(skills.map((s) => s.category)));
    return ["All", ...cats.sort()];
  }, [skills]);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? skills
        : skills.filter((s) => s.category === activeCategory),
    [skills, activeCategory]
  );

  if (isLoading) {
    return (
      <Wrapper>
        <SectionHeading title="Skills" subtitle="Technologies I work with" />
        <EmptyState>
          <Spinner size={32} />
        </EmptyState>
      </Wrapper>
    );
  }

  return (
    <Wrapper id="skills">
      <SectionHeading title="Skills" subtitle="Technologies I work with" />
      <Tabs>
        {categories.map((cat) => (
          <Tab
            key={cat}
            $active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Tab>
        ))}
      </Tabs>
      <motion.div ref={ref}>
        {skills.length === 0 ? (
          <EmptyState>No skills added yet.</EmptyState>
        ) : (
          <Grid>
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => {
                const IconComponent = iconMap[skill.iconName] || Code;
                return (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : {}
                    }
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <SkillCard hover>
                      <SkillHeader>
                        <SkillIcon>
                          <IconComponent size={20} weight="bold" />
                        </SkillIcon>
                        <SkillName>{skill.name}</SkillName>
                        <SkillLevel>{skill.proficiencyLevel}%</SkillLevel>
                      </SkillHeader>
                      <ProficiencyBar
                        level={skill.proficiencyLevel}
                        animated={isInView}
                      />
                    </SkillCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Grid>
        )}
      </motion.div>
    </Wrapper>
  );
}
