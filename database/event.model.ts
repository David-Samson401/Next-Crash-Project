// import { Document, Model, Schema, model, models } from "mongoose";

// // Event domain type used throughout the app
// export interface IEvent {
//   title: string;
//   slug: string;
//   description: string;
//   overview: string;
//   image: string;
//   venue: string;
//   location: string;
//   date: string; // Stored as normalized ISO date (YYYY-MM-DD)
//   time: string; // Stored as normalized 24h time (HH:mm)
//   mode: string;
//   audience: string;
//   agenda: string[];
//   organizer: string;
//   tags: string[];
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface IEventDocument extends IEvent, Document {}

// export type IEventModel = Model<IEventDocument>;

// // Helper to generate URL-friendly slugs from titles
// const slugify = (input: string): string => {
//   return input
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumerics with hyphen
//     .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
// };

// const EventSchema = new Schema<IEventDocument, IEventModel>(
//   {
//     title: { type: String, required: true, trim: true },
//     slug: { type: String, required: true, unique: true },
//     description: { type: String, required: true, trim: true },
//     overview: { type: String, required: true, trim: true },
//     image: { type: String, required: true, trim: true },
//     venue: { type: String, required: true, trim: true },
//     location: { type: String, required: true, trim: true },
//     date: { type: String, required: true, trim: true },
//     time: { type: String, required: true, trim: true },
//     mode: { type: String, required: true, trim: true },
//     audience: { type: String, required: true, trim: true },
//     agenda: {
//       type: [String],
//       required: true,
//       validate: {
//         validator: (value: unknown): boolean => {
//           return (
//             Array.isArray(value) &&
//             value.length > 0 &&
//             value.every(
//               (item) => typeof item === "string" && item.trim().length > 0
//             )
//           );
//         },
//         message: "Agenda must be a non-empty array of non-empty strings.",
//       },
//     },
//     organizer: { type: String, required: true, trim: true },
//     tags: {
//       type: [String],
//       required: true,
//       validate: {
//         validator: (value: unknown): boolean => {
//           return (
//             Array.isArray(value) &&
//             value.length > 0 &&
//             value.every(
//               (item) => typeof item === "string" && item.trim().length > 0
//             )
//           );
//         },
//         message: "Tags must be a non-empty array of non-empty strings.",
//       },
//     },
//   },
//   {
//     timestamps: true, // automatically manage createdAt/updatedAt
//   }
// );

// // Unique index ensures slug collisions fail fast at the database level
// EventSchema.index({ slug: 1 }, { unique: true });

// // Pre-save hook: generate slug, normalize date/time, and validate required fields
// EventSchema.pre("save", function (next) {
//   try {
//     const doc = this as IEventDocument;

//     // Validate required string fields are present and non-empty
//     const requiredStringFields: (keyof IEvent)[] = [
//       "title",
//       "description",
//       "overview",
//       "image",
//       "venue",
//       "location",
//       "date",
//       "time",
//       "mode",
//       "audience",
//       "organizer",
//     ];

//     for (const field of requiredStringFields) {
//       const value = doc[field];
//       if (typeof value !== "string" || value.trim().length === 0) {
//         return next(
//           new Error(`Field "${String(field)}" is required and cannot be empty.`)
//         );
//       }
//     }

//     // Basic presence validation for agenda and tags (schema-level validators handle structure)
//     if (!Array.isArray(doc.agenda) || doc.agenda.length === 0) {
//       return next(new Error("Agenda is required and cannot be empty."));
//     }

//     if (!Array.isArray(doc.tags) || doc.tags.length === 0) {
//       return next(new Error("Tags are required and cannot be empty."));
//     }

//     // Normalize and validate date to ISO format (YYYY-MM-DD)
//     const parsedDate = new Date(doc.date);
//     if (Number.isNaN(parsedDate.getTime())) {
//       return next(new Error("Invalid event date.")); // invalid date string
//     }
//     doc.date = parsedDate.toISOString().split("T")[0];

//     // Normalize and validate time to 24h HH:mm format
//     const timeInput = doc.time.trim();
//     const match = /^([0-9]{1,2}):([0-9]{1,2})$/u.exec(timeInput);
//     if (!match) {
//       return next(
//         new Error("Invalid event time. Expected HH:mm (24h) format.")
//       );
//     }

