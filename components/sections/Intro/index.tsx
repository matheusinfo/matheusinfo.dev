"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion, type Variants } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiTerminal } from "react-icons/fi";
import type { IconType } from "react-icons";
import { useLanguage, type Localized } from "../../../i18n/LanguageContext";
import { profile } from "../../../data/profile";
import { useScrollSpy } from "../../../lib/useScrollSpy";
import { openTerminal } from "../../../lib/terminal";
import { ResumeMenu } from "./ResumeMenu";
import * as S from "./styles";

type NavKey = "about" | "experience" | "skills" | "projects" | "blog" | "contact";

const NAV_IDS: readonly NavKey[] = ["about", "experience", "skills", "projects", "blog", "contact"];

const LG_QUERY = "(min-width: 1024px)";

const navLabel: Localized = { pt: "Seções da página", en: "Page sections" };
const socialsLabel: Localized = { pt: "Redes e contato", en: "Social links and contact" };
const emailLabel: Localized = { pt: "Enviar e-mail", en: "Send an e-mail" };
const locationLabel: Localized = { pt: "Localização", en: "Location" };

const SOCIALS: { key: string; href: string; label: Localized; Icon: IconType; external: boolean }[] = [
  { key: "github", href: profile.socials.github, label: { pt: "GitHub", en: "GitHub" }, Icon: FiGithub, external: true },
  {
    key: "linkedin",
    href: profile.socials.linkedin,
    label: { pt: "LinkedIn", en: "LinkedIn" },
    Icon: FiLinkedin,
    external: true,
  },
  { key: "email", href: `mailto:${profile.email}`, label: emailLabel, Icon: FiMail, external: false },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** True on lg+ viewports (false during SSR / first paint). */
const useIsLarge = () => {
  const [large, setLarge] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY);
    const update = () => setLarge(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return large;
};

/** Renders the shortcut hint, turning the keys (' and Ctrl + K) into <kbd>s. */
const withKbd = (text: string) =>
  text
    .split(/('|Ctrl \+ K)/)
    .map((part, i) =>
      part === "'" || part === "Ctrl + K" ? <kbd key={i}>{part}</kbd> : <React.Fragment key={i}>{part}</React.Fragment>
    );

const LangToggle: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  return (
    <S.LangButton type="button" onClick={toggleLang} aria-label={t.nav.switchLang} title={t.nav.switchLang}>
      <S.LangOption $active={lang === "pt"}>PT</S.LangOption>
      <S.LangDivider aria-hidden="true" />
      <S.LangOption $active={lang === "en"}>EN</S.LangOption>
    </S.LangButton>
  );
};

/** Left column of the home split layout: identity, section nav (lg) and quick actions. */
export const Intro: React.FC = () => {
  const { t, l } = useLanguage();
  const reduce = useReducedMotion();
  const isLarge = useIsLarge();
  const active = useScrollSpy(NAV_IDS, isLarge);

  const group = (delay: number): Variants => ({
    hidden: {},
    show: { transition: reduce ? {} : { delayChildren: delay, staggerChildren: 0.07 } },
  });
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] } },
  };
  const motionGroup = (delay: number) => ({
    variants: group(delay),
    initial: reduce ? false : ("hidden" as const),
    animate: "show" as const,
  });

  return (
    <>
      <S.Top {...motionGroup(0.05)}>
        <S.Name variants={item}>{profile.name}</S.Name>
        <S.Role variants={item}>{l(profile.role)}</S.Role>
        <S.Tagline variants={item}>{l(profile.tagline)}</S.Tagline>
        <S.Location variants={item}>
          <FiMapPin aria-hidden="true" size={14} />
          <span className="sr-only">{l(locationLabel)}: </span>
          {l(profile.location)}
        </S.Location>

        <S.Nav variants={item} aria-label={l(navLabel)}>
          <S.NavList>
            {NAV_IDS.map((id, i) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <S.NavLink href={`#${id}`} $active={isActive} aria-current={isActive ? "true" : undefined}>
                    <S.NavLine aria-hidden="true" />
                    <S.NavIndex aria-hidden="true">{pad(i + 1)}</S.NavIndex>
                    {t.nav[id]}
                  </S.NavLink>
                </li>
              );
            })}
          </S.NavList>
        </S.Nav>
      </S.Top>

      <S.Bottom {...motionGroup(0.45)}>
        <S.Item variants={item}>
          <S.Actions>
            <ResumeMenu />
            <LangToggle />
          </S.Actions>
        </S.Item>

        <S.Item variants={item}>
          <S.Socials aria-label={l(socialsLabel)}>
            {SOCIALS.map(({ key, href, label, Icon, external }) => (
              <li key={key}>
                <S.SocialLink
                  href={href}
                  aria-label={l(label)}
                  title={l(label)}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon aria-hidden="true" size={22} />
                </S.SocialLink>
              </li>
            ))}
            <S.Separator aria-hidden="true" />
            <li>
              <S.TerminalButton
                type="button"
                onClick={openTerminal}
                aria-label={t.terminal.open}
                title={t.terminal.shortcut}
              >
                <FiTerminal aria-hidden="true" size={20} />
              </S.TerminalButton>
            </li>
          </S.Socials>
        </S.Item>

        <S.Hint variants={item}>{withKbd(t.terminal.shortcut)}</S.Hint>
      </S.Bottom>
    </>
  );
};
