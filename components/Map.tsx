import { StyleSheet, View, Platform, Image, useColorScheme } from 'react-native';
import { Text } from './Themed';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';

type MapProps = {
  properties: Array<{
    id: string | string[];
    title: string;
    price?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }>;
};

export function Map({ properties }: MapProps) {
  const colorScheme = useColorScheme() ?? 'light';

  // For web or when maps aren't available
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: Theme.colors[colorScheme].background }]}>
        <Ionicons 
          name="map-outline" 
          size={48} 
          color={Theme.colors[colorScheme].textSecondary} 
        />
        <Text style={[styles.text, { color: Theme.colors[colorScheme].text }]}>
          Map View
        </Text>
        <Text style={[styles.subtext, { color: Theme.colors[colorScheme].textSecondary }]}>
          Map view is not available in web version
        </Text>
      </View>
    );
  }

  // For native platforms, show a placeholder for now
  return (
    <View style={[styles.container, { backgroundColor: Theme.colors[colorScheme].background }]}>
      <Ionicons 
        name="map" 
        size={48} 
        color={Theme.colors[colorScheme].textSecondary} 
      />
      <Text style={[styles.text, { color: Theme.colors[colorScheme].text }]}>
        Map View
      </Text>
      <Text style={[styles.subtext, { color: Theme.colors[colorScheme].textSecondary }]}>
        {properties.length} location{properties.length !== 1 ? 's' : ''} marked
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: Theme.spacing.md,
  },
  subtext: {
    fontSize: 14,
    marginTop: Theme.spacing.sm,
  }
}); 