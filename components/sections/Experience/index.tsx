"use client";

import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Eyebrow, HoverCard, HoverList, Reveal, Section, Tag, TagList } from "../../ui";
import { useLanguage, type Lang, type Localized } from "../../../i18n/LanguageContext";
import { experiences, profile } from "../../../data/profile";
import { useAssetPath } from "../../../lib/useAssetPath";
import * as S from "./styles";

const MONTHS: Localized<string[]> = {
  pt: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const TEXT = {
  newTab: { pt: "(abre em nova aba)", en: "(opens in a new tab)" },
  stack: { pt: "Tecnologias utilizadas", en: "Technologies used" },
  resume: { pt: "Ver currículo completo", en: "View full résumé" },
  resumeFormat: {
    pt: "(PDF, abre em nova aba)",
    en: "(PDF, opens in a new tab)",
  },
} satisfies Record<string, Localized>;

interface YearMonth {
  y: number;
  m: number; // 1-12
}

const parseYM = (value: string): YearMonth => {
  const [y, m] = value.split("-").map(Number);
  return { y, m };
};

const formatYM = ({ y, m }: YearMonth, lang: Lang) => `${MONTHS[lang][m - 1]} ${y}`;

/** Inclusive month count (Jun → Jun = 1 month), LinkedIn-style. */
const monthsBetween = (start: YearMonth, end: YearMonth) => end.y * 12 + end.m - (start.y * 12 + start.m) + 1;

const formatDuration = (total: number, lang: Lang) => {
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (lang === "pt") {
    if (years) parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
    if (months) parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
    return parts.join(" e ");
  }
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
};

/**
 * Current year/month, resolved only after mount so the static (build-time) HTML
 * never disagrees with the client during hydration.
 */
const useNow = (): YearMonth | null => {
  const [now, setNow] = useState<YearMonth | null>(null);
  useEffect(() => {
    const d = new Date();
    setNow({ y: d.getFullYear(), m: d.getMonth() + 1 });
  }, []);
  return now;
};

export const Experience: React.FC = () => {
  const { t, l, lang } = useLanguage();
  const asset = useAssetPath();
  const now = useNow();
  const resume = profile.resumes.find((r) => r.lang === lang) ?? profile.resumes[0];

  return (
    <Section id="experience" title={t.sections.experience.title}>
      <HoverList>
        {experiences.map((exp, i) => {
          const start = parseYM(exp.start);
          const end = exp.end ? parseYM(exp.end) : now;
          const duration = end ? formatDuration(monthsBetween(start, end), lang) : null;
          const title = (
            <>
              {l(exp.role)} <S.Dot aria-hidden="true">·</S.Dot>
              <span className="sr-only">,</span> {exp.company}
            </>
          );

          return (
            // Reveal sits inside the <li>: HoverList dims siblings via the li's opacity,
            // which framer-motion's inline opacity would otherwise override.
            <li key={exp.company + exp.start}>
              <Reveal delay={i * 0.06}>
                <HoverCard>
                  <S.Row>
                    <S.Meta>
                      <Eyebrow>
                        <time dateTime={exp.start}>{formatYM(start, lang)}</time>
                        {" — "}
                        {exp.end ? (
                          <time dateTime={exp.end}>{formatYM(parseYM(exp.end), lang)}</time>
                        ) : (
                          t.experience.present
                        )}
                      </Eyebrow>
                      {/* Reserve the line so the layout doesn't shift once the duration resolves. */}
                      <S.Duration aria-hidden={duration ? undefined : true}>{duration ?? " "}</S.Duration>
                    </S.Meta>

                    <S.Body>
                      <S.Title>
                        {exp.url ? (
                          <S.MainLink href={exp.url} target="_blank" rel="noopener noreferrer">
                            <span>{title}</span>
                            <FiArrowUpRight className="arrow" aria-hidden="true" />
                            <span className="sr-only"> {l(TEXT.newTab)}</span>
                          </S.MainLink>
                        ) : (
                          <span>{title}</span>
                        )}
                      </S.Title>
                      <S.Location>{l(exp.location)}</S.Location>

                      <S.Bullets>
                        {exp.bullets.map((bullet, j) => (
                          <li key={j}>{l(bullet.text)}</li>
                        ))}
                      </S.Bullets>

                      <TagList aria-label={l(TEXT.stack)}>
                        {exp.stack.map((tech) => (
                          <li key={tech}>
                            <Tag>{tech}</Tag>
                          </li>
                        ))}
                      </TagList>
                    </S.Body>
                  </S.Row>
                </HoverCard>
              </Reveal>
            </li>
          );
        })}
      </HoverList>

      <Reveal>
        <S.ResumeLink href={asset(resume.path)} target="_blank" rel="noopener noreferrer">
          <span>{l(TEXT.resume)}</span>
          <FiArrowUpRight className="arrow" aria-hidden="true" />
          <span className="sr-only"> {l(TEXT.resumeFormat)}</span>
        </S.ResumeLink>
      </Reveal>
    </Section>
  );
};
