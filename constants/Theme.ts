import { platformFonts, platformSelect, platformSpacing } from '@/utils/platform';

// Helper function to create cross-platform shadows
const createShadow = (level: 'small' | 'medium' | 'large') => {
  const shadowConfig = {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 4,
      boxShadow: '0px 4px 8px rgba(0,0,0,0.15)'
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 8,
      boxShadow: '0px 6px 16px rgba(0,0,0,0.2)'
    }
  };

  return Platform.OS === 'web' 
    ? { boxShadow: shadowConfig[level].boxShadow }
    : {
        shadowColor: shadowConfig[level].shadowColor,
        shadowOffset: shadowConfig[level].shadowOffset,
        shadowOpacity: shadowConfig[level].shadowOpacity,
        shadowRadius: shadowConfig[level].shadowRadius,
        elevation: shadowConfig[level].elevation
      };
};

// Define the theme with platform-specific adjustments
export const Theme = {
  colors: {
    light: {
      primary: '#4A80F0',
      secondary: '#1CC5DC',
      accent: '#FF8C42',
      background: '#F5F5F5',
      card: '#FFFFFF',
      text: '#1A1A1A',
      textSecondary: '#757575',
      border: '#E0E0E0',
      notification: '#FF3B30',
      overlay: 'rgba(0, 0, 0, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      primary: '#4A80F0',
      secondary: '#1CC5DC',
      accent: '#FF8C42',
      background: '#121212',
      card: '#1E1E1E',
      text: '#F5F5F5',
      textSecondary: '#ABABAB',
      border: '#2C2C2C',
      notification: '#FF453A',
      overlay: 'rgba(0, 0, 0, 0.7)',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
  },
  
  // Platform-specific spacing
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    // Platform-specific spacing
    contentPadding: platformSpacing.contentPadding,
    touchableHeight: platformSpacing.touchableHeight,
  },
  
  // Platform-specific typography
  typography: {
    h1: {
      fontSize: 28 * platformFonts.scaleFactor,
      fontWeight: '700',
      fontFamily: platformFonts.fontFamily,
      lineHeight: platformSelect({ web: 1.4, default: 1.3 }) * 28 * platformFonts.scaleFactor,
    },
    h2: {
      fontSize: 24 * platformFonts.scaleFactor,
      fontWeight: '700',
      fontFamily: platformFonts.fontFamily,
      lineHeight: platformSelect({ web: 1.4, default: 1.3 }) * 24 * platformFonts.scaleFactor,
    },
    h3: {
      fontSize: 20 * platformFonts.scaleFactor,
      fontWeight: '600',
      fontFamily: platformFonts.fontFamily,
      lineHeight: platformSelect({ web: 1.4, default: 1.3 }) * 20 * platformFonts.scaleFactor,
    },
    body: {
      fontSize: 16 * platformFonts.scaleFactor,
      fontWeight: '400',
      fontFamily: platformFonts.fontFamily,
      lineHeight: platformSelect({ web: 1.5, default: 1.4 }) * 16 * platformFonts.scaleFactor,
    },
    caption: {
      fontSize: 14 * platformFonts.scaleFactor,
      fontWeight: '400',
      fontFamily: platformFonts.fontFamily,
      lineHeight: platformSelect({ web: 1.5, default: 1.4 }) * 14 * platformFonts.scaleFactor,
    },
    button: {
      fontSize: 16 * platformFonts.scaleFactor,
      fontWeight: '600',
      fontFamily: platformFonts.fontFamily,
      lineHeight: platformSelect({ web: 1.5, default: 1.4 }) * 16 * platformFonts.scaleFactor,
    },
  },
  
  // Platform-specific border radius
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  // Platform-specific shadows
  shadows: {
    small: platformSelect({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
    medium: platformSelect({
      web: {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)',
      },
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
    }),
    large: platformSelect({
      web: {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.14)',
      },
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 16,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 16,
      },
    }),
  },
};

export type FontWeight = 
  | '100' | '200' | '300' | '400' | '500' 
  | '600' | '700' | '800' | '900' 
  | 'normal' | 'bold';

export type ThemeType = typeof Theme.colors.light; 