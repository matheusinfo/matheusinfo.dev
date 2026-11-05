import type { Lang, Localized } from "../../i18n/LanguageContext";
import { about, experiences, profile, projects, skillGroups } from "../../data/profile";

/* ---------- Output model ---------- */

export type Tone = "text" | "muted" | "subtle" | "accent" | "green" | "red" | "blue" | "purple";

export interface Part {
  text: string;
  tone?: Tone;
  bold?: boolean;
  href?: string;
  /** When set, the link downloads the file with this name */
  download?: string;
}

/** A single output line: plain text or a list of styled parts. */
export type Line = string | Part[];

export interface CommandContext {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Prefix a public/ path with the basePath */
  asset: (path: string) => string;
  reduceMotion: boolean;
  /** Close the overlay, then run `after` once the page is interactive again */
  close: (after?: () => void) => void;
  /** Client-side navigation (basePath is added by the router) */
  navigate: (url: string) => void;
}

export interface CommandResult {
  lines: Line[];
  /** Wipe the screen before printing */
  clear?: boolean;
  /** Side effect to run after the output is printed */
  effect?: () => void;
}

/* ---------- Static data ---------- */

export const SECTION_IDS = ["about", "experience", "skills", "projects", "blog", "contact"] as const;

const SECTION_ALIASES: Record<string, (typeof SECTION_IDS)[number]> = {
  home: "about",
  inicio: "about",
  "início": "about",
  sobre: "about",
  experiencia: "experience",
  "experiência": "experience",
  habilidades: "skills",
  projetos: "projects",
  artigos: "blog",
  posts: "blog",
  contato: "contact",
};

const HELP: { name: string; args?: string; desc: Localized }[] = [
  { name: "help", desc: { pt: "lista os comandos disponíveis", en: "list available commands" } },
  { name: "whoami", desc: { pt: "quem sou eu", en: "who am I" } },
  { name: "about", desc: { pt: "um pouco sobre mim", en: "a bit about me" } },
  { name: "experience", desc: { pt: "histórico profissional", en: "work history" } },
  { name: "skills", desc: { pt: "tecnologias que uso", en: "technologies I use" } },
  { name: "projects", desc: { pt: "projetos em destaque", en: "featured projects" } },
  { name: "contact", desc: { pt: "como falar comigo", en: "how to reach me" } },
  { name: "social", desc: { pt: "redes e perfis", en: "social profiles" } },
  { name: "resume", desc: { pt: "baixar currículo (PDF)", en: "download resume (PDF)" } },
  { name: "lang", args: "pt|en", desc: { pt: "trocar idioma", en: "switch language" } },
  { name: "goto", args: "<section>", desc: { pt: "ir até uma seção", en: "jump to a section" } },
  { name: "ls", desc: { pt: "listar seções", en: "list sections" } },
  { name: "date", desc: { pt: "data e hora atuais", en: "current date and time" } },
  { name: "echo", args: "<text>", desc: { pt: "repete o texto", en: "print text" } },
  { name: "clear", desc: { pt: "limpar a tela", en: "clear the screen" } },
  { name: "exit", desc: { pt: "fechar o terminal (ou esc)", en: "close the terminal (or esc)" } },
];

export const COMMAND_NAMES = [...HELP.map((c) => c.name), "close", "sudo"];

const ARG_COMPLETIONS: Record<string, readonly string[]> = {
  lang: ["pt", "en"],
  goto: SECTION_IDS,
};

const SECTION_FILES: Record<(typeof SECTION_IDS)[number], string> = {
  about: "about.md",
  experience: "experience.log",
  skills: "skills.ts",
  projects: "projects.ts",
  blog: "posts/",
  contact: "contact.sh",
};

/* ---------- Helpers ---------- */

const hintLine = (lang: Lang): Line => [
  { text: lang === "pt" ? "digite " : "type ", tone: "subtle" },
  { text: "help", tone: "accent" },
  { text: lang === "pt" ? " para ver os comandos" : " to see all commands", tone: "subtle" },
];

const formatPeriod = (start: string, end: string | null, lang: Lang) =>
  `${start} → ${end ?? (lang === "pt" ? "atual" : "present")}`;

const pad = (text: string, size: number) => (text.length >= size ? `${text} ` : text.padEnd(size));

/* ---------- Commands ---------- */

type Handler = (args: string[], ctx: CommandContext) => CommandResult;

