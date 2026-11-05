import styled, { css } from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";
import { media } from "../../styles/theme";

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: ${({ theme }) => theme.layout.headerHeight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(11, 11, 13, 0.78);
  backdrop-filter: saturate(160%) blur(12px);
  -webkit-backdrop-filter: saturate(160%) blur(12px);
`;

export const Inner = styled.div`
  height: 100%;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.gutterMobile};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  ${media.md} {
    padding: 0 ${({ theme }) => theme.layout.gutter};
  }
`;

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 0.975rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  transition: color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: -10px;

  ${media.md} {
    gap: 8px;
  }
`;

export const DesktopNav = styled.nav`
  display: none;

  ${media.md} {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 2px;

  ${media.lg} {
    gap: 6px;
  }
`;

export const NavItemLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.muted)};
  transition: color ${({ theme }) => theme.transition};

  &::after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 8px;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transition};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  ${({ $active }) =>
    $active &&
    css`
      &::after {
        transform: scaleX(1);
      }
    `}
`;

export const LangButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  min-width: 44px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  transition: border-color ${({ theme }) => theme.transition};

  /* Keep a 44px hit area while the pill stays visually compact. */
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: -4px 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

export const LangOption = styled.span<{ $active: boolean }>`
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.subtle)};
  transition: color ${({ theme }) => theme.transition};

  ${LangButton}:hover & {
    color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.muted)};
  }
`;

export const LangDivider = styled.span`
  color: ${({ theme }) => theme.colors.borderStrong};
`;

const iconButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transition}, background-color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const IconButton = styled.button`
  ${iconButton}
  font-size: 1.1rem;
`;

export const MenuButton = styled.button`
  ${iconButton}
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.text};

  ${media.md} {
    display: none;
  }
`;

/* ---------- Mobile drawer ---------- */

export const Drawer = styled(motion.div)`
  position: fixed;
  top: ${({ theme }) => theme.layout.headerHeight};
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: ${({ theme }) => theme.colors.bg};

  ${media.md} {
    display: none;
  }
`;

export const DrawerInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: 100%;
  padding: 16px ${({ theme }) => theme.layout.gutterMobile} 40px;
`;

export const DrawerList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const DrawerLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.muted)};
  transition: color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      &::after {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: ${theme.radii.full};
        background: ${theme.colors.accent};
      }
    `}
`;

export const DrawerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DrawerLangLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subtle};
`;
