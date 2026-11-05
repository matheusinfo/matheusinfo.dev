import type { Localized } from "../i18n/LanguageContext";

/**
 * Single source of truth for portfolio content (from the PT/EN resumes in public/curriculum).
 */

export const profile = {
  name: "Matheus Andrade",
  fullName: "Matheus de Andrade Pereira",
  handle: "matheusinfo",
  role: {
    pt: "Engenheiro de Software · Backend & Sistemas Financeiros",
    en: "Software Engineer · Backend & Financial Systems",
  } as Localized,
  tagline: {
    pt: "Construo sistemas financeiros de alta disponibilidade com Node.js, TypeScript e microserviços orientados a eventos — e integro LLMs para automatizar o que dá para automatizar.",
    en: "I build high-availability financial systems with Node.js, TypeScript and event-driven microservices — and wire up LLMs to automate whatever can be automated.",
  } as Localized,
  location: { pt: "Maringá, PR — Brasil", en: "Maringá, PR — Brazil" } as Localized,
  yearsOfExperience: 5,
  email: "matheus.add12@gmail.com",
  phone: "+55 44 99955-5595",
  whatsapp: "https://wa.me/5544999555595",
  socials: {
    github: "https://github.com/matheusinfo",
    linkedin: "https://www.linkedin.com/in/matheusinfo/",
  },
  resumes: [
    { lang: "pt", label: "Português", path: "/curriculum/curriculum.pdf", filename: "Matheus Andrade - Currículo.pdf" },
    { lang: "en", label: "English", path: "/curriculum/curriculum_en.pdf", filename: "Matheus Andrade - Resume.pdf" },
  ] as const,
};

export const about: Localized<string[]> = {
  pt: [
    "Sou engenheiro de software com mais de 5 anos de experiência construindo sistemas financeiros de alta disponibilidade. Hoje atuo na GazinTech, no contexto de banking, em soluções como PIX, PIX Automático e Cartão de Crédito — serviços com SLA crítico, onde segurança, performance e conformidade regulatória não são opcionais.",
    "No dia a dia trabalho com Node.js, TypeScript e arquitetura de microserviços orientada a eventos com Kafka, aplicando Clean Architecture, DDD, SOLID, testes automatizados e observabilidade (Datadog, Sentry) para manter sistemas distribuídos confiáveis em alto volume.",
    "Também desenvolvo soluções com IA aplicada: integração com LLMs (OpenAI), agentes inteligentes para automação de fluxos e orquestração de tarefas com controle de contexto e integração com APIs internas. Fora do trabalho, gosto de projetos de hardware e side projects — como transformar um Echo Show em servidor Linux.",
  ],
  en: [
    "I'm a software engineer with 5+ years of experience building high-availability financial systems. I currently work at GazinTech in the banking domain, on solutions such as PIX, recurring PIX and credit cards — SLA-critical services where security, performance and regulatory compliance are not optional.",
    "Day to day I work with Node.js, TypeScript and event-driven microservices on Kafka, applying Clean Architecture, DDD, SOLID, automated testing and observability (Datadog, Sentry) to keep high-throughput distributed systems reliable.",
    "I also build applied-AI solutions: LLM integration (OpenAI), intelligent agents for workflow automation and task orchestration with context management and internal API integrations. Outside work I enjoy hardware tinkering and side projects — like turning an Echo Show into a Linux server.",
  ],
};

export const highlights: { value: string; label: Localized }[] = [
  { value: "5+", label: { pt: "anos de experiência", en: "years of experience" } },
  { value: "PIX", label: { pt: "e cartão de crédito em produção", en: "& credit cards in production" } },
  { value: "Kafka", label: { pt: "microserviços orientados a eventos", en: "event-driven microservices" } },
  { value: "LLMs", label: { pt: "agentes e automação com IA", en: "AI agents & automation" } },
];

export const education = {
  institution: { pt: "Universidade Estadual de Maringá (UEM)", en: "State University of Maringá (UEM)" } as Localized,
  degree: { pt: "Bacharelado em Informática", en: "Bachelor's Degree in Computer Science" } as Localized,
  period: "2018 — 2022",
};

