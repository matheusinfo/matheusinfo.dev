"use client";

import React from "react";
import { useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Bar } from "./styles";

interface ReadingProgressProps {
  /** Element whose scroll-through is measured (the article). Falls back to the page. */
  target?: React.RefObject<HTMLElement | null>;
}

/** Thin accent bar under the sticky header showing how much of the article was read. */
export const ReadingProgress: React.FC<ReadingProgressProps> = ({ target }) => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll(
    target ? { target: target as React.RefObject<HTMLElement>, offset: ["start start", "end end"] } : undefined
  );
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  return <Bar aria-hidden="true" style={{ scaleX: reduce ? scrollYProgress : smooth }} />;
};
