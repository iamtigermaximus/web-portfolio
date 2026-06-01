"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styled from "styled-components";
import ThemeProvider from "@/contexts/ThemeContext";
import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyles } from "@/lib/global-styles";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Spinner from "@/components/ui/Spinner";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    padding: ${({ theme }) => theme.spacing.lg};
    padding-top: 64px;
  }
`;

const LoadingWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg};
`;

function AdminContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <LoadingWrapper>
        <Spinner size={32} />
      </LoadingWrapper>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <Wrapper>
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <GlobalStyles />
        <AdminContent>{children}</AdminContent>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
