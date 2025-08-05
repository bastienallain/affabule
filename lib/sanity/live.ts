import { createClient, defineLive } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production', // Cache disabled in dev for live preview
  apiVersion: '2024-03-04',
  stega: { studioUrl: '/studio' },
})

const token = process.env.SANITY_API_READ_TOKEN

// Fallback to basic client if no token (for development)
const fallbackSanityFetch = async ({ query, params, tags }: any) => {
  return { data: await client.fetch(query, params) }
}

const fallbackSanityLive = () => null

let sanityFetch: any
let SanityLive: any

if (!token) {
  console.warn('Missing SANITY_API_READ_TOKEN - using basic client without live features')
  sanityFetch = fallbackSanityFetch
  SanityLive = fallbackSanityLive
} else {
  const liveConfig = defineLive({
    client,
    serverToken: token,
    browserToken: token,
  })
  sanityFetch = liveConfig.sanityFetch
  SanityLive = liveConfig.SanityLive
}

export { sanityFetch, SanityLive }