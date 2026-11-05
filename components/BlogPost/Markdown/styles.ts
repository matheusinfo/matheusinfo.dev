import styled from "styled-components";
import { media } from "../../../styles/theme";

export const InlineCode = styled.code`
  font-size: 0.875em;
  padding: 0.15em 0.4em;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  overflow-wrap: anywhere;
`;

/** Rendered as <figure>; the language tag is its <figcaption>. */
export const CodeBlock = styled.figure<{ $hasLang: boolean }>`
  position: relative;
  margin: 1.75em 0;
  min-width: 0;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};

  pre {
    margin: 0;
    padding: ${({ $hasLang }) => ($hasLang ? "2.25rem" : "1rem")} 1rem 1rem;
    overflow-x: auto;
    font-size: 0.82rem;
    line-height: 1.65;
    tab-size: 2;
    color: ${({ theme }) => theme.colors.text};
    border-radius: inherit;

    ${media.md} {
      padding: ${({ $hasLang }) => ($hasLang ? "2.25rem" : "1.25rem")} 1.25rem 1.25rem;
      font-size: 0.875rem;
    }
  }

  pre:focus-visible {
    outline-offset: -2px;
  }

  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    white-space: pre;
  }
`;

export const CodeLang = styled.figcaption`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  line-height: 1.4;
  text-transform: lowercase;
  color: ${({ theme }) => theme.colors.subtle};
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0 ${({ theme }) => theme.radii.md} 0 ${({ theme }) => theme.radii.sm};
  pointer-events: none;
`;

export const Prose = styled.div`
  font-size: 1.0625rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
  overflow-wrap: break-word;

  > :first-child {
    margin-top: 0;
  }

  p {
    margin: 0 0 1.25em;
    color: #d4d4d8;
  }

  h2,
  h3 {
    scroll-margin-top: calc(${({ theme }) => theme.layout.headerHeight} + 24px);
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.3;
    text-wrap: balance;
  }

  h2 {
    font-size: clamp(1.35rem, 3.5vw, 1.55rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 2.25em 0 0.75em;
  }

  h3 {
    font-size: clamp(1.1rem, 3vw, 1.2rem);
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 1.75em 0 0.5em;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 650;
  }

  em {
    font-style: italic;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    text-decoration-color: rgba(247, 187, 0, 0.4);
    transition: text-decoration-color ${({ theme }) => theme.transition},
      color ${({ theme }) => theme.transition};

    &:hover {
      color: ${({ theme }) => theme.colors.accentHover};
      text-decoration-color: currentColor;
    }
  }

  ul,
  ol {
    margin: 0 0 1.25em;
    padding-left: 1.5em;
    color: #d4d4d8;
  }

  ul {
    list-style: disc;
    padding-left: 1.25em;
  }

  ol {
    list-style: decimal;
  }

  li::marker {
    color: ${({ theme }) => theme.colors.subtle};
  }

  ol > li::marker {
    font-size: 0.9em;
    font-variant-numeric: tabular-nums;
  }

  li + li {
    margin-top: 0.4em;
  }

  blockquote {
    margin: 1.75em 0;
    padding: 0.75em 1.25em;
    border-left: 2px solid ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 0 ${({ theme }) => theme.radii.md} ${({ theme }) => theme.radii.md} 0;
    color: ${({ theme }) => theme.colors.muted};

    p:last-child,
    ul:last-child,
    ol:last-child {
      margin-bottom: 0;
    }
  }

  hr {
    border: 0;
    height: 1px;
    margin: 2.5em 0;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.borderStrong} 20%,
      ${({ theme }) => theme.colors.borderStrong} 80%,
      transparent
    );
  }
`;
