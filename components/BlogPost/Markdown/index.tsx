"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  type Block,
  type Inline,
  isExternal,
  parseBlocks,
  parseInline,
  plainText,
  slugify,
} from "./parse";
import { Prose, CodeBlock, CodeLang, InlineCode } from "./styles";

interface MarkdownProps {
  source: string;
  /** If the first h1 matches this title it is skipped (the page already renders it). */
  title?: string;
  className?: string;
}

const normalize = (s: string) => slugify(s);

const renderInline = (nodes: Inline[], key = "i"): React.ReactNode[] =>
  nodes.map((node, idx) => {
    const k = `${key}-${idx}`;
    switch (node.type) {
      case "text":
        return <React.Fragment key={k}>{node.value}</React.Fragment>;
      case "code":
        return <InlineCode key={k}>{node.value}</InlineCode>;
      case "strong":
        return <strong key={k}>{renderInline(node.children, k)}</strong>;
      case "em":
        return <em key={k}>{renderInline(node.children, k)}</em>;
      case "link":
        if (isExternal(node.href) || node.href.startsWith("mailto:")) {
          return (
            <a key={k} href={node.href} target="_blank" rel="noopener noreferrer">
              {renderInline(node.children, k)}
            </a>
          );
        }
        if (node.href.startsWith("#")) {
          return (
            <a key={k} href={node.href}>
              {renderInline(node.children, k)}
            </a>
          );
        }
        return (
          <Link key={k} href={node.href}>
            {renderInline(node.children, k)}
          </Link>
        );
    }
  });

const inline = (text: string, key: string) => renderInline(parseInline(text), key);

export const Markdown: React.FC<MarkdownProps> = ({ source, title, className }) => {
  const blocks = useMemo(() => {
    const parsed = parseBlocks(source);
    if (title) {
      const firstH1 = parsed.findIndex((b) => b.type === "heading" && b.level === 1);
      const candidate = parsed[firstH1];
      if (
        candidate?.type === "heading" &&
        normalize(plainText(candidate.text)) === normalize(title)
      ) {
        parsed.splice(firstH1, 1);
      }
    }
    return parsed;
  }, [source, title]);

  const usedIds = new Map<string, number>();
  const headingId = (text: string) => {
    const base = slugify(plainText(text)) || "section";
    const count = usedIds.get(base) ?? 0;
    usedIds.set(base, count + 1);
    return count ? `${base}-${count}` : base;
  };

  const renderBlocks = (list: Block[], prefix: string): React.ReactNode[] =>
    list.map((block, idx) => {
      const key = `${prefix}${idx}`;
      switch (block.type) {
        case "heading": {
          // The page title is the only h1: content h1/h2 render as h2, h3 as h3.
          const Tag = block.level === 3 ? "h3" : "h2";
          return (
            <Tag key={key} id={headingId(block.text)}>
              {inline(block.text, key)}
            </Tag>
          );
        }
        case "paragraph":
          return <p key={key}>{inline(block.text, key)}</p>;
        case "list": {
          const items = block.items.map((item, j) => <li key={j}>{inline(item, `${key}-${j}`)}</li>);
          return block.ordered ? (
            <ol key={key} start={block.start !== 1 ? block.start : undefined}>
              {items}
            </ol>
          ) : (
            <ul key={key}>{items}</ul>
          );
        }
        case "code":
          return (
            <CodeBlock key={key} $hasLang={Boolean(block.lang)}>
              {block.lang && <CodeLang>{block.lang}</CodeLang>}
              {/* Focusable so keyboard users can scroll long lines horizontally */}
              <pre tabIndex={0}>
                <code className={block.lang ? `language-${block.lang}` : undefined}>{block.code}</code>
              </pre>
            </CodeBlock>
          );
        case "quote":
          return <blockquote key={key}>{renderBlocks(block.children, `${key}q`)}</blockquote>;
        case "hr":
          return <hr key={key} />;
      }
    });

  return <Prose className={className}>{renderBlocks(blocks, "b")}</Prose>;
};
