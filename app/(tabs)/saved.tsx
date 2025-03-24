import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Header } from '@/components/Header';

type SavedProperty = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
};

export default function SavedScreen() {
  const savedProperties: SavedProperty[] = [
    {
      id: '1',
      title: 'Modern Studio Apartment',
      location: 'Downtown Area',
      price: '$1,200/month',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      beds: 1,
      baths: 1,
      sqft: 500,
    },
    // Add more properties as needed
  ];

  const renderProperty = ({ item }: { item: SavedProperty }) => (
    <TouchableOpacity 
      style={styles.propertyCard}
      onPress={() => router.push(`/property/${item.id}` as any)}
    >
      <Image source={{ uri: item.image }} style={styles.propertyImage} />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyPrice}>{item.price}</Text>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <View style={styles.propertyStats}>
          <View style={styles.statItem}>
            <Ionicons name="bed" size={16} color={Theme.colors.text.secondary} />
            <Text style={styles.statText}>{item.beds}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="water" size={16} color={Theme.colors.text.secondary} />
            <Text style={styles.statText}>{item.baths}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="square" size={16} color={Theme.colors.text.secondary} />
            <Text style={styles.statText}>{item.sqft} sq ft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Saved Properties" />
      <ScrollView style={styles.scrollView}>
        {savedProperties.map((property) => renderProperty({ item: property }))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollView: {
    padding: Theme.spacing.md,
  },
  propertyCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.small,
  },
  propertyImage: {
    width: '100%',
    height: 200,
  },
  propertyInfo: {
    padding: Theme.spacing.md,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    marginTop: Theme.spacing.xs,
  },
  propertyLocation: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
    marginTop: Theme.spacing.xs,
  },
  propertyStats: {
    flexDirection: 'row',
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  statText: {
    color: Theme.colors.text.secondary,
    fontSize: 14,
  },
}); 