import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production', // Cache disabled in dev for live preview
  apiVersion: '2024-03-04',
  stega: { studioUrl: '/studio' },
})