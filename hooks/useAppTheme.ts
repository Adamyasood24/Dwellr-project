import { useColorScheme } from 'react-native';
import { Theme } from '@/constants/Theme';

export function useAppTheme() {
  // Force light theme for server rendering to avoid hydration mismatch
  const colorScheme = typeof document === 'undefined' ? 'light' : (useColorScheme() ?? 'light');
  const colors = Theme.colors[colorScheme];
  
  return { colorScheme, colors };
} 