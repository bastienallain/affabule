import { urlFor } from "@/lib/sanity/image";
import { sanityFetch } from "@/lib/sanity/live";
import { FEATURED_EVENTS_QUERY } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface EventsGridProps {
  className?: string;
}

export const EventsGrid = async ({ className }: EventsGridProps) => {
  const { data: allEvents } = await sanityFetch({
    query: FEATURED_EVENTS_QUERY,
    tags: ["event"],
  });

  if (!allEvents || allEvents.length === 0) {
    return null;
  }

  // Limit to 2 featured events for homepage
  const events = allEvents.slice(0, 2);

  // Take only the first featured event for hero display
  const featuredEvent = events[0];

  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-black mb-4">
            Événements à l'affiche
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos expositions et événements exceptionnels
          </p>
        </div>

        {/* Events Grid */}
        <div className="space-y-16">
          {events.map((event, index) => (
            <div
              key={event._id}
              className={cn(
                "flex flex-col lg:flex-row items-center gap-12",
                index % 2 === 1 && "lg:flex-row-reverse"
              )}
            >
              {/* Image */}
              <div className="flex-1">
                {event.mainImage && (
                  <Link
                    href={`/evenements/${event.slug.current}`}
                    className="block group"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={urlFor(event.mainImage).width(800).height(600).url()}
                        alt={event.mainImage.alt || event.title}
                        fill
                        className="object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </Link>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                {/* Date Line */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-brand"></div>
                  <span className="text-brand text-sm font-medium">
                    {new Date(event.startDate).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {event.endDate && event.endDate !== event.startDate && (
                      <>
                        {" - "}
                        {new Date(event.endDate).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </>
                    )}
                  </span>
                </div>

                {/* Title */}
                <Link href={`/evenements/${event.slug.current}`}>
                  <h3 className="text-3xl md:text-4xl font-serif text-black hover:text-brand transition-colors cursor-pointer">
                    {event.title}
                  </h3>
                </Link>

                {/* Event Type Badge */}
                {event.eventType && (
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium capitalize">
                    {event.eventType.replace('-', ' ')}
                  </div>
                )}

                {/* Description */}
                {event.description && (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {event.description}
                  </p>
                )}

                {/* Event Details */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Lieu :</span>
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.price && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Prix :</span>
                      <span>{event.price}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={`/evenements/${event.slug.current}`}
                  className="inline-block bg-brand text-white px-6 py-3 font-medium hover:bg-brand/90 transition-colors"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {allEvents.length > 2 && (
          <div className="text-center mt-16">
            <Link
              href="/evenements"
              className="inline-block border border-brand text-brand px-8 py-3 font-medium hover:bg-brand hover:text-white transition-colors"
            >
              Voir tous les événements
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
