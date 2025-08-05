import { sanityFetch } from "@/lib/sanity/live";
import { EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all events
export async function generateStaticParams() {
  const { data: events } = await sanityFetch({
    query: EVENT_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return events.map((event) => ({
    slug: event.slug.current,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  if (!event) {
    return {};
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.mainImage ? [urlFor(event.mainImage).width(1200).height(630).url()] : [],
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    tags: ['event'],
  });

  if (!event) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Hero Section - Royal Galleries Style */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start gap-16">
            <div className="flex-1 pt-8">
              <div className="text-brand text-sm font-medium tracking-wider uppercase mb-8">
                MUSÉE DE L'AFFABULOSCOPE
              </div>
              <h1 className="text-6xl md:text-7xl font-serif text-black leading-tight mb-8">
                {event.title}
              </h1>
              <div className="text-2xl font-light text-gray-600 mb-8">
                {new Date(event.startDate).toLocaleDateString("fr-FR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {event.endDate && event.endDate !== event.startDate && (
                  <>
                    {" - "}
                    {new Date(event.endDate).toLocaleDateString("fr-FR", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </>
                )}
              </div>
              <div className="flex items-center gap-4 mb-8">
                {event.requiresReservation && event.bookingUrl ? (
                  <a
                    href={event.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand/90 transition-colors"
                  >
                    RÉSERVER
                  </a>
                ) : (
                  <span className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium">
                    {event.eventType ? event.eventType.replace('-', ' ').toUpperCase() : 'SPECIAL EVENT'}
                  </span>
                )}
                <a
                  href="/evenements"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  VOIR TOUS LES ÉVÉNEMENTS
                </a>
              </div>
              {event.description && (
                <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                  {event.description}
                </p>
              )}
            </div>
            <div className="flex-1">
              {event.mainImage && (
                <div className="relative group">
                  <Image
                    src={urlFor(event.mainImage).width(800).height(1000).url()}
                    alt={event.mainImage.alt || event.title}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover shadow-xl group-hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {event.eventType && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Type
                </h3>
                <p className="text-lg text-gray-900 capitalize">{event.eventType.replace('-', ' ')}</p>
              </div>
            )}
            {event.location && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Location
                </h3>
                <p className="text-lg text-gray-900">{event.location}</p>
              </div>
            )}
            {event.price && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Price
                </h3>
                <p className="text-lg text-gray-900">{event.price}</p>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className="mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Full Description (Rich Text) */}
          {event.fullDescription && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={event.fullDescription} />
            </div>
          )}

          {/* CTA Section */}
          {event.requiresReservation && event.bookingUrl && (
            <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
              <h3 className="text-2xl font-serif mb-4">Reserve Your Spot</h3>
              <p className="text-gray-600 mb-6">
                {event.capacity && `Limited to ${event.capacity} attendees. `}
                Reservation required.
              </p>
              <a
                href={event.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand text-white px-8 py-3 font-medium hover:bg-brand/90 transition-colors"
              >
                Book Now
              </a>
            </div>
          )}

          {/* Artists */}
          {event.relatedArtists && event.relatedArtists.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-serif mb-6">Featured Artists</h3>
              <div className="flex flex-wrap gap-4">
                {event.relatedArtists.map((artist) => (
                  <div key={artist._id} className="text-gray-700">
                    {artist.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Gallery */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-serif mb-8">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3]">
                    <Image
                      src={image.url}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}