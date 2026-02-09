import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container, NavLink } from "./styles";

type ListItensProps = {
  title: string;
  path: string;
  children: ReactNode;
  name: string;
  active: boolean;
  onClick: () => void;
};

export const ListItens: React.FC<ListItensProps> = ({
  children,
  title,
  path,
  name,
  active,
  onClick
}) => (
  <Container>
    <strong>{title}</strong>
    <NavLink
      as={motion.div}
      $active={active}
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <Link href={path}>{name}</Link>
    </NavLink>
  </Container>
);