export const languages: { name: Localized; level: Localized }[] = [
  { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" } },
  { name: { pt: "Inglês", en: "English" }, level: { pt: "Intermediário", en: "Intermediate" } },
];

export interface Experience {
  /** short fake commit hash for the git-log visual */
  hash: string;
  company: string;
  url?: string;
  role: Localized;
  location: Localized;
  start: string; // YYYY-MM
  end: string | null; // null = present
  /** Conventional-commit style bullets */
  bullets: { type: "feat" | "fix" | "perf" | "refactor" | "docs" | "chore" | "test"; text: Localized }[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    hash: "f3a9c21",
    company: "GazinTech",
    url: "https://gazintech.com.br",
    role: { pt: "Desenvolvedor de Software", en: "Software Engineer" },
    location: { pt: "Maringá, PR", en: "Maringá, PR, Brazil" },
    start: "2021-06",
    end: null,
    bullets: [
      {
        type: "feat",
        text: {
          pt: "Participação direta em soluções financeiras — PIX, PIX Automático e Cartão de Crédito — garantindo segurança, performance e conformidade regulatória em serviços com SLA crítico.",
          en: "Directly contributed to financial solutions — PIX, recurring PIX and credit cards — ensuring security, performance and regulatory compliance in SLA-critical services.",
        },
      },
      {
        type: "refactor",
        text: {
          pt: "Desenho e desenvolvimento de APIs e microserviços orientados a eventos com Kafka, aplicando Clean Architecture, DDD e boas práticas para sistemas distribuídos de alto volume.",
          en: "Designed and built APIs and event-driven microservices on Kafka, applying Clean Architecture, DDD and best practices for high-throughput distributed systems.",
        },
      },
      {
        type: "feat",
        text: {
          pt: "Desenvolvimento de soluções com LLMs (OpenAI): agentes inteligentes para automação de fluxos e orquestração de tarefas com controle de contexto e integração com APIs internas.",
          en: "Built LLM-based solutions (OpenAI): intelligent agents for workflow automation and task orchestration with context management and internal API integrations.",
        },
      },
      {
        type: "perf",
        text: {
          pt: "Evolução e sustentação de sistemas críticos de varejo (B2C) e banking, passando pelos times Pintando7, Atacado, Logística e GazinBank, com foco em alta disponibilidade e escalabilidade.",
          en: "Evolved and maintained mission-critical retail (B2C) and banking systems across the Pintando7, Wholesale, Logistics and GazinBank teams, focusing on high availability and scalability.",
        },
      },
    ],
    stack: ["Node.js", "TypeScript", "NestJS", "Kafka", "PostgreSQL", "Docker", "Datadog", "OpenAI"],
  },
  {
    hash: "8b1e4d7",
    company: "Saura Consultoria",
    role: { pt: "Técnico de TI", en: "IT Technician" },
    location: { pt: "Maringá, PR", en: "Maringá, PR, Brazil" },
    start: "2019-03",
    end: "2021-05",
    bullets: [
      {
        type: "feat",
        text: {
          pt: "Desenvolvimento de funcionalidades web com React e PHP, colaborando na evolução de sistemas internos.",
          en: "Developed web features with React and PHP, contributing to internal systems.",
        },
      },
      {
        type: "chore",
        text: {
          pt: "Bancos de dados relacionais (PostgreSQL e MySQL) e versionamento com Git.",
          en: "Worked with relational databases (PostgreSQL, MySQL) and version control with Git.",
        },
      },
      {
        type: "fix",
        text: {
          pt: "Suporte técnico e manutenção de sistemas internos, garantindo continuidade operacional e resolução eficiente de incidentes.",
          en: "Provided technical support and system maintenance, ensuring operational continuity and efficient incident resolution.",
        },
      },
    ],
    stack: ["React", "PHP", "PostgreSQL", "MySQL", "Git"],
  },
];

export const skillGroups: { id: string; title: Localized; items: string[] }[] = [
  { id: "backend", title: { pt: "Backend", en: "Backend" }, items: ["Node.js", "TypeScript", "NestJS", ".NET", ".NET Core", "REST APIs"] },
  {
    id: "architecture",
    title: { pt: "Arquitetura", en: "Architecture" },
    items: ["Microserviços", "Event-driven", "Kafka", "Clean Architecture", "DDD", "SOLID"],
  },
  {
    id: "ai",
    title: { pt: "IA / LLMs", en: "AI / LLMs" },
    items: ["OpenAI API", "AI Agents", "RAG", "Prompt Engineering", "Context Management", "Tool Use"],
  },
  { id: "frontend", title: { pt: "Frontend / Mobile", en: "Frontend / Mobile" }, items: ["React", "Next.js", "React Native", "Flutter"] },
  {
    id: "devops",
    title: { pt: "Infra / DevOps", en: "Infra / DevOps" },
    items: ["Docker", "CI/CD", "Datadog", "Sentry", "Linux"],
  },
  { id: "data", title: { pt: "Dados", en: "Data" }, items: ["PostgreSQL", "MySQL", "Redis"] },
];

export interface Project {
  name: string;
  year: string;
  description: Localized;
  tags: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "Lapwing",
    year: "2026",
    featured: true,
    description: {
      pt: "App web para corredores: desenhe rotas no mapa seguindo ruas e trilhas, importe treinos (GPX, FIT, TCX) e analise pace, frequência cardíaca, splits e melhores esforços — sem conta, tudo no navegador.",
      en: "Web app for runners: draw routes on a map that snap to streets and trails, import workouts (GPX, FIT, TCX) and analyze pace, heart rate, splits and best efforts — no account, all in the browser.",
    },
    tags: ["TypeScript", "Vite", "MapLibre", "Docker"],
    repo: "https://github.com/matheusinfo/lapwing",
  },
  {
    name: "echo-penguin",
    year: "2026",
    featured: true,
    description: {
      pt: "Substitui o Android de um Amazon Echo Show 5 (2ª geração) por Alpine Linux: Wi-Fi, SSH só com chaves, Docker e uma tela touch com relógio e informações do sistema — um mini servidor 24/7.",
      en: "Replaces Android on an Amazon Echo Show 5 (2nd gen) with Alpine Linux: Wi-Fi, key-only SSH, Docker and a touch screen with clock and system info — a tiny always-on server.",
    },
    tags: ["Linux", "Alpine", "Shell", "Python"],
    repo: "https://github.com/matheusinfo/echo-penguin",
  },
  {
    name: "Echo Manager",
    year: "2026",
    featured: true,
    description: {
      pt: "App desktop que acompanha o echo-penguin: um painel para o Echo Show via SSH, com saúde do sistema (temperatura, memória, Wi-Fi), gestão de containers Docker, logs ao vivo com busca, alarme, tela, som e um terminal integrado.",
      en: "Desktop companion to echo-penguin: a dashboard for the Echo Show over SSH with system health (temperature, memory, Wi-Fi), Docker container management, live searchable logs, alarm, screen and sound controls, and a built-in terminal.",
    },
    tags: ["TypeScript", "Electron", "React", "SSH"],
    repo: "https://github.com/matheusinfo/echo-penguin-manager",
  },
  {
    name: "Clean Node API",
    year: "2021",
    description: {
      pt: "API construída com TDD, Clean Architecture, SOLID e design patterns, com cobertura de testes e documentação Swagger.",
      en: "API built with TDD, Clean Architecture, SOLID and design patterns, with test coverage and Swagger docs.",
    },
    tags: ["Node.js", "TypeScript", "Jest", "MongoDB"],
    repo: "https://github.com/matheusinfo/clean-ts-api",
  },
  {
    name: "Flutter — Guia de bolso",
    year: "2021",
    description: {
      pt: "App Android/iOS que serve como guia de bolso para iniciantes em Flutter: 23 widgets Material com exemplos e código lado a lado.",
      en: "Android/iOS pocket guide for Flutter beginners: 23 Material widgets with live examples and source side by side.",
    },
    tags: ["Flutter", "Dart", "Mobile"],
    repo: "https://github.com/matheusinfo/flutter-cookbook",
  },
  {
    name: "Salvando Vidas Maringá",
    year: "2022",
    description: {
      pt: "Site para o projeto social Salvando Vidas Maringá.",
      en: "Website for the Salvando Vidas Maringá social project.",
    },
    tags: ["Next.js", "TypeScript"],
    repo: "https://github.com/matheusinfo/salvandovidasmga",
    live: "https://salvandovidasmaringa.vercel.app/",
  },
  {
    name: "Combine N PDFs",
    year: "2022",
    description: {
      pt: "Aplicação simples para juntar N arquivos PDF em um só.",
      en: "Simple app to merge N PDF files into one.",
    },
    tags: ["JavaScript", "Node.js"],
    repo: "https://github.com/matheusinfo/combine-n-pdfs",
  },
];
