"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";
import { SpecialTitle } from "../ui/SpecialTitle";
import styles from "./home-carousel.module.css";

// Données d'exemple pour les expositions
const exhibitions = [
  {
    id: 1,
    title: "Contes Merveilleux de l'Enfance",
    subtitle: "Les Histoires Perdues",
    date: "8 JAN 2025 - 10 MAR 2025",
    image: "/une-89-889x1170-1.jpg.webp",
    slug: "contes-merveilleux-enfance",
  },
  {
    id: 2,
    title: "Fables Modernes",
    subtitle: "L'Art de la Narration",
    date: "15 MAR 2025",
    image: "/une-89-889x1170-1.jpg.webp",
    slug: "fables-modernes",
  },
  {
    id: 3,
    title: "Légendes Urbaines",
    subtitle: "Mythes Contemporains",
    date: "22 MAR 2025",
    image: "/une-89-889x1170-1.jpg.webp",
    slug: "legendes-urbaines",
  },
  {
    id: 4,
    title: "Récits de l'Imaginaire",
    subtitle: "Voyages Fantastiques",
    date: "5 AVR 2025",
    image: "/une-89-889x1170-1.jpg.webp",
    slug: "recits-imaginaire",
  },
  {
    id: 5,
    title: "Histoires Interactives",
    subtitle: "L'Avenir du Récit",
    date: "12 AVR 2025",
    image: "/une-89-889x1170-1.jpg.webp",
    slug: "histoires-interactives",
  },
];

export default function HomeCarousel() {
  const splideOptions = {
    type: "loop" as const,
    perPage: 4,
    perMove: 1,
    gap: "2rem",
    padding: { left: "2rem", right: "2rem" },
    arrows: true,
    pagination: false,
    autoplay: false,
    speed: 1400,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    breakpoints: {
      1200: { perPage: 3, gap: "1.5rem" },
      768: { perPage: 2, gap: "1rem" },
      640: {
        perPage: 1,
        gap: "1rem",
        padding: { left: "1rem", right: "1rem" },
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Titre centré avec ligne dorée */}
        <div className="text-center mb-16">
          <SpecialTitle
            level="h2"
            align="center"
            lineHeight="lg"
            className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 uppercase"
          >
            Exhibitions
          </SpecialTitle>
        </div>

        {/* Carousel Splide */}
        <div className="relative pt-34 pb-20">
          <Splide
            options={splideOptions}
            className={styles.exhibitionsCarousel}
          >
            {exhibitions.map((exhibition) => (
              <SplideSlide key={exhibition.id}>
                <Link
                  href={`/exhibitions/${exhibition.slug}`}
                  className="group"
                >
                  <div className=" overflow-hidden transition-all duration-300">
                    {/* Image de l'exposition */}
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <Image
                        src={exhibition.image}
                        alt={exhibition.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={exhibition.id === 1}
                        loading={exhibition.id === 1 ? "eager" : "lazy"}
                      />
                      {/* Overlay au hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:text-brand transition-colors duration-300">
                        {exhibition.title}
                      </h3>
                      {exhibition.subtitle && (
                        <p className="text-sm text-gray-600 mb-3 italic">
                          {exhibition.subtitle}
                        </p>
                      )}
                      <div className="text-sm text-brand font-medium tracking-wide">
                        {exhibition.date}
                      </div>
                    </div>
                  </div>
                </Link>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
}
