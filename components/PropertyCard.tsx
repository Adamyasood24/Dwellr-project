import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { router } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';
import { platformSelect, isWeb } from '@/utils/platform';

const { width } = Dimensions.get('window');

export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  rating?: number;
  isFeatured?: boolean;
};

interface PropertyCardProps {
  property: Property;
  style?: any;
}

export function PropertyCard({ property, style }: PropertyCardProps) {
  const { colors } = useAppTheme();

  // Platform-specific card width
  const cardWidth = platformSelect({
    web: style?.width || width > 768 ? 320 : width * 0.85,
    default: style?.width || width * 0.85
  });

  return (
    <TouchableOpacity
      style={[
        styles.container, 
        { 
          backgroundColor: colors.card,
          width: cardWidth
        }, 
        style
      ]}
      onPress={() => router.push(`/property/${property.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: property.image }} 
          style={styles.image} 
          // Add loading priority for web
          {...(isWeb ? { loading: 'lazy' } : {})}
        />
        {property.isFeatured && (
          <View style={[styles.featuredBadge, { backgroundColor: colors.accent }]}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <TouchableOpacity 
          style={[styles.favoriteButton, { backgroundColor: colors.overlay }]}
          onPress={(e) => {
            e.stopPropagation();
            console.log('Favorite toggled');
          }}
        >
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.price}>{property.price}</Text>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={[styles.location, { color: colors.textSecondary }]}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          {' '}{property.location}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="bed-outline" size={18} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>{property.beds} Beds</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={18} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>{property.baths} Baths</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="resize-outline" size={18} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>{property.sqft} sqft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    ...platformSelect({
      web: {
        transition: 'transform 0.2s ease-in-out',
        ':hover': {
          transform: 'translateY(-4px)',
        }
      },
      default: Theme.shadows.medium
    }),
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Theme.spacing.md,
  },
  price: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  title: {
    ...Theme.typography.body,
    fontWeight: '500',
    marginBottom: Theme.spacing.xs,
  },
  location: {
    ...Theme.typography.caption,
    marginBottom: Theme.spacing.md,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    ...Theme.typography.caption,
    marginLeft: Theme.spacing.xs,
  },
}); 