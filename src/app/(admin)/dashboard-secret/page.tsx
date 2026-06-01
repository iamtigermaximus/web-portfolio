"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import StatsCards from "@/components/admin/StatsCards";
import Spinner from "@/components/ui/Spinner";

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export default function DashboardPage() {
  const { data: projects = [], isLoading: projLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => fetch("/api/admin/projects").then((r) => r.json()),
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["admin-skills"],
    queryFn: () => fetch("/api/admin/skills").then((r) => r.json()),
  });

  const { data: certificates = [], isLoading: certsLoading } = useQuery({
    queryKey: ["admin-certificates"],
    queryFn: () => fetch("/api/admin/certificates").then((r) => r.json()),
  });

  const { data: messages = [], isLoading: msgLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: () => fetch("/api/admin/messages").then((r) => r.json()),
  });

  const isLoading = projLoading || skillsLoading || certsLoading || msgLoading;

  const stats = useMemo(
    () => ({
      projects: Array.isArray(projects) ? projects.length : 0,
      skills: Array.isArray(skills) ? skills.length : 0,
      certificates: Array.isArray(certificates) ? certificates.length : 0,
      unreadMessages: Array.isArray(messages)
        ? messages.filter((m: { isRead: boolean }) => !m.isRead).length
        : 0,
    }),
    [projects, skills, certificates, messages]
  );

  return (
    <div>
      <Header>
        <Title>Dashboard</Title>
        <Subtitle>Overview of your portfolio content</Subtitle>
      </Header>
      {isLoading ? (
        <Spinner size={32} />
      ) : (
        <StatsCards stats={stats} />
      )}
    </div>
  );
}
