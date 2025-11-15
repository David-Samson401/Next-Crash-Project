import { Document, Model, Schema, Types, model, models } from 'mongoose';
import { Event, IEventDocument } from './event.model';

// Booking domain type used throughout the app
export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBookingDocument extends IBooking, Document {}

export type IBookingModel = Model<IBookingDocument>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

const BookingSchema = new Schema<IBookingDocument, IBookingModel>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      index: true, // index for faster queries by event
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true, // automatically manage createdAt/updatedAt
  },
);

// Additional index on eventId to explicitly optimize lookup queries
BookingSchema.index({ eventId: 1 });

// Pre-save hook: validate email format and ensure the referenced event exists
BookingSchema.pre('save', async function (next) {
  try {
    const doc = this as IBookingDocument;

    // Validate email presence and format
    if (typeof doc.email !== 'string' || doc.email.trim().length === 0) {
      return next(new Error('Email is required and cannot be empty.'));
    }

    if (!emailRegex.test(doc.email)) {
      return next(new Error('Email format is invalid.'));
    }

    // Ensure we have a valid ObjectId reference
    if (!doc.eventId || !Types.ObjectId.isValid(doc.eventId)) {
      return next(new Error('A valid eventId is required.'));
    }

    // Verify the referenced event exists before saving the booking
    const eventExists = await Event.exists({ _id: doc.eventId });
    if (!eventExists) {
      return next(new Error('Referenced event does not exist.'));
    }

    return next();
  } catch (error) {
    return next(error as Error);
  }
});

export const Booking: IBookingModel =
  (models.Booking as IBookingModel) || model<IBookingDocument, IBookingModel>('Booking', BookingSchema);
