"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Glow = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(600px circle at var(--x, 20%) var(--y, 10%), rgba(247, 187, 0, 0.07), transparent 80%);

  @media (hover: none) {
    --x: 20%;
    --y: 0%;
  }
`;

/** Soft amber glow that follows the cursor (static on touch devices). */
export const Spotlight: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        ref.current?.style.setProperty("--x", `${e.clientX}px`);
        ref.current?.style.setProperty("--y", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <Glow ref={ref} aria-hidden="true" />;
};
