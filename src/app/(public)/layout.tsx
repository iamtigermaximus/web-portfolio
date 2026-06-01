"use client";

import React from "react";
import styled from "styled-components";
import ThemeProvider from "@/contexts/ThemeContext";
import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyles } from "@/lib/global-styles";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Main = styled.main`
  min-height: 100vh;
  padding-top: 72px;
`;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <GlobalStyles />
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
