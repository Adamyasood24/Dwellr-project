import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { screen, isWeb } from '@/utils/platform';
import { Theme } from '@/constants/Theme';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  maxWidth?: number;
  centerContent?: boolean;
}

export function ResponsiveLayout({ 
  children, 
  style, 
  maxWidth = 1200,
  centerContent = true
}: ResponsiveLayoutProps) {
  return (
    <View style={[
      styles.container,
      centerContent && styles.centerContent,
      style
    ]}>
      {isWeb ? (
        <View style={[
          styles.webContainer,
          { maxWidth },
        ]}>
          {children}
        </View>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  centerContent: {
    alignItems: 'center',
  },
  webContainer: {
    width: '100%',
    paddingHorizontal: screen.isLarge ? Theme.spacing.xl : Theme.spacing.md,
  },
}); 