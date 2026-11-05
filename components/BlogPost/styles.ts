import styled from "styled-components";
import Link from "next/link";
import { media } from "../../styles/theme";

export const Page = styled.div`
  padding: 32px 0 80px;

  ${media.md} {
    padding: 64px 0 120px;
  }
`;

export const Article = styled.article`
  max-width: 72ch;
  margin: 0 auto;
  min-width: 0;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transition};

  svg {
    flex-shrink: 0;
    transition: transform ${({ theme }) => theme.transition};
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
  }
  &:hover svg {
    transform: translateX(-3px);
  }
`;

export const PostHeader = styled.header`
  margin: 24px 0 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${media.md} {
    margin: 32px 0 48px;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.85rem, 6vw, 2.6rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
  text-wrap: balance;
  overflow-wrap: break-word;
`;

export const Meta = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.subtle};
`;

export const LangNote = styled.p`
  margin-top: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.subtle};
`;

export const ArticleFooter = styled.footer`
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
