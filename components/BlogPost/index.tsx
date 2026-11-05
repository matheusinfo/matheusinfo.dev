"use client";

import React, { useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import type { Post } from "../../data/posts";
import { useLanguage } from "../../i18n/LanguageContext";
import { Container, Reveal } from "../ui";
import { formatPostDate } from "../Blog/formatDate";
import { Markdown } from "./Markdown";
import { ReadingProgress } from "./ReadingProgress";
import {
  Page,
  Article,
  BackLink,
  PostHeader,
  Title,
  Meta,
  LangNote,
  ArticleFooter,
} from "./styles";

interface BlogPostProps {
  post: Post;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const { t, lang } = useLanguage();
  const articleRef = useRef<HTMLElement>(null);
  const date = formatPostDate(post.date, lang);
  const uiLang = lang === "pt" ? "pt-BR" : "en";

  return (
    <Page>
      <ReadingProgress target={articleRef} />
      <Container>
        <Article ref={articleRef} lang="pt-BR">
          <BackLink href="/blog" lang={uiLang}>
            <FiArrowLeft aria-hidden="true" focusable="false" /> {t.blog.back}
          </BackLink>

          <Reveal>
            <PostHeader>
              <Title>{post.title}</Title>
              <Meta lang={uiLang}>
                <time dateTime={date.iso}>{date.label}</time>
                <span aria-hidden="true">·</span>
                <span>
                  {post.readTime} {t.blog.readTime}
                </span>
              </Meta>
              {lang === "en" && <LangNote lang="en">{t.blog.contentLangNote}</LangNote>}
            </PostHeader>
          </Reveal>

          <Markdown source={post.content} title={post.title} />

          <ArticleFooter>
            <BackLink href="/blog" lang={uiLang}>
              <FiArrowLeft aria-hidden="true" focusable="false" /> {t.blog.back}
            </BackLink>
          </ArticleFooter>
        </Article>
      </Container>
    </Page>
  );
};
