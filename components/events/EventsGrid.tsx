import { cn } from "@/lib/utils";

interface EventsGridProps {
  className?: string;
}

export const EventsGrid = ({ className }: EventsGridProps) => {
  return (
    <section className={cn("bg-gray-100 py-16", className)}>
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-serif text-black">
          Events & Programs
        </h2>
      </div>

      {/* Event Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-0 items-start">
          {/* Event Image */}
          <div className="relative w-1/2 h-96">
            <img
              src="/une-89-889x1170-1.jpg.webp"
              alt="Peasant Scenes And Landscapes"
              className="w-1/2 h-full object-cover absolute inset-y-0 right-0"
            />
          </div>

          {/* Event Content */}
          <div className="w-1/2 pl-8 space-y-6">
            {/* Date */}
            <div className="flex items-center gap-4">
              <div className="text-brand font-medium text-sm tracking-wider uppercase">
                AUGUST 18
              </div>
              <div className="h-0.5 bg-brand flex-1 max-w-48"></div>
            </div>

            {/* Event Title */}
            <div className="py-4">
              <h3 className="text-3xl md:text-4xl font-serif text-black leading-tight">
                Peasant Scenes And Landscapes
              </h3>
            </div>

            {/* Event Description */}
            <p className="text-black text-base leading-relaxed">
              The exhibition is made possible by the Laura & C. Arnold Douglas
              Foundation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
