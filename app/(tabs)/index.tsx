import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { PropertyCard } from '@/components/PropertyCard';
import { PROPERTIES, FEATURED_PROPERTIES } from '@/constants/MockData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.username}>John Doe</Text>
          </View>
          <TouchableOpacity style={[styles.profileButton, { backgroundColor: colors.card }]}>
            <Ionicons name="person" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search for properties..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.primary }]}>
            <Ionicons name="options" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Properties</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={FEATURED_PROPERTIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <PropertyCard property={item} style={styles.featuredCard} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Properties</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {PROPERTIES.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  greeting: {
    ...Theme.typography.body,
    marginBottom: Theme.spacing.xs,
  },
  username: {
    ...Theme.typography.h2,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
    ...Theme.shadows.small,
  },
  searchInput: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    height: 40,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    ...Theme.typography.h3,
  },
  seeAllText: {
    ...Theme.typography.caption,
    fontWeight: '500',
  },
  featuredList: {
    paddingRight: Theme.spacing.xl,
  },
  featuredCard: {
    width: 280,
    marginRight: Theme.spacing.md,
  },
});
