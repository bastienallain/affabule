import { sanityFetch } from "@/lib/sanity/live";
import { EVENTS_QUERY } from "@/lib/sanity/queries";
import type { EVENTS_QUERYResult } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Programs",
  description: "Discover our upcoming exhibitions, workshops, and cultural events",
};

export default async function EventsPage() {
  const { data: events } = await sanityFetch({
    query: EVENTS_QUERY,
    tags: ['event'],
  });

  const eventsData = events as EVENTS_QUERYResult;

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <section className="text-center py-16 bg-white">
        <h1 className="text-5xl md:text-6xl font-serif text-black mb-4">
          Events & Programs
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto px-6">
          Explore our calendar of exhibitions, workshops, artist talks, and special events
        </p>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.map((event) => (
              <Link
                key={event._id}
                href={`/evenements/${event.slug?.current || ''}`}
                className="group"
              >
                <article className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  {event.mainImage && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={urlFor(event.mainImage).width(600).height(450).url()}
                        alt={event.mainImage.alt || event.title || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="text-sm text-brand font-medium mb-2">
                      {event.startDate && new Date(event.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl font-serif text-gray-900 mb-3 group-hover:text-brand transition-colors">
                      {event.title}
                    </h2>
                    
                    {/* Description */}
                    {event.description && (
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {event.description}
                      </p>
                    )}
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm">
                      {event.eventType && (
                        <span className="text-gray-500 capitalize">
                          {event.eventType.replace('-', ' ')}
                        </span>
                      )}
                      {event.location && (
                        <span className="text-gray-500">
                          📍 {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}