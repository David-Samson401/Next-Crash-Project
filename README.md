# DevEvents - Developer Events Platform

<div align="center">

![DevEvents Banner](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop)

**Discover, Create, and Book Developer Events Worldwide**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://next-crash-project-7cls.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

[Live Demo](https://next-crash-project-7cls.vercel.app/) • [Report Bug](https://github.com/David-Samson401/Next-Crash-Project/issues) • [Request Feature](https://github.com/David-Samson401/Next-Crash-Project/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**DevEvents** is a full-stack event discovery platform where developers can find, create, and book conferences, meetups, hackathons, and workshops. Built with modern web technologies, it provides a seamless experience for both event organizers and attendees.

### The Problem

Developers often struggle to find relevant tech events scattered across multiple platforms. There's no single source of truth for developer conferences, meetups, and hackathons.

### The Solution

DevEvents aggregates developer events in one place, allowing users to:
- **Discover** upcoming events filtered by type, location, and mode
- **Create** and publish their own events with rich details
- **Book** spots at events with simple email-based registration

---

## ✨ Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Event Discovery** | Browse upcoming developer events (conferences, meetups, hackathons) | ✅ |
| **Event Details** | View full event information including agenda, speakers, location, mode | ✅ |
| **Event Creation** | Create and publish new events with rich content | ✅ |
| **Image Upload** | Cloudinary integration for event cover images | ✅ |
| **Booking System** | Email-based booking with unique confirmation | ✅ |
| **Mode Filtering** | Filter events by In-Person, Virtual, or Hybrid | ✅ |
| **Search** | Search events by title, tags, or location | ✅ |
| **Responsive Design** | Mobile-friendly grid layout | ✅ |
| **Real Data** | Seeded with 10+ real developer events for 2026 | ✅ |
| **SEO Optimized** | OpenGraph & Twitter cards for social sharing | ✅ |
| **Analytics** | PostHog integration for usage tracking | ✅ |
| **E2E Testing** | Comprehensive Cypress test suite | ✅ |

---

## 🛠 Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Database** | MongoDB with Mongoose 8 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui, Lucide Icons |
| **Image Upload** | Cloudinary |
| **Analytics** | PostHog |
| **Testing** | Cypress 15 |
| **Deployment** | Vercel |

</div>

### Key Technical Highlights

- **Server Components** - Leverages React Server Components for optimal performance
- **Server Actions** - Type-safe server mutations without API boilerplate
- **Streaming & Suspense** - Progressive loading with skeleton states
- **Edge Runtime** - Fast response times globally via Vercel Edge
- **Type Safety** - End-to-end TypeScript with strict mode

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/David-Samson401/Next-Crash-Project.git
   cd Next-Crash-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a \`.env.local\` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://your-connection-string
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # PostHog (optional)
   NEXT_PUBLIC_POSTHOG_KEY=your-posthog-key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   
   # App URLs
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
Next-Crash-Project/
├── app/
│   ├── api/
│   │   └── events/
│   │       ├── route.ts          # GET all events, POST create event
│   │       └── [slug]/
│   │           └── route.ts      # GET single event by slug
│   ├── components/
│   │   ├── EventCard.tsx         # Event card component
│   │   ├── ExploreBtn.tsx        # Scroll-to-events button
│   │   ├── LightRays.tsx         # Animated background
│   │   └── Navbar.tsx            # Navigation header
│   ├── events/
│   │   ├── page.tsx              # /events - Events listing
│   │   ├── create/
│   │   │   └── page.tsx          # /events/create - Create event form
│   │   └── [slug]/
│   │       ├── page.tsx          # /events/[slug] - Event details
│   │       └── error.tsx         # Error boundary
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   └── BookEvent.tsx             # Booking form component
├── database/
│   ├── index.ts                  # Model exports
│   ├── event.model.ts            # Event Mongoose schema
│   └── booking.model.ts          # Booking Mongoose schema
├── lib/
│   ├── actions/
│   │   ├── event.actions.ts      # Event server actions
│   │   └── booking.actions.ts    # Booking server actions
│   ├── mongodb.ts                # Database connection
│   ├── utils.ts                  # Utility functions
│   └── constants.ts              # Type definitions
├── cypress/
│   └── e2e/                      # End-to-end tests
│       ├── homepage.cy.ts
│       ├── navigation.cy.ts
│       ├── events-page.cy.ts
│       ├── create-event.cy.ts
│       ├── event-detail.cy.ts
│       ├── booking.cy.ts
│       ├── responsive-a11y.cy.ts
│       └── api.cy.ts
├── public/
│   ├── icons/                    # App icons
│   └── images/                   # Static images
├── scripts/
│   └── seed.ts                   # Database seeding script
└── package.json
```

---

## 🔌 API Routes

### Events API

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`GET\` | \`/api/events\` | Get all events |
| \`POST\` | \`/api/events\` | Create a new event (with image upload) |
| \`GET\` | \`/api/events/[slug]\` | Get a single event by slug |

### Example Response

```json
{
  "message": "Events Fetched",
  "events": [
    {
      "_id": "...",
      "title": "React Conf 2026",
      "slug": "react-conf-2026",
      "description": "The official React conference",
      "image": "https://res.cloudinary.com/...",
      "date": "2026-05-15",
      "time": "09:00 AM - 06:00 PM",
      "location": "Henderson, Nevada, USA",
      "venue": "Henderson Convention Center",
      "mode": "Hybrid",
      "tags": ["react", "javascript", "frontend"],
      "organizer": "Meta"
    }
  ]
}
```

---

## 🗄 Database Schema

### Event Model

```typescript
{
  title: string;          // Event name
  slug: string;           // URL-friendly identifier
  description: string;    // Short description
  overview: string;       // Detailed overview (markdown)
  image: string;          // Cover image URL
  date: string;           // Event date (YYYY-MM-DD)
  time: string;           // Event time/duration
  location: string;       // City, Country
  venue: string;          // Venue name
  mode: 'In-Person' | 'Virtual' | 'Hybrid';
  audience: string;       // Target audience
  organizer: string;      // Organizer name
  tags: string[];         // Event tags
  agenda: string;         // Event schedule
}
```

### Booking Model

```typescript
{
  eventId: ObjectId;      // Reference to Event
  slug: string;           // Event slug
  email: string;          // Attendee email
  createdAt: Date;        // Booking timestamp
}
```

---

## 🧪 Testing

### Run E2E Tests

```bash
# Open Cypress Test Runner (interactive)
npm run cy:open

# Run tests headlessly
npm run cy:run

# Run tests with browser visible
npm run cy:run:headed
```

### Test Coverage

- **Homepage** - Hero section, navigation, events display
- **Navigation** - Routing between pages, navbar consistency
- **Events Page** - Event listing, filtering, empty states
- **Create Event** - Form validation, image upload, submission
- **Event Details** - Event display, booking form
- **Booking Flow** - Email validation, form submission
- **Responsive** - Mobile, tablet, desktop viewports
- **Accessibility** - Heading hierarchy, alt text, focus states
- **API** - GET/POST endpoints, error handling

---

## 🌐 Deployment

The application is deployed on **Vercel** with automatic deployments from the \`main\` branch.

### Live URL
🔗 **[https://next-crash-project-7cls.vercel.app/](https://next-crash-project-7cls.vercel.app/)**

### Environment Variables (Vercel)

Set these in your Vercel project settings:
- \`MONGODB_URI\`
- \`CLOUDINARY_CLOUD_NAME\`
- \`CLOUDINARY_API_KEY\`
- \`CLOUDINARY_API_SECRET\`
- \`NEXT_PUBLIC_POSTHOG_KEY\`
- \`NEXT_PUBLIC_POSTHOG_HOST\`

---

## 🗺 Roadmap

- [x] Event discovery and listing
- [x] Event creation with image upload
- [x] Booking system with email confirmation
- [x] Responsive design
- [x] SEO optimization
- [x] E2E testing with Cypress
- [ ] User authentication (OAuth)
- [ ] Event bookmarking/favorites
- [ ] Email notifications for bookings
- [ ] Event comments/reviews
- [ ] Admin dashboard
- [ ] Calendar integration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**David Samson** - Developer

- GitHub: [@David-Samson401](https://github.com/David-Samson401)
- Project Link: [https://github.com/David-Samson401/Next-Crash-Project](https://github.com/David-Samson401/Next-Crash-Project)
- Live Demo: [https://next-crash-project-7cls.vercel.app/](https://next-crash-project-7cls.vercel.app/)

---

<div align="center">

**⭐ Star this repo if you found it helpful! ⭐**

Made with ❤️ using Next.js, TypeScript, and MongoDB

</div>
