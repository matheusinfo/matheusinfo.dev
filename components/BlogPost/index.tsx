"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Post } from "../../data/posts";
import {
  Container,
  Content,
  BackLink,
  PostHeader,
  PostMeta,
  PostContent,
} from "./styles";

interface BlogPostProps {
  post: Post;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <Container>
      <Content
        as={motion.article}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <BackLink
          as={motion.div}
          variants={itemVariants}
          whileHover={{ x: -5 }}
        >
          <Link href="/blog">← Voltar para o Blog</Link>
        </BackLink>

        <PostHeader as={motion.div} variants={itemVariants}>
          <h1>{post.title}</h1>
          <PostMeta>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime} de leitura</span>
          </PostMeta>
        </PostHeader>

        <PostContent
          as={motion.div}
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />
      </Content>
    </Container>
  );
};

function formatContent(content: string): string {
  return content
    .trim()
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ")) {
        return `<h1>${line.slice(2)}</h1>`;
      }
      if (line.startsWith("## ")) {
        return `<h2>${line.slice(3)}</h2>`;
      }
      if (line.startsWith("### ")) {
        return `<h3>${line.slice(4)}</h3>`;
      }
      if (line.startsWith("```")) {
        return line === "```" ? "</pre></code>" : "<code><pre>";
      }
      if (line.startsWith("- ")) {
        return `<li>${line.slice(2)}</li>`;
      }
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      line = line.replace(/`([^`]+)`/g, "<code class='inline'>$1</code>");
      if (line.trim() === "") {
        return "<br/>";
      }
      if (!line.startsWith("<")) {
        return `<p>${line}</p>`;
      }
      return line;
    })
    .join("\n");
}
