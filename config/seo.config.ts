import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | LE MUSÉE DE L\'AFFABULOSCOPE',
  defaultTitle: 'LE MUSÉE DE L\'AFFABULOSCOPE',
  description: 'Bienvenue au Musée de l\'Affabuloscope - Un lieu unique où les histoires prennent vie',
  canonical: 'https://museeaffabuloscope.fr',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://museeaffabuloscope.fr',
    siteName: 'LE MUSÉE DE L\'AFFABULOSCOPE',
    title: 'LE MUSÉE DE L\'AFFABULOSCOPE',
    description: 'Bienvenue au Musée de l\'Affabuloscope - Un lieu unique où les histoires prennent vie',
    images: [
      {
        url: 'https://museeaffabuloscope.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LE MUSÉE DE L\'AFFABULOSCOPE',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@museeaffabuloscope',
    site: '@museeaffabuloscope',
    cardType: 'summary_large_image',
  },
  robotsProps: {
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#B89D4F',
    },
    {
      property: 'og:locale',
      content: 'fr_FR',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};

export default config;