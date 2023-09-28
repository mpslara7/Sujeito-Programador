import * as prismic from '@prismicio/client';

export async function getPrismicClient(req?: unknown){
  const client = prismic.createClient('https://blogdevelop.cdn.prismic.io/api/v2')

  const prismicDoc = await client.getFirst();

  return prismic;
}

