/**
 * UI strings (labels, buttons, headings). Profile content lives in data/profile.ts.
 * Agents: add keys to BOTH languages; the `Dictionary` type is derived from `pt`.
 */
const pt = {
  nav: {
    about: "Sobre",
    experience: "Experiência",
    skills: "Skills",
    projects: "Projetos",
    blog: "Blog",
    contact: "Contato",
    menu: "Abrir menu",
    closeMenu: "Fechar menu",
    switchLang: "Switch to English",
    skipToContent: "Pular para o conteúdo",
  },
  hero: {
    greeting: "Olá, eu sou",
    ctaProjects: "Ver projetos",
    ctaContact: "Entrar em contato",
    resume: "Baixar currículo",
    terminalHint: "clique no terminal e digite 'help'",
  },
  terminal: {
    open: "Abrir terminal",
    close: "Fechar terminal",
    shortcut: "Pressione ' ou Ctrl + K para abrir o terminal",
    title: "Terminal",
  },
  sections: {
    about: { title: "Sobre" },
    experience: { title: "Experiência" },
    skills: { title: "Skills" },
    projects: { title: "Projetos" },
    blog: { title: "Artigos" },
    contact: { title: "Contato" },
  },
  about: {
    education: "Formação",
    languages: "Idiomas",
    location: "Localização",
  },
  experience: {
    present: "Atual",
  },
  projects: {
    source: "Código",
    live: "Ver online",
    privateNote:
      "Meus projetos profissionais são privados. Aqui estão alguns projetos pessoais e acadêmicos públicos.",
    more: "Ver tudo no GitHub",
  },
  blog: {
    readMore: "Ler artigo",
    allPosts: "Todos os artigos",
    readTime: "de leitura",
    back: "Voltar para o blog",
    pageTitle: "Blog",
    pageDescription: "Artigos sobre desenvolvimento de software, arquitetura e tecnologia.",
    contentLangNote: "Artigos escritos em português.",
  },
  contact: {
    intro:
      "Tem uma oportunidade, um projeto ou só quer trocar uma ideia? Minha caixa de entrada está aberta.",
    copy: "Copiar e-mail",
    copied: "Copiado!",
    resumePt: "Currículo (PT)",
    resumeEn: "Resume (EN)",
  },
  footer: {
    built: "Feito com Next.js, styled-components e café.",
    rights: "Todos os direitos reservados.",
  },
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  nav: {
    about: "About",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    menu: "Open menu",
    closeMenu: "Close menu",
    switchLang: "Mudar para português",
    skipToContent: "Skip to content",
  },
  hero: {
    greeting: "Hi, I'm",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
    resume: "Download resume",
    terminalHint: "click the terminal and type 'help'",
  },
  terminal: {
    open: "Open terminal",
    close: "Close terminal",
    shortcut: "Press ' or Ctrl + K to open the terminal",
    title: "Terminal",
  },
  sections: {
    about: { title: "About" },
    experience: { title: "Experience" },
    skills: { title: "Skills" },
    projects: { title: "Projects" },
    blog: { title: "Writing" },
    contact: { title: "Contact" },
  },
  about: {
    education: "Education",
    languages: "Languages",
    location: "Location",
  },
  experience: {
    present: "Present",
  },
  projects: {
    source: "Source",
    live: "Live",
    privateNote:
      "My professional work is private. Here are some public personal and academic projects.",
    more: "See everything on GitHub",
  },
  blog: {
    readMore: "Read post",
    allPosts: "All posts",
    readTime: "read",
    back: "Back to blog",
    pageTitle: "Blog",
    pageDescription: "Posts about software development, architecture and technology.",
    contentLangNote: "Posts are written in Portuguese.",
  },
  contact: {
    intro:
      "Have an opportunity, a project, or just want to chat? My inbox is always open.",
    copy: "Copy e-mail",
    copied: "Copied!",
    resumePt: "Currículo (PT)",
    resumeEn: "Resume (EN)",
  },
  footer: {
    built: "Built with Next.js, styled-components and coffee.",
    rights: "All rights reserved.",
  },
};

export const dictionary = { pt, en };
