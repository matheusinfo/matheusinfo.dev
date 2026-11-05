export const theme = {
  colors: {
    bg: "#0b0b0d",
    surface: "#121215",
    surface2: "#18181c",
    border: "#26262c",
    borderStrong: "#34343c",
    text: "#ececef",
    muted: "#a1a1aa",
    subtle: "#71717a",
    accent: "#f7bb00",
    accentHover: "#ffcc33",
    accentSoft: "rgba(247, 187, 0, 0.12)",
    accentContrast: "#121214",
    green: "#4ade80",
    red: "#f87171",
    blue: "#60a5fa",
    purple: "#c084fc",
  },
  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  },
  radii: { sm: "4px", md: "8px", lg: "12px", full: "999px" },
  layout: { maxWidth: "1040px", gutter: "24px", gutterMobile: "16px", headerHeight: "64px" },
  breakpoints: { sm: "640px", md: "768px", lg: "1024px" },
  transition: "180ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export type AppTheme = typeof theme;

/** Media query helpers: `${media.md} { ... }` => applies at >= md */
export const media = {
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
};
