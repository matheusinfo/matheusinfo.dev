import React from "react";
import Image from "next/image";
import { Container } from "./styles";

export const Body: React.FC = () => (
  <Container>
    <Image
      src="https://user-images.githubusercontent.com/48860569/217674510-ec97555d-315a-413d-8734-d4a8054c42a6.svg"
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
