"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown, FiDownload, FiFileText } from "react-icons/fi";
import { useLanguage } from "../../../i18n/LanguageContext";
import { useAssetPath } from "../../../lib/useAssetPath";
import { profile } from "../../../data/profile";
import * as S from "./styles";

/** Accessible download menu for the PT/EN resumes (menu button pattern). */
export const ResumeMenu: React.FC = () => {
  const { t } = useLanguage();
  const asset = useAssetPath();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pendingFocus = useRef<number | null>(null);
  const menuId = useId();
  const buttonId = useId();

  const focusItem = (index: number) => {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (!items.length) return;
    items[(index + items.length) % items.length].focus();
  };

  const openMenu = (focusIndex: number) => {
    pendingFocus.current = focusIndex;
    setOpen(true);
  };

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  // Move focus into the menu once it has rendered
  useEffect(() => {
    if (open && pendingFocus.current !== null) {
      focusItem(pendingFocus.current);
      pendingFocus.current = null;
    }
  }, [open]);

  // Click / tap outside closes
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openMenu(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openMenu(-1);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      close(false);
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusItem(current + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusItem(current - 1);
        break;
      case "Home":
        e.preventDefault();
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        focusItem(-1);
        break;
      case "Escape":
        e.preventDefault();
        close(true);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <S.MenuRoot ref={rootRef}>
      <S.MenuButton
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close(false) : openMenu(0))}
        onKeyDown={onButtonKeyDown}
      >
        <FiDownload aria-hidden="true" size={15} />
        {t.hero.resume}
        <S.Chevron $open={open} aria-hidden="true">
          <FiChevronDown size={14} />
        </S.Chevron>
      </S.MenuButton>

      {open && (
        <S.Menu id={menuId} role="menu" aria-labelledby={buttonId} onKeyDown={onMenuKeyDown}>
          {profile.resumes.map((resume, i) => (
            <li key={resume.lang} role="none">
              <S.MenuItem
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                role="menuitem"
                tabIndex={-1}
                href={asset(resume.path)}
                download={resume.filename}
                hrefLang={resume.lang === "pt" ? "pt-BR" : "en"}
                onClick={() => close(false)}
              >
                <FiFileText aria-hidden="true" size={16} />
                {resume.lang === "pt" ? t.contact.resumePt : t.contact.resumeEn}
                <small aria-hidden="true">pdf</small>
              </S.MenuItem>
            </li>
          ))}
        </S.Menu>
      )}
    </S.MenuRoot>
  );
};
