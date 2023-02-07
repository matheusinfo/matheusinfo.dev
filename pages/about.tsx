import Head from 'next/head'
import { About } from '../components/About'

export default function AboutPage() {
  return (
    <div>
      <Head>
        <title>Sobre mim | Matheus Andrade</title>
      </Head>
      <About />
    </div>
  )
}
