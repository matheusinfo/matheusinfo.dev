import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container, HyperLink, Button } from "./styles";

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
    <Button
      as={motion.button}
      active={active}
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <Link href={path} passHref>
        <HyperLink active={active}>{name}</HyperLink>
      </Link>
    </Button>
  </Container>
);
