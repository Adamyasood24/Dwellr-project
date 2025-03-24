import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { platformSelect, isWeb } from '@/utils/platform';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightIcon?: {
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export function Header({ 
  title, 
  subtitle, 
  showBackButton = false, 
  rightIcon,
  style 
}: HeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[
      styles.container, 
      style,
      // Web-specific styling
      isWeb && styles.webContainer
    ]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.card }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      
      {rightIcon && (
        <TouchableOpacity 
          style={[styles.iconButton, { backgroundColor: colors.card }]}
          onPress={rightIcon.onPress}
        >
          <Ionicons name={rightIcon.name} size={24} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    width: '100%',
  },
  webContainer: {
    maxWidth: 1200,
    alignSelf: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
    ...platformSelect({
      web: {
        transition: 'transform 0.2s ease',
        ':hover': {
          transform: 'scale(1.05)',
        }
      },
      default: Theme.shadows.small
    }),
  },
  title: {
    ...Theme.typography.h3,
  },
  subtitle: {
    ...Theme.typography.caption,
  },
}); 