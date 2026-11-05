"use client";

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLanguage, type Localized } from "../../i18n/LanguageContext";
import { useAssetPath } from "../../lib/useAssetPath";
import { buildIntro, complete, runCommand, type Line, type Part } from "./commands";
import * as S from "./styles";

const copy = {
  input: { pt: "Comando do terminal", en: "Terminal command" },
  hint: {
    pt: "digite 'help' para ver os comandos · esc fecha",
    en: "type 'help' to see all commands · esc to close",
  },
} satisfies Record<string, Localized>;

const TYPE_DELAY = 55;
const OUTPUT_DELAY = 380;
const START_DELAY = 350;
const MAX_LINES = 300;

type EntryData = { kind: "input"; command: string } | { kind: "output"; line: Line };
export type Entry = EntryData & { id: number };

/** State that survives closing/reopening the overlay (kept by the parent for the page load). */
export interface TerminalSession {
  introPlayed: boolean;
  introCleared: boolean;
  entries: Entry[];
  history: string[];
  nextId: number;
}

export const createSession = (): TerminalSession => ({
  introPlayed: false,
  introCleared: false,
  entries: [],
  history: [],
  nextId: 0,
});

const isExternal = (href: string) => /^https?:\/\//.test(href);

const renderParts = (line: Line) => {
  if (typeof line === "string") return line;
  return line.map((part: Part, i) => {
    if (part.href) {
      const external = !part.download && isExternal(part.href);
      return (
        <S.Anchor
          key={i}
          href={part.href}
          $tone={part.tone}
          $bold={part.bold}
          download={part.download}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {part.text}
        </S.Anchor>
      );
    }
    return (
      <S.Span key={i} $tone={part.tone} $bold={part.bold}>
        {part.text}
      </S.Span>
    );
  });
};

const PromptLabel = () => (
  <S.Prompt aria-hidden="true">
    <b>~</b> <i>$</i>{" "}
  </S.Prompt>
);

