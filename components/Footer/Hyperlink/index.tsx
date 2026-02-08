import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { LinkWrapper } from "./styles";

type HyperlinkProps = {
  name: string;
  path: string;
  blank?: boolean;
  icon?: ReactNode;
};

export const Hyperlink: React.FC<HyperlinkProps> = ({
  name,
  path,
  blank = true,
  icon,
}) => (
  <LinkWrapper
    as={motion.a}
    href={path}
    target={blank ? "_blank" : "_self"}
    rel="noreferrer"
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    {icon && <span className="icon">{icon}</span>}
    {name}
  </LinkWrapper>
);
