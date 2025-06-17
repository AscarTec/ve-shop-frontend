# Sports Hub - Multilingual Booking Platform

A comprehensive, modular booking platform for managing sports activities (swimming, fields, etc.) with Arabic-first data display and full internationalization support.

## 🚀 Features

### Core Functionality
- ✅ **Modular Activity Management** - Swimming, Fields, Tennis with tabbed interfaces
- ✅ **Arabic-First Data Display** - All business data remains in Arabic regardless of UI language
- ✅ **Dynamic Pricing System** - Per hour/session pricing with automatic deposit calculation
- ✅ **Booking Lifecycle Management** - Status flow from pending → confirmed → completed
- ✅ **Real-time Notifications** - Telegram for admins, WhatsApp for clients
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete for all entities
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **RTL/LTR Support** - Proper Arabic and English layout support

### Technical Stack
- **Frontend**: React 18 + TypeScript + TailwindCSS + Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v6
- **Internationalization**: i18next (Arabic + English)
- **State Management**: Zustand
- **UI Components**: Shadcn/ui + Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Project Structure

```
src/
├── components/
│   ├── forms/          # Reusable form components
│   ├── layout/         # Layout components (Sidebar, Topbar, etc.)
│   └── ui/             # Shadcn/ui components
├── pages/
│   ├── swimming/       # Swimming module with tabs
│   │   ├── SwimmingTabs.tsx
│   │   ├── PrivateBookings.tsx
│   │   ├── FreeTimeBookings.tsx
│   │   └── SchoolsBookings.tsx
│   ├── fields/         # Fields module (Football, Tennis, etc.)
│   ├── clients/        # Client management
│   └── bookings/       # General booking management
├── services/
│   ├── pricing.ts      # Pricing calculations and rules
│   ├── bookings.ts     # Booking lifecycle management
│   └── telegram.ts     # Notification services
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── lib/
│   ├── i18n.ts        # Internationalization setup
│   └── utils.ts       # Utility functions
└── translations/       # Translation files
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Environment Variables
Create a `.env` file in the root directory:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_ADMIN_CHAT_ID=your_admin_chat_id

# WhatsApp API Configuration
WHATSAPP_API_URL=https://graph.facebook.com/v17.0/your_phone_id
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token

# Database (if using)
DATABASE_URL=your_database_connection_string
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sports-hub-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📋 Core Features Guide

### 1. 🏊 Swimming Module

The swimming module is organized into three main tabs:

#### Private Bookings (الحجوزات الخاصة)
- Individual client bookings
- Hourly pricing (200 SAR/hour)
- 30% minimum deposit
- Status tracking: معلقة → تم دفع المقدم → مؤكدة → مكتملة

#### Free Time Sessions (الأوقات الحرة)
- Group sessions with capacity limits
- Fixed session pricing (40-60 SAR/person)
- Real-time capacity monitoring
- Family and general sessions

#### School Bookings (المدارس)
- Educational institution bookings
- Bulk pricing (40 SAR/student/hour)
- Age group management
- Special instructor assignments

### 2. 💰 Pricing System

The pricing system supports multiple models:

```typescript
// Example pricing calculation
const booking = calculateBookingPrice('swimming_private', 2, 1);
// Returns: { totalPrice: 400, depositAmount: 120, remainingAmount: 280 }
```

#### Pricing Rules:
- **Swimming Private**: 200 SAR/hour, 30% deposit
- **Swimming Free Time**: 50 SAR/session, 100% upfront
- **Swimming Schools**: 40 SAR/student/hour, 25% deposit
- **Football Fields**: 300 SAR/hour, 40% deposit
- **Tennis Courts**: 150 SAR/hour, 35% deposit

### 3. 🔄 Booking Lifecycle

Each booking follows a defined status flow:

```
معلقة (Pending)
    ↓ (Client pays deposit)
تم دفع المقدم (Deposit Paid)
    ↓ (Admin confirms booking)
مؤكدة (Confirmed)
    ↓ (Service completed + final payment)
مكتملة (Completed)

