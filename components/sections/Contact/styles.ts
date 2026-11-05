import styled from "styled-components";
import { media } from "../../../styles/theme";

export const Statement = styled.h3`
  max-width: 18ch;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text};
  text-wrap: balance;

  ${media.md} {
    font-size: 1.75rem;
  }
`;

export const Intro = styled.p`
  max-width: 48ch;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.muted};
`;

export const EmailRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin-top: 32px;
`;

export const EmailLink = styled.a`
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: clamp(1.1rem, 4.6vw, 1.4rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: color ${({ theme }) => theme.transition}, background-size ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-size: 100% 1px;
  }
`;

export const CopyButton = styled.button<{ $copied: boolean }>`
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme, $copied }) => ($copied ? theme.colors.accent : theme.colors.subtle)};
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

export const Status = styled.p`
  min-height: 1.5em;
  margin-top: 4px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Actions = styled.div`
  margin-top: 20px;
`;

export const LinkGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const LinkList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
`;

export const QuietLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  font-size: 0.92rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transition};

  svg {
    width: 15px;
    height: 15px;
    transition: transform ${({ theme }) => theme.transition};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
  &:hover .up {
    transform: translate(2px, -2px);
  }
  &:hover .down {
    transform: translateY(2px);
  }
`;
