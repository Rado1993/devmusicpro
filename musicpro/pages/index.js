/* eslint-disable */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MusicPro</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          
        </div>
      </main>

      <footer className={styles.footer}>
          
          <span className={styles.logo}>
            Diseñada por{' '}
          <b>"MugglesTeam"</b>
          </span>
      </footer>
    </div>
  )
}
