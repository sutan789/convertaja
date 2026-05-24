import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = 'https://convertaja.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "ConvertAja — Konversi PDF, Word, QR Code Online Gratis",
    template: "%s | ConvertAja",
  },
  description:
    "ConvertAja adalah tools online gratis untuk konversi PDF ke Word, Word ke PDF, Merge PDF, Split PDF, kompres PDF, buat QR Code, dan tanda tangan digital. Cepat, aman, tanpa install.",

  keywords: [
    "konversi pdf online",
    "pdf ke word",
    "word ke pdf",
    "merge pdf",
    "split pdf",
    "compress pdf",
    "buat qr code",
    "qr code gratis",
    "tanda tangan digital",
    "image to pdf",
    "tools pdf gratis",
    "convertaja",
    "konversi dokumen online",
  ],

  authors: [{ name: "ConvertAja" }],
  creator: "ConvertAja",
  publisher: "ConvertAja",

  alternates: {
    canonical: BASE_URL,
  },

  verification: {
    google: '07ff977f2182d133',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "ConvertAja",
    title: "ConvertAja — Konversi PDF, Word, QR Code Online Gratis",
    description:
      "Tools online gratis untuk konversi PDF, Word, buat QR Code, dan tanda tangan digital. Cepat, aman, tanpa install aplikasi.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ConvertAja — Tools Konversi File Online Gratis",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ConvertAja — Konversi PDF, Word, QR Code Online Gratis",
    description:
      "Tools online gratis untuk konversi PDF, Word, buat QR Code, dan tanda tangan digital.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
