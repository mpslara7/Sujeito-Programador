import Head from 'next/head';
import styles from '../styles/home.module.scss'

import Image from 'next/image';
import techsImage from '../../public/images/techs.svg'
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import * as PrismicR from '@prismicio/client';

type Content = {
  title: string,
  subTitle: string,
  linkAction: string,
  mobile: string,
  mobileContent: string,
  mobileBanner: string,
  titleWeb: string,
  webContent: string,
  webBanner: string,
}

interface ContentProps{
  content: Content;
}

export default function Home({ content }: ContentProps) {
  console.log(content);
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

        <hr className={styles.divisor}/>

        <div className={styles.sectionContent}>
          <img src='/images/webDev.png'
               alt='Conteúdos desenvolvimento de aplicações web'
          />

          <section>
            <h2>Aprenda criar sistemas web</h2>
            <span>Criar sistemas web, sites usando as tecnologias mais modernas e requisitadas pelo mercado.</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt='Tecnologias'/>
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
          <a>
            <button>ACESSAR AGORA!</button>
          </a>
        </div>

      </main>
    </>
)
};


export const getStaticProps: GetStaticProps = async () => {
  const prismic = await getPrismicClient();

  const resp = await prismic.getSingle('home');

  const {
    title, sub_title, link_action,
    mobile, mobile_content, mobile_banner,
    title_web, web_content, web_banner
  } = resp.data;

  const content = {
    title: PrismicR.asText(title),
    subTitle: PrismicR.asText(sub_title),
    linkAction: link_action.url,
    mobile: PrismicR.asText(mobile),
    mobileContent: PrismicR.asText(mobile_content),
    mobileBanner: PrismicR.asText(mobile_banner),
    titleWeb: PrismicR.asText(title_web),
    webContent: PrismicR.asText(web_content),
    webBanner: web_banner.url,
  };

  // console.log(resp.data);

  return{
    props:{
      content
    },
    revalidate: 60 * 2 // A cada dois minutos
  }
}