const handlers: Record<string, Handler> = {
  help: (_args, { lang }) => ({
    lines: [
      [{ text: lang === "pt" ? "Comandos disponíveis:" : "Available commands:", tone: "muted" }],
      ...HELP.map<Line>((c) => [
        { text: pad(c.args ? `${c.name} ${c.args}` : c.name, 18), tone: "accent" },
        { text: c.desc[lang], tone: "muted" },
      ]),
      [
        {
          text:
            lang === "pt"
              ? "dica: Tab completa, ↑/↓ navegam no histórico, Ctrl+L limpa, Esc fecha."
              : "tip: Tab completes, ↑/↓ browse history, Ctrl+L clears, Esc closes.",
          tone: "subtle",
        },
      ],
    ],
  }),

  whoami: (_args, { lang }) => ({
    lines: [
      [{ text: profile.name, tone: "text", bold: true }],
      [{ text: profile.role[lang], tone: "accent" }],
      [{ text: profile.location[lang], tone: "muted" }],
    ],
  }),

  about: (_args, { lang }) => ({
    lines: [
      about[lang][0],
      "",
      [
        { text: "→ ", tone: "subtle" },
        { text: "goto about", tone: "accent" },
        { text: lang === "pt" ? " para ler mais" : " to read more", tone: "subtle" },
      ],
    ],
  }),

  experience: (_args, { lang }) => ({
    lines: experiences.flatMap<Line>((exp, i) => [
      [
        { text: "* ", tone: "subtle" },
        { text: exp.hash, tone: "accent" },
        ...(i === 0 ? [{ text: " (HEAD -> main)", tone: "green" as Tone }] : []),
        { text: " " },
        exp.url
          ? { text: exp.company, tone: "text", bold: true, href: exp.url }
          : { text: exp.company, tone: "text", bold: true },
      ],
      [{ text: `  ${exp.role[lang]}`, tone: "blue" }],
      [{ text: `  ${formatPeriod(exp.start, exp.end, lang)} · ${exp.location[lang]}`, tone: "muted" }],
    ]),
  }),

  skills: (_args, { lang }) => ({
    lines: skillGroups.map<Line>((g) => [
      { text: `${g.title[lang]}: `, tone: "purple" },
      { text: g.items.join(", "), tone: "text" },
    ]),
  }),

  projects: (_args, { lang }) => ({
    lines: [
      ...projects
        .filter((p) => p.featured)
        .flatMap<Line>((p) => [
          [
            { text: "▸ ", tone: "subtle" },
            p.repo ? { text: p.name, tone: "accent", bold: true, href: p.repo } : { text: p.name, tone: "accent", bold: true },
            { text: ` (${p.year})`, tone: "subtle" },
          ],
          [{ text: `  ${p.description[lang]}`, tone: "muted" }],
          [{ text: `  ${p.tags.join(" · ")}`, tone: "blue" }],
        ]),
      [
        { text: "→ ", tone: "subtle" },
        { text: "goto projects", tone: "accent" },
        { text: lang === "pt" ? " para ver todos" : " to see them all", tone: "subtle" },
      ],
    ],
  }),

  contact: (_args, { lang }) => ({
    lines: [
      [
        { text: pad("e-mail", 10), tone: "muted" },
        { text: profile.email, tone: "accent", href: `mailto:${profile.email}` },
      ],
      [
        { text: pad("whatsapp", 10), tone: "muted" },
        { text: profile.phone, tone: "accent", href: profile.whatsapp },
      ],
      [
        { text: pad(lang === "pt" ? "local" : "location", 10), tone: "muted" },
        { text: profile.location[lang], tone: "text" },
      ],
    ],
  }),

  social: () => ({
    lines: [
      [{ text: pad("github", 10), tone: "muted" }, { text: "github.com/matheusinfo", tone: "accent", href: profile.socials.github }],
      [{ text: pad("linkedin", 10), tone: "muted" }, { text: "in/matheusinfo", tone: "accent", href: profile.socials.linkedin }],
    ],
  }),

  resume: (_args, { lang, asset }) => ({
    lines: [
      [{ text: lang === "pt" ? "Currículos disponíveis:" : "Available resumes:", tone: "muted" }],
      ...profile.resumes.map<Line>((r) => [
        { text: `[${r.lang}] `, tone: "subtle" },
        { text: r.filename, tone: "accent", href: asset(r.path), download: r.filename },
      ]),
    ],
  }),

  lang: (args, { lang, setLang }) => {
    const next = args[0]?.toLowerCase();
    if (next === "pt" || next === "en") {
      if (next === lang) {
        return { lines: [[{ text: next === "pt" ? "Já está em português." : "Already in English.", tone: "muted" }]] };
      }
      return {
        lines: [[{ text: next === "pt" ? "Idioma alterado para português." : "Language switched to English.", tone: "green" }]],
        effect: () => setLang(next),
      };
    }
    return {
      lines: [
        [{ text: lang === "pt" ? `idioma atual: ${lang}` : `current language: ${lang}`, tone: "muted" }],
        [{ text: lang === "pt" ? "uso: " : "usage: ", tone: "subtle" }, { text: "lang pt|en", tone: "accent" }],
      ],
    };
  },

  goto: (args, { lang, reduceMotion, close, navigate }) => {
    const raw = args[0]?.toLowerCase().replace(/^#/, "") ?? "";
    const id = (SECTION_IDS as readonly string[]).includes(raw) ? raw : SECTION_ALIASES[raw];
    if (!id) {
      return {
        lines: [
          ...(raw
            ? [[{ text: lang === "pt" ? `seção não encontrada: ${raw}` : `section not found: ${raw}`, tone: "red" }] as Line]
            : []),
          [{ text: lang === "pt" ? "uso: " : "usage: ", tone: "subtle" }, { text: `goto ${SECTION_IDS.join("|")}`, tone: "accent" }],
        ],
      };
    }
    return {
      lines: [[{ text: `→ #${id}`, tone: "green" }]],
      effect: () =>
        close(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
          else navigate(`/#${id}`);
        }),
    };
  },

  ls: () => ({
    lines: [
      SECTION_IDS.map<Part>((id) => ({
        text: `${SECTION_FILES[id]}  `,
        tone: SECTION_FILES[id].endsWith("/") ? "blue" : "text",
      })),
    ],
  }),

  date: (_args, { lang }) => ({
    lines: [
      new Date().toLocaleString(lang === "pt" ? "pt-BR" : "en-US", {
        dateStyle: "full",
        timeStyle: "medium",
      }),
    ],
  }),

  echo: (args) => ({ lines: [args.join(" ")] }),

  clear: () => ({ lines: [], clear: true }),

  sudo: (_args, { lang }) => ({
    lines: [
      [
        {
          text:
            lang === "pt"
              ? "visitor não está no arquivo sudoers. Este incidente será reportado."
              : "visitor is not in the sudoers file. This incident will be reported.",
          tone: "red",
        },
      ],
      [{ text: lang === "pt" ? "(boa tentativa, porém)" : "(nice try, though)", tone: "subtle" }],
    ],
  }),

  exit: (_args, { close }) => ({
    lines: [[{ text: "logout", tone: "muted" }]],
    effect: () => close(),
  }),
};

