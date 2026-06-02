"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface PaginationRowProps {
  currentPage: number;
  totalPages: number;
}

const Row = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xxl} ${theme.spacing.xxxl}`};
  max-width: 1000px;
  margin: 0 auto;
`;

const PageLink = styled(Link)<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary : "rgba(255, 255, 255, 0.06)"};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(139, 92, 246, 0.1))"
      : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(167, 139, 250, 0.3);
    background: rgba(167, 139, 250, 0.08);
  }
`;

export default function PaginationRow({ currentPage, totalPages }: PaginationRowProps) {
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <Row>
      {currentPage > 1 && (
        <PageLink href={`/certificates?page=${currentPage - 1}`}>← Prev</PageLink>
      )}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} style={{ padding: "0 8px", color: "#64748b" }}>
            …
          </span>
        ) : (
          <PageLink key={p} href={`/certificates?page=${p}`} $active={p === currentPage}>
            {p}
          </PageLink>
        )
      )}
      {currentPage < totalPages && (
        <PageLink href={`/certificates?page=${currentPage + 1}`}>Next →</PageLink>
      )}
    </Row>
  );
}
