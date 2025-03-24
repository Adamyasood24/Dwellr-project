import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}

export function PropertyCard({ property, onPress, onFavorite, isFavorite }: PropertyCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: property.images[0] }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.price}>${property.price}/month</Text>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.location}>{property.location}</Text>
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={onFavorite}
        >
          <FontAwesome 
            name={isFavorite ? "heart" : "heart-o"} 
            size={24} 
            color={isFavorite ? "#ff4444" : "#000"} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
}); 