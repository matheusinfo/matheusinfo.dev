import Head from "next/head";
import { HomeLayout, HomeLeft, HomeRight } from "../components/HomeLayout";
import { Intro } from "../components/sections/Intro";
import { About } from "../components/sections/About";
import { Experience } from "../components/sections/Experience";
import { Skills } from "../components/sections/Skills";
import { Projects } from "../components/sections/Projects";
import { LatestPosts } from "../components/sections/LatestPosts";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Matheus Andrade | Software Engineer</title>
      </Head>
      <HomeLayout>
        <HomeLeft>
          <Intro />
        </HomeLeft>
        <HomeRight id="content">
          <About />
          <Experience />
          <Skills />
          <Projects />
          <LatestPosts />
          <Contact />
          <Footer variant="column" />
        </HomeRight>
      </HomeLayout>
    </>
  );
}
