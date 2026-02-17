/**
 * FaithSteps - Design System & Color Palette
 * Based on the core palette:
 * #071A52 - Midnight Blue (Background)
 * #086972 - Ocean Teal (Secondary/Surface)
 * #17B978 - Vibrant Emerald (Primary Action/Success)
 * #A7FF83 - Electric Lime (Accent/Highlight)
 */

export const Palette = {
  // Core Brand Colors
  midnightBlue: '#040d2aff',
  oceanTeal: '#086972',
  vibrantEmerald: '#17B978',
  electricLime: '#CEFF1A', // More neon/Apple Fitness like
  
  // Apple Fitness Neutrals
  zinc900: '#1C1C1E', // Standard iOS dark surface
  zinc800: '#2C2C2E', // Slightly lighter surface
  zinc700: '#3A3A3C', // Borders/Separators
  white: '#FFFFFF',
  offWhite: '#F5F5F7',
  charcoal: '#1C1C1E',
  black: '#000000',
  
  // Functional Colors
  errorRed: '#FF453A',
  warningYellow: '#FFD60A',
  infoBlue: '#0A84FF',
  
  // Opacity Tokens (for glassmorphism)
  overlayLight: 'rgba(255, 255, 255, 0.1)',
  overlayMedium: 'rgba(255, 255, 255, 0.2)',
  overlayDark: 'rgba(0, 0, 0, 0.4)',
} as const;

export const Theme = {
  colors: {
    // Backgrounds
    background: Palette.black,              // Pure black for OLED/Premium feel
    surface: Palette.zinc900,               // Dark grey cards
    surfaceHighlight: '#0A7A85',            // Lighter teal for pressed states or active cards
    
    // Text
    textPrimary: Palette.white,             // Primary content
    textSecondary: '#E0E0E0',               // Secondary content (subtitles) (Opacified White)
    textTertiary: Palette.oceanTeal,        // Muted text or placeholders
    textAccent: Palette.electricLime,       // Highlighted text
    textInverted: Palette.midnightBlue,     // Text on light backgrounds (e.g. Lime buttons)

    // Actions / Interactive Elements
    primary: Palette.vibrantEmerald,        // Primary buttons, active tabs
    primaryForeground: Palette.white,       // Text on primary buttons
    
    secondary: Palette.zinc800,             // Dark grey buttons
    secondaryForeground: Palette.electricLime, // Lime text on grey

    accent: Palette.electricLime,           // Floating Action Buttons, Highlights, Call-to-Actions

    // Status Indicators
    success: Palette.vibrantEmerald,
    error: Palette.errorRed,
    warning: Palette.warningYellow,
    info: Palette.infoBlue,

    // Borders & Dividers
    border: 'rgba(8, 105, 114, 0.5)',       // Subtle teal border for cards
    borderFocus: Palette.electricLime,      // Focused input border
    divider: 'rgba(255, 255, 255, 0.1)',    // Subtle white divider
    zinc900: Palette.zinc900,
    zinc800: Palette.zinc800,
    zinc700: Palette.zinc700,
  },
  
  gradients: {
    // Usage: <LinearGradient colors={Theme.gradients.primaryMixin} />
    background: [Palette.midnightBlue, '#05133E'], // Subtle vertical gradient for depth
    card: [Palette.oceanTeal, '#065A63'],         // Subtle card gradient
    primaryCount: [Palette.vibrantEmerald, Palette.electricLime], // Progress bars, Ring charts
    overlay: ['transparent', 'rgba(7, 26, 82, 0.8)'], // Image overlays
  },

  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
    section: 48,
  },

  borderRadius: {
    s: 8,
    m: 12,
    l: 16,     // Standard card radius
    xl: 24,    // Large cards/modals
    full: 9999, // Pills/Circles
  },
  
  typography: {
    fontFamily: {
      regular: 'System', // Replace with custom font if loaded (e.g., 'SF-Pro-Rounded')
      medium: 'System-Medium',
      bold: 'System-Bold',
    },
    sizes: {
      caption: 12,
      body: 16,
      subhead: 18,
      title: 24,
      display: 32,
      hero: 48,
    },
    lineHeights: {
      caption: 16,
      body: 24,
      title: 32,
      display: 40,
    }
  },

  shadows: {
    // Apple-style smooth shadows
    sm: {
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: Palette.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 8,
    },
    glow: {
      shadowColor: Palette.electricLime, // Lime glow for active elements
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 6,
    }
  }
} as const;

export type ThemeType = typeof Theme;
