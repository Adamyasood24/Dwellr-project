import React from 'react';
import { View, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';
import { Text } from './Themed';
import { platformSelect } from '@/utils/platform';

// Platform-specific touchable feedback
export function PlatformTouchableFeedback({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.touchableFeedback}>
      {children}
    </View>
  );
}

// Platform-specific scroll container
export function PlatformScrollContainer({ 
  children, 
  style 
}: { 
  children: React.ReactNode,
  style?: ViewStyle 
}) {
  return (
    <View style={[styles.scrollContainer, style]}>
      {children}
    </View>
  );
}

// Platform-specific text styling
export function PlatformText({ 
  children, 
  style,
  variant = 'body'
}: { 
  children: React.ReactNode,
  style?: TextStyle,
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button'
}) {
  const platformStyle = platformSelect({
    web: styles.webText,
    android: styles.androidText,
    default: {}
  });
  
  return (
    <Text style={[getVariantStyle(variant), platformStyle, style]}>
      {children}
    </Text>
  );
}

// Helper function to get variant style
function getVariantStyle(variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button'): TextStyle {
  switch (variant) {
    case 'h1': return styles.h1;
    case 'h2': return styles.h2;
    case 'h3': return styles.h3;
    case 'caption': return styles.caption;
    case 'button': return styles.button;
    default: return styles.body;
  }
}

const styles = StyleSheet.create({
  touchableFeedback: {
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: platformSelect({
      web: 24,
      default: 16
    }),
  },
  webText: {
    // Web-specific text adjustments
    textRendering: 'optimizeLegibility',
  },
  androidText: {
    // Android-specific text adjustments
    includeFontPadding: false,
  },
  h1: {
    fontSize: platformSelect({
      web: 32,
      android: 28,
      default: 30
    }),
    fontWeight: '700',
  },
  h2: {
    fontSize: platformSelect({
      web: 26,
      android: 24,
      default: 24
    }),
    fontWeight: '700',
  },
  h3: {
    fontSize: platformSelect({
      web: 22,
      android: 20,
      default: 20
    }),
    fontWeight: '600',
  },
  body: {
    fontSize: platformSelect({
      web: 17,
      android: 16,
      default: 16
    }),
    fontWeight: '400',
  },
  caption: {
    fontSize: platformSelect({
      web: 15,
      android: 14,
      default: 14
    }),
    fontWeight: '400',
  },
  button: {
    fontSize: platformSelect({
      web: 17,
      android: 16,
      default: 16
    }),
    fontWeight: '600',
  },
}); 