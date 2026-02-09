import Head from "next/head";
import { Blog } from "../../components/Blog/index";

export default function BlogPage() {
  return (
    <div>
      <Head>
        <title>Blog | Matheus Andrade</title>
        <meta
          name="description"
          content="Blog sobre desenvolvimento de software, tecnologia e programação."
        />
      </Head>
      <Blog />
    </div>
  );
}
