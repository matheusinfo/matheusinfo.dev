import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 24px;
    -webkit-text-size-adjust: 100%;
    background: ${({ theme }) => theme.colors.bg};
  }

  html, body {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 16px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: clip;
  }

  h1, h2, h3, h4 { margin: 0; line-height: 1.2; letter-spacing: -0.02em; }
  p { margin: 0; }
  a { color: inherit; text-decoration: none; }
  ul { margin: 0; padding: 0; list-style: none; }
  img { max-width: 100%; display: block; }
  button { font: inherit; color: inherit; cursor: pointer; background: none; border: none; padding: 0; }
  code, kbd, pre { font-family: ${({ theme }) => theme.fonts.mono}; }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
    border-radius: 2px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentContrast};
  }

  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: ${({ theme }) => theme.colors.bg}; }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderStrong};
    border-radius: 999px;
    border: 2px solid ${({ theme }) => theme.colors.bg};
  }
  ::-webkit-scrollbar-thumb:hover { background: ${({ theme }) => theme.colors.accent}; }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyle;
