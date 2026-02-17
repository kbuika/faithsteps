---
trigger: always_on
---

# FaithSteps - UI/UX Design System Rules

## Core Philosophy: "Apple Fitness Quality"
**Objective:** Create a bespoke, premium, and meaningful experience. Avoid generic "Material Design" or "Bootstrap" looks. Every interaction should feel intentional, fluid, and polished.

## 1. Visual Language & Aesthetics

### 1.1 Color Palette Usage
- **Strict Adherence:** Use ONLY the colors defined in `constants/theme.ts`.
- **Primary Background:** `Palette.midnightBlue` (#040d2aff) is the canvas. Avoid pure black unless for video overlays.
- **Surface Colors:** Use `Palette.oceanTeal` (#086972) for cards, but prefer distinct gradients or glassmorphism over flat colors.
- **Accents:**
    - **Primary Action (Success/Go):** `Palette.vibrantEmerald` (#17B978). Use for "Start Journey", "Complete", or main CTAs.
    - **Highlights/Focus:** `Palette.electricLime` (#A7FF83). Use sparingly for text highlights, active tab indicators, or glow effects.
- **Text Hierarchy:**
    - **Headings:** White (`#FFFFFF`).
    - **Body:** Off-white/Grey (`#E0E0E0`).
    - **Subtle:** Ocean Teal or transparency.

### 1.2 Glassmorphism & Depth
- **Blur is Key:** Use `expo-blur` heavily for headers, tab bars, and floating overlay cards.
- **Layering:**
    1.  **Bottom:** Dark, rich gradient background (Midnight Blue -> Deep Purple hint).
    2.  **Middle:** Content cards with subtle borders (`rgba(8, 105, 114, 0.3)`) and low opacity backgrounds (`rgba(8, 105, 114, 0.1)`).
    3.  **Top:** Floating action buttons and navigation elements with higher contrast and "glow" shadows.
- **Shadows:** Avoid harsh black shadows. Use colored shadows (e.g., a subtle Emerald glow behind a primary button) to create a neon/luminescent feel.

### 1.3 Typography
- **Font Family:** Use system fonts for now (San Francisco on iOS) but strictly enforce weights.
    - **Display:** `System-Bold` or `System-Heavy` for large numbers (step counts).
    - **Body:** `System-Medium` for readability.
- **Whitespace:** Be generous. Content should breathe. Minimum padding of `24` (Theme.spacing.l) on screen edges.

## 2. Component Guidelines

### 2.1 Buttons & Interactables
- **Touch Targets:** Minimum 44x44pt.
- **Feedback:** ALL interactable elements must have haptic feedback (`expo-haptics`) and a scale-down animation on press (`useAnimatedStyle`).
- **Styling:**
    - **Primary Button:** Gradient background (Emerald -> Teal), rounded corners (`Theme.borderRadius.full`), white text.
    - **Secondary Button:** Transparent background, `electricLime` border, `electricLime` text.

### 2.2 Lists & Cards
- **FlashList:** Always use `Shopify/flash-list` for lists.
- **Card Transitions:** Cards should stagger in when a screen loads.
- **Separators:** Avoid hard lines. Use whitespace or subtle gradients to separate content.

### 2.3 Imagery
- **Quality:** Use `expo-image` with `contentFit="cover"` and `transition={500}`.
- **Overlays:** Always apply a gradient overlay (transparent -> black/midnightBlue) on text-over-image scenarios to ensure readability.
- **Radius:** All images must have rounded corners (`Theme.borderRadius.l` or `xl`).

## 3. Motion & Animation
- **Library:** Strictly usage of `react-native-reanimated`.
- **Transitions:**
    - **Layout Changes:** `Layout.spring()` for smooth resizing.
    - **Navigation:** Shared Element Transitions for images moving between list and detail views.
- **Micro-interactions:**
    - Heart/Like buttons should "pop".
    - Progress bars should fill smoothly on load.
    - Numbers (step counts) should count up (ticker effect).

## 4. Navigation & Layout
- **Header:** Transparent/Blur intensity headers. Content scrolls *behind* the header.
- **Tab Bar:** Custom floating tab bar (not the default system one). Glassmorphic background.
- **Safe Areas:** Strictly respect `useSafeAreaInsets`. No content should be clipped by the notch or home indicator.

## 5. "Do Not" Rules
- **DO NOT** use default React Native `Button` or `Switch` components. Create custom, themed wrappers.
- **DO NOT** use `StyleSheet.create` with hardcoded hex values. ALWAYS import `Theme`.
- **DO NOT** create "boxy" or "web-like" designs. Think "Spatial", "Fluid", and "Organic".
