import React from "react";
import Image from 'next/image'
import { Container } from "./styles";

export const Logo: React.FC = () => (
  <Container>
    <Image
      src="https://svgshare.com/i/q85.svg"
      alt="Matheus Andrade Logo"
      width={90}
      height={90}
    />
  </Container>
);
