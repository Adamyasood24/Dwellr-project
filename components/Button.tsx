import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  Platform,
  Pressable
} from 'react-native';
import { Text } from './Themed';
import { Theme } from '@/constants/Theme';
import { useAppTheme } from '@/hooks/useAppTheme';
import { platformSelect, isWeb, isAndroid } from '@/utils/platform';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon
}: ButtonProps) {
  const { colors } = useAppTheme();
  
  // Determine button styling based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? `${colors.primary}80` : colors.primary,
          borderColor: 'transparent',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? `${colors.secondary}80` : colors.secondary,
          borderColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? `${colors.primary}80` : colors.primary,
          borderWidth: 1,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      default:
        return {
          backgroundColor: disabled ? `${colors.primary}80` : colors.primary,
          borderColor: 'transparent',
        };
    }
  };

  // Determine text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return '#FFFFFF';
      case 'outline':
      case 'text':
        return disabled ? `${colors.primary}80` : colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  // Determine button size
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: Theme.spacing.xs,
          paddingHorizontal: Theme.spacing.md,
          borderRadius: Theme.borderRadius.sm,
        };
      case 'large':
        return {
          paddingVertical: Theme.spacing.md,
          paddingHorizontal: Theme.spacing.xl,
          borderRadius: Theme.borderRadius.md,
        };
      default:
        return {
          paddingVertical: Theme.spacing.sm,
          paddingHorizontal: Theme.spacing.lg,
          borderRadius: Theme.borderRadius.md,
        };
    }
  };

  // Use different components based on platform for optimal feedback
  const ButtonComponent = isAndroid ? Pressable : TouchableOpacity;

  return (
    <ButtonComponent
      style={({ pressed }) => [
        styles.button,
        getSizeStyle(),
        getButtonStyle(),
        isAndroid && pressed && styles.androidPressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      android_ripple={isAndroid ? { color: 'rgba(255, 255, 255, 0.2)' } : undefined}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : colors.primary} 
        />
      ) : (
        <React.Fragment>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text 
            style={[
              styles.text, 
              { color: getTextColor() },
              size === 'small' && styles.smallText,
              size === 'large' && styles.largeText,
              textStyle
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </React.Fragment>
      )}
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...platformSelect({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        ':hover': {
          opacity: 0.9,
        },
        ':active': {
          transform: 'scale(0.98)',
        }
      },
      default: {}
    }),
  },
  androidPressed: {
    opacity: 0.8,
  },
  text: {
    ...Theme.typography.button,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  iconLeft: {
    marginRight: Theme.spacing.xs,
  },
  iconRight: {
    marginLeft: Theme.spacing.xs,
  },
}); 