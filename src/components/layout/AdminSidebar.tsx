"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styled from "styled-components";
import {
  SquaresFour,
  Briefcase,
  Lightbulb,
  Certificate,
  Envelope,
  SignOut,
  List,
  X,
} from "@phosphor-icons/react";

const sidebarLinks = [
  { href: "/dashboard-secret", label: "Dashboard", icon: SquaresFour },
  { href: "/dashboard-secret/projects", label: "Projects", icon: Briefcase },
  { href: "/dashboard-secret/skills", label: "Skills", icon: Lightbulb },
  { href: "/dashboard-secret/certificates", label: "Certificates", icon: Certificate },
  { href: "/dashboard-secret/messages", label: "Messages", icon: Envelope },
];

const Aside = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
    box-shadow: ${({ $open }) => ($open ? "4px 0 32px rgba(0,0,0,0.5)" : "none")};
  }
`;

const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const SidebarTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const Nav = styled.nav`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  background: ${({ $active }) =>
    $active ? "rgba(129, 140, 248, 0.1)" : "transparent"};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const SidebarFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: all 0.2s;

  &:hover {
    background: rgba(248, 113, 113, 0.1);
    color: ${({ theme }) => theme.colors.error};
  }
`;

const MobileToggle = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 60;
  display: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Overlay = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 49;
  }
`;

interface AdminSidebarProps {
  sidebarOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({
  sidebarOpen,
  onToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <MobileToggle onClick={onToggle}>
        {sidebarOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
      </MobileToggle>
      <Overlay $open={sidebarOpen} onClick={onToggle} />
      <Aside $open={sidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>Admin Panel</SidebarTitle>
        </SidebarHeader>
        <Nav>
          {sidebarLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              $active={pathname === link.href}
              onClick={onToggle}
            >
              <link.icon size={20} weight="bold" />
              {link.label}
            </NavItem>
          ))}
        </Nav>
        <SidebarFooter>
          <SignOutButton onClick={() => signOut({ callbackUrl: "/" })}>
            <SignOut size={20} weight="bold" />
            Sign Out
          </SignOutButton>
        </SidebarFooter>
      </Aside>
    </>
  );
}
