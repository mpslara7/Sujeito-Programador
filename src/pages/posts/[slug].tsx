import { GetServerSideProps } from 'next';
import * as PrismicR from '@prismicio/client';
import styles from './post.module.scss';
import { getPrismicClient } from '../../services/prismic';

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

  console.log(post);

  return(
    <div>
      <h2>DETALHE DO POST</h2>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => { //params: consigo acessar os dados contidos na URL
  try {
    const { slug } = params;
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
