"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container, NavWrapper, Logo, NavLink } from "./styles";

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <Container
      as={motion.div}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Logo as={motion.div} whileHover={{ scale: 1.05 }}>
        <Link href="/">MA</Link>
      </Logo>
      
      <NavWrapper>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <NavLink href="/" $active={pathname === "/"}>Início</NavLink>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <NavLink href="/about" $active={pathname === "/about"}>Sobre mim</NavLink>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <NavLink href="/blog" $active={pathname?.startsWith("/blog") ?? false}>Blog</NavLink>
        </motion.div>
      </NavWrapper>
    </Container>
  );
};
