import styled from "styled-components";
import { motion } from "framer-motion";

export const Bar = styled(motion.div)`
  position: fixed;
  top: ${({ theme }) => theme.layout.headerHeight};
  left: 0;
  right: 0;
  z-index: 98;
  height: 2px;
  transform-origin: 0% 50%;
  background: ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 8px rgba(247, 187, 0, 0.45);
  pointer-events: none;
`;
