"use client";

import React from "react";
import type { IconType } from "react-icons";
import { FiArrowUpRight, FiCpu, FiExternalLink, FiFolder, FiGithub, FiMap, FiMonitor } from "react-icons/fi";
import { useLanguage, type Localized } from "../../../i18n/LanguageContext";
import { profile, projects, type Project } from "../../../data/profile";
import { HoverCard, HoverList, Reveal, Section, Tag, TagList, TextLink } from "../../ui";
import {
  ArchiveHeading,
  ArchiveItem,
  ArchiveLink,
  ArchiveList,
  ArchiveMain,
  ArchiveTags,
  ArchiveYear,
  Content,
  Cover,
  Description,
  FeaturedBody,
  IconLink,
  Links,
  MoreWrap,
  Note,
  StretchedLink,
  Title,
  TitleRow,
  Year,
} from "./styles";

const copy = {
  archive: { pt: "Outros projetos", en: "Other projects" } as Localized,
  newTab: { pt: "(abre em nova aba)", en: "(opens in a new tab)" } as Localized,
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Cover art per project: icon + hue for the tinted tile. */
const covers: Record<string, { icon: IconType; hue: number }> = {
  Lapwing: { icon: FiMap, hue: 158 },
  "echo-penguin": { icon: FiCpu, hue: 212 },
  "Echo Manager": { icon: FiMonitor, hue: 268 },
};

const hueFromName = (name: string) =>
  [...name].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 360, 7);

const getCover = (name: string) => covers[name] ?? { icon: FiFolder, hue: hueFromName(name) };

const FeaturedProject: React.FC<{ project: Project }> = ({ project }) => {
  const { t, l } = useLanguage();
  const href = project.live ?? project.repo;
  const { icon: Icon, hue } = getCover(project.name);

  return (
    <HoverCard>
      <FeaturedBody>
        <Cover aria-hidden="true" style={{ "--hue": hue } as React.CSSProperties}>
          <Icon />
        </Cover>
        <Content>
          <TitleRow>
            <Title>
              {href ? (
                <StretchedLink href={href} {...external}>
                  {project.name}
                  <FiArrowUpRight className="arrow" aria-hidden="true" />
                  <span className="sr-only"> {l(copy.newTab)}</span>
                </StretchedLink>
              ) : (
                project.name
              )}
            </Title>
            <Year>{project.year}</Year>
          </TitleRow>
          <Description>{l(project.description)}</Description>
          <TagList>
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </TagList>
          {(project.repo || project.live) && (
            <Links>
              {project.repo && (
                <li>
                  <IconLink href={project.repo} {...external} aria-label={`${t.projects.source}: ${project.name}`}>
                    <FiGithub aria-hidden="true" />
                  </IconLink>
                </li>
              )}
              {project.live && (
                <li>
                  <IconLink href={project.live} {...external} aria-label={`${t.projects.live}: ${project.name}`}>
                    <FiExternalLink aria-hidden="true" />
                  </IconLink>
                </li>
              )}
            </Links>
          )}
        </Content>
      </FeaturedBody>
    </HoverCard>
  );
};

export const Projects: React.FC = () => {
  const { t, l } = useLanguage();
  const featured = projects.filter((p) => p.featured);
  const archive = projects.filter((p) => !p.featured).sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <Section id="projects" title={t.sections.projects.title}>
      <Reveal>
        <Note>{t.projects.privateNote}</Note>
      </Reveal>

      <HoverList>
        {featured.map((project, i) => (
          <Reveal as="li" key={project.name} delay={Math.min(i, 3) * 0.06}>
            <FeaturedProject project={project} />
          </Reveal>
        ))}
      </HoverList>

      {archive.length > 0 && (
        <Reveal>
          <ArchiveHeading id="projects-archive">{l(copy.archive)}</ArchiveHeading>
          <ArchiveList aria-labelledby="projects-archive">
            {archive.map((project) => {
              const href = project.live ?? project.repo;
              return (
                <ArchiveItem key={project.name}>
                  <ArchiveYear>{project.year}</ArchiveYear>
                  <ArchiveMain>
                    <h4>
                      {href ? (
                        <ArchiveLink href={href} {...external}>
                          {project.name}
                          <FiArrowUpRight className="arrow" aria-hidden="true" />
                          <span className="sr-only"> {l(copy.newTab)}</span>
                        </ArchiveLink>
                      ) : (
                        project.name
                      )}
                    </h4>
                    <p>{l(project.description)}</p>
                  </ArchiveMain>
                  <ArchiveTags>{project.tags.join(" · ")}</ArchiveTags>
                </ArchiveItem>
              );
            })}
          </ArchiveList>
        </Reveal>
      )}

      <MoreWrap>
        <TextLink href={profile.socials.github} {...external}>
          {t.projects.more}
          <FiArrowUpRight aria-hidden="true" />
          <span className="sr-only">{l(copy.newTab)}</span>
        </TextLink>
      </MoreWrap>
    </Section>
  );
};
