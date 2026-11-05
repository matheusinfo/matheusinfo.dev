import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { media } from "../../styles/theme";
import type { Tone } from "./commands";

/* ================= Overlay ================= */

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  padding-top: max(16px, 8vh);
  background: rgba(5, 5, 7, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  overflow-y: auto;
  overscroll-behavior: contain;
  ${media.md} {
    align-items: center;
    padding-top: 16px;
  }
`;

/* ================= Terminal window ================= */

export const Window = styled(motion.div)`
  width: 720px;
  max-width: calc(100vw - 32px);
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 0 1px rgba(247, 187, 0, 0.04), 0 32px 80px -20px rgba(0, 0, 0, 0.85),
    0 0 100px -30px rgba(247, 187, 0, 0.3);
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  line-height: 1.6;
  transition: border-color ${({ theme }) => theme.transition};
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
  }
  ${media.md} {
    font-size: 14px;
  }
`;

export const TitleBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface2};
`;

export const Dots = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  > span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  > span:nth-of-type(1) {
    background: #febc2e;
  }
  > span:nth-of-type(2) {
    background: #28c840;
  }
`;

/** The red window dot, as a real close button with a comfortable hit area. */
export const CloseDot = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: -8px;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: rgba(77, 0, 0, 0.8);
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff5f57;
  }
  svg {
    width: 8px;
    height: 8px;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transition};
  }
  &:hover svg,
  &:focus-visible svg {
    opacity: 1;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -2px;
  }
`;

export const WindowTitle = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtle};
  white-space: nowrap;
  pointer-events: none;
`;

export const EscHint = styled.kbd`
  margin-right: 6px;
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  font-family: inherit;
  font-size: 11px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.subtle};
`;

export const Body = styled.div`
  height: min(360px, 50vh);
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  padding: 14px 14px 16px;
  cursor: text;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.borderStrong} transparent`};
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.surface};
  }
  ${media.md} {
    height: min(420px, 60vh);
    padding: 16px 18px 18px;
  }
`;

export const OutputLine = styled.div`
  min-height: 1.6em;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
  color: ${({ theme }) => theme.colors.text};
`;

const toneColor = (tone: Tone | undefined) => css`
  color: ${({ theme }) => {
    switch (tone) {
      case "muted":
        return theme.colors.muted;
      case "subtle":
        return theme.colors.subtle;
      case "accent":
        return theme.colors.accent;
      case "green":
        return theme.colors.green;
      case "red":
        return theme.colors.red;
      case "blue":
        return theme.colors.blue;
      case "purple":
        return theme.colors.purple;
      default:
        return theme.colors.text;
    }
  }};
`;

export const Span = styled.span<{ $tone?: Tone; $bold?: boolean }>`
  ${({ $tone }) => toneColor($tone)}
  font-weight: ${({ $bold }) => ($bold ? 700 : 400)};
`;

export const Anchor = styled.a<{ $tone?: Tone; $bold?: boolean }>`
  ${({ $tone }) => toneColor($tone)}
  font-weight: ${({ $bold }) => ($bold ? 700 : 400)};
  text-decoration: underline;
  text-decoration-color: rgba(247, 187, 0, 0.35);
  text-underline-offset: 3px;
  cursor: pointer;
  &:hover {
    text-decoration-color: currentColor;
  }
  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

export const Prompt = styled.span`
  user-select: none;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.green};
  b {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.blue};
  }
  i {
    font-style: normal;
    color: ${({ theme }) => theme.colors.subtle};
  }
`;

export const Cursor = styled.span`
  display: inline-block;
  width: 0.6em;
  height: 1.15em;
  vertical-align: text-bottom;
  background: ${({ theme }) => theme.colors.accent};
  animation: blink 1.1s step-end infinite;
`;

export const InputRow = styled.div<{ $hidden?: boolean }>`
  display: flex;
  align-items: baseline;
  min-height: 1.6em;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
`;

export const InputWrap = styled.span`
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  caret-color: ${({ theme }) => theme.colors.accent};
  font-family: inherit;
  &:focus-visible {
    outline: none;
  }
  /* >= 16px prevents iOS from zooming the page on focus */
  font-size: 16px;
  line-height: 1.6;
  ${media.md} {
    font-size: inherit;
  }
`;
