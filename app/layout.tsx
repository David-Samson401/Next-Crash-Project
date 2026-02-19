import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbar from "./components/Navbar";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevEvents - Developer Conferences, Meetups & Hackathons",
    template: "%s | DevEvents",
  },
  description:
    "Discover and book the best developer events worldwide. From tech conferences and coding meetups to hackathons and workshops - find your next event on DevEvents.",
  keywords: [
    "developer events",
    "tech conferences",
    "coding meetups",
    "hackathons",
    "programming workshops",
    "software development",
  ],
  authors: [{ name: "DevEvents" }],
  openGraph: {
    title: "DevEvents - Developer Conferences, Meetups & Hackathons",
    description:
      "Discover and book the best developer events worldwide. Conferences, meetups, hackathons, and workshops all in one place.",
    type: "website",
    locale: "en_US",
    siteName: "DevEvents",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevEvents - Developer Conferences, Meetups & Hackathons",
    description:
      "Discover and book the best developer events worldwide. Conferences, meetups, hackathons, and workshops all in one place.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} antialiased`}
      >
        <Navbar />

        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#00ffff"
            raysSpeed={1.0}
            lightSpread={1.2}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0.1}
            distortion={0.01}
            className="custom-rays"
          />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