handlers.close = handlers.exit;

/** Parse and run a command line. */
export const runCommand = (input: string, ctx: CommandContext): CommandResult => {
  const [rawName = "", ...args] = input.trim().split(/\s+/);
  const name = rawName.toLowerCase();
  if (!name) return { lines: [] };
  const handler = handlers[name];
  if (!handler) {
    return {
      lines: [[{ text: `command not found: ${rawName}`, tone: "red" }], hintLine(ctx.lang)],
    };
  }
  return handler(args, ctx);
};

/**
 * Tab completion. Returns the completed input, or a list of candidates
 * when ambiguous (the caller prints them).
 */
export const complete = (input: string): { value: string; candidates: string[] } => {
  const hasSpace = /\s/.test(input);
  if (!hasSpace) {
    const matches = COMMAND_NAMES.filter((c) => c.startsWith(input.toLowerCase()));
    if (matches.length === 1) return { value: `${matches[0]} `, candidates: [] };
    return { value: commonPrefix(matches) || input, candidates: matches.length > 1 ? matches : [] };
  }
  const [cmd, ...rest] = input.split(/\s+/);
  const options = ARG_COMPLETIONS[cmd.toLowerCase()];
  if (!options || rest.length > 1) return { value: input, candidates: [] };
  const partial = (rest[0] ?? "").toLowerCase();
  const matches = options.filter((o) => o.startsWith(partial));
  if (matches.length === 1) return { value: `${cmd} ${matches[0]}`, candidates: [] };
  const prefix = commonPrefix(matches);
  return { value: prefix ? `${cmd} ${prefix}` : input, candidates: matches.length > 1 ? [...matches] : [] };
};

const commonPrefix = (words: readonly string[]) => {
  if (!words.length) return "";
  let prefix = words[0];
  for (const w of words.slice(1)) {
    while (!w.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
};

/* ---------- Intro script ---------- */

export interface IntroStep {
  command: string;
  output: Line[];
}

export const buildIntro = (lang: Lang): IntroStep[] => [
  {
    command: "whoami",
    output: [
      [{ text: profile.name, tone: "text", bold: true }],
      [{ text: profile.role[lang], tone: "accent" }],
    ],
  },
  {
    command: "cat stack.txt",
    output: [
      [{ text: ["Node.js", "TypeScript", "NestJS", "Kafka", "PostgreSQL", "OpenAI"].join(" · "), tone: "blue" }],
    ],
  },
];