//     const hours = Number.parseInt(match[1], 10);
//     const minutes = Number.parseInt(match[2], 10);
//     if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
//       return next(
//         new Error("Invalid event time. Hours must be 0-23 and minutes 0-59.")
//       );
//     }

//     doc.time = `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}`;

//     // Only regenerate slug if the title changed or slug is missing
//     if (doc.isNew || doc.isModified("title") || !doc.slug) {
//       doc.slug = slugify(doc.title);
//     }

//     return next();
//   } catch (error) {
//     return next(error as Error);
//   }
// });

// export const Event: IEventModel =
//   (models.Event as IEventModel) ||
//   model<IEventDocument, IEventModel>("Event", EventSchema);

import {
  Document,
  Model,
  MongooseError,
  Schema,
  model,
  models,
} from "mongoose";
import { MongoServerError } from "mongodb";
/**
 * EVENT TYPES
 */
export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm 24h
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEventDocument extends IEvent, Document {}

export type IEventModel = Model<IEventDocument>;

/**
 * SLUGIFY UTILITY
 */
const slugify = (input: string): string => {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * EVENT SCHEMA
 */
const EventSchema = new Schema<IEventDocument, IEventModel>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true }, // no index duplication
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true }, // will be validated
    time: { type: String, required: true, trim: true }, // will be validated
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value): boolean =>
          Array.isArray(value) &&
          value.length > 0 &&
          value.every((i) => typeof i === "string" && i.trim().length > 0),
        message: "Agenda must be a non-empty array of non-empty strings.",
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value): boolean =>
          Array.isArray(value) &&
          value.length > 0 &&
          value.every((i) => typeof i === "string" && i.trim().length > 0),
        message: "Tags must be a non-empty array of non-empty strings.",
      },
    },
  },
  { timestamps: true }
);

/**
 * PRE-SAVE HOOK
 */
EventSchema.pre("save", function (next) {
  try {
    const doc = this as IEventDocument;

    // Generate slug if new or title changed
    if (doc.isNew || doc.isModified("title") || !doc.slug) {
      doc.slug = slugify(doc.title);
    }

    // Validate strict YYYY-MM-DD date format and actual date validity
    if (typeof doc.date !== "string" || doc.date.trim() === "") {
      return next(new Error("Invalid date format. Expected YYYY-MM-DD."));
    }

    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const dateMatch = dateRegex.exec(doc.date);
    if (!dateMatch) {
      return next(new Error("Invalid date format. Expected YYYY-MM-DD."));
    }

    const year = parseInt(dateMatch[1], 10);
    const month = parseInt(dateMatch[2], 10);
    const day = parseInt(dateMatch[3], 10);

    // Validate month range (1-12)
    if (month < 1 || month > 12) {
      return next(new Error("Invalid date format. Expected YYYY-MM-DD."));
    }

    // Construct a Date object and verify no overflow
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return next(new Error("Invalid date format. Expected YYYY-MM-DD."));
    }

    // Validate HH:mm 24h format
    const timeMatch = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(doc.time);
    if (!timeMatch)
      return next(new Error("Invalid time. Expected HH:mm (24h)."));

    return next();
  } catch (err) {
    return next(err as Error);
  }
});

/**
 * 🛡️ HANDLE DUPLICATE SLUG (AUTO-INCREMENT RETRY)
 */

EventSchema.post(
  "save",
  async function (
    error: MongooseError | null,
    doc: IEventDocument,
    next: (err?: Error) => void
  ) {
    if (error && "code" in error && error.code === 11000) {
      // Use MongoServerError type to access keyValue safely

      const keyValue = (error as MongoServerError).keyValue;
      if (keyValue?.slug) {
        const baseSlug = slugify(doc.title);
        let counter = 1;
        let newSlug = `${baseSlug}-${counter}`;

        // Keep increasing until unique
        const Event = model<IEventDocument>("Event");
        while (await Event.exists({ slug: newSlug })) {
          newSlug = `${baseSlug}-${++counter}`;
        }

        // Update document safely
        doc.slug = newSlug;
        await doc.save(); // retry save
        return next();
      }
      return next(error);
    }
    return next();
  }
);

/**
 * EXPORT MODEL
 */
export const Event: IEventModel =
  (models.Event as IEventModel) ||
  model<IEventDocument, IEventModel>("Event", EventSchema);
