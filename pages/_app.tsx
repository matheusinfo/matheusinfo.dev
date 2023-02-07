import type { AppProps } from 'next/app'
import Head from 'next/head'
import  GlobalStyle from '../styles/globals'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta property="og:image" content="https://user-images.githubusercontent.com/48860569/217130894-8da7b8ea-ddf5-4abc-9f3e-ebbacba00243.png" />
      </Head>
      <GlobalStyle />
      <Sidebar />
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
