"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { List, X, Sun, Moon } from "@phosphor-icons/react";
import { useAppTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xxl}`};
  background: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.bg : "transparent"};
  border-bottom: 1px solid
    ${({ $scrolled, theme }) =>
      $scrolled ? theme.colors.cardBorder : "transparent"};
  transition: all 0.2s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-family: "JetBrains Mono", monospace;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.textSecondary};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.sm};
  margin-left: ${({ theme }) => theme.spacing.sm};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileToggle = styled.button`
  display: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
  }
`;

const MobileDrawer = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    background: ${({ theme }) => theme.colors.surface};
    border-left: 1px solid ${({ theme }) => theme.colors.cardBorder};
    padding: ${({ theme }) => theme.spacing.xxl};
    padding-top: 80px;
    gap: ${({ theme }) => theme.spacing.xs};
    z-index: 100;
    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const MobileLink = styled(Link)<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.textPrimary};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const DrawerDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.cardBorder};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const DrawerNumber = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export default function Navbar() {
  const pathname = usePathname();
  const { mode, toggleTheme } = useAppTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <Header $scrolled={scrolled}>
        <Nav>
          <Logo href="/">Siegfred Gamboa</Logo>
          <DesktopLinks>
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                $active={pathname === link.href}
              >
                {link.label}
              </NavLink>
            ))}
            <ThemeButton onClick={toggleTheme} aria-label="Toggle theme">
              {mode === "dark" ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
            </ThemeButton>
          </DesktopLinks>
          <MobileToggle onClick={() => setMobileOpen(true)}>
            <List size={24} weight="bold" />
          </MobileToggle>
        </Nav>
      </Header>
      <MobileOverlay $open={mobileOpen} onClick={() => setMobileOpen(false)} />
      <MobileDrawer $open={mobileOpen}>
        <MobileToggle
          style={{ position: "absolute", top: 20, right: 20 }}
          onClick={() => setMobileOpen(false)}
        >
          <X size={24} weight="bold" />
        </MobileToggle>
        {navLinks.map((link, i) => (
          <MobileLink
            key={link.href}
            href={link.href}
            $active={pathname === link.href}
          >
            <DrawerNumber>{String(i + 1).padStart(2, "0")}.</DrawerNumber>
            {link.label}
          </MobileLink>
        ))}
        <DrawerDivider />
        <ThemeButton
          as="button"
          style={{ marginLeft: 0, padding: "12px 16px", justifyContent: "flex-start", gap: "8px" }}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {mode === "dark" ? (
            <><Sun size={18} weight="bold" /> Light Mode</>
          ) : (
            <><Moon size={18} weight="bold" /> Dark Mode</>
          )}
        </ThemeButton>
      </MobileDrawer>
    </>
  );
}
