import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PROPERTIES } from '@/constants/MockData';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Theme.colors[colorScheme];
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Map View</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {PROPERTIES.length} properties found
          </Text>
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.card }]}>
          <Ionicons name="options-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.mapPlaceholder, { backgroundColor: colors.card }]}>
        <Ionicons name="map" size={64} color={colors.textSecondary} />
        <Text style={[styles.mapText, { color: colors.textSecondary }]}>
          Map View
        </Text>
        <Text style={[styles.mapSubtext, { color: colors.textSecondary }]}>
          (Map component would be here)
        </Text>
      </View>

      <View style={[styles.propertyListContainer, { backgroundColor: colors.card }]}>
        <View style={styles.propertyListHeader}>
          <Text style={styles.propertyListTitle}>Nearby Properties</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.propertyList}>
          {PROPERTIES.slice(0, 3).map((property) => (
            <TouchableOpacity 
              key={property.id}
              style={[styles.propertyItem, { borderBottomColor: colors.border }]}
            >
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyTitle} numberOfLines={1}>{property.title}</Text>
                <Text style={[styles.propertyLocation, { color: colors.textSecondary }]} numberOfLines={1}>
                  <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                  {' '}{property.location}
                </Text>
                <Text style={styles.propertyPrice}>{property.price}</Text>
              </View>
              <View style={styles.propertyDetails}>
                <View style={styles.propertyDetail}>
                  <Ionicons name="bed-outline" size={16} color={colors.primary} />
                  <Text style={[styles.propertyDetailText, { color: colors.textSecondary }]}>
                    {property.beds}
                  </Text>
                </View>
                <View style={styles.propertyDetail}>
                  <Ionicons name="water-outline" size={16} color={colors.primary} />
                  <Text style={[styles.propertyDetailText, { color: colors.textSecondary }]}>
                    {property.baths}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  title: {
    ...Theme.typography.h2,
  },
  subtitle: {
    ...Theme.typography.caption,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  mapPlaceholder: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.lg,
    ...Theme.shadows.medium,
  },
  mapText: {
    ...Theme.typography.h3,
    marginTop: Theme.spacing.md,
  },
  mapSubtext: {
    ...Theme.typography.caption,
    marginTop: Theme.spacing.sm,
  },
  propertyListContainer: {
    flex: 1,
    marginTop: Theme.spacing.xl,
    borderTopLeftRadius: Theme.borderRadius.xl,
    borderTopRightRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.xl,
    ...Theme.shadows.large,
  },
  propertyListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  propertyListTitle: {
    ...Theme.typography.h3,
  },
  viewAllText: {
    ...Theme.typography.caption,
    fontWeight: '500',
  },
  propertyList: {
    flex: 1,
  },
  propertyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
  },
  propertyInfo: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
  propertyTitle: {
    ...Theme.typography.body,
    fontWeight: '500',
    marginBottom: Theme.spacing.xs,
  },
  propertyLocation: {
    ...Theme.typography.caption,
    marginBottom: Theme.spacing.xs,
  },
  propertyPrice: {
    ...Theme.typography.h3,
  },
  propertyDetails: {
    justifyContent: 'center',
  },
  propertyDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  propertyDetailText: {
    ...Theme.typography.caption,
    marginLeft: Theme.spacing.xs,
  },
}); 