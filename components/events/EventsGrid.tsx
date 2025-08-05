import { cn } from "@/lib/utils";
import { sanityFetch } from "@/lib/sanity/live";
import { FEATURED_EVENTS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";

interface EventsGridProps {
  className?: string;
}

export const EventsGrid = async ({ className }: EventsGridProps) => {
  const { data: allEvents } = await sanityFetch({
    query: FEATURED_EVENTS_QUERY,
    tags: ['event'],
  });

  if (!allEvents || allEvents.length === 0) {
    return null;
  }

  // Limit to 2 featured events for homepage
  const events = allEvents.slice(0, 2);

  return (
    <section className={cn("bg-gray-100 py-16", className)}>
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-serif text-black">
          Events & Programs
        </h2>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div key={event._id} className={`flex gap-8 items-center ${!isEven ? 'flex-row-reverse' : ''}`}>
              {/* Event Image */}
              <div className="relative w-1/2">
                {event.mainImage && (
                  <Image
                    src={urlFor(event.mainImage).width(800).height(600).url()}
                    alt={event.mainImage.alt || event.title}
                    width={800}
                    height={600}
                    className="w-full h-96 object-cover shadow-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0} // First image has priority
                  />
                )}
              </div>

              {/* Event Content */}
              <div className="w-1/2 space-y-6">
                {/* Date */}
                <div className="flex items-center gap-4">
                  <div className="text-brand font-medium text-sm tracking-wider uppercase">
                    {new Date(event.startDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric'
                    }).toUpperCase()}
                  </div>
                  <div className="h-0.5 bg-brand flex-1 max-w-48"></div>
                </div>

                {/* Event Title */}
                <div>
                  <h3 className="text-4xl md:text-5xl font-serif text-black leading-tight">
                    {event.title}
                  </h3>
                </div>

                {/* Event Description */}
                {event.description && (
                  <p className="text-black text-lg leading-relaxed">
                    {event.description}
                  </p>
                )}

                {/* Location */}
                {event.location && (
                  <p className="text-gray-600 text-base">
                    📍 {event.location}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        
        {/* View All Button */}
        <div className="text-center pt-12">
          <a 
            href="/evenements" 
            className="inline-flex items-center gap-3 border-2 border-brand text-brand px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-brand hover:text-white transition-all duration-300"
          >
            VIEW ALL EXHIBITIONS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
