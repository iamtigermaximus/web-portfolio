"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xxl}`};
  background: ${({ $scrolled }) =>
    $scrolled
      ? "rgba(6, 11, 20, 0.8)"
      : "transparent"};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? "blur(24px) saturate(180%)" : "none"};
  -webkit-backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? "blur(24px) saturate(180%)" : "none"};
  border-bottom: 1px solid
    ${({ $scrolled, theme }) =>
      $scrolled ? theme.colors.cardBorder : "transparent"};
  transition: all 0.35s ease;

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
  font-family: 'JetBrains Mono', monospace;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.06em;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textPrimary} 0%,
    ${({ theme }) => theme.colors.primary} 50%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  transition: background-position 0.5s ease;
  filter: drop-shadow(0 0 12px ${({ theme }) => theme.colors.glow});

  &:hover {
    background-position: right center;
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
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: all 0.25s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background: rgba(167, 139, 250, 0.08);
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.glow};
  }

  ${({ $active, theme }) =>
    $active &&
    `
    background: rgba(167, 139, 250, 0.1);
    box-shadow: 0 0 20px ${theme.colors.glow};
  `}
`;

const MobileToggle = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.sm};
  backdrop-filter: blur(12px);

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
    background: rgba(6, 11, 20, 0.6);
    backdrop-filter: blur(8px);
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
    background: linear-gradient(
      180deg,
      rgba(12, 18, 37, 0.98) 0%,
      rgba(6, 11, 20, 0.98) 100%
    );
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    border-left: 1px solid ${({ theme }) => theme.colors.cardBorder};
    padding: ${({ theme }) => theme.spacing.xxl};
    padding-top: 80px;
    gap: ${({ theme }) => theme.spacing.xs};
    z-index: 100;
    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
  }
`;

const MobileLink = styled(Link)<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textPrimary};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: all 0.25s ease;
  background: ${({ $active }) =>
    $active ? "rgba(167, 139, 250, 0.1)" : "transparent"};

  &:hover {
    background: rgba(167, 139, 250, 0.08);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DrawerDivider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.cardBorder},
    transparent
  );
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const DrawerNumber = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export default function Navbar() {
  const pathname = usePathname();
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
          <Logo href="/">SIEGFRED GAMBOA</Logo>
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
      </MobileDrawer>
    </>
  );
}
