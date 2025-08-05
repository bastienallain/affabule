import Navigation from "@/components/nav/Navigation";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#B89D4F",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://museeaffabuloscope.fr"),
  title: {
    default: "LE MUSÉE DE L'AFFABULOSCOPE",
    template: "%s | LE MUSÉE DE L'AFFABULOSCOPE",
  },
  description:
    "Bienvenue au Musée de l'Affabuloscope - Un lieu unique où les histoires prennent vie",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://museeaffabuloscope.fr",
    siteName: "LE MUSÉE DE L'AFFABULOSCOPE",
    title: "LE MUSÉE DE L'AFFABULOSCOPE",
    description:
      "Bienvenue au Musée de l'Affabuloscope - Un lieu unique où les histoires prennent vie",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LE MUSÉE DE L'AFFABULOSCOPE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@museeaffabuloscope",
    creator: "@museeaffabuloscope",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
