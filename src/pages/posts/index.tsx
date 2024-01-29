import { GetStaticProps } from 'next';
import Head from 'next/head'

import Link from 'next/link'
import styles from './styles.module.scss'

import Image from 'next/image'
import thumbImg from '../../../public/images/thumb.png'

import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'

import { getPrismicClient } from '../../services/prismic';
import * as PrismicR from '@prismicio/client';
import { useState } from 'react';

type Post = {
  slug: string;
  title: string;
  cover: string;
  description: string;
  updateAt: string;
}

interface PostsProps{
  posts: Post[];
  page: string;
  totalPage: string;
}

export default function Posts({posts: postsBlog, page, totalPage}: PostsProps){

  const [currentPage, setCurrentPage] = useState(Number(page));
  const [posts, setPosts] = useState(postsBlog || []);

  async function reqPost(pageNumber: number){
    const prismic = await getPrismicClient();

    const resp = await prismic.getByType('post', {
      orderings: {
        field: 'document.last_publication_data',
        direction: 'desc',
      },
      fetchLinks: ['post.title', 'post.cover', 'post.description'],
      pageSize: 2,
      page: pageNumber,
    });

    return resp;
  }

  const navigatePage = async (pageNumber: number) => {
    const resp = await reqPost(pageNumber);

    if(resp.results.length === 0){
      return;
    }

    const getPosts = resp.results.map(post => {
      return {
        slug: post.uid as string,
        title: PrismicR.asText(post.data.title) as string,
        description: (post.data.description.find((content: {type: string}) => content.type === 'paragraph') as {text?: string})?.text ?? '',
        cover: (post.data.cover as { url?: string}).url ?? '',
        updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })

    setCurrentPage(pageNumber);
    setPosts(getPosts);

  }

  return (
    <>
      <Head>
        <title>BLOG | Sujeito Programador</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} legacyBehavior href={`/posts/${post.slug}`}>
            <a key={post.slug}>
              <Image
                src={post.cover}
                alt={post.title}
                width={720}
                height={410}
                quality={100}
                placeholder='blur'
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8fWrXVgAHvQMGyRlDzQAAAABJRU5ErkJggg=="
              />
              <strong>{post.title}</strong>
              <time>{post.updateAt}</time>
              <p>{post.description}</p>
            </a>
          </Link>
          ))}

          <div className={styles.buttonNavigate}>
            { Number(currentPage) >= 2 && (
              <div>
                <button onClick={ () => navigatePage(1)}>
                  <FiChevronLeft size={25} color='#fff'/>
                </button>
                <button onClick={ () => navigatePage(Number(currentPage - 1)) }>
                  <FiChevronsLeft size={25} color='#fff'/>
                </button>
              </div>
            )}

            { Number(currentPage) < Number(totalPage) && (
              <div>
                <button onClick={ () => navigatePage(Number(currentPage + 1)) }>
                  <FiChevronRight size={25} color='#fff'/>
                </button>

                <button onClick={ () => navigatePage(Number(totalPage))}>
                  <FiChevronsRight size={25} color='#fff'/>
                </button>
            </div>
            )}

          </div>
        </div>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const prismic = await getPrismicClient();

  const resp = await prismic.getByType('post', {
    orderings: {
      field: 'document.last_publication_data',
      direction: 'desc',
    },
    fetchLinks: ['post.title', 'post.cover', 'post.description'],
    pageSize: 2,
    page: 1
  });

  const posts = resp.results.map(post => {
    return {
      slug: post.uid,
      title: PrismicR.asText(post.data.title),
      description: (post.data.description.find((content: {type: string}) => content.type === 'paragraph') as {text?: string})?.text ?? '',
      cover: (post.data.cover as { url?: string}).url ?? '',
      updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts,
      page: resp.page,
      totalPage: resp.total_pages
    },
    revalidate: 60 * 30 // Atualiza a cada 30 minutos
  }
}
