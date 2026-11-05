"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { FiMenu, FiTerminal, FiX } from "react-icons/fi";
import { useLanguage, type Localized } from "../../i18n/LanguageContext";
import { profile } from "../../data/profile";
import { openTerminal } from "../../lib/terminal";
import {
  Bar,
  Inner,
  Brand,
  Actions,
  DesktopNav,
  NavList,
  NavItemLink,
  LangButton,
  LangOption,
  LangDivider,
  IconButton,
  MenuButton,
  Drawer,
  DrawerInner,
  DrawerList,
  DrawerLink,
  DrawerFooter,
  DrawerLangLabel,
} from "./styles";

type NavKey = "about" | "projects" | "blog" | "contact";

const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: "about", href: "/#about" },
  { key: "projects", href: "/#projects" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/#contact" },
];

const MD_QUERY = "(min-width: 768px)";

const navigationLabel: Localized = { pt: "Navegação principal", en: "Main navigation" };
const mobileNavigationLabel: Localized = { pt: "Navegação", en: "Navigation" };
const languageLabel: Localized = { pt: "Idioma", en: "Language" };
const homeLabel: Localized = { pt: "Página inicial", en: "Home page" };

/* ---------- Language toggle ---------- */

const LangToggle: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  return (
    <LangButton type="button" onClick={toggleLang} aria-label={t.nav.switchLang} title={t.nav.switchLang}>
      <LangOption $active={lang === "pt"}>PT</LangOption>
      <LangDivider aria-hidden="true">/</LangDivider>
      <LangOption $active={lang === "en"}>EN</LangOption>
    </LangButton>
  );
};

/* ---------- Header (inner pages only) ---------- */

export const Header: React.FC = () => {
  const router = useRouter();
  const { t, l } = useLanguage();
  const reduceMotion = useReducedMotion();

  const isBlog = router.pathname.startsWith("/blog");

  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);

  const closeMenu = useCallback((returnFocus: boolean) => {
    restoreFocus.current = returnFocus;
    setOpen(false);
  }, []);

  // Close on route change (including hash changes).
  useEffect(() => {
    const handle = () => setOpen(false);
    router.events.on("routeChangeStart", handle);
    router.events.on("hashChangeStart", handle);
    return () => {
      router.events.off("routeChangeStart", handle);
      router.events.off("hashChangeStart", handle);
    };
  }, [router.events]);

  // Close when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia(MD_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Body scroll lock, Escape to close, focus trap while open.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu(true);
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current || !menuButtonRef.current) return;

      const focusables = [
        menuButtonRef.current,
        ...Array.from(drawerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      } else if (!focusables.includes(current as HTMLElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeMenu]);

  // Move focus into the drawer on open; back to the toggle on close.
  useEffect(() => {
    if (open) {
      const firstLink = drawerRef.current?.querySelector<HTMLElement>("a[href]");
      firstLink?.focus({ preventScroll: true });
    } else if (restoreFocus.current) {
      restoreFocus.current = false;
      menuButtonRef.current?.focus();
    }
  }, [open]);

  const isActive = (key: NavKey) => key === "blog" && isBlog;
  /** "page" on the blog index itself, "true" on a post (inside the blog section). */
  const ariaCurrent = (key: NavKey) =>
    isActive(key) ? (router.pathname === "/blog" ? "page" : "true") : undefined;

  const onTerminalClick = () => {
    closeMenu(false);
    openTerminal();
  };

  const drawerMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      };

  return (
    <>
      <Bar>
        <Inner>
          <Brand href="/" aria-label={`${profile.name} — ${l(homeLabel)}`} onClick={() => setOpen(false)}>
            {profile.name}
          </Brand>

          <Actions>
            <DesktopNav aria-label={l(navigationLabel)}>
              <NavList>
                {NAV_ITEMS.map((item) => (
                  <li key={item.key}>
                    <NavItemLink href={item.href} $active={isActive(item.key)} aria-current={ariaCurrent(item.key)}>
                      {t.nav[item.key]}
                    </NavItemLink>
                  </li>
                ))}
              </NavList>
              <LangToggle />
            </DesktopNav>

            <IconButton
              type="button"
              onClick={onTerminalClick}
              aria-label={t.terminal.open}
              title={t.terminal.shortcut}
            >
              <FiTerminal aria-hidden="true" focusable="false" />
            </IconButton>

            <MenuButton
              ref={menuButtonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.menu}
              onClick={() => (open ? closeMenu(true) : setOpen(true))}
            >
              {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </MenuButton>
          </Actions>
        </Inner>
      </Bar>

      <AnimatePresence>
        {open && (
          <Drawer
            id="mobile-menu"
            ref={drawerRef}
            key="mobile-menu"
            {...drawerMotion}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <DrawerInner>
              <nav aria-label={l(mobileNavigationLabel)}>
                <DrawerList>
                  {NAV_ITEMS.map((item) => (
                    <li key={item.key}>
                      <DrawerLink
                        href={item.href}
                        $active={isActive(item.key)}
                        aria-current={ariaCurrent(item.key)}
                        onClick={() => closeMenu(false)}
                      >
                        {t.nav[item.key]}
                      </DrawerLink>
                    </li>
                  ))}
                </DrawerList>
              </nav>
              <DrawerFooter>
                <DrawerLangLabel aria-hidden="true">{l(languageLabel)}</DrawerLangLabel>
                <LangToggle />
              </DrawerFooter>
            </DrawerInner>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
};
