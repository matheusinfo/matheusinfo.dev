import styled from "styled-components";
import Link from "next/link";
import { media } from "../../styles/theme";
import { HoverCard } from "../ui";

export const Page = styled.div`
  padding: 48px 0 80px;
  min-height: 70vh;

  ${media.md} {
    padding: 96px 0 120px;
  }
`;

export const PageHeader = styled.header`
  max-width: 40rem;
  margin-bottom: 48px;

  ${media.md} {
    margin-bottom: 72px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.25rem, 7vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

export const Description = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.muted};

  ${media.md} {
    font-size: 1.125rem;
  }
`;

export const LangNote = styled.p`
  margin-top: 12px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.subtle};
`;

/** Date left / content right on sm+. */
export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  ${media.sm} {
    grid-template-columns: 8rem 1fr;
    gap: 24px;
  }
`;

export const DateCol = styled.div`
  ${media.sm} {
    padding-top: 4px;
  }
`;

export const Body = styled.div`
  min-width: 0;
`;

export const PostTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
  transition: color ${({ theme }) => theme.transition};
  text-wrap: pretty;

  ${HoverCard}:hover &,
  ${HoverCard}:focus-within & {
    color: ${({ theme }) => theme.colors.accent};
  }

  ${media.md} {
    font-size: 1.2rem;
  }
`;

/** Stretched link: the whole card is clickable. */
export const PostLink = styled(Link)`
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: ${({ theme }) => theme.radii.lg};
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::before {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
  }
`;

export const Arrow = styled.span`
  display: inline-block;
  margin-left: 6px;
  font-size: 0.9em;
  vertical-align: -0.1em;
  transition: transform ${({ theme }) => theme.transition};

  ${HoverCard}:hover &,
  ${HoverCard}:focus-within & {
    transform: translate(2px, -2px);
  }
`;

export const Resume = styled.p`
  margin-top: 8px;
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 62ch;
`;

export const ReadTime = styled.p`
  margin-top: 12px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.subtle};
`;
