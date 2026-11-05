/**
 * Tiny Markdown block parser (no dependencies).
 * Produces a plain AST; rendering happens in React, so all text is escaped by React
 * and no raw HTML from the source is ever injected into the page.
 */

export type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; start: number; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; children: Block[] }
  | { type: "hr" };

const FENCE = /^\s{0,3}(`{3,}|~{3,})\s*([\w+#.-]*)\s*$/;
const HEADING = /^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/;
const HR = /^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/;
const QUOTE = /^\s{0,3}>\s?(.*)$/;
const UL_ITEM = /^\s{0,3}[-*+]\s+(.*)$/;
const OL_ITEM = /^\s{0,3}(\d{1,9})[.)]\s+(.*)$/;

const isBlank = (line: string) => line.trim() === "";

const startsBlock = (line: string) =>
  FENCE.test(line) ||
  HEADING.test(line) ||
  HR.test(line) ||
  QUOTE.test(line) ||
  UL_ITEM.test(line) ||
  OL_ITEM.test(line);

export function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").replace(/\t/g, "  ").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isBlank(line)) {
      i++;
      continue;
    }

    // Fenced code block
    const fence = line.match(FENCE);
    if (fence) {
      const marker = fence[1];
      const closing = new RegExp(`^\\s{0,3}${marker[0] === "`" ? "`" : "~"}{${marker.length},}\\s*$`);
      const code: string[] = [];
      i++;
      while (i < lines.length && !closing.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      i++; // skip closing fence (or EOF)
      while (code.length && isBlank(code[code.length - 1])) code.pop();
      blocks.push({ type: "code", lang: fence[2].toLowerCase(), code: code.join("\n") });
      continue;
    }

    // Horizontal rule (checked before lists so "---" / "* * *" aren't list items)
    if (HR.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      const level = Math.min(heading[1].length, 3) as 1 | 2 | 3;
      blocks.push({ type: "heading", level, text: heading[2] });
      i++;
      continue;
    }

    // Blockquote: collect consecutive ">" lines and parse their content recursively
    if (QUOTE.test(line)) {
      const inner: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) {
        inner.push((lines[i].match(QUOTE) as RegExpMatchArray)[1]);
        i++;
      }
      blocks.push({ type: "quote", children: parseBlocks(inner.join("\n")) });
      continue;
    }

    // Lists
    const ordered = OL_ITEM.test(line);
    if (ordered || UL_ITEM.test(line)) {
      const itemRe = ordered ? OL_ITEM : UL_ITEM;
      const items: string[] = [];
      const start = ordered ? parseInt((line.match(OL_ITEM) as RegExpMatchArray)[1], 10) : 1;

      while (i < lines.length) {
        const current = lines[i];
        const item = current.match(itemRe);
        if (item) {
          items.push(item[ordered ? 2 : 1]);
          i++;
          continue;
        }
        // Lazy continuation of the previous item
        if (!isBlank(current) && !startsBlock(current) && items.length) {
          items[items.length - 1] += ` ${current.trim()}`;
          i++;
          continue;
        }
        // Loose list: blank line followed by another item of the same kind
        if (isBlank(current) && i + 1 < lines.length && itemRe.test(lines[i + 1])) {
          i++;
          continue;
        }
        break;
      }

      blocks.push({ type: "list", ordered, start, items });
      continue;
    }

    // Paragraph: consecutive lines until a blank line or another block starts
    const para: string[] = [];
    while (i < lines.length && !isBlank(lines[i]) && (para.length === 0 || !startsBlock(lines[i]))) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "paragraph", text: para.join(" ") });
  }

  return blocks;
}

/* ---------- Inline ---------- */

export type Inline =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "link"; href: string; children: Inline[] };

/**
 * Order matters: at the same index, earlier alternatives win
 * (code > link > bold > italic).
 */
const INLINE =
  /`([^`]+)`|\[([^\]]+)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)|\*\*(?=\S)([\s\S]*?\S)\*\*|__(?=\S)([\s\S]*?\S)__|\*(?=[^\s*])([\s\S]*?[^\s*])\*/g;

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const re = new RegExp(INLINE.source, "g");
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ type: "text", value: text.slice(last, m.index) });

    if (m[1] !== undefined) {
      out.push({ type: "code", value: m[1] });
    } else if (m[2] !== undefined) {
      const href = safeHref(m[3]);
      const children = parseInline(m[2]);
      if (href) out.push({ type: "link", href, children });
      else out.push(...children);
    } else if (m[4] !== undefined || m[5] !== undefined) {
      out.push({ type: "strong", children: parseInline(m[4] ?? m[5]) });
    } else if (m[6] !== undefined) {
      out.push({ type: "em", children: parseInline(m[6]) });
    }

    last = re.lastIndex;
  }

  if (last < text.length) out.push({ type: "text", value: text.slice(last) });
  return out;
}

/** Only allow http(s), mailto, site-relative paths and in-page anchors. */
export function safeHref(raw: string): string | null {
  const url = raw.trim();
  if (/^(https?:\/\/|mailto:)/i.test(url)) return url;
  if (/^\/(?!\/)/.test(url) || url.startsWith("#")) return url;
  return null;
}

export const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** Plain text of a markdown inline string (for ids / comparisons). */
export function plainText(text: string): string {
  const walk = (nodes: Inline[]): string =>
    nodes
      .map((n) => (n.type === "text" || n.type === "code" ? n.value : walk(n.children)))
      .join("");
  return walk(parseInline(text));
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
