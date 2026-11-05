import styled, { css } from "styled-components";
import { media } from "../../styles/theme";

export const Root = styled.footer<{ $variant: "page" | "column" }>`
  font-size: 0.82rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.subtle};

  ${({ $variant, theme }) =>
    $variant === "page"
      ? css`
          border-top: 1px solid ${theme.colors.border};
          padding: 28px 0 32px;
        `
      : css`
          max-width: 28rem;
          padding: 8px 0 72px;

          ${media.lg} {
            padding-bottom: 96px;
          }
        `}
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
`;

export const Credits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const Line = styled.p`
  overflow-wrap: anywhere;
`;

export const InlineLink = styled.a`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;
  transition: color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Socials = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: -10px;

  ${media.md} {
    margin-left: 0;
    margin-right: -10px;
  }
`;

export const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.subtle};
  transition: color ${({ theme }) => theme.transition}, transform ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;
