import Head from "next/head";
import { Blog } from "../../components/Blog";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | Matheus Andrade</title>
        <meta
          name="description"
          content="Artigos sobre desenvolvimento de software, arquitetura e tecnologia, por Matheus Andrade."
        />
      </Head>
      <Blog />
    </>
  );
}
