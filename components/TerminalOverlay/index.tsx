"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import { TERMINAL_OPEN_EVENT } from "../../lib/terminal";
import { Terminal, createSession } from "./Terminal";
import * as S from "./styles";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const isEditable = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])") !== null;
};

/** Easter-egg terminal: a modal opened with ' or Ctrl/Cmd+K (or `openTerminal()`), mounted once in _app. */
export const TerminalOverlay: React.FC = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const session = useRef(createSession());
  const afterClose = useRef<(() => void) | null>(null);
  const backdropPress = useRef(false);

  const close = useCallback((after?: () => void) => {
    afterClose.current = after ?? null;
    setOpen(false);
  }, []);

  /* ----- Global open triggers ----- */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // `key` can be missing on synthetic events (e.g. browser autofill).
      if (e.isComposing || typeof e.key !== "string") return;
      const cmdK = (e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k";
      if (cmdK) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      // ' (single quote). On layouts where it's a dead key (e.g. US-International) key is "Dead".
      const quote = e.key === "'" || (e.key === "Dead" && e.code === "Quote" && !e.shiftKey);
      if (!quote || e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      if (isEditable(e.target)) return;
      e.preventDefault();
      setOpen(true);
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(TERMINAL_OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(TERMINAL_OPEN_EVENT, onOpenEvent);
    };
  }, []);

  /* ----- While open: scroll lock, Escape, focus trap, focus restore ----- */
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      // Tab completion inside the prompt already handled (and prevented) this event.
      if (e.key !== "Tab" || e.defaultPrevented) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!dialog.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      if (previousFocus && previousFocus !== document.body && document.contains(previousFocus)) {
        previousFocus.focus({ preventScroll: true });
      }
      const after = afterClose.current;
      afterClose.current = null;
      after?.();
    };
  }, [open]);

  const duration = reduceMotion ? 0 : 0.18;

  return (
    <AnimatePresence>
      {open && (
        <S.Backdrop
          key="terminal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          // Only close when both press and release happen on the backdrop (not after a text-selection drag).
          onPointerDown={(e) => {
            backdropPress.current = e.target === e.currentTarget;
          }}
          onClick={(e) => {
            if (backdropPress.current && e.target === e.currentTarget) close();
            backdropPress.current = false;
          }}
        >
          <S.Window
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.terminal.title}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
          >
            <S.TitleBar>
              <S.Dots>
                <S.CloseDot type="button" aria-label={t.terminal.close} title={t.terminal.close} onClick={() => close()}>
                  <span>
                    <svg viewBox="0 0 8 8" aria-hidden="true" focusable="false">
                      <path d="M1.5 1.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </S.CloseDot>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </S.Dots>
              <S.WindowTitle aria-hidden="true">visitor@matheusinfo: ~</S.WindowTitle>
              <S.EscHint aria-hidden="true">esc</S.EscHint>
            </S.TitleBar>
            <Terminal session={session.current} reduceMotion={reduceMotion} onClose={close} />
          </S.Window>
        </S.Backdrop>
      )}
    </AnimatePresence>
  );
};
