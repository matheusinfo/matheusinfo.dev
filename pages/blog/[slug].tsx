import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { BlogPost } from "../../components/BlogPost";
import { type Post, getAllPosts, getPostBySlug } from "../../data/posts";

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <>
      <Head>
        <title>{`${post.title} | Blog | Matheus Andrade`}</title>
        <meta name="description" content={post.resume} />
      </Head>
      <BlogPost post={post} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPosts().map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }> = async ({ params }) => {
  const post = params ? getPostBySlug(params.slug) : undefined;
  if (!post) return { notFound: true };
  return { props: { post } };
};
