import Head from 'next/head';
import styles from '../styles/home.module.scss'

import Image from 'next/image';
import techsImage from '../../public/images/techs.svg'
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import * as PrismicR from '@prismicio/client';

type Content = {
  title: string,
  titleContent: string,
  linkAction: string,
  mobileTitle: string,
  mobileContent: string,
  mobileBanner: string,
  webTitle: string,
  webContent: string,
  webBanner: string,
}

interface ContentProps{
  content: Content;
}

export default function Home({ content }: ContentProps) {
  // console.log(content);
  return (
    <>
      <Head>
        <title>Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
            <a href={content.linkAction}>
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
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>

          <img src={content.mobileBanner}
               alt='Conteúdos desenvolvimento de apps'
          />
        </div>

        <hr className={styles.divisor}/>

        <div className={styles.sectionContent}>
          <img src={content.webBanner}
               alt='Conteúdos desenvolvimento de aplicações web'
          />

          <section>
            <h2>{content.webTitle}</h2>
            <span>Criar sistemas web, sites usando as tecnologias mais modernas e requisitadas pelo mercado.</span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt='Tecnologias'/>
          <h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
          <a href={content.linkAction}>
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
    title, title_content, link_action,
    mobile_title, mobile_content, mobile_banner,
    web_title, web_content, web_banner
  } = resp.data;

  const content = {
    title: PrismicR.asText(title),
    titleContent: PrismicR.asText(title_content),
    linkAction: link_action.url,
    mobileTitle: PrismicR.asText(mobile_title),
    mobileContent: PrismicR.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: PrismicR.asText(web_title),
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
