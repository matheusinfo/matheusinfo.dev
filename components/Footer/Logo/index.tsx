import React from "react";
import Image from 'next/image'
import { Container } from "./styles";

export const Logo: React.FC = () => (
  <Container>
    <Image
      src="https://user-images.githubusercontent.com/48860569/217674510-ec97555d-315a-413d-8734-d4a8054c42a6.svg"
      alt="Matheus Andrade Logo"
      width={90}
      height={90}
    />
  </Container>
);
