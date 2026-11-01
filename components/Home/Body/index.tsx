"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  HeroSection,
  ProfileImage,
  Title,
  Subtitle,
  CTAButton,
  TechStack,
  TechBadge,
  ResumeWrapper,
  ResumeMenu,
  ResumeOption,
} from "./styles";

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

const resumes = [
  { label: "Português", path: "/curriculum/curriculum.pdf", filename: "Matheus Andrade - Currículo.pdf" },
  { label: "English", path: "/curriculum/curriculum_en.pdf", filename: "Matheus Andrade - Resume.pdf" },
];

const ResumeDownload: React.FC = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <ResumeWrapper ref={wrapperRef} as={motion.div} variants={itemVariants}>
      <CTAButton
        as={motion.button}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(247, 187, 0, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        Baixar Currículo
      </CTAButton>

      <AnimatePresence>
        {open && (
          <ResumeMenu
            as={motion.div}
            role="menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {resumes.map((resume) => (
              <ResumeOption
                key={resume.path}
                role="menuitem"
                href={resume.path}
                download={resume.filename}
                onClick={() => setOpen(false)}
              >
                {resume.label}
              </ResumeOption>
            ))}
          </ResumeMenu>
        )}
      </AnimatePresence>
    </ResumeWrapper>
  );
};

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

      <ResumeDownload />
    </HeroSection>
  </Container>
);
