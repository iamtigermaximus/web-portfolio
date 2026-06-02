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
  background: ${({ $scrolled }) => $scrolled ? "rgba(15, 23, 42, 0.85)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? "blur(20px)" : "none"};
  border-bottom: ${({ $scrolled, theme }) => $scrolled ? `1px solid ${theme.colors.cardBorder}` : "1px solid transparent"};
  transition: all 0.3s ease;

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
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 1px;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.2s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.xs};

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
    background: rgba(0, 0, 0, 0.5);
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
    gap: ${({ theme }) => theme.spacing.md};
    z-index: 100;
    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 0.3s ease;
  }
`;

const MobileLink = styled(Link)<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textPrimary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.md} 0;
  transition: color 0.2s;
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
        {navLinks.map((link) => (
          <MobileLink
            key={link.href}
            href={link.href}
            $active={pathname === link.href}
          >
            {link.label}
          </MobileLink>
        ))}
      </MobileDrawer>
    </>
  );
}
