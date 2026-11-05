"use client";

import React from "react";
import type { IconType } from "react-icons";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLanguage, type Localized } from "../../i18n/LanguageContext";
import { profile } from "../../data/profile";
import { Container } from "../ui";
import { Root, Inner, Credits, Line, InlineLink, Socials, IconLink } from "./styles";

interface SocialLink {
  href: string;
  label: Localized;
  icon: IconType;
  external: boolean;
}

const SOCIALS: SocialLink[] = [
  { href: profile.socials.github, label: { pt: "GitHub", en: "GitHub" }, icon: FiGithub, external: true },
  { href: profile.socials.linkedin, label: { pt: "LinkedIn", en: "LinkedIn" }, icon: FiLinkedin, external: true },
  {
    href: `mailto:${profile.email}`,
    label: { pt: `Enviar e-mail para ${profile.email}`, en: `Send an e-mail to ${profile.email}` },
    icon: FiMail,
    external: false,
  },
];

/** Words in `t.footer.built` that become links (same spelling in both languages). */
const TECH_LINKS: Record<string, string> = {
  "Next.js": "https://nextjs.org",
  "styled-components": "https://styled-components.com",
};
const TECH_PATTERN = new RegExp(`(${Object.keys(TECH_LINKS).map((k) => k.replace(/[.]/g, "\\.")).join("|")})`);

const linkifyTech = (text: string): React.ReactNode[] =>
  text.split(TECH_PATTERN).map((part, i) =>
    TECH_LINKS[part] ? (
      <InlineLink key={i} href={TECH_LINKS[part]} target="_blank" rel="noopener noreferrer">
        {part}
      </InlineLink>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

const creditPrefix: Localized = { pt: "Projetado e desenvolvido por", en: "Designed & built by" };
const socialNavLabel: Localized = { pt: "Redes sociais", en: "Social links" };

const YEAR = new Date().getFullYear();

interface FooterProps {
  /** "page": full-width bar on inner pages. "column": end of the home page's right column. */
  variant?: "page" | "column";
}

export const Footer: React.FC<FooterProps> = ({ variant = "page" }) => {
  const { t, l } = useLanguage();
  const isPage = variant === "page";

  const credits = (
    <Credits>
      <Line>
        {l(creditPrefix)}{" "}
        <InlineLink href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
          {profile.name}
        </InlineLink>
        .
      </Line>
      <Line>
        {linkifyTech(t.footer.built)} © {YEAR}
      </Line>
    </Credits>
  );

  if (!isPage) return <Root $variant="column">{credits}</Root>;

  return (
    <Root $variant="page">
      <Container>
        <Inner>
          {credits}
          <nav aria-label={l(socialNavLabel)}>
            <Socials>
              {SOCIALS.map(({ href, label, icon: Icon, external }) => (
                <li key={href}>
                  <IconLink
                    href={href}
                    aria-label={l(label)}
                    title={l(label)}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Icon aria-hidden="true" focusable="false" />
                  </IconLink>
                </li>
              ))}
            </Socials>
          </nav>
        </Inner>
      </Container>
    </Root>
  );
};
