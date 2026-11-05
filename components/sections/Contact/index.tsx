"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiCheck, FiCopy, FiMail } from "react-icons/fi";
import { useLanguage, type Localized } from "../../../i18n/LanguageContext";
import { profile } from "../../../data/profile";
import { useAssetPath } from "../../../lib/useAssetPath";
import { Button, Reveal, Section } from "../../ui";
import {
  Actions,
  CopyButton,
  EmailLink,
  EmailRow,
  Intro,
  LinkGroups,
  LinkList,
  QuietLink,
  Statement,
  Status,
} from "./styles";

const copy = {
  statement: { pt: "Vamos construir algo juntos?", en: "Let's build something together?" } as Localized,
  sendEmail: { pt: "Enviar e-mail", en: "Send an e-mail" } as Localized,
  socials: { pt: "Redes e perfis", en: "Social profiles" } as Localized,
  resumes: { pt: "Currículos para download", en: "Resume downloads" } as Localized,
  newTab: { pt: "(abre em nova aba)", en: "(opens in a new tab)" } as Localized,
  copyFailed: { pt: "Não foi possível copiar.", en: "Could not copy." } as Localized,
};

const socialLinks = [
  { label: "LinkedIn", href: profile.socials.linkedin },
  { label: "GitHub", href: profile.socials.github },
  { label: "WhatsApp", href: profile.whatsapp },
];

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
};

type CopyState = "idle" | "copied" | "failed";

export const Contact: React.FC = () => {
  const { t, l } = useLanguage();
  const asset = useAssetPath();
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(profile.email);
    setState(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }, []);

  const copied = state === "copied";
  const mailto = `mailto:${profile.email}`;

  return (
    <Section id="contact" title={t.sections.contact.title}>
      <Reveal>
        <Statement>{l(copy.statement)}</Statement>
        <Intro>{t.contact.intro}</Intro>
      </Reveal>

      <Reveal delay={0.06}>
        <EmailRow>
          <EmailLink href={mailto}>{profile.email}</EmailLink>
          <CopyButton type="button" onClick={handleCopy} $copied={copied} aria-label={t.contact.copy} title={t.contact.copy}>
            {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
          </CopyButton>
        </EmailRow>
        <Status role="status" aria-live="polite">
          {state === "copied" && t.contact.copied}
          {state === "failed" && l(copy.copyFailed)}
        </Status>

        <Actions>
          <Button href={mailto}>
            <FiMail aria-hidden="true" />
            {l(copy.sendEmail)}
          </Button>
        </Actions>
      </Reveal>

      <Reveal delay={0.12}>
        <LinkGroups>
          <LinkList aria-label={l(copy.socials)}>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <QuietLink href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <FiArrowUpRight className="up" aria-hidden="true" />
                  <span className="sr-only"> {l(copy.newTab)}</span>
                </QuietLink>
              </li>
            ))}
          </LinkList>
          <LinkList aria-label={l(copy.resumes)}>
            {profile.resumes.map((resume) => (
              <li key={resume.lang}>
                <QuietLink
                  href={asset(resume.path)}
                  download={resume.filename}
                  hrefLang={resume.lang === "pt" ? "pt-BR" : "en"}
                  type="application/pdf"
                >
                  {resume.lang === "pt" ? t.contact.resumePt : t.contact.resumeEn}
                  <FiArrowDown className="down" aria-hidden="true" />
                </QuietLink>
              </li>
            ))}
          </LinkList>
        </LinkGroups>
      </Reveal>
    </Section>
  );
};
