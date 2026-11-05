"use client";

import React from "react";
import { Eyebrow, Reveal, Section, Tag, TagList } from "../../ui";
import { useLanguage } from "../../../i18n/LanguageContext";
import { skillGroups } from "../../../data/profile";
import * as S from "./styles";

export const Skills: React.FC = () => {
  const { t, l } = useLanguage();

  return (
    <Section id="skills" title={t.sections.skills.title}>
      <S.Grid>
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} as="li" delay={(i % 2) * 0.06}>
            <S.Group aria-labelledby={`skills-${group.id}`}>
              <Eyebrow as="h3" id={`skills-${group.id}`}>
                {l(group.title)}
              </Eyebrow>
              <TagList>
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </TagList>
            </S.Group>
          </Reveal>
        ))}
      </S.Grid>
    </Section>
  );
};
