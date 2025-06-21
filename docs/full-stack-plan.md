# Sports Hub: Full-Stack Development Plan

This document outlines a high-level architecture and implementation approach for a modern sports facility booking and management platform. The stack includes React, TypeScript, Tailwind CSS, Zustand, Vite, Supabase, MySQL, and Framer Motion.

## 1. Project Structure

```
|-- public/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- layouts/
|   |-- stores/
|   |-- services/
|   |-- hooks/
|   |-- translations/
|-- supabase/
|-- docs/
```

* React + Vite for the frontend
* Supabase for authentication and API routing
* MySQL as the primary relational database (can be connected via Supabase edge functions or a separate API layer)
* Zustand for global state management
* Tailwind CSS for theming and responsive design

## 2. Database Schema (MySQL)

```sql
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  activity_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  capacity INT,
  FOREIGN KEY (activity_id) REFERENCES activities(id)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  facility_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  FOREIGN KEY (facility_id) REFERENCES facilities(id)
);
```

Supabase can manage authentication (users table) while MySQL stores domain-specific data. An API layer (Supabase Edge Functions or an Express server) would mediate queries.

## 3. Example React Component

```tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useBookingStore } from '@/stores/useBookingStore';

export default function BookingCard({ booking }) {
  const { t } = useTranslation();
  const cancel = useBookingStore((s) => s.cancelBooking);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-lg shadow bg-white dark:bg-gray-800"
    >
      <h3 className="text-lg font-semibold mb-2">
        {t('booking.activity')}: {booking.activityName}
      </h3>
      <p>{t('booking.time', { start: booking.startTime, end: booking.endTime })}</p>
      <button
        onClick={() => cancel(booking.id)}
        className="mt-2 text-sm text-primary-600"
      >
        {t('booking.cancel')}
      </button>
    </motion.div>
  );
}
```

The component uses `react-i18next` for translations and Framer Motion for a simple animation when the card appears.

## 4. Integration Steps

1. **Set up Supabase project** for authentication and create environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
2. **Configure MySQL database** and run the provided schema. Use an ORM (e.g., Prisma) or raw MySQL queries in server routes.
3. **Create API routes** (using Supabase Edge Functions or Express) that expose CRUD operations for activities, facilities, and bookings. Secure these routes with Supabase auth.
4. **Implement Zustand stores** for bookings, user profile, and sidebar state. Example: `useBookingStore` with actions to fetch, create, and cancel bookings.
5. **Create React pages** for dashboard, calendar, and facility management. Use Tailwind for responsive UI and follow guidelines in `STYLE_GUIDE.md`.
6. **Enable localization** with `react-i18next`. Store translation files under `src/translations` with semantic keys for Arabic and English.
7. **Add analytics dashboards** using `recharts` for bar, line, and pie charts. Fetch data from the API and animate chart transitions with Framer Motion.
8. **Optimize performance** via code splitting (`React.lazy` / `Suspense`), service workers, and CDN hosting for static assets.

## 5. Security and Compliance

* Use HTTPS and environment variables for secrets.
* Implement RBAC in the API to restrict actions based on user roles (Admin, Manager, Staff, Customer).
* Log all critical actions for audit trails.
* Ensure accessibility standards (WCAG 2.1 AA) across components.

This plan provides the groundwork for building a full-featured sports facility management system while leaving room to extend modules such as payment integration and advanced reporting.
