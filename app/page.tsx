import Link from "next/link";
import { Suspense } from "react";
import EventCard from "./components/EventCard";
import ExploreBtn from "./components/ExploreBtn";
import { getUpcomingEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/database";

const EventsLoading = () => (
  <div className="events list-none p-0 m-0">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-[400px] bg-dark-200 rounded-lg animate-pulse" />
    ))}
  </div>
);

const EmptyEvents = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <p className="text-light-200 text-lg mb-4">
      No upcoming events at the moment.
    </p>
    <p className="text-light-200 text-sm">
      Check back soon for new developer events!
    </p>
  </div>
);

const UpcomingEventsList = async () => {
  const events = await getUpcomingEvents(6);

  if (!events || events.length === 0) {
    return <EmptyEvents />;
  }

  return (
    <ul className="events list-none p-0 m-0">
      {events.map((event: IEvent) => (
        <li key={event.slug}>
          <EventCard
            title={event.title}
            image={event.image}
            slug={event.slug}
            location={event.location}
            date={event.date}
            time={event.time}
          />
        </li>
      ))}
    </ul>
  );
};

const HomePage = () => {
  return (
    <section>
      <h1 className="text-center">
        Discover Developer Events <br /> You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Conferences, Meetups, Hackathons, and Workshops — All in One Place
      </p>

      <ExploreBtn />

      <div id="events" className="mt-20 space-y-7">
        <div className="flex items-center justify-between">
          <h3>Upcoming Events</h3>
          <Link
            href="/events"
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            View All Events →
          </Link>
        </div>

        <Suspense fallback={<EventsLoading />}>
          <UpcomingEventsList />
        </Suspense>
      </div>
    </section>
  );
};

export default HomePage;
