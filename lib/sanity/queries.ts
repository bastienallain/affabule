import { defineQuery } from 'next-sanity'

export const EVENTS_QUERY = defineQuery(`*[_type == "event" && defined(slug.current)] | order(startDate asc) {
  _id,
  title,
  slug,
  startDate,
  endDate,
  startTime,
  endTime,
  isAllDay,
  location,
  description,
  eventType,
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  relatedArtists[]->{
    _id,
    name,
    slug
  },
  capacity,
  price,
  requiresReservation,
  bookingUrl,
  featured
}`)

export const FEATURED_EVENTS_QUERY = defineQuery(`*[_type == "event" && featured == true && defined(slug.current)] | order(startDate asc) {
  _id,
  title,
  slug,
  startDate,
  endDate,
  startTime,
  endTime,
  isAllDay,
  location,
  description,
  eventType,
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  relatedArtists[]->{
    _id,
    name,
    slug
  },
  capacity,
  price,
  requiresReservation,
  bookingUrl
}`)

export const EVENT_BY_SLUG_QUERY = defineQuery(`*[_type == "event" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  startDate,
  endDate,
  startTime,
  endTime,
  isAllDay,
  location,
  description,
  fullDescription,
  eventType,
  mainImage,
  "gallery": gallery[]{
    "url": asset->url,
    alt
  },
  categories[]->{
    _id,
    title,
    slug
  },
  relatedArtists[]->{
    _id,
    name,
    slug
  },
  capacity,
  price,
  requiresReservation,
  bookingUrl,
  featured
}`)