import { Event } from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    if (!event) {
      return [];
    }

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch {
    return [];
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    await connectDB();

    const normalizedSlug = slug.trim().toLowerCase();
    if (!normalizedSlug) return null;

    const event = await Event.findOne({ slug: normalizedSlug }).lean();
    return event;
  } catch {
    return null;
  }
};
