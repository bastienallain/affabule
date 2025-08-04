declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode } from 'react';

  export interface SplideOptions {
    type?: 'slide' | 'loop' | 'fade';
    perPage?: number;
    perMove?: number;
    gap?: string | number;
    padding?: { left?: string | number; right?: string | number };
    arrows?: boolean;
    pagination?: boolean;
    autoplay?: boolean;
    interval?: number;
    speed?: number;
    easing?: string;
    breakpoints?: {
      [key: number]: Partial<SplideOptions>;
    };
    [key: string]: any;
  }

  export interface SplideProps {
    options?: SplideOptions;
    className?: string;
    children?: ReactNode;
  }

  export interface SplideSlideProps {
    children?: ReactNode;
    className?: string;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}

declare module '@splidejs/react-splide/css' {
  // CSS module
}