import styled, { css } from "styled-components";
import { media } from "../../../styles/theme";
import { HoverCard } from "../../ui";

const arrowNudge = css`
  .arrow {
    flex-shrink: 0;
    transition: transform ${({ theme }) => theme.transition};
  }
  &:hover .arrow,
  &:focus-visible .arrow {
    transform: translate(2px, -2px);
  }
  @media (prefers-reduced-motion: reduce) {
    .arrow {
      transition: none;
    }
  }
`;

export const Row = styled.div`
  display: grid;
  gap: 8px;

  ${media.sm} {
    grid-template-columns: 8rem 1fr;
    gap: 16px;
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2px;
`;

export const Duration = styled.span`
  font-size: 0.75rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.subtle};
  opacity: 0.85;
`;

export const Body = styled.div`
  min-width: 0;
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
`;

export const Dot = styled.span`
  color: ${({ theme }) => theme.colors.subtle};
`;

/** Stretched link: the whole HoverCard is clickable. */
export const MainLink = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  color: inherit;
  transition: color ${({ theme }) => theme.transition};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  .arrow {
    align-self: center;
    width: 1em;
    height: 1em;
  }

  ${arrowNudge}

  /* Hovering anywhere on the card highlights the title. */
  ${HoverCard}:hover &,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
  }
  ${HoverCard}:hover & .arrow {
    transform: translate(2px, -2px);
  }

  &:focus-visible {
    outline: none;
  }
  &:focus-visible::before {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
  }
`;

export const Location = styled.p`
  margin-top: 2px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.subtle};
`;

export const Bullets = styled.ul`
  margin: 14px 0 18px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    position: relative;
    padding-left: 16px;
    font-size: 0.95rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.muted};

    &::before {
      content: "";
      position: absolute;
      left: 2px;
      top: 0.72em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.accent};
      opacity: 0.7;
    }
  }
`;

export const ResumeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 40px;
  min-height: 44px;
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 calc(50% + 0.75em);
  background-repeat: no-repeat;
  transition:
    color ${({ theme }) => theme.transition},
    background-size ${({ theme }) => theme.transition};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
    background-size: 100% 1px;
  }

  ${arrowNudge}
`;
