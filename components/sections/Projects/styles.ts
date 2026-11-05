import styled from "styled-components";
import { media } from "../../../styles/theme";

export const Note = styled.p`
  max-width: 52ch;
  margin-bottom: 40px;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.subtle};

  ${media.lg} {
    margin-bottom: 32px;
  }
`;

/* ---------- Featured ---------- */

export const FeaturedBody = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${media.sm} {
    display: grid;
    grid-template-columns: 8rem 1fr;
    align-items: start;
    gap: 24px;
  }
`;

/** Decorative cover: a tinted gradient + dot pattern with a centered icon. `--hue` set inline. */
export const Cover = styled.div`
  --hue: 40;
  order: 2;
  position: relative;
  display: grid;
  place-items: center;
  width: 8rem;
  height: 5rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background:
    radial-gradient(circle at 25% 15%, hsla(var(--hue), 70%, 55%, 0.26), transparent 62%),
    radial-gradient(circle at 90% 110%, rgba(247, 187, 0, 0.1), transparent 55%),
    linear-gradient(140deg, hsl(var(--hue), 22%, 13%), hsl(var(--hue), 18%, 7%));
  transition: border-color ${({ theme }) => theme.transition};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 10px 10px;
    mask-image: linear-gradient(135deg, #000 10%, transparent 75%);
    -webkit-mask-image: linear-gradient(135deg, #000 10%, transparent 75%);
  }

  svg {
    position: relative;
    width: 26px;
    height: 26px;
    color: hsl(var(--hue), 55%, 78%);
    transition: color ${({ theme }) => theme.transition}, transform ${({ theme }) => theme.transition};
  }

  ${media.sm} {
    order: 0;
    margin-top: 4px;
  }

  article:hover & {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    svg {
      color: ${({ theme }) => theme.colors.accent};
      transform: scale(1.06);
    }
  }
`;

export const Content = styled.div`
  min-width: 0;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 12px;
  row-gap: 2px;
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.text};
`;

/** Main link: stretched over the whole card. Holds the arrow that nudges on hover. */
export const StretchedLink = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  transition: color ${({ theme }) => theme.transition};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
  }

  &:focus-visible {
    outline: none;
  }
  &:focus-visible::before {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
    border-radius: ${({ theme }) => theme.radii.lg};
  }

  .arrow {
    flex-shrink: 0;
    width: 0.95em;
    height: 0.95em;
    align-self: center;
    transition: transform ${({ theme }) => theme.transition};
  }

  article:hover &,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
    .arrow {
      transform: translate(2px, -2px);
    }
  }
`;

export const Year = styled.span`
  font-size: 0.78rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.subtle};
`;

export const Description = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 16px;
`;

export const Links = styled.ul`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 4px;
  margin: 8px 0 0 -12px;
`;

export const IconLink = styled.a`
  position: relative;
  z-index: 1;
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transition}, background ${({ theme }) => theme.transition};

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 255, 255, 0.05);
  }
`;

/* ---------- Archive ---------- */

export const ArchiveHeading = styled.h3`
  margin: 64px 0 12px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.subtle};

  ${media.lg} {
    margin-top: 72px;
  }
`;

export const ArchiveList = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${media.lg} {
    &:hover > li:not(:hover) {
      opacity: 0.5;
    }
  }
`;

export const ArchiveItem = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 3rem 1fr;
  column-gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: opacity ${({ theme }) => theme.transition};

  ${media.md} {
    grid-template-columns: 3rem 1fr auto;
    column-gap: 20px;
    align-items: baseline;
  }
`;

export const ArchiveYear = styled.span`
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.subtle};
  line-height: 1.7;
`;

export const ArchiveMain = styled.div`
  min-width: 0;

  h4 {
    font-size: 0.98rem;
    font-weight: 600;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 2px;
    font-size: 0.88rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const ArchiveLink = styled(StretchedLink)`
  li:hover & {
    color: ${({ theme }) => theme.colors.accent};
    .arrow {
      transform: translate(2px, -2px);
    }
  }

  &:focus-visible::before {
    outline-offset: 0;
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`;

export const ArchiveTags = styled.span`
  display: none;

  ${media.md} {
    display: block;
    max-width: 14rem;
    text-align: right;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.72rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.subtle};
  }
`;

export const MoreWrap = styled.p`
  margin-top: 32px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    font-weight: 600;
    font-size: 0.95rem;

    svg {
      transition: transform ${({ theme }) => theme.transition};
    }
    &:hover svg {
      transform: translate(2px, -2px);
    }
  }
`;
