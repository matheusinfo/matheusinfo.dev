import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, HyperLink } from "./styles";

export const Header: React.FC = () => {
  const { asPath } = useRouter();

  return (
    <Container>
      <Link href="/" passHref>
        <HyperLink active={asPath === "/"}>Inicio</HyperLink>
      </Link>
      <Link href="/about" passHref>
        <HyperLink active={asPath === "/about"}>Sobre mim</HyperLink>
      </Link>
    </Container>
  );
};
