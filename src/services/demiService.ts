import axios from 'axios'
import { translateString } from './translateService'

const slugQuery = `
  query {
    threads(first: 100) {
      edges {
        node {
          slug
        }
      }
    }
  }
`

const threadQuery = (slug: string) => `
  query {
    thread(slug: "${slug}") {
      body {
        plain
      }
    }
  }
`

const getSlugs = (): Promise<string[]> => axios
  .post('https://api-proxy.demi.fi/graphql', {query: slugQuery, variables: {}})
  .then(({data}) => data)
  .then(res => res.data.threads.edges.map(edge => edge.node.slug) as string[])


const getThreadBody = (slug: string): Promise<string> => axios
  .post('https://api-proxy.demi.fi/graphql', {query: threadQuery(slug), variables: {}})
  .then(({data}) => data)
  .then(res => res.data.thread.body.plain)

export async function getThread() {
  const slugs = await getSlugs()
  const randomSlug = slugs[Math.floor(Math.random() * slugs.length)]
  const threadBody = await getThreadBody(randomSlug)
  const translated = await translateString(threadBody)

  return {
    threadId: randomSlug,
    text: translated
  }
}