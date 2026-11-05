"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionary, type Dictionary } from "./dictionary";

export type Lang = "pt" | "en";

/** A value available in both languages. */
export type Localized<T = string> = Record<Lang, T>;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** UI strings for the current language */
  t: Dictionary;
  /** Pick the current-language value from a Localized object */
  l: <T>(value: Localized<T>) => T;
}

const STORAGE_KEY = "matheusinfo:lang";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "pt" || stored === "en") {
        setLangState(stored);
      } else if (!navigator.language.toLowerCase().startsWith("pt")) {
        setLangState("en");
      }
    } catch {
      /* storage unavailable: keep default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "pt" ? "en" : "pt"),
      t: dictionary[lang],
      l: (v) => v[lang],
    }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
};
