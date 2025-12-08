import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { getSimilarEventsBySlug, getEventBySlug } from "@/lib/actions/event.actions";
import { IEvent } from "@/database";
import EventCard from "@/app/components/EventCard";
import { Suspense } from "react";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex-row gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsContent = async ({ slug }: { slug: string }) => {
  const event = await getEventBySlug(slug);

  if (!event) {
    return notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    audience,
    agenda,
    organizer,
    tags,
  } = event;

  if (!image || !overview || !date || !time || !location || !mode || !audience || !agenda || !organizer || !tags) {
    return notFound();
  }

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>
      <div className="details">
        {/*Left Side - Event Content*/}
<div className="content">
{image && (
  <Image
    src={image}
    alt="Event Banner"
    width={800}
    height={800}
    className="banner"
  />
)}

  <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="Calendar"
              label={date}
            />

            <EventDetailItem icon="/icons/clock.svg" alt="time" label={time} />

            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />

            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          {Array.isArray(agenda) && <EventAgenda agendaItems={agenda} />}

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          {Array.isArray(tags) && <EventTags tags={tags} />}
        </div>
        {/*Right Side - Booking Form*/}

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
                <p className="text-sm">be the first to book your spot!</p>
            )}

            <BookEvent />
          </div>
        </aside>

      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent, index: number) => (
            <EventCard key={index} {...similarEvent} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <Suspense fallback={<section id="event"><p>Loading event...</p></section>}>
      <EventDetailsContent slug={slug} />
    </Suspense>
  );
};

export default EventDetailsPage;
