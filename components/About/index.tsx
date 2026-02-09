"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Container,
  Content,
  ProfileSection,
  SectionTitle,
  ExperienceCard,
  ExperienceTimeline,
  ProjectsCard,
  SkillsGrid,
  SkillBadge,
  HandleText,
} from "./styles";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const skills = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: ".NET", category: "backend" },
  { name: "React Native", category: "mobile" },
  { name: "Flutter", category: "mobile" },
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "Firebase", category: "database" },
  { name: "Docker", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "Kafka", category: "devops" },
  { name: "Jest", category: "testing" },
  { name: "Cypress", category: "testing" },
  { name: "Git", category: "tools" },
];

const experiences = [
  {
    company: "GazinTech",
    role: "Desenvolvedor FullStack",
    period: "06/2021 - Atual",
    description:
      "Atuação em diversos times internos da empresa, como Pintando7, Atacado, Logística e, atualmente, GazinBank, contribuindo para o desenvolvimento, evolução e sustentação de sistemas críticos ao negócio. Participação ativa em projetos estratégicos, incluindo soluções de meios de pagamento como PIX, PIX Automático e Cartão de Crédito, com foco em alta disponibilidade, segurança, escalabilidade e qualidade das entregas.",
  },
  {
    company: "Saura Consultoria",
    role: "Técnico T.I",
    period: "04/2019 - 05/2021",
    description:
      "Durante a maior parte do período, atuei com manutenção de sistemas e suporte a usuários. Nos últimos meses, passei a ter contato direto com atividades de desenvolvimento, contribuindo para a evolução de soluções internas e aprimoramento de funcionalidades.",
  },
];

export const About: React.FC = () => (
  <Container>
    <Content
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ProfileSection as={motion.div} variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="https://user-images.githubusercontent.com/48860569/217674510-ec97555d-315a-413d-8734-d4a8054c42a6.svg"
            alt="Matheus Andrade"
            width={180}
            height={180}
          />
        </motion.div>
        <p>
          Sempre fui muito ligado à tecnologia desde criança. Quando comecei na
          faculdade em 2018, essa paixão só cresceu. Busco aprender e me
          aperfeiçoar um pouco mais a cada dia. Durante meus 5 anos de
          experiência, participei de diversos times e tive contato com diversas
          áreas de negócio.
        </p>
      </ProfileSection>

      <SectionTitle as={motion.h2} variants={itemVariants}>
        Experiência Profissional
      </SectionTitle>

      <ExperienceTimeline>
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={exp.company}
            as={motion.div}
            variants={cardVariants}
            whileHover={{ scale: 1.02, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="timeline-dot" />
            <h3>{exp.company}</h3>
            <h4>{exp.role}</h4>
            <span className="period">{exp.period}</span>
            <p>{exp.description}</p>
          </ExperienceCard>
        ))}
      </ExperienceTimeline>

      <SectionTitle as={motion.h2} variants={itemVariants}>
        Habilidades Técnicas
      </SectionTitle>

      <SkillsGrid as={motion.div} variants={itemVariants}>
        {skills.map((skill, index) => (
          <SkillBadge
            key={skill.name}
            as={motion.div}
            category={skill.category}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            {skill.name}
          </SkillBadge>
        ))}
      </SkillsGrid>

      <SectionTitle as={motion.h2} variants={itemVariants}>
        Projetos
      </SectionTitle>

      <ProjectsCard as={motion.div} variants={itemVariants}>
        <p>
          Meus projetos profissionais são privados e respeitam a política de
          privacidade das empresas. Porém, tenho projetos públicos no meu{" "}
          <motion.a
            href="https://github.com/matheusinfo"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
          >
            GitHub
          </motion.a>
          .
        </p>
      </ProjectsCard>

      <HandleText
        as={motion.span}
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        @matheusinfo
      </HandleText>
    </Content>
  </Container>
);
