"use client";

import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { getAllPosts } from "../../data/posts";
import { useLanguage } from "../../i18n/LanguageContext";
import { Container, Eyebrow, HoverCard, HoverList, Reveal } from "../ui";
import { formatPostDate } from "./formatDate";
import {
  Page,
  PageHeader,
  Title,
  Description,
  LangNote,
  Row,
  DateCol,
  Body,
  PostTitle,
  PostLink,
  Arrow,
  Resume,
  ReadTime,
} from "./styles";

export const Blog: React.FC = () => {
  const { t, lang } = useLanguage();
  const posts = getAllPosts();
  const uiLang = lang === "pt" ? "pt-BR" : "en";

  return (
    <Page>
      <Container>
        <Reveal>
          <PageHeader>
            <Title>{t.blog.pageTitle}</Title>
            <Description>{t.blog.pageDescription}</Description>
            {lang === "en" && <LangNote>{t.blog.contentLangNote}</LangNote>}
          </PageHeader>
        </Reveal>

        <HoverList>
          {posts.map((post, index) => {
            const date = formatPostDate(post.date, lang);
            return (
              // Reveal goes inside the <li>: framer's inline opacity would override HoverList's dimming.
              <li key={post.slug}>
                <Reveal delay={Math.min(index * 0.06, 0.3)}>
                  <HoverCard as="article">
                    <Row>
                      <DateCol>
                        <Eyebrow as="span" lang={uiLang}>
                          <time dateTime={date.iso}>{date.label}</time>
                        </Eyebrow>
                      </DateCol>
                      <Body>
                        <PostTitle lang="pt-BR">
                          <PostLink href={`/blog/${post.slug}`}>
                            {post.title}
                            <Arrow aria-hidden="true">
                              <FiArrowUpRight focusable="false" />
                            </Arrow>
                          </PostLink>
                        </PostTitle>
                        <Resume lang="pt-BR">{post.resume}</Resume>
                        <ReadTime lang={uiLang}>
                          {post.readTime} {t.blog.readTime}
                        </ReadTime>
                      </Body>
                    </Row>
                  </HoverCard>
                </Reveal>
              </li>
            );
          })}
        </HoverList>
      </Container>
    </Page>
  );
};
