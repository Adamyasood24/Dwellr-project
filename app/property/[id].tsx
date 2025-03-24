import { useLocalSearchParams, router } from 'expo-router';
import { StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { PROPERTIES } from '@/constants/MockData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/hooks/useAppTheme';
import { platformSelect, isWeb } from '@/utils/platform';

const { width } = Dimensions.get('window');

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useAppTheme();
  
  // Find the property from mock data
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];

  // Platform-specific content width
  const contentWidth = platformSelect({
    web: width > 768 ? 720 : width,
    default: width
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.overlay }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.favoriteButton, { backgroundColor: colors.overlay }]}
          onPress={() => console.log('Favorite toggled')}
        >
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          isWeb && { alignItems: 'center' }
        ]}
      >
        <View style={[
          styles.contentWrapper,
          isWeb && { maxWidth: contentWidth }
        ]}>
          <Image 
            source={{ uri: property.image }} 
            style={styles.image} 
            // Add loading priority for web
            {...(isWeb ? { loading: 'eager' } : {})}
          />
          
          <View style={styles.content}>
            <Text style={styles.price}>{property.price}</Text>
            <Text style={styles.title}>{property.title}</Text>
            <Text style={[styles.location, { color: colors.textSecondary }]}>
              <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
              {' '}{property.location}
            </Text>
            
            <View style={styles.amenities}>
              <View style={[styles.amenityItem, { backgroundColor: colors.card }]}>
                <Ionicons name="bed-outline" size={24} color={colors.primary} />
                <Text style={styles.amenityValue}>{property.beds}</Text>
                <Text style={[styles.amenityLabel, { color: colors.textSecondary }]}>Bedrooms</Text>
              </View>
              <View style={[styles.amenityItem, { backgroundColor: colors.card }]}>
                <Ionicons name="water-outline" size={24} color={colors.primary} />
                <Text style={styles.amenityValue}>{property.baths}</Text>
                <Text style={[styles.amenityLabel, { color: colors.textSecondary }]}>Bathrooms</Text>
              </View>
              <View style={[styles.amenityItem, { backgroundColor: colors.card }]}>
                <Ionicons name="resize-outline" size={24} color={colors.primary} />
                <Text style={styles.amenityValue}>{property.sqft}</Text>
                <Text style={[styles.amenityLabel, { color: colors.textSecondary }]}>Square Ft</Text>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={[styles.description, { color: colors.text }]}>
                This beautiful property offers modern living in a prime location. Featuring high ceilings, 
                abundant natural light, and premium finishes throughout. The open floor plan creates a 
                seamless flow between the living, dining, and kitchen areas, perfect for entertaining.
              </Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.features}>
                {['Air Conditioning', 'Balcony', 'Gym', 'Parking', 'Swimming Pool', 'Security'].map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                    <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <View>
          <Text style={styles.footerPrice}>{property.price}</Text>
          <Text style={[styles.footerPriceCaption, { color: colors.textSecondary }]}>Monthly Rent</Text>
        </View>
        <TouchableOpacity 
          style={[styles.contactButton, { backgroundColor: colors.primary }]}
          onPress={() => console.log('Contact owner')}
        >
          <Text style={styles.contactButtonText}>Contact Owner</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: Theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentWrapper: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: Theme.spacing.xl,
  },
  price: {
    ...Theme.typography.h2,
    marginBottom: Theme.spacing.xs,
  },
  title: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  location: {
    ...Theme.typography.body,
    marginBottom: Theme.spacing.xl,
  },
  amenities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },
  amenityItem: {
    width: (width - Theme.spacing.xl * 2 - Theme.spacing.md * 2) / 3,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    ...platformSelect({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: Theme.shadows.small
    }),
  },
  amenityValue: {
    ...Theme.typography.h3,
    marginVertical: Theme.spacing.xs,
  },
  amenityLabel: {
    ...Theme.typography.caption,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.md,
  },
  description: {
    ...Theme.typography.body,
    lineHeight: platformSelect({
      web: 1.6,
      android: 24,
      default: 24
    }),
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: Theme.spacing.md,
  },
  featureText: {
    ...Theme.typography.body,
    marginLeft: Theme.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.xl,
    borderTopLeftRadius: Theme.borderRadius.lg,
    borderTopRightRadius: Theme.borderRadius.lg,
    ...platformSelect({
      web: {
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
      },
      default: Theme.shadows.large
    }),
  },
  footerPrice: {
    ...Theme.typography.h3,
  },
  footerPriceCaption: {
    ...Theme.typography.caption,
  },
  contactButton: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  contactButtonText: {
    color: '#fff',
    ...Theme.typography.button,
  },
}); 