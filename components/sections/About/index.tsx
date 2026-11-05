"use client";

import React from "react";
import { Eyebrow, Reveal, Section } from "../../ui";
import { useLanguage, type Localized } from "../../../i18n/LanguageContext";
import { about, education, experiences, highlights, languages } from "../../../data/profile";
import * as S from "./styles";

const COMPANY = "GazinTech";
const COMPANY_URL = experiences.find((e) => e.company === COMPANY)?.url;

/** Terms emphasized (first occurrence only) inside the prose. */
const EMPHASIS: Localized<string[]> = {
  pt: [COMPANY, "PIX", "Cartão de Crédito", "Node.js", "TypeScript", "Kafka", "LLMs", "agentes inteligentes"],
  en: [COMPANY, "PIX", "credit cards", "Node.js", "TypeScript", "Kafka", "LLM", "intelligent agents"],
};

const TEXT = {
  newTab: { pt: "(abre em nova aba)", en: "(opens in a new tab)" },
  highlights: { pt: "Destaques", en: "Highlights" },
} satisfies Record<string, Localized>;

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Wraps the first occurrence of each term in <strong> (the company becomes a link). */
const emphasize = (text: string, terms: string[], seen: Set<string>, newTab: string): React.ReactNode[] => {
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "g");
  return text.split(pattern).map((part, i) => {
    if (i % 2 === 0 || seen.has(part)) return part;
    seen.add(part);
    if (part === COMPANY && COMPANY_URL) {
      return (
        <S.CompanyLink key={i} href={COMPANY_URL} target="_blank" rel="noopener noreferrer">
          {part}
          <span className="sr-only"> {newTab}</span>
        </S.CompanyLink>
      );
    }
    return <strong key={i}>{part}</strong>;
  });
};

export const About: React.FC = () => {
  const { t, l } = useLanguage();
  const seen = new Set<string>();

  return (
    <Section id="about" title={t.sections.about.title}>
      <Reveal>
        <S.Prose>
          {l(about).map((paragraph, i) => (
            <p key={i}>{emphasize(paragraph, l(EMPHASIS), seen, l(TEXT.newTab))}</p>
          ))}
        </S.Prose>
      </Reveal>

      <Reveal delay={0.08}>
        <S.Stats aria-label={l(TEXT.highlights)}>
          {highlights.map((h) => (
            <S.Stat key={h.value}>
              <S.StatValue>{h.value}</S.StatValue>
              <S.StatLabel>{l(h.label)}</S.StatLabel>
            </S.Stat>
          ))}
        </S.Stats>
      </Reveal>

      <Reveal delay={0.12}>
        <S.Facts>
          <S.Fact>
            <Eyebrow as="dt">{t.about.education}</Eyebrow>
            <dd>
              <strong>{l(education.degree)}</strong>
              <span>
                {l(education.institution)} · {education.period}
              </span>
            </dd>
          </S.Fact>
          <S.Fact>
            <Eyebrow as="dt">{t.about.languages}</Eyebrow>
            <dd>
              {languages.map((language, i) => (
                <span key={i}>
                  <strong>{l(language.name)}</strong> — {l(language.level)}
                </span>
              ))}
            </dd>
          </S.Fact>
        </S.Facts>
      </Reveal>
    </Section>
  );
};
