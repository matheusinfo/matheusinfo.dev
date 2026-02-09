import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { BlogPost } from "../../components/BlogPost";
import { Post, getAllPosts, getPostBySlug } from "../../data/posts";

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <div>
      <Head>
        <title>{`${post.title} | Blog - Matheus Andrade`}</title>
        <meta name="description" content={post.resume} />
      </Head>
      <BlogPost post={post} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
