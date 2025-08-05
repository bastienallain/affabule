import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

export const urlFor = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

export const urlForWithDimensions = (source: Image, width: number, height?: number) => {
  const builder = imageBuilder?.image(source).auto('format').fit('max').width(width)
  if (height) {
    builder.height(height)
  }
  return builder
}