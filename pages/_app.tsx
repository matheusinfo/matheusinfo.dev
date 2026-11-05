import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globals";
import { theme } from "../styles/theme";
import { LanguageProvider, useLanguage } from "../i18n/LanguageContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Spotlight } from "../components/Spotlight";
import { TerminalOverlay } from "../components/TerminalOverlay";
import { SkipLink } from "../components/ui";

/** Home has its own split layout (intro column + <main>); inner pages get Header/Footer. */
const Shell: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const { t } = useLanguage();
  const isHome = pathname === "/";

  return (
    <>
      <SkipLink href="#content">{t.nav.skipToContent}</SkipLink>
      <Spotlight />
      {isHome ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Header />
          <main id="content">
            <Component {...pageProps} />
          </main>
          <Footer />
        </>
      )}
      <TerminalOverlay />
    </>
  );
};

function MyApp(props: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0b0b0d" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Matheus Andrade — Software Engineer" />
          <meta
            property="og:description"
            content="Engenheiro de software focado em sistemas financeiros de alta disponibilidade, microserviços e IA aplicada."
          />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/48860569/217130894-8da7b8ea-ddf5-4abc-9f3e-ebbacba00243.png"
          />
        </Head>
        <GlobalStyle />
        <Shell {...props} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
