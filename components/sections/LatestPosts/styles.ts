import styled from "styled-components";
import Link from "next/link";
import { media } from "../../../styles/theme";

export const LangNote = styled.p`
  margin-bottom: 32px;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.subtle};
`;

export const PostBody = styled.article`
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${media.sm} {
    display: grid;
    grid-template-columns: 8rem 1fr;
    align-items: baseline;
    gap: 24px;
  }

  time {
    display: block;
  }
`;

export const Content = styled.div`
  min-width: 0;
`;

export const Title = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

/** Stretched over the whole card; holds the arrow that nudges on hover. */
export const PostLink = styled(Link)`
  transition: color ${({ theme }) => theme.transition};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
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
    display: inline-block;
    width: 0.9em;
    height: 0.9em;
    margin-left: 4px;
    vertical-align: -0.08em;
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

export const Resume = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ReadTime = styled.p`
  margin-top: 10px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.subtle};
`;

export const Footer = styled.p`
  margin-top: 40px;

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
      transform: translateX(3px);
    }
  }
`;
