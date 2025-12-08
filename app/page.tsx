import { cacheLife } from "next/cache";
import EventCard from "./components/EventCard";
import ExploreBtn from "./components/ExploreBtn";
import { events as staticEvents } from "@/lib/constants";





const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  'use cache';
  cacheLife('hours')
  // Start with static demo events
  let events = [...staticEvents];

  try {
    if (BASE_URL) {
      const response = await fetch("/api/events", { cache: "no-store" });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.events) && data.events.length > 0) {
          // Combine DB events with static demo events
          events = [...data.events, ...staticEvents];
        }
      }
    }
  } catch (error) {
    // If the API call fails, we gracefully fall back to staticEvents only
    console.error("Failed to fetch events from API, using static fallback.", error);
  }

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events list-none p-0 m-0">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
