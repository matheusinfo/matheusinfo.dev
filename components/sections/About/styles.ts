import styled from "styled-components";
import { media } from "../../../styles/theme";

export const Prose = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1em;
  font-size: 1rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.muted};

  strong {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CompanyLink = styled.a`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.borderStrong};
  text-underline-offset: 3px;
  transition:
    color ${({ theme }) => theme.transition},
    text-decoration-color ${({ theme }) => theme.transition};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration-color: currentColor;
  }
`;

export const Stats = styled.ul`
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Stat = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 16px 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:nth-child(even) {
    padding: 20px 0 20px 16px;
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }

  ${media.sm} {
    padding: 24px 24px 24px 0;
    &:nth-child(even) {
      padding: 24px 0 24px 24px;
    }
  }
`;

export const StatValue = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};

  ${media.sm} {
    font-size: 1.9rem;
  }
`;

export const StatLabel = styled.span`
  font-size: 0.85rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Facts = styled.dl`
  margin: 32px 0 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Fact = styled.div`
  display: grid;
  gap: 4px;

  ${media.sm} {
    grid-template-columns: 8rem 1fr;
    gap: 16px;
    align-items: baseline;
  }

  dd {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 0.95rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
  }

  strong {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;
