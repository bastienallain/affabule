"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";
import styles from "./home-carousel.module.css";

// Donn�es d'exemple pour les expositions
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
    title: "L�gendes Urbaines",
    subtitle: "Mythes Contemporains",
    date: "22 MAR 2025",
    image: "/une-89-889x1170-1.jpg.webp",
    slug: "legendes-urbaines",
  },
  {
    id: 4,
    title: "R�cits de l'Imaginaire",
    subtitle: "Voyages Fantastiques",
    date: "5 AVR 2025",
    image: "/une-89-889x1170-1.jpg.webp",
    slug: "recits-imaginaire",
  },
  {
    id: 5,
    title: "Histoires Interactives",
    subtitle: "L'Avenir du R�cit",
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
        {/* Titre centr� avec ligne dor�e */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 uppercase">
            Exhibitions
          </h2>
          <div className="w-12 h-0.5 bg-brand mx-auto"></div>
        </div>

        {/* Carousel Splide */}
        <div className="relative pb-20">
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
                  <div className="bg-white overflow-hidden transition-all duration-300 hover:shadow-xl">
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