* Any status can transition to ملغية (Cancelled)
```

### 4. 📱 Notification System

#### Telegram (Admin Notifications)
- New booking alerts
- Status change notifications
- Payment confirmations
- Booking modifications

#### WhatsApp (Client Notifications)
- Booking confirmations
- Payment reminders
- Schedule changes
- Service completion confirmations

## 🔧 Development Guide

### Adding New Activity Types

1. **Create the main component**:
```typescript
// src/pages/tennis/TennisTabs.tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TennisTabs = () => {
  // Implementation
};
```

2. **Update pricing rules**:
```typescript
// src/services/pricing.ts
export const PRICING_RULES: PricingRule[] = [
  // ... existing rules
  {
    activityType: 'tennis_court',
    unitType: 'hour',
    basePrice: 150,
    minimumDeposit: 35,
    currency: 'SAR'
  }
];
```

3. **Add to routing**:
```typescript
// src/App.tsx
<Route path="/activities/tennis" element={<Tennis />} />
```

### Maintaining Arabic Data Display

**Important**: All business data must remain in Arabic regardless of UI language:

```typescript
// ✅ Correct - Data stays in Arabic
const client = { name: 'أحمد محمد الأحمد', status: 'مؤكد' };

// ❌ Wrong - Don't translate data
const client = { name: t('ahmed_mohamed'), status: t('confirmed') };
```

### Adding New Booking Statuses

1. Update the `BookingStatus` type in `services/bookings.ts`
2. Add to `BOOKING_STATUS_FLOW` mapping
3. Update `getStatusColor` function
4. Add translations if needed for new UI elements (not data)

### Custom Hooks Usage

```typescript
// Example: Custom booking hook
const { bookings, loading, error, updateStatus } = useBookings();

// Example: Pricing hook
const { calculatePrice, formatPrice } = usePricing();
```

## 🎨 UI/UX Guidelines

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive tables with hidden columns
- Touch-friendly buttons and controls

### Color Scheme
- **Primary**: Blue gradient (blue-600 to cyan-600)
- **Secondary**: Green for available/confirmed
- **Warning**: Yellow for pending
- **Danger**: Red for cancelled/errors
- **Info**: Purple for completed

### Arabic Typography
- Right-to-left text alignment
- Proper Arabic font rendering
- Contextual number formatting
- Currency display in Arabic

## 🚦 Status Indicators

| Status | Arabic | Color | Description |
|--------|--------|-------|-------------|
| Pending | معلقة | Yellow | Awaiting deposit payment |
| Deposit Paid | تم دفع المقدم | Blue | Deposit received, needs confirmation |
| Confirmed | مؤكدة | Green | Booking confirmed by admin |
| Completed | مكتملة | Purple | Service completed, fully paid |
| Cancelled | ملغية | Red | Booking cancelled |

## 📊 Dashboard & Analytics

The platform includes comprehensive analytics:
- Daily/Weekly/Monthly booking reports
- Revenue tracking with deposit vs. final payments
- Activity popularity metrics
- Client retention analysis
- Instructor performance tracking

## 🔐 Security Considerations

- Input validation with Zod schemas
- XSS protection with proper sanitization
- Rate limiting for API endpoints
- Secure token handling for external APIs
- Environment variable protection

## 🌐 Internationalization

### UI Language Support
- Arabic (العربية) - RTL layout
- English - LTR layout
- Dynamic language switching
- Persistent language preference

### Data Language Policy
- **Business Data**: Always in Arabic (names, statuses, descriptions)
- **UI Elements**: Translatable (buttons, headers, menus)
- **Numbers**: Localized formatting
- **Dates**: Localized but configurable

## 📱 API Integration

### Telegram Bot Setup
1. Create bot with @BotFather
2. Get bot token and admin chat ID
3. Configure webhook if needed
4. Test with sample notifications

### WhatsApp Business API
1. Register with WhatsApp Business Platform
2. Get phone number ID and access token
3. Configure webhook for message status
4. Test message delivery

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run preview  # Test production build locally
```

### Environment Configuration
- Set all required environment variables
- Configure CORS for API endpoints
- Set up SSL certificates
- Configure database connections

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run component tests
npm run test:components

# Run e2e tests
npm run test:e2e
```

## 📈 Performance Optimization

- Lazy loading of route components
- Image optimization and caching
- Bundle splitting and code splitting
- API response caching
- Efficient re-rendering with React.memo

## 🤝 Contributing

1. Follow Arabic-first data principle
2. Maintain responsive design standards
3. Write comprehensive TypeScript types
4. Include proper error handling
5. Update documentation for new features

## 📄 License

[Your License Here]

## 🆘 Support

For technical support or feature requests:
- Email: support@sportshub.com
- Telegram: @sportshub_support
- Documentation: [docs-url]

---

Built with ❤️ for the Arabic sports community
