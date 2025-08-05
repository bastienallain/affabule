import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

// Type that works with both Sanity Image types and generated GROQ types
type ImageSource = Image | SanityImageSource | {
  asset?: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
  _type: "image";
}

export const urlFor = (source: ImageSource) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

export const urlForWithDimensions = (source: ImageSource, width: number, height?: number) => {
  const builder = imageBuilder?.image(source).auto('format').fit('max').width(width)
  if (height) {
    builder.height(height)
  }
  return builder
}