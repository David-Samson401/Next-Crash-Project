import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database/event.model";

// Cloudinary config (required for deployment)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Helper: Convert Web ReadableStream → Buffer
async function streamToBuffer(stream: ReadableStream) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Convert non-file fields into an object
    let event: any = {};
    try {
      event = Object.fromEntries(formData.entries());
    } catch {
      return NextResponse.json(
        { message: "Invalid form-data format" },
        { status: 400 },
      );
    }

    // File must exist
    const file = formData.get("image") as unknown as File;
    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    const tagsString = formData.get("tags") as string | null;
    const agendaString = formData.get("agenda") as string | null;

    if (!tagsString || !agendaString) {
      return NextResponse.json(
        { message: "tags and agenda fields are required" },
        { status: 400 },
      );
    }

    let tags: any;
    let agenda: any;
    try {
      tags = JSON.parse(tagsString);
      agenda = JSON.parse(agendaString);
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON in tags or agenda" },
        { status: 400 },
      );
    }

    // Convert image stream to Buffer (FIXED)
    const buffer = await streamToBuffer(file.stream());

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvents" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });

    // Add Cloudinary URL to event
    event.image = (uploadResult as any).secure_url;

    // Generate a simple slug from the title (required by Event schema)
    if (!event.slug && event.title) {
      const baseSlug = slugify(event.title, {
        lower: true,
        strict: true,
        locale: "en",
      });

      // Ensure non-empty slug
      if (!baseSlug) {
        event.slug = `event-${Date.now()}`;
      } else {
        // Check for uniqueness and append timestamp if needed
        const existingEvent = await Event.findOne({ slug: baseSlug });
        event.slug = existingEvent ? `${baseSlug}-${Date.now()}` : baseSlug;
      }
    }

    // Save event
    const createdEvent = await Event.create({
      ...event,
      tags,
      agenda,
    });

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (e: any) {
    console.error("Server Error:", e);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e?.message || "Unknown server error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 },
    );
  } catch (e: any) {
    console.error("Server Error:", e);
    return NextResponse.json(
      {
        message: "Event fetching failed",
        error: e?.message || "Unknown server error",
      },
      { status: 500 },
    );
  }
}
