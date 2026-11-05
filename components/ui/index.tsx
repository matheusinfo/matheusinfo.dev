"use client";

import React from "react";
import styled, { css } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { media } from "../../styles/theme";

/* ---------- Layout ---------- */

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.gutterMobile};
  ${media.md} {
    padding: 0 ${({ theme }) => theme.layout.gutter};
  }
`;

const SectionRoot = styled.section`
  padding-bottom: 72px;
  scroll-margin-top: 0;
  ${media.lg} {
    padding-bottom: 128px;
    scroll-margin-top: 96px;
  }
`;

/**
 * Section heading: a sticky translucent bar on mobile (so you always know where you are),
 * visually hidden on desktop where the left-column nav already shows the active section.
 */
const SectionHeading = styled.h2`
  position: sticky;
  top: 0;
  z-index: 20;
  margin: 0 -${({ theme }) => theme.layout.gutterMobile} 20px;
  padding: 16px ${({ theme }) => theme.layout.gutterMobile};
  background: rgba(11, 11, 13, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};

  ${media.md} {
    margin: 0 -${({ theme }) => theme.layout.gutter} 24px;
    padding: 16px ${({ theme }) => theme.layout.gutter};
  }

  ${media.lg} {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/** Home page section (lives in the right column of the split layout). */
export const Section: React.FC<SectionProps> = ({ id, title, children, className }) => (
  <SectionRoot id={id} aria-labelledby={`${id}-title`} className={className}>
    <SectionHeading id={`${id}-title`}>{title}</SectionHeading>
    {children}
  </SectionRoot>
);

/* ---------- Motion ---------- */

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article";
}

/** Fades + slides content in once when it enters the viewport. Respects reduced motion. */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 16, className, as = "div" }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
};

/* ---------- Primitives ---------- */

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  line-height: 1;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accentSoft};
  white-space: nowrap;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  font-size: 0.95rem;
  transition: background ${({ theme }) => theme.transition}, color ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition}, transform ${({ theme }) => theme.transition};
  &:hover {
    transform: translateY(-1px);
  }
`;

/** Use with `as="a"` / `as={Link}` / `as="button"`. */
export const Button = styled.a<{ $variant?: "primary" | "ghost" }>`
  ${buttonBase}
  ${({ $variant = "primary", theme }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.accent};
          color: ${theme.colors.accentContrast};
          &:hover {
            background: ${theme.colors.accentHover};
          }
        `
      : css`
          border: 1px solid ${theme.colors.borderStrong};
          color: ${theme.colors.text};
          &:hover {
            border-color: ${theme.colors.accent};
            color: ${theme.colors.accent};
          }
        `}
`;

/** Bordered surface card. */
export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: border-color ${({ theme }) => theme.transition}, transform ${({ theme }) => theme.transition};
`;

/** Inline text link with animated underline. */
export const TextLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size ${({ theme }) => theme.transition};
  &:hover {
    background-size: 100% 1px;
  }
`;

/** Small uppercase label (dates, periods, meta). */
export const Eyebrow = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.subtle};
`;

/**
 * List whose items dim when a sibling is hovered (desktop only).
 * Put <HoverCard> inside each <li>.
 */
export const HoverList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 48px;

  ${media.lg} {
    gap: 12px;
    & > li {
      transition: opacity ${({ theme }) => theme.transition};
    }
    &:hover > li:not(:hover) {
      opacity: 0.45;
    }
  }
`;

/**
 * Row/card that lights up on hover (desktop). Make it fully clickable by giving its
 * main link a `::before { content:""; position:absolute; inset:0 }` (stretched link).
 */
export const HoverCard = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: background ${({ theme }) => theme.transition}, box-shadow ${({ theme }) => theme.transition};

  ${media.lg} {
    padding: 20px 24px;
    margin: 0 -24px;
    &:hover {
      background: rgba(255, 255, 255, 0.035);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }
  }
`;

export const SkipLink = styled.a`
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1000;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentContrast};
  font-weight: 600;
  transform: translateY(-200%);
  &:focus-visible {
    transform: none;
  }
`;
