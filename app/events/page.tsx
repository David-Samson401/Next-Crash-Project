import { Suspense } from "react";
import Link from "next/link";
import EventCard from "@/app/components/EventCard";
import { getAllEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/database";

const EventsLoading = () => (
  <div className="events list-none p-0 m-0">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="h-[400px] bg-dark-200 rounded-lg animate-pulse" />
    ))}
  </div>
);

const EmptyEvents = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <p className="text-light-200 text-lg mb-4">No events found.</p>
    <p className="text-light-200 text-sm mb-6">
      Be the first to create an event!
    </p>
    <Link
      href="/events/create"
      className="bg-primary hover:bg-primary/90 rounded-[6px] px-6 py-3 text-lg font-semibold text-black transition-colors"
    >
      Create Event
    </Link>
  </div>
);

const EventsList = async () => {
  const events = await getAllEvents();

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

const EventsPage = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl mb-2">All Events</h1>
          <p className="text-light-200">
            Discover developer events happening around the world
          </p>
        </div>
        <Link
          href="/events/create"
          className="bg-primary hover:bg-primary/90 rounded-[6px] px-6 py-3 text-lg font-semibold text-black transition-colors max-sm:hidden"
        >
          Create Event
        </Link>
      </div>

      <Suspense fallback={<EventsLoading />}>
        <EventsList />
      </Suspense>
    </section>
  );
};

export default EventsPage;
