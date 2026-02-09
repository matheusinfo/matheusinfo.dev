"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image'
import { Container, BrandName } from "./styles";

export const Logo: React.FC = () => (
  <Container as={motion.div} whileHover={{ scale: 1.05 }}>
    <Image
      src="https://user-images.githubusercontent.com/48860569/217674510-ec97555d-315a-413d-8734-d4a8054c42a6.svg"
      alt="Matheus Andrade Logo"
      width={70}
      height={70}
    />
    <BrandName>
      Matheus<span>Andrade</span>
    </BrandName>
    <p>Desenvolvedor FullStack</p>
  </Container>
);
