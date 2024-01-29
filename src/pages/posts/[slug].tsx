import { GetServerSideProps } from 'next';
import * as PrismicR from '@prismicio/client';
import styles from './post.module.scss';
import { getPrismicClient } from '../../services/prismic';
import Head from 'next/head';
import Image from 'next/image'


interface PostProps{
  post: {
    slug: string;
    title: string;
    description: string;
    cover: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps){
  return(
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <Image
            src={post.cover}
            width={720}
            height={410}
            alt={post.title}
            placeholder='blur'
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8fWrXVgAHvQMGyRlDzQAAAABJRU5ErkJggg=="
          />

          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.description }}></div>
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => { //params: consigo acessar os dados contidos na URL
  try {
    const { slug } = params || {}; // retorna um objeto vazio {} se params for undefined
    const prismic = await getPrismicClient(req);

    const resp = await prismic.getByUID('post', String(slug), {});

    if(!resp){ // ! : se ele NÃO obter a response então
      return{
        redirect:{
          destination: '/posts',
          permanent: false,
        },
      };
    }

    const post = {
      slug: slug,
      title: PrismicR.asText(resp.data.title),
      description: PrismicR.asHTML(resp.data.description),
      cover: resp.data.cover.url,
      updatedAt: new Date(resp.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };

    return {
      props:{
        post,
      }
    }
  } catch (error) {
    console.error("Erro em getServerSideProps:", error);

    return {
      redirect: {
        destination: '/posts',
        permanent: false,
      },
    };
  }
};
