import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { media } from "../../../styles/theme";

/* ================= Groups ================= */

export const Top = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

export const Bottom = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 40px;
  min-width: 0;

  ${media.lg} {
    margin-top: 48px;
  }
`;

export const Item = styled(motion.div)`
  max-width: 100%;
  min-width: 0;
`;

/* ================= Identity ================= */

export const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 7vw, 3.25rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.text};
  overflow-wrap: anywhere;
`;

export const Role = styled(motion.p)`
  margin-top: 14px;
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
`;

export const Tagline = styled(motion.p)`
  margin-top: 16px;
  max-width: 24rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.65;
`;

export const Location = styled(motion.p)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.subtle};

  svg {
    flex-shrink: 0;
  }
`;

/* ================= Section nav (lg only) ================= */

export const Nav = styled(motion.nav)`
  display: none;

  ${media.lg} {
    display: block;
    margin-top: 56px;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NavLine = styled.span`
  flex-shrink: 0;
  width: 2rem;
  height: 1px;
  margin-right: 14px;
  background: ${({ theme }) => theme.colors.subtle};
  transition: width ${({ theme }) => theme.transition}, background ${({ theme }) => theme.transition};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const NavIndex = styled.span`
  display: inline-block;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.accent};
  transition: max-width ${({ theme }) => theme.transition}, opacity ${({ theme }) => theme.transition},
    margin ${({ theme }) => theme.transition};
`;

export const NavLink = styled.a<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subtle};
  transition: color ${({ theme }) => theme.transition};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text};

    ${NavLine} {
      width: 4rem;
      background: ${({ theme }) => theme.colors.text};
    }
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.text};

      ${NavLine}, &:hover ${NavLine}, &:focus-visible ${NavLine} {
        width: 4rem;
        background: ${theme.colors.accent};
      }

      ${NavIndex} {
        max-width: 3ch;
        opacity: 1;
        margin-right: 10px;
      }
    `}
`;

/* ================= Bottom row ================= */

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

const outline = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transition}, border-color ${({ theme }) => theme.transition},
    background ${({ theme }) => theme.transition};

  svg {
    flex-shrink: 0;
  }
`;

export const LangButton = styled.button`
  ${outline};
  gap: 6px;
  letter-spacing: 0.04em;

  &:hover {
    border-color: ${({ theme }) => theme.colors.subtle};
  }
`;

export const LangOption = styled.span<{ $active: boolean }>`
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active, theme }) => ($active ? theme.colors.accent : theme.colors.subtle)};
  transition: color ${({ theme }) => theme.transition};
`;

export const LangDivider = styled.span`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.borderStrong};
`;

export const Socials = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin-left: -11px;
`;

const iconTarget = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transition}, transform ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

export const SocialLink = styled.a`
  ${iconTarget};
`;

export const TerminalButton = styled.button`
  ${iconTarget};
  color: ${({ theme }) => theme.colors.subtle};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Separator = styled.li`
  width: 1px;
  height: 18px;
  margin: 0 6px;
  background: ${({ theme }) => theme.colors.border};
`;

export const Hint = styled(motion.p)`
  display: none;

  ${media.lg} {
    display: block;
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.subtle};
    opacity: 0.75;
  }

  kbd {
    display: inline-block;
    min-width: 1.5em;
    margin: 0 2px;
    padding: 0 5px;
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    border-bottom-width: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: 0.7rem;
    line-height: 1.5;
    text-align: center;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

/* ================= Resume menu ================= */

export const MenuRoot = styled.div`
  position: relative;
`;

export const MenuButton = styled.button`
  ${outline};

  &:hover,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentSoft};
  }
`;

export const Chevron = styled.span<{ $open: boolean }>`
  display: inline-flex;
  transition: transform ${({ theme }) => theme.transition};
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

/** Opens downward on small screens; upward on lg where the row sits at the viewport bottom. */
export const Menu = styled.ul`
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  min-width: 220px;
  max-width: calc(100vw - 32px);
  padding: 6px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.surface2};
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);

  ${media.lg} {
    top: auto;
    bottom: calc(100% + 6px);
  }
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.accent};
  }

  svg {
    flex-shrink: 0;
  }

  small {
    margin-left: auto;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.subtle};
  }
`;
