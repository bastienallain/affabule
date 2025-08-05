import { createClient, defineLive } from 'next-sanity'
import type React from 'react'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production', // Cache disabled in dev for live preview
  apiVersion: '2024-03-04',
  stega: { studioUrl: '/studio' },
})

const token = process.env.SANITY_API_READ_TOKEN

interface SanityFetchParams {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  perspective?: 'published' | 'previewDrafts'
  stega?: boolean
}

// Fallback to basic client if no token (for development)
const fallbackSanityFetch = async ({ query, params = {}, tags, perspective = 'published', stega }: SanityFetchParams) => {
  return { data: await client.fetch(query, params, {
    perspective,
    stega,
    ...(tags && { next: { tags } })
  }) }
}

const fallbackSanityLive = () => null

type SanityFetchFunction = (params: SanityFetchParams) => Promise<{ data: unknown }>
type SanityLiveComponent = (() => null) | React.ComponentType<Record<string, unknown>>

let sanityFetch: SanityFetchFunction
let SanityLive: SanityLiveComponent

if (!token) {
  // Only warn in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('Missing SANITY_API_READ_TOKEN - using basic client without live features')
  }
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