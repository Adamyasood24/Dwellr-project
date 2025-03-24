import { Platform, Dimensions, PlatformIOSStatic } from 'react-native';

// Platform detection utilities
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Screen dimensions that work consistently across platforms
const { width, height } = Dimensions.get('window');
export const screen = {
  width,
  height,
  // Common breakpoints
  isSmall: width < 375,
  isMedium: width >= 375 && width < 768,
  isLarge: width >= 768,
};

// Platform-specific styling helper
export function platformSelect<T>(options: {
  web?: T;
  ios?: T;
  android?: T;
  default: T;
}): T {
  if (isWeb && options.web !== undefined) return options.web;
  if (isIOS && options.ios !== undefined) return options.ios;
  if (isAndroid && options.android !== undefined) return options.android;
  return options.default;
}

// Platform-specific spacing adjustments
export const platformSpacing = {
  // Android typically needs slightly more padding for touch targets
  touchableHeight: platformSelect({
    android: 48,
    default: 44
  }),
  // Web often needs different padding for scrollable content
  contentPadding: platformSelect({
    web: 24,
    default: 16
  }),
  // Status bar height compensation
  statusBarHeight: platformSelect({
    web: 0,
    ios: 44,
    android: 24,
    default: 0
  })
};

// Platform-specific font adjustments
export const platformFonts = {
  // Android typically uses Roboto, iOS uses SF Pro
  fontFamily: platformSelect({
    android: 'Roboto',
    ios: 'System',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    default: 'System'
  }),
  // Font scaling can differ between platforms
  scaleFactor: platformSelect({
    android: 1,
    ios: 1,
    web: 1.1, // Web often needs slightly larger text
    default: 1
  })
}; 