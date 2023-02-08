import React from "react";
import Image from "next/image";
import { Container } from "./styles";
import Logo from "../../../public/logo.svg";

export const Body: React.FC = () => (
  <Container>
    <Image
      src="https://svgshare.com/i/q85.svg"
      alt="Matheus Andrade Logo"
      height={425}
      width={425}
    />
    <strong>
      Matheus <span>Andrade</span> - Desenvolvedor FullStack
    </strong>
    <small>
      Entusiasta da programação, atualmente trabalho como desenvolvedor
      FullStack, atuando em web, mobile e backend.
    </small>
    <button>
      <a
        href="https://drive.google.com/file/d/14eJRbNcwgFzZxQYvoESPn-Kv3acDXGFm/view"
        target="_blank"
        rel="noreferrer"
      >
        Baixar currículo
      </a>
    </button>
  </Container>
);
