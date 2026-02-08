import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container, HyperLink, NavWrapper, Logo } from "./styles";

export const Header: React.FC = () => {
  const { asPath } = useRouter();

  return (
    <Container
      as={motion.div}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Logo as={motion.div} whileHover={{ scale: 1.05 }}>
        <Link href="/" passHref>
          <a>MA</a>
        </Link>
      </Logo>
      
      <NavWrapper>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" passHref>
            <HyperLink active={asPath === "/"}>Início</HyperLink>
          </Link>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
          <Link href="/about" passHref>
            <HyperLink active={asPath === "/about"}>Sobre mim</HyperLink>
          </Link>
        </motion.div>
      </NavWrapper>
    </Container>
  );
};
