import { StyleSheet, View } from 'react-native';
import { Text } from './Themed';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';

type WebMapProps = {
  properties: Array<{
    id: string;
    title: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }>;
};

export function WebMap({ properties }: WebMapProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="map-outline" size={48} color={Theme.colors.text.secondary} />
      <Text style={styles.text}>Map View</Text>
      <Text style={styles.subtext}>
        Map functionality is not available in web version
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: Theme.spacing.md,
  },
  subtext: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
    marginTop: Theme.spacing.sm,
  },
}); 