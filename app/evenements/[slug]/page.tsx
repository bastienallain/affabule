import { urlFor } from "@/lib/sanity/image";
import { sanityFetch } from "@/lib/sanity/live";
import { EVENT_BY_SLUG_QUERY, EVENT_SLUGS_QUERY } from "@/lib/sanity/queries";
import type { EVENT_BY_SLUG_QUERYResult, EVENT_SLUGS_QUERYResult } from "@/lib/sanity/types";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all events
export async function generateStaticParams() {
  const { data: events } = await sanityFetch({
    query: EVENT_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return (events as EVENT_SLUGS_QUERYResult).map((event) => ({
    slug: event.slug?.current || '',
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  const eventData = event as EVENT_BY_SLUG_QUERYResult;

  if (!eventData) {
    return {};
  }

  return {
    title: eventData.title || undefined,
    description: eventData.description || undefined,
    openGraph: {
      title: eventData.title || undefined,
      description: eventData.description || undefined,
      images: eventData.mainImage
        ? [urlFor(eventData.mainImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: EVENT_BY_SLUG_QUERY,
    params: { slug },
    tags: ["event"],
  });

  const eventData = event as EVENT_BY_SLUG_QUERYResult;

  if (!eventData) {
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
                MUSÉE DE L&apos;AFFABULOSCOPE
              </div>
              <h1 className="text-6xl md:text-7xl font-serif text-black leading-tight mb-8">
                {eventData.title}
              </h1>
              <div className="text-2xl font-light text-gray-600 mb-8">
                {eventData.startDate && new Date(eventData.startDate).toLocaleDateString("fr-FR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {eventData.endDate && eventData.endDate !== eventData.startDate && (
                  <>
                    {" - "}
                    {new Date(eventData.endDate).toLocaleDateString("fr-FR", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </>
                )}
              </div>
              <div className="flex items-center gap-4 mb-8">
                {eventData.requiresReservation && eventData.bookingUrl ? (
                  <a
                    href={eventData.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand/90 transition-colors"
                  >
                    RÉSERVER
                  </a>
                ) : (
                  <span className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium">
                    {eventData.eventType
                      ? eventData.eventType.replace("-", " ").toUpperCase()
                      : "SPECIAL EVENT"}
                  </span>
                )}
                <Link
                  href="/evenements"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  VOIR TOUS LES ÉVÉNEMENTS
                </Link>
              </div>
              {eventData.description && (
                <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                  {eventData.description}
                </p>
              )}
            </div>
            <div className="flex-1">
              {eventData.mainImage && (
                <div className="relative group">
                  <Image
                    src={urlFor(eventData.mainImage).width(800).height(1000).url()}
                    alt={eventData.mainImage.alt || eventData.title || ''}
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
            {eventData.eventType && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Type
                </h3>
                <p className="text-lg text-gray-900 capitalize">
                  {eventData.eventType.replace("-", " ")}
                </p>
              </div>
            )}
            {eventData.location && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Location
                </h3>
                <p className="text-lg text-gray-900">{eventData.location}</p>
              </div>
            )}
            {eventData.price && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Price
                </h3>
                <p className="text-lg text-gray-900">{eventData.price}</p>
              </div>
            )}
          </div>

          {/* Description */}
          {eventData.description && (
            <div className="mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                {eventData.description}
              </p>
            </div>
          )}

          {/* Full Description (Rich Text) */}
          {eventData.fullDescription && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={eventData.fullDescription} />
            </div>
          )}

          {/* CTA Section */}
          {eventData.requiresReservation && eventData.bookingUrl && (
            <div className="mt-12 p-8 bg-gray-50 rounded-lg text-center">
              <h3 className="text-2xl font-serif mb-4">Reserve Your Spot</h3>
              <p className="text-gray-600 mb-6">
                {eventData.capacity && `Limited to ${eventData.capacity} attendees. `}
                Reservation required.
              </p>
              <a
                href={eventData.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand text-white px-8 py-3 font-medium hover:bg-brand/90 transition-colors"
              >
                Book Now
              </a>
            </div>
          )}

          {/* Artists - Commented out until types are resolved */}
          {/* {eventData.relatedArtists && eventData.relatedArtists.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-serif mb-6">Featured Artists</h3>
              <div className="flex flex-wrap gap-4">
                {eventData.relatedArtists.map((artist) => (
                  <div key={artist._ref} className="text-gray-700">
                    Related Artist
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Image Gallery - Commented out until types are resolved */}
          {/* {eventData.gallery && eventData.gallery.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-serif mb-8">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventData.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3]">
                    <Image
                      src={urlFor(image as any).url()}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </section>
    </article>
  );
}
