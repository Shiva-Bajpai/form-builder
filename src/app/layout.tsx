import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeerList Forms",
  description: "",
  icons: { icon: "/favicon.ico" },

  // OpenGraph Meta Tags
  openGraph: {
    title: "PeerList Forms",
    description: "Peerlist Frontend Developer Assignment",
    url: "https://frombuilder.vercel.app",
    type: "website",
    siteName: "PeerList Forms", // Add this line for site_name
    images: [
      {
        url: "https://us-east-1.tixte.net/uploads/tanmay111-files.tixte.co/peerlist_logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Vibe",
      },
    ],
  },

  // Twitter Meta Tags
  twitter: {
    card: "summary_large_image",
    site: "@tanmay11117",
    title: "PeerList Forms",
    description: "Peerlist Frontend Developer Assignment",
    images: [
      {
        url: "https://us-east-1.tixte.net/uploads/tanmay111-files.tixte.co/peerlist_logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Vibe",
      },
      {
        url: "https://us-east-1.tixte.net/uploads/tanmay111-files.tixte.co/peerlist_logo.jpeg",
        width: 800,
        height: 600,
        alt: "",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
