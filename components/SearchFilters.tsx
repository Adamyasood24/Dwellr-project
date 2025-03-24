import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from './Themed';
import { Theme } from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useState } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export type FilterOptions = {
  priceRange: [number, number];
  propertyType: string[];
  beds: number;
  baths: number;
  amenities: string[];
};

interface SearchFiltersProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

const propertyTypes = ['House', 'Apartment', 'Studio', 'Villa'];
const amenities = ['Parking', 'Pool', 'Gym', 'WiFi', 'AC', 'Furnished'];

export function SearchFilters({ visible, onClose, onApply, initialFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: initialFilters?.priceRange ?? [0, 5000],
    propertyType: initialFilters?.propertyType ?? [],
    beds: initialFilters?.beds ?? 0,
    baths: initialFilters?.baths ?? 0,
    amenities: initialFilters?.amenities ?? [],
  });

  if (!visible) return null;

  return (
    <Animated.View 
      style={styles.container}
      entering={SlideInDown}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={Theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        <MultiSlider
          values={filters.priceRange}
          min={0}
          max={5000}
          step={100}
          sliderLength={280}
          onValuesChange={(values) => 
            setFilters(prev => ({ ...prev, priceRange: values as [number, number] }))
          }
          selectedStyle={{ backgroundColor: Theme.colors.primary }}
          markerStyle={styles.sliderMarker}
        />
        <View style={styles.priceLabels}>
          <Text>${filters.priceRange[0]}</Text>
          <Text>${filters.priceRange[1]}</Text>
        </View>

        <Text style={styles.sectionTitle}>Property Type</Text>
        <View style={styles.chipContainer}>
          {propertyTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.chip,
                filters.propertyType.includes(type) && styles.chipSelected
              ]}
              onPress={() => {
                setFilters(prev => ({
                  ...prev,
                  propertyType: prev.propertyType.includes(type)
                    ? prev.propertyType.filter(t => t !== type)
                    : [...prev.propertyType, type]
                }));
              }}
            >
              <Text style={[
                styles.chipText,
                filters.propertyType.includes(type) && styles.chipTextSelected
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add more filter sections here */}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => setFilters({
            priceRange: [0, 5000],
            propertyType: [],
            beds: 0,
            baths: 0,
            amenities: [],
          })}
        >
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => {
            onApply(filters);
            onClose();
          }}
        >
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.card,
    borderTopLeftRadius: Theme.borderRadius.xl,
    borderTopRightRadius: Theme.borderRadius.xl,
    ...Theme.shadows.medium,
  },
  // ... rest of the styles
}); 