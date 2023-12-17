import * as prismic from '@prismicio/client';

export async function getPrismicClient(req?: unknown){
  const routes = [
    {
      type: 'home',
      path: '/:uid',
    },
    {
      type: 'post',
      path: '/:uid',
    }
  ]
  const repoName = 'blogdevelop';

  const client = prismic.createClient(repoName,{routes, fetch})

  // console.log(client);

  return client;
}

