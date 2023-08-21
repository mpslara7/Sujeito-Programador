import Head from 'next/head';
import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>Levando voçê para o proximo nivel!!</h1>
            <span>Uma plataforma que te leva para o proximo nivel</span>
            <a>
              <button>
                COMEÇAR AGORA !
              </button>
            </a>
          </section>

          <img src='/images/banner-conteudos.png'
               alt='Conteudos Sujeito Programador'
          />
        </div>

        <hr className={styles.divisor}/>

        <div className={styles.sectionContent}>
          <section>
            <h2>Aprenda a criar aplicativos para android e IOS</h2>
            <span>Você vai descobrir o jeito mais moderno de desenvolver apps nativos para iOS e Android, construindo aplicativos do zero até aplicativos.</span>
          </section>

          <img src='/images/financasApp.png'
               alt='Conteúdos desenvolvimento de apps'
          />
        </div>

      </main>
    </>
)
};
