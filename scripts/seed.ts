import { config } from "dotenv";
import mongoose from "mongoose";
import { Event } from "../database/event.model";

// Skip seed script in production (Vercel builds)
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  console.log("Seed script skipped in production environment");
  process.exit(0);
}

// Load environment variables from .env.local (Next.js convention)
config({ path: ".env.local" });

// Direct MongoDB connection for seeding (bypasses Next.js env loading)
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "MONGODB_URI environment variable is not defined. Make sure you have a .env.local file with MONGODB_URI set.",
  );
  process.exit(1);
}

// Type assertion after the check - we know MONGODB_URI is defined here
const mongoUri: string = MONGODB_URI;

async function connectForSeed(): Promise<typeof mongoose> {
  return mongoose.connect(mongoUri);
}

const seedEvents = [
  {
    title: "React Conf 2026",
    slug: "react-conf-2026",
    description:
      "The official React conference hosted by the React team. Join thousands of developers to learn about the latest in React, React Native, and the future of UI development.",
    overview:
      "React Conf 2025 brings together the global React community for two days of talks, workshops, and networking. Learn directly from the React core team about upcoming features, best practices, and the future roadmap. Whether you're a beginner or an expert, there's something for everyone.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    venue: "Mandalay Bay Convention Center",
    location: "Las Vegas, NV, USA",
    date: "2026-05-15",
    time: "09:00",
    mode: "In-Person",
    audience: "React developers, Frontend engineers, Full-stack developers",
    agenda: [
      "09:00 AM - Keynote: The Future of React",
      "10:30 AM - React Server Components Deep Dive",
      "12:00 PM - Lunch & Networking",
      "01:30 PM - Building Accessible React Applications",
      "03:00 PM - React Native: What's New",
      "04:30 PM - Community Lightning Talks",
      "06:00 PM - Day 1 Closing & Social Event",
    ],
    organizer: "Meta React Team",
    tags: ["React", "JavaScript", "Frontend", "Web Development", "Meta"],
  },
  {
    title: "CityJS London 2026",
    slug: "cityjs-london-2026",
    description:
      "The UK's premier JavaScript conference returns to London with world-class speakers, workshops, and the vibrant JS community.",
    overview:
      "CityJS London is a two-day JavaScript conference featuring talks from industry leaders, hands-on workshops, and plenty of opportunities to connect with fellow developers. Held in the heart of London, this event covers everything from vanilla JS to the latest frameworks.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    venue: "The Brewery",
    location: "London, UK",
    date: "2026-06-12",
    time: "08:30",
    mode: "Hybrid",
    audience: "JavaScript developers, Web developers, Tech leads",
    agenda: [
      "08:30 AM - Registration & Breakfast",
      "09:30 AM - Opening Keynote: JavaScript in 2026",
      "11:00 AM - TypeScript 6.0 Features",
      "12:30 PM - Lunch Break",
      "02:00 PM - Building with Deno 2.0",
      "03:30 PM - Web Performance Masterclass",
      "05:00 PM - Panel: The Future of Web Standards",
      "06:30 PM - Networking Reception",
    ],
    organizer: "CityJS Foundation",
    tags: ["JavaScript", "TypeScript", "Web", "Node.js", "London"],
  },
  {
    title: "JSNation 2026",
    slug: "jsnation-2026",
    description:
      "The biggest JavaScript conference in the cloud and Amsterdam. Two days of cutting-edge JS content from the world's best speakers.",
    overview:
      "JSNation is a premier JavaScript conference that brings together thousands of JS developers from around the world. With both in-person and remote attendance options, you'll experience world-class talks on React, Vue, Angular, Node.js, and emerging JavaScript technologies.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    venue: "Theater Amsterdam",
    location: "Amsterdam, Netherlands",
    date: "2026-06-09",
    time: "09:00",
    mode: "Hybrid",
    audience:
      "JavaScript developers, Frontend architects, Full-stack engineers",
    agenda: [
      "09:00 AM - Conference Opening",
      "09:30 AM - Keynote: JavaScript State of the Union",
      "10:45 AM - Micro-Frontends at Scale",
      "12:00 PM - Lunch & Expo Hall",
      "01:30 PM - AI-Powered Development Tools",
      "02:45 PM - Edge Computing with JavaScript",
      "04:00 PM - Framework Panel Discussion",
      "05:30 PM - Closing Remarks & Party",
    ],
    organizer: "GitNation",
    tags: ["JavaScript", "Node.js", "React", "Vue", "Amsterdam"],
  },
  {
    title: "AWS re:Invent 2026",
    slug: "aws-reinvent-2026",
    description:
      "The world's largest cloud computing conference. Join 50,000+ attendees for a week of learning, building, and connecting with the AWS community.",
    overview:
      "AWS re:Invent is the premier cloud computing event of the year. With over 2,000 sessions, hands-on labs, hackathons, and keynotes from AWS leadership, this is your opportunity to level up your cloud skills and discover what's next for AWS services.",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    venue: "The Venetian & Multiple Las Vegas Venues",
    location: "Las Vegas, NV, USA",
    date: "2026-11-30",
    time: "08:00",
    mode: "In-Person",
    audience: "Cloud architects, DevOps engineers, Developers, IT leaders",
    agenda: [
      "08:00 AM - Registration & Certification Lounge Opens",
      "10:00 AM - Monday Night Live Keynote",
      "Full Day - Breakout Sessions & Workshops",
      "Full Day - Hands-on Labs & Builder Sessions",
      "Evening - re:Play Concert & Networking",
      "Final Day - Recap & Closing Keynote",
    ],
    organizer: "Amazon Web Services",
    tags: ["AWS", "Cloud", "DevOps", "Serverless", "Infrastructure"],
  },
  {
    title: "GraphQL Conf 2026",
    slug: "graphql-conf-2026",
    description:
      "The official GraphQL Foundation conference. Learn from the creators and maintainers of GraphQL about the latest developments in the ecosystem.",
    overview:
      "GraphQL Conf brings together the global GraphQL community for two days of learning, collaboration, and innovation. Hear from the teams at Meta, Apollo, Hasura, and more about production best practices, federation, and the future of API development.",
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&h=600&fit=crop",
    venue: "Moscone Center West",
    location: "San Francisco, CA, USA",
    date: "2026-09-18",
    time: "09:00",
    mode: "Hybrid",
    audience: "API developers, Backend engineers, Full-stack developers",
    agenda: [
      "09:00 AM - Opening Keynote: GraphQL 2025 and Beyond",
      "10:15 AM - GraphQL Federation 3.0",
      "11:30 AM - Real-time Subscriptions at Scale",
      "12:30 PM - Lunch & Sponsor Expo",
      "02:00 PM - GraphQL Security Best Practices",
      "03:15 PM - Type-Safe APIs with GraphQL & TypeScript",
      "04:30 PM - Lightning Talks",
      "06:00 PM - Community Social",
    ],
    organizer: "GraphQL Foundation",
    tags: ["GraphQL", "API", "Backend", "Federation", "TypeScript"],
  },
  {
    title: "DevOpsDays Chicago 2026",
    slug: "devopsdays-chicago-2026",
    description:
      "A community-run conference covering topics of software development, IT infrastructure operations, and the intersection between them.",
    overview:
      "DevOpsDays Chicago is part of the global DevOpsDays series, bringing together practitioners to share experiences and learn from each other. Expect talks on CI/CD, platform engineering, SRE practices, and building healthy engineering cultures.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    venue: "UIC Forum",
    location: "Chicago, IL, USA",
    date: "2026-08-25",
    time: "08:30",
    mode: "In-Person",
    audience:
      "DevOps engineers, SREs, Platform engineers, Engineering managers",
    agenda: [
      "08:30 AM - Registration & Breakfast",
      "09:30 AM - Opening Keynote: DevOps in the Age of AI",
      "10:30 AM - Platform Engineering Done Right",
      "11:30 AM - Ignite Talks",
      "12:30 PM - Lunch",
      "01:30 PM - Open Spaces",
      "03:00 PM - SRE Lessons from Production Incidents",
      "04:00 PM - Closing & Happy Hour",
    ],
    organizer: "DevOpsDays Chicago Organizers",
    tags: ["DevOps", "SRE", "Platform Engineering", "CI/CD", "Chicago"],
  },
  {
    title: "React Native EU 2026",
    slug: "react-native-eu-2026",
    description:
      "Europe's largest React Native conference. Join mobile developers from across the globe for two days of talks, workshops, and networking in Warsaw.",
    overview:
      "React Native EU brings together the React Native community for an unforgettable experience in Warsaw, Poland. Learn from core contributors, industry experts, and fellow developers about building world-class mobile applications with React Native.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    venue: "Golden Tulip Warsaw Centre",
    location: "Warsaw, Poland",
    date: "2026-09-04",
    time: "09:00",
    mode: "Hybrid",
    audience:
      "Mobile developers, React Native developers, Cross-platform engineers",
    agenda: [
      "09:00 AM - Registration & Welcome Coffee",
      "10:00 AM - Keynote: The Future of React Native",
      "11:15 AM - New Architecture Deep Dive",
      "12:30 PM - Lunch & Networking",
      "02:00 PM - Building Performant Animations",
      "03:15 PM - Testing React Native Apps at Scale",
      "04:30 PM - Panel: Cross-Platform Development in 2026",
      "06:00 PM - Community Dinner",
    ],
    organizer: "Callstack",
    tags: ["React Native", "Mobile", "Cross-Platform", "JavaScript", "Poland"],
  },
  {
    title: "Next.js Meetup SF",
    slug: "nextjs-meetup-sf-2026",
    description:
      "Monthly Next.js developer meetup in San Francisco. Join local developers to share projects, learn new techniques, and network with the Next.js community.",
    overview:
      "The Next.js Meetup SF is a monthly gathering for developers working with Next.js and the React ecosystem. Each month features lightning talks from community members, live coding sessions, and plenty of time for networking and Q&A.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    venue: "Vercel HQ",
    location: "San Francisco, CA, USA",
    date: "2026-03-20",
    time: "18:30",
    mode: "In-Person",
    audience: "Next.js developers, React developers, Frontend engineers",
    agenda: [
      "06:30 PM - Doors Open & Networking",
      "07:00 PM - Welcome & Announcements",
      "07:15 PM - Talk 1: App Router Best Practices",
      "07:45 PM - Talk 2: Server Actions in Production",
      "08:15 PM - Lightning Talks & Q&A",
      "08:45 PM - Networking & Refreshments",
      "09:30 PM - Close",
    ],
    organizer: "Vercel Community Team",
    tags: ["Next.js", "React", "Vercel", "San Francisco", "Meetup"],
  },
  {
    title: "Svelte Summit 2026",
    slug: "svelte-summit-2026",
    description:
      "The premier virtual conference for the Svelte community. Free to attend, featuring talks from Svelte core team members and community experts.",
    overview:
      "Svelte Summit is the largest gathering of Svelte developers worldwide. This virtual conference features talks on Svelte, SvelteKit, and the broader ecosystem. Learn about the latest features, best practices, and what's coming next for this beloved framework.",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
    venue: "Virtual Event",
    location: "Virtual / Online",
    date: "2026-04-15",
    time: "10:00",
    mode: "Virtual",
    audience: "Svelte developers, Frontend developers, JavaScript enthusiasts",
    agenda: [
      "10:00 AM UTC - Opening Keynote: State of Svelte",
      "10:45 AM UTC - SvelteKit 3.0 Deep Dive",
      "11:30 AM UTC - Break",
      "12:00 PM UTC - Building Design Systems with Svelte",
      "12:45 PM UTC - Svelte 5 Runes in Practice",
      "01:30 PM UTC - Community Showcase",
      "02:15 PM UTC - Closing Keynote & Q&A",
    ],
    organizer: "Svelte Society",
    tags: ["Svelte", "SvelteKit", "JavaScript", "Frontend", "Virtual"],
  },
  {
    title: "TypeScript Congress 2026",
    slug: "typescript-congress-2026",
    description:
      "The largest TypeScript-focused conference. A virtual event bringing together TypeScript experts from around the world.",
    overview:
      "TypeScript Congress is a two-day virtual conference dedicated to TypeScript and its ecosystem. Learn from core team members, library authors, and practitioners about advanced types, tooling, and building type-safe applications at scale.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    venue: "Virtual Event",
    location: "Virtual / Online",
    date: "2026-05-08",
    time: "09:00",
    mode: "Virtual",
    audience: "TypeScript developers, JavaScript developers, Backend engineers",
    agenda: [
      "09:00 AM UTC - Welcome & TypeScript Roadmap",
      "09:45 AM UTC - Advanced Type Patterns",
      "10:30 AM UTC - Break",
      "11:00 AM UTC - Type-Safe APIs with tRPC",
      "11:45 AM UTC - TypeScript Performance Optimization",
      "12:30 PM UTC - Lunch Break",
      "01:30 PM UTC - Building Type-Safe ORMs",
      "02:15 PM UTC - Panel: Future of TypeScript",
      "03:00 PM UTC - Closing Remarks",
    ],
    organizer: "GitNation",
    tags: ["TypeScript", "JavaScript", "Types", "Backend", "Virtual"],
  },
];

async function seed() {
  try {
    console.log("🌱 Connecting to database...");
    await connectForSeed();

    console.log("🗑️  Clearing existing events...");
    await Event.deleteMany({});

    console.log("📝 Inserting seed events...");
    const inserted = await Event.insertMany(seedEvents);

    console.log(`✅ Successfully seeded ${inserted.length} events:`);
    inserted.forEach((event) => {
      console.log(`   - ${event.title} (${event.slug})`);
    });

    console.log("\n🎉 Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("📡 Database connection closed.");
  }
}

// Run seed if executed directly
seed();
