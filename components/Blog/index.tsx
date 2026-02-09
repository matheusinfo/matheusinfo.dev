"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllPosts } from "../../data/posts";
import {
  Container,
  Content,
  SectionTitle,
  PostCard,
  PostList,
  PostMeta,
} from "./styles";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const Blog: React.FC = () => {
  const posts = getAllPosts();

  return (
    <Container>
      <Content
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <SectionTitle as={motion.h1} variants={itemVariants}>
          Blog
        </SectionTitle>

        <motion.p
          variants={itemVariants}
          style={{
            color: "#a0a0a0",
            textAlign: "center",
            marginBottom: "50px",
            fontSize: "18px",
          }}
        >
          Compartilhando conhecimento sobre desenvolvimento de software
        </motion.p>

        <PostList>
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              as={motion.div}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
                <p>{post.resume}</p>
                <PostMeta>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime} de leitura</span>
                </PostMeta>
              </Link>
            </PostCard>
          ))}
        </PostList>
      </Content>
    </Container>
  );
};
