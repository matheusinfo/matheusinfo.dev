import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container, HeroSection, ProfileImage, Title, Subtitle, CTAButton, TechStack, TechBadge } from "./styles";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const technologies = [
  "React", "Next.js", "Node.js", "TypeScript", "Flutter", "NestJS", "PostgreSQL", "Docker"
];

export const Body: React.FC = () => (
  <Container>
    <HeroSection
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ProfileImage as={motion.div} variants={imageVariants}>
        <Image
          src="https://user-images.githubusercontent.com/48860569/217674510-ec97555d-315a-413d-8734-d4a8054c42a6.svg"
          alt="Matheus Andrade Logo"
          height={350}
          width={350}
        />
      </ProfileImage>

      <Title as={motion.h1} variants={itemVariants}>
        Olá, eu sou <span>Matheus Andrade</span>
      </Title>

      <Subtitle as={motion.p} variants={itemVariants}>
        Desenvolvedor <span>FullStack</span> apaixonado por criar experiências
        digitais incríveis. Especializado em web, mobile e backend.
      </Subtitle>

      <TechStack as={motion.div} variants={itemVariants}>
        {technologies.map((tech, index) => (
          <TechBadge
            key={tech}
            as={motion.span}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -2 }}
          >
            {tech}
          </TechBadge>
        ))}
      </TechStack>

      <CTAButton
        as={motion.a}
        href="https://drive.google.com/file/d/1u8tgi3JCJcbgbdwkTrP0M-ks4K9aWNtN/view?usp=sharing"
        target="_blank"
        rel="noreferrer"
        variants={itemVariants}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(247, 187, 0, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        Baixar Currículo
      </CTAButton>
    </HeroSection>
  </Container>
);
