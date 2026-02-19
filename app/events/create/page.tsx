"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CreateEventPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "In-Person",
    audience: "",
    organizer: "",
    tags: "",
    agenda: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = new FormData();

      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "tags" || key === "agenda") {
          // Convert comma-separated strings to JSON arrays
          const items = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
          submitData.append(key, JSON.stringify(items));
        } else {
          submitData.append(key, value);
        }
      });

      // Add image file
      if (imageFile) {
        submitData.append("image", imageFile);
      } else {
        setError("Please select an image for the event");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/events", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/events/${result.event.slug}`);
      } else {
        setError(result.message || "Failed to create event");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mb-10">
        <h1 className="text-4xl mb-2">Create Event</h1>
        <p className="text-light-200">
          Share your event with the developer community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold">
            Event Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            placeholder="e.g., React Conf 2026"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-semibold">
            Short Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={2}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            placeholder="A brief description of your event"
          />
        </div>

        {/* Overview */}
        <div className="flex flex-col gap-2">
          <label htmlFor="overview" className="font-semibold">
            Detailed Overview *
          </label>
          <textarea
            id="overview"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            required
            rows={4}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            placeholder="Detailed information about the event"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="font-semibold">
            Event Image *
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={300}
              height={200}
              className="mt-2 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Venue & Location */}
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="venue" className="font-semibold">
              Venue *
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="bg-dark-200 rounded-[6px] px-5 py-2.5"
              placeholder="e.g., Moscone Center"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="font-semibold">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="bg-dark-200 rounded-[6px] px-5 py-2.5"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="font-semibold">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="font-semibold">
              Time *
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            />
          </div>
        </div>

        {/* Mode & Audience */}
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="mode" className="font-semibold">
              Event Mode *
            </label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
              className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            >
              <option value="In-Person">In-Person</option>
              <option value="Virtual">Virtual</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="audience" className="font-semibold">
              Target Audience *
            </label>
            <input
              type="text"
              id="audience"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              required
              className="bg-dark-200 rounded-[6px] px-5 py-2.5"
              placeholder="e.g., Frontend developers"
            />
          </div>
        </div>

        {/* Organizer */}
        <div className="flex flex-col gap-2">
          <label htmlFor="organizer" className="font-semibold">
            Organizer *
          </label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            placeholder="e.g., Your company or name"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="font-semibold">
            Tags * (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            placeholder="e.g., React, JavaScript, Frontend"
          />
        </div>

        {/* Agenda */}
        <div className="flex flex-col gap-2">
          <label htmlFor="agenda" className="font-semibold">
            Agenda * (comma-separated items)
          </label>
          <textarea
            id="agenda"
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            required
            rows={3}
            className="bg-dark-200 rounded-[6px] px-5 py-2.5"
            placeholder="e.g., 09:00 AM - Registration, 10:00 AM - Keynote, 12:00 PM - Lunch"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 w-full cursor-pointer rounded-[6px] px-6 py-3 text-lg font-semibold text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </section>
  );
};

export default CreateEventPage;
