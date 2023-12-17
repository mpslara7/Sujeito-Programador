import { GetStaticProps } from 'next';
import Head from 'next/head'

import Link from 'next/link'
import styles from './styles.module.scss'

import Image from 'next/image'
import thumbImg from '../../../public/images/thumb.png'

import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'

import { getPrismicClient } from '../../services/prismic';
import * as PrismicR from '@prismicio/client';

type Post = {
  slug: string;
  title: string;
  cover: string;
  description: string;
  updateAt: string;
}

interface PostsProps{
  posts: Post[];
}

export default function Posts({posts}: PostsProps){
  return (
    <>
      <Head>
        <title>BLOG | Sujeito Programador</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <Link legacyBehavior href='/'>
            <a>
              <Image
                src={thumbImg}
                alt='Post titulo 1'
                width={720}
                height={410}
                quality={100}
              />
              <strong>Criando meu primeiro aplicativo</strong>
              <time>14 JULHO 2021</time>
              <p>Hoje vamos criar o controle de mostrar a senha no input, uma opção para os nossos formulários de cadastro e login. Mas chega de conversa e bora pro código junto comigo que o vídeo está show de bola!</p>
            </a>
          </Link>

          <div className={styles.buttonNavigate}>
            <div>
              <button>
                <FiChevronLeft size={25} color='#fff'/>
              </button>
              <button>
                <FiChevronsLeft size={25} color='#fff'/>
              </button>
            </div>
            <div>
              <button>
                <FiChevronRight size={25} color='#fff'/>
              </button>

              <button>
                <FiChevronsRight size={25} color='#fff'/>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const prismic = await getPrismicClient();

  const resp = await prismic.getAllByType('post', {
    orderings: {
      field: 'last_publication_data',
      direction: 'desc',
    },
    fetch: ['post.title', 'post.cover', 'post.description'],
    pageSize: 2
  });

  //console.log(JSON.stringify(resp, null, 2));

  const posts = resp.map(post => {
    return {
      slug: post.uid,
      title: PrismicR.asText(post.data.title),
      description: post.data.description.find((content: {type: string}) => content.type === 'paragraph')?.text ?? '',
      cover: post.data.cover.url,
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts
    },
    revalidate: 60 * 30 // Atualiza a cada 30 minutos
  }
}
