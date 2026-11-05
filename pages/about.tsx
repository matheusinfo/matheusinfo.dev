import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage, type Localized } from "../i18n/LanguageContext";
import styled from "styled-components";
import { Container } from "../components/ui";

const Fallback = styled(Container)`
  padding-top: 96px;
  padding-bottom: 96px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.muted};

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const redirecting: Localized = { pt: "Redirecionando…", en: "Redirecting…" };
const fallback: Localized = { pt: "Ir para a seção Sobre", en: "Go to the About section" };

/** Legacy route: the About content now lives on the home page. */
export default function AboutRedirect() {
  const router = useRouter();
  const { t, l } = useLanguage();

  useEffect(() => {
    router.replace("/#about");
  }, [router]);

  return (
    <>
      <Head>
        <title>{`${t.nav.about} | Matheus Andrade`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Fallback>
        <p>{l(redirecting)}</p>
        <p>
          <Link href="/#about">{l(fallback)} →</Link>
        </p>
      </Fallback>
    </>
  );
}
