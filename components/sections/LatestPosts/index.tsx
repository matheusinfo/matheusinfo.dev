"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../../../i18n/LanguageContext";
import { getAllPosts } from "../../../data/posts";
import { formatPostDate } from "../../Blog/formatDate";
import { Eyebrow, HoverCard, HoverList, Reveal, Section, TextLink } from "../../ui";
import { Content, Footer, LangNote, PostBody, PostLink, ReadTime, Resume, Title } from "./styles";

/** Three most recent posts (sorted by parsed date; unparseable dates keep source order). */
const latestPosts = getAllPosts()
  .map((post, index) => ({ post, index, iso: formatPostDate(post.date, "pt").iso ?? "" }))
  .sort((a, b) => b.iso.localeCompare(a.iso) || a.index - b.index)
  .slice(0, 3)
  .map(({ post }) => post);

export const LatestPosts: React.FC = () => {
  const { t, lang } = useLanguage();

  if (latestPosts.length === 0) return null;

  return (
    <Section id="blog" title={t.sections.blog.title}>
      {lang === "en" && (
        <Reveal>
          <LangNote>{t.blog.contentLangNote}</LangNote>
        </Reveal>
      )}

      <HoverList>
        {latestPosts.map((post, i) => {
          const date = formatPostDate(post.date, lang);
          return (
            <Reveal as="li" key={post.slug} delay={i * 0.06}>
              <HoverCard>
                <PostBody>
                  <Eyebrow as="time" dateTime={date.iso}>
                    {date.label}
                  </Eyebrow>
                  <Content>
                    <div lang="pt-BR">
                      <Title>
                        <PostLink href={`/blog/${post.slug}`}>
                          {post.title}
                          <FiArrowUpRight className="arrow" aria-hidden="true" />
                        </PostLink>
                      </Title>
                      <Resume>{post.resume}</Resume>
                    </div>
                    <ReadTime>
                      {post.readTime} {t.blog.readTime}
                    </ReadTime>
                  </Content>
                </PostBody>
              </HoverCard>
            </Reveal>
          );
        })}
      </HoverList>

      <Footer>
        <TextLink as={Link} href="/blog">
          {t.blog.allPosts}
          <FiArrowRight aria-hidden="true" />
        </TextLink>
      </Footer>
    </Section>
  );
};
