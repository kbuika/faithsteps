---
trigger: always_on
---

# FaithSteps - Technical Stack & Engineer Rules

## 1. Core Architecture
- **Framework:** **Expo Managed Workflow** (Latest SDK).
- **Language:** **TypeScript** (Strict Mode enables).
- **Navigation:** **Expo Router** (File-based routing).
- **Styling:** **StyleSheet.create** (Standard React Native).
    - *Rule:* Use `StyleSheet.create` for all component styling.
    - *Rule:* CONSTANTLY reference `Theme` from `@/constants/theme` for colors, spacing, and typography.
    - *Forbidden:* Do NOT use NativeWind or Tailwind CSS.

## 2. Backend & Data Layer (Firebase)
**Strictly adhere to the Firebase ecosystem.**
- **Authentication:** `firebase/auth` (via React Native Firebase).
    - *Providers:* Google, Apple, Email/Password.
- **Database:** **Cloud Firestore** (`firebase/firestore`).
    - *Pattern:* Use simplified data models. optimize for read cost.
    - *Offline:* Enable offline persistence.
- **Backend Logic:** **Cloud Functions** (Node.js).
    - *Rule:* Complex logic (step validation, leaderboard calc) MUST run on the server, not the client.
- **Storage:** `firebase/storage` (User avatars, journey assets).

## 3. Essential Libraries
- **State Management:** `zustand`. (Keep it simple. Store user session and active journey status).
- **Data Fetching:** `tanstack-query` (react-query).
    - *Rule:* Wrap all Firestore queries in custom hooks (`useJourney`, `useUserStats`).
- **Performance:** `@shopify/flash-list`. (MANDATORY for all lists).
- **Images:** `expo-image`. (MANDATORY for all remote images).
- **Animations:** `react-native-reanimated` v3+. (Declarative, 60fps).
- **Health:** `expo-health` (iOS) & Health Connect (Android).
- **Glassmorphism:** `expo-blur`.

## 4. Code Standards & Patterns
### 4.1 Component Architecture
- **Functional Components Only.**
- **Atomic Design:**
    - `components/ui/` (Buttons, Inputs, Cards - Dumb components)
    - `components/features/` (JourneyMap, PrayerWall - Smart components)
    - `app/` (Screens/Routes only)
- **Props:** Use `interface` for props. Destructure all props.

### 4.2 Strict Rules
- **No `any` types.** Ever.
- **No inline styles** for complex views. Use `theme.ts` tokens.
- **files names**: `kebab-case` for files, `PascalCase` for components.
- **Async/Await:** Always use `try/catch` blocks for async operations.

### 4.3 Directory Structure
```
/app              # Expo Router Routes
/components       # UI Components
  /ui             # Reusable primitives (Text, Button)
  /journey        # Journey specific components
/constants        # Theme, Colors, Config
/hooks            # Custom React Hooks
/services         # Firebase Service Wrappers
/store            # Zustand Stores
/types            # TypeScript Definitions
/utils            # Helper functions
```

## 5. Performance Guidelines
- **Images:** Always define `contentFit` and transition props.
- **Lists:** Use `FlashList` with `estimatedItemSize`.
- **Re-renders:** Use `useMemo` and `useCallback` agresively for map markers and list items.
- **Bundle Size:** Avoid heavy libraries (e.g. Moment.js -> use date-fns).