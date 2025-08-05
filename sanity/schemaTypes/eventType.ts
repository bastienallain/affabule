import { defineType, defineField } from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'For multi-day exhibitions (optional)',
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., "14:00" or "2:00 PM"',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'e.g., "18:00" or "6:00 PM"',
    }),
    defineField({
      name: 'isAllDay',
      title: 'All Day Event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Leave empty if at main gallery',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for event cards',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description with rich text formatting',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Exhibition', value: 'exhibition' },
          { title: 'Opening Reception', value: 'opening' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Artist Talk', value: 'talk' },
          { title: 'Gallery Tour', value: 'tour' },
          { title: 'Conference', value: 'conference' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'relatedArtists',
      title: 'Related Artists',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'author' } }],
      description: 'Artists featured in this event',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      description: 'Maximum number of attendees (optional)',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "Free", "€15", "Pay what you wish"',
    }),
    defineField({
      name: 'requiresReservation',
      title: 'Requires Reservation',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Link for reservations or tickets',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: false,
      description: 'Show this event prominently on homepage',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      eventType: 'eventType',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, startDate, eventType } = selection
      return {
        title,
        subtitle: `${eventType ? eventType + ' • ' : ''}${startDate ? new Date(startDate).toLocaleDateString() : 'No date set'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Start Date, Old',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
})