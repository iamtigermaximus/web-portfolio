"use client";

import React from "react";
import styled from "styled-components";
import {
  Briefcase,
  Lightbulb,
  Certificate,
  Envelope,
} from "@phosphor-icons/react";
import GlassCard from "@/components/ui/GlassCard";

interface StatsCardsProps {
  stats: {
    projects: number;
    skills: number;
    certificates: number;
    unreadMessages: number;
  };
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const StatCard = styled(GlassCard)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const IconWrap = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $color }) => $color}22;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: Briefcase,
      color: "#818cf8",
    },
    {
      label: "Skills",
      value: stats.skills,
      icon: Lightbulb,
      color: "#22d3ee",
    },
    {
      label: "Certificates",
      value: stats.certificates,
      icon: Certificate,
      color: "#34d399",
    },
    {
      label: "Messages",
      value: stats.unreadMessages,
      icon: Envelope,
      color: stats.unreadMessages > 0 ? "#f87171" : "#94a3b8",
    },
  ];

  return (
    <Grid>
      {cards.map((card) => (
        <StatCard key={card.label}>
          <IconWrap $color={card.color}>
            <card.icon size={24} weight="bold" />
          </IconWrap>
          <StatInfo>
            <StatValue>{card.value}</StatValue>
            <StatLabel>{card.label}</StatLabel>
          </StatInfo>
        </StatCard>
      ))}
    </Grid>
  );
}