interface TerminalProps {
  session: TerminalSession;
  reduceMotion: boolean;
  /** Close the overlay; `after` runs once focus/scroll have been restored */
  onClose: (after?: () => void) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ session, reduceMotion, onClose }) => {
  const { lang, setLang, l } = useLanguage();
  const asset = useAssetPath();
  const router = useRouter();
  const inputId = useId();

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyIndex = useRef<number | null>(null);
  const draft = useRef("");

  const [entries, setEntries] = useState<Entry[]>(session.entries);
  const [value, setValue] = useState("");
  const [introCleared, setIntroCleared] = useState(session.introCleared);

  /* ----- Intro "typing" timeline: one tick per typed char + one per output block ----- */
  const intro = useMemo(() => buildIntro(lang), [lang]);
  const totalTicks = useMemo(() => intro.reduce((sum, step) => sum + step.command.length + 1, 0), [intro]);
  // Only animate the first time the terminal opens in this page load.
  const [progress, setProgress] = useState(() => (session.introPlayed || reduceMotion ? totalTicks : 0));
  const introDone = progress >= totalTicks;

  const finishIntro = useCallback(() => setProgress(totalTicks), [totalTicks]);

  useEffect(() => {
    session.introPlayed = true;
  }, [session]);

  useEffect(() => {
    session.entries = entries;
    session.introCleared = introCleared;
  }, [session, entries, introCleared]);

  useEffect(() => {
    if (introDone) return;
    if (reduceMotion) {
      finishIntro();
      return;
    }
    // Is the next tick a typed character or the reveal of an output block?
    let offset = 0;
    let delay = TYPE_DELAY;
    for (const step of intro) {
      const end = offset + step.command.length;
      if (progress === offset) delay = offset === 0 ? START_DELAY : OUTPUT_DELAY;
      if (progress === end) delay = OUTPUT_DELAY * 0.6;
      offset = end + 1;
    }
    const timer = window.setTimeout(() => setProgress((p) => p + 1), delay);
    return () => window.clearTimeout(timer);
  }, [progress, introDone, reduceMotion, intro, finishIntro]);

  /* ----- Focus the prompt on open ----- */
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  /* ----- Keep the newest output visible, scrolling only inside the terminal ----- */
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [entries, progress, introCleared]);

  const push = useCallback(
    (items: EntryData[]) => {
      setEntries((prev) => {
        const next = [...prev, ...items.map((item): Entry => ({ ...item, id: session.nextId++ }))];
        return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
      });
    },
    [session]
  );

  const clearScreen = () => {
    setIntroCleared(true);
    setEntries([]);
  };

  const execute = (raw: string) => {
    const command = raw.trim();
    const history = session.history;
    if (command && history[history.length - 1] !== command) history.push(command);
    historyIndex.current = null;
    draft.current = "";

    const result = runCommand(command, {
      lang,
      setLang,
      asset,
      reduceMotion,
      close: onClose,
      navigate: (url) => void router.push(url),
    });
    if (result.clear) {
      clearScreen();
    } else {
      push([
        { kind: "input", command: raw },
        ...result.lines.map((line) => ({ kind: "output" as const, line })),
      ]);
    }
    result.effect?.();
  };

  const browseHistory = (direction: -1 | 1) => {
    const list = session.history;
    if (!list.length) return;
    let index = historyIndex.current;
    if (index === null) {
      if (direction === 1) return;
      draft.current = value;
      index = list.length - 1;
    } else {
      index += direction;
    }
    if (index < 0) index = 0;
    if (index >= list.length) {
      historyIndex.current = null;
      setValue(draft.current);
      return;
    }
    historyIndex.current = index;
    setValue(list[index]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!introDone && e.key !== "Tab" && e.key !== "Escape") finishIntro();
    if (e.key === "Enter") {
      e.preventDefault();
      execute(value);
      setValue("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      browseHistory(-1);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      browseHistory(1);
      return;
    }
    // Only hijack Tab when there is something to complete, so keyboard users can still tab around.
    if (e.key === "Tab" && !e.shiftKey && value.trim()) {
      e.preventDefault();
      const { value: completed, candidates } = complete(value);
      if (candidates.length) {
        push([
          { kind: "input", command: value },
          { kind: "output", line: [{ text: candidates.join("  "), tone: "muted" }] },
        ]);
      }
      setValue(completed);
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      clearScreen();
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === "c" && !window.getSelection()?.toString()) {
      e.preventDefault();
      push([{ kind: "input", command: `${value}^C` }]);
      setValue("");
      historyIndex.current = null;
    }
  };

  const onBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  const introSteps = useMemo(() => {
    let offset = 0;
    return intro.map((step) => {
      const typed = Math.max(0, Math.min(progress - offset, step.command.length));
      const visible = progress >= offset;
      const showOutput = progress > offset + step.command.length;
      const typing = !introDone && progress >= offset && !showOutput;
      offset += step.command.length + 1;
      return { ...step, typed: step.command.slice(0, typed), visible, showOutput, typing };
    });
  }, [intro, progress, introDone]);

  return (
    <S.Body ref={bodyRef} onClick={onBodyClick}>
      {!introCleared && (
        <div aria-hidden={!introDone}>
          {introSteps.map(
            (step, i) =>
              step.visible && (
                <React.Fragment key={i}>
                  <S.OutputLine>
                    <PromptLabel />
                    {step.typed}
                    {step.typing && <S.Cursor aria-hidden="true" />}
                  </S.OutputLine>
                  {step.showOutput &&
                    step.output.map((line, j) => <S.OutputLine key={j}>{renderParts(line)}</S.OutputLine>)}
                </React.Fragment>
              )
          )}
          {introDone && (
            <S.OutputLine>
              <S.Span $tone="subtle"># {l(copy.hint)}</S.Span>
            </S.OutputLine>
          )}
        </div>
      )}

      <div role="log" aria-live="polite" aria-relevant="additions">
        {entries.map((entry) =>
          entry.kind === "input" ? (
            <S.OutputLine key={entry.id}>
              <PromptLabel />
              {entry.command}
            </S.OutputLine>
          ) : (
            <S.OutputLine key={entry.id}>{renderParts(entry.line)}</S.OutputLine>
          )
        )}
      </div>

      <S.InputRow $hidden={!introDone}>
        <label htmlFor={inputId}>
          <PromptLabel />
          <span className="sr-only">{l(copy.input)}</span>
        </label>
        <S.InputWrap>
          <S.Input
            ref={inputRef}
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => {
              finishIntro();
              setValue(e.target.value);
            }}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
          />
        </S.InputWrap>
      </S.InputRow>
    </S.Body>
  );
};
