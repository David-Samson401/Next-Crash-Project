"use client";

import { useState } from "react";
import { createBooking } from "@/lib/actions/booking.actions";

interface BookEventProps {
  eventId: string;
  slug: string;
}

const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email format
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const result = await createBooking({ eventId, slug, email });

      if (result.success) {
        setSubmitted(true);
        setEmail(""); // Clear form on success
      } else {
        setError("Failed to book event. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <div className="text-center py-4">
          <p className="text-lg text-green-400 font-semibold">
            🎉 You're registered!
          </p>
          <p className="text-sm text-light-200 mt-2">
            Check your email for event details and updates.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null); // Clear error when user types
              }}
              id="email"
              placeholder="Enter your email address"
              disabled={loading}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" className="button-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
